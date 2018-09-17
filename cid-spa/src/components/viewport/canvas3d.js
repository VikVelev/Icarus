import React, { Component } from 'react'
import { Progress, Icon, } from 'semantic-ui-react'

/* Not written by me */
import MTLLoader from './es6-threejs-classes/MTLLoader.js'
import ScrollAnimation from 'react-animate-on-scroll'
/* Not written by me */

/* Written by me 100% */
import Viewport from './es6-threejs-classes/Viewport'
import Model3D from './es6-threejs-classes/Model3D';
/* Written by me 100% */

import { connect } from 'react-redux';
import CommitChain from '../diff/commitChain.js';

import { fetchDemoData } from "../../actions/model3DActions"

let THREE = require('three')

let LoaderSupport = require('./es6-threejs-classes/LoaderSupport.js')
LoaderSupport(THREE)

let OBJLoader2 = require('./es6-threejs-classes/OBJLoader2.js')
OBJLoader2(THREE, MTLLoader)

@connect((store) => {
    return {
        page: store.pageManagement,
        model3d: store.model3DManagement
    }
})
export default class Canvas3D extends Component {

    constructor(props){
        super(props)
        //TODO Fix this
        typeof(this.props.canvasId) ? 
        //9 digits so we don't overflow 32 bit int (jk)
        this.canvasId = Math.round(Math.random()*(10**9)) 
        : this.canvasId = this.props.canvasId
        
        //this.loader = new OBJLoader()

        this.texLoader = new MTLLoader()
        this.workerDirector = new THREE.LoaderSupport.WorkerDirector( THREE.OBJLoader2 )
        this.logging = {
			enabled: false,
			debug: false
        };
        
        this.globalId = 666;
		this.workerDirector.setLogging( this.logging.enabled, this.logging.debug );
		this.workerDirector.setCrossOrigin( 'anonymous' );
        this.workerDirector.setForceWorkerDataCopy( true );
        this.Validator = THREE.LoaderSupport.Validator;

    }

    state = {
        loading: true,
        precent: 0,
        currentlyRendering: [],
        counter: 0,
        limitReached: false,
        ctrl: true,
    }

    commits = []

    death = false

    animate = () => {
        if(!this.death){
            requestAnimationFrame( this.animate )
            this.viewport.render();
        }
    }

    onWindowResize() {
        this.viewport.onResize();
    }

    canvasInit(model){
        this.model3d = null
        if( model !== undefined ) {
            this.model3d = new Model3D( model )
        }
        this.viewport = new Viewport( this.canvasId, this.model3d, this.rootElement, this.props.diff, this.props.demo );
        this.viewport.init()
        this.onWindowResize()
        this.animate()
        this.props.dispatch({ type: "RENDERING" })
    }

    enqueueAllAssests ({ maxQueueSize, maxWebWorkers, streamMeshes, textures, modelPrepDatas=[], commitId }) {

        if (this.running) return;
        
        this.allAssets = []
        this.running = true;
        this.workerDirector.objectsCompleted = 0;

        let callbackOnLoad = (event) => {
            this.allAssets.push( event.detail.loaderRootNode );

            if ( this.logging.enabled ) console.info( event );
            if ( this.workerDirector.objectsCompleted + 1 === maxQueueSize ) this.running = false;

            if (commitId === undefined) {
                //console.log(commitId)
            }
            
            this.onModelLoad(event, commitId)
            this.setState({ loading: false, })
        };

        // This is called when a single mesh is loaded
        let callbackMeshAlter = (event, override) => {
            if ( ! this.Validator.isValid( override ) ) {
                override = new THREE.LoaderSupport.LoadedMeshUserOverride( false, false );
            }
            let material = event.detail.material;
            let meshName = event.detail.meshName;

            if ( this.Validator.isValid( material ) && material.name === 'defaultMaterial' ) {

                let materialOverride = material;
                materialOverride.color = new THREE.Color( 0, 0, 0 );
                let mesh = new THREE.Mesh( event.detail.bufferGeometry, material );
                mesh.name = meshName;

                override.addMesh( mesh );
                override.alteredMesh = true;
            }

            return override;
        };

        let callbackOnLoadMaterials = ( materials ) => {
            return materials;
        };

        let callbacks = new THREE.LoaderSupport.Callbacks();
        callbacks.setCallbackOnProgress( this.onProgress.bind(this) );
        callbacks.setCallbackOnLoad( callbackOnLoad );
        callbacks.setCallbackOnMeshAlter( callbackMeshAlter );
        callbacks.setCallbackOnLoadMaterials( callbackOnLoadMaterials );

        this.workerDirector.prepareWorkers( callbacks, maxQueueSize, maxWebWorkers );

        if (modelPrepDatas.length === 0) {

            let prepData;
            let modelName;

            if (this.props.demo) {
                modelName = this.props.modelPath.split('/')[3]

                
            } else {    
                modelName = this.props.modelPath.split("/")[4]
                modelName = modelName.split(".")[0]

                prepData = new THREE.LoaderSupport.PrepData( modelName );
                prepData.addResource( new THREE.LoaderSupport.ResourceDescriptor( this.props.modelPath, 'OBJ ') );
                if (textures) {
                    prepData.addResource( new THREE.LoaderSupport.ResourceDescriptor( this.props.texturePath, 'MTL' ) );
                }
                prepData.setLogging( false, false );
                modelPrepDatas.push( prepData );
            }
        }
        
        let modelPrepDataIndex = 0;
        let modelPrepData;

        for ( let i = 0; i < maxQueueSize; i++ ) {

            modelPrepData = modelPrepDatas[ i ];
            modelPrepData.useAsync = true;
            modelPrepData = modelPrepData.clone();

            this.workerDirector.enqueueForRun( modelPrepData );
            
        }
        this.workerDirector.processQueue();
	};

    onModelLoad(event, commitId) {

        let addingModel = new Model3D(event.detail.loaderRootNode)

        if (commitId === undefined) {
            this.globalId--;
            commitId = this.globalId;
        }

        this.viewport.addModel(addingModel, commitId)
        this.setState({ loading: false })
    }


    componentDidMount(){
        this.death = false
        //Return to default state
        this.setState({
            loading: true,
            precent: 0,
            currentlyRendering: [],
            counter: 0,
            limitReached: false,
        })
        
        this.rootElement = document.getElementById(this.canvasId)
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        this.props.dispatch({
            type: "START_CANVAS",
            payload: {
                id: this.canvasId
            },
        })

        this.canvasInit()
        //{ maxQueueSize, maxWebWorkers, streamMeshes, textures, modelPrepDatas }
        //console.log(this.props.diff, this.props.type)

        // if it's not a diff canvas, load a starting model, if its diff, add it
        if (!this.props.diff && this.props.type !== "revision" && !this.props.demo) {
            this.enqueueAllAssests({
                maxQueueSize: 1,
                maxWebWorkers: 2,
                streamMeshes: false,
                textures: (this.props.texturePath !== undefined && this.props.texturePath !== null)
            })
        }
        
        if(this.props.demo) {

            this.commits = []
            
            this.commits.push({
                belongs_to_model: 1,
                committed_by: {
                    email: "yaskata@abv.bg",
                    first_name: "",
                    id: 1,
                    last_name: "",
                    profile: { 
                        country: "", 
                        birth_date: "2018-09-06", 
                        profile_picture: "http://172.24.0.2:9000/media/16195797_550978245107579_768123003936312725_n.jpg", 
                        description: "", 
                        software: ""
                    },
                    username: "VikVelev",
                },
                date: "2018-09-15T01:57:46.477429+03:00",
                details: "Uploaded model5",
                id: 3,
                new_textures: "http://localhost:3000/models/aventador/Avent.mtl",
                new_version: "http://localhost:3000/models/aventador/Avent.obj",
                title: "Added side view mirrors",
                version_number: 2,
            })

            this.commits.push({
                belongs_to_model: 1,
                committed_by: {
                    email: "yaskata@abv.bg",
                    first_name: "",
                    id: 1,
                    last_name: "",
                    profile: { 
                        country: "", 
                        birth_date: "2018-09-06", 
                        profile_picture: "http://172.24.0.2:9000/media/16195797_550978245107579_768123003936312725_n.jpg", 
                        description: "", 
                        software: ""
                    },
                    username: "VikVelev",
                },
                date: "2018-09-15T01:57:46.477429+03:00",
                details: "Uploaded model5",
                id: 4,
                new_textures: "http://localhost:3000/models/aventador/Avent0.mtl",
                new_version: "http://localhost:3000/models/aventador/Avent0.obj",
                title: "Initial Commit",
                version_number: 1,
            })

            console.log(this.commits)

            let modelPrepDatas = []

            // let prepData1 = new THREE.LoaderSupport.PrepData( "demo1" );

            // prepData1.addResource( new THREE.LoaderSupport.ResourceDescriptor( this.props.modelPath + ".obj", 'OBJ ') );
            // prepData1.addResource( new THREE.LoaderSupport.ResourceDescriptor( this.props.modelPath + ".mtl", 'MTL' ) );

            // modelPrepDatas.push( prepData1 );

            // let prepData0 = new THREE.LoaderSupport.PrepData( "demo0" );

            // prepData0.addResource( new THREE.LoaderSupport.ResourceDescriptor( this.props.modelPath + "0.obj", 'OBJ ') );
            // prepData0.addResource( new THREE.LoaderSupport.ResourceDescriptor( this.props.modelPath + "0.mtl", 'MTL' ) );

            // modelPrepDatas.push( prepData0 );

            // this.enqueueAllAssests({
            //     maxQueueSize: 2,
            //     maxWebWorkers: 2,
            //     streamMeshes: false,
            //     textures: null,
            //     modelPrepDatas: modelPrepDatas,
            // })
        }

        if(this.props.type === 'revision') {

            let modelPrepDatas = []
            
            let lastCommitName = this.props.revisionData.model.commits[0].new_version
            //console.log(lastCommitName)
            lastCommitName = lastCommitName.split("/")[4].split(".")[0]
            let prepCommitData = new THREE.LoaderSupport.PrepData( lastCommitName );

            prepCommitData.addResource( new THREE.LoaderSupport.ResourceDescriptor( this.props.revisionData.model.commits[0].new_version, 'OBJ ') );
            if (this.props.revisionData.model.commits[0].new_textures) {
                prepCommitData.addResource( new THREE.LoaderSupport.ResourceDescriptor( this.props.revisionData.model.commits[0].new_textures, 'MTL' ) );
            }
            modelPrepDatas.push( prepCommitData );

            //console.log(this.props.revisionData)
            let modelName = this.props.revisionData.commit_mesh

            modelName = modelName.split("/")[4].split(".")[0]
            let prepData = new THREE.LoaderSupport.PrepData( modelName );

            prepData.addResource( new THREE.LoaderSupport.ResourceDescriptor( this.props.revisionData.commit_mesh, 'OBJ ') );
            if (this.props.revisionData.commit_textures) {
                prepData.addResource( new THREE.LoaderSupport.ResourceDescriptor( this.props.revisionData.commit_textures, 'MTL' ) );
            }
            modelPrepDatas.push( prepData );

            this.enqueueAllAssests({
                maxQueueSize: 2,
                maxWebWorkers: 2,
                streamMeshes: false,
                textures: null,
                modelPrepDatas: modelPrepDatas,
            })
        }
    }

    manageDiff() {
        // Actually thought of an intresting architecture to allow communicating between react components
        if (this.props.model3d.addModelCallback.called) {
            //console.log("diff: ", this.props.model3d.addModelCallback)
            this.addModel(this.props.model3d.addModelCallback.query, this.props.demo)
        }

        if (this.props.model3d.removeModelCallback.called) {
            this.removeModel(this.props.model3d.removeModelCallback.query.commitId, this.props.demo)
        }

    }

    removeModel( name ) {

        //this is concluding the callback        
        this.props.dispatch({ type: "STOP_REMOVE_FROM_COMPARE" })

        this.state.currentlyRendering.forEach(element => {
            if(element.model.name === name) {
                this.state.currentlyRendering.splice(this.state.currentlyRendering.indexOf(element), 1)        
            }
        })

        this.viewport.removeModel( name )

    }

    addModel( element, isAsync) {
        // I'm using the commit ID to refer to each model when removing them.
        //console.log(element)
        this.setState({ loading:true, precent: 0 })
        // this is concluding the callback
        let modelPrepDatas = [];
        let modelName;

        if (isAsync === undefined) {
            modelName = element.mesh.split("/")[4]
            modelName = modelName.split(".")[0]
        } else {
            modelName = element.mesh.split("/")[3]
            modelName = modelName.split(".")[0]
        }

        // console.log(modelName)
        // console.log(element)
        

        let prepData = new THREE.LoaderSupport.PrepData( modelName );
        prepData.setLogging( false, false );

        prepData.addResource( new THREE.LoaderSupport.ResourceDescriptor( element.mesh, 'OBJ ') );
        
        // let intersectingPoints = []

        // if ( element.type === "model" ) {
        //     element.data.forEach((element) => {
        //         intersectingPoints.push(element.intersects(this.currentlyRendering[element.index + 1]))
        //     })
        // }

        if (element.textures !== null) {
            prepData.addResource( new THREE.LoaderSupport.ResourceDescriptor( element.textures, 'MTL' ) );
        }
        modelPrepDatas.push( prepData );
        this.props.dispatch({ type: "STOP_ADD_TO_COMPARE" })

        //{ maxQueueSize, maxWebWorkers, streamMeshes, textures, modelPrepDatas }
        //console.log(modelPrepDatas)
        this.enqueueAllAssests({
            maxQueueSize: 1,
            maxWebWorkers: 2,
            streamMeshes: false,
            textures: (element.textures !== null),
            modelPrepDatas:  modelPrepDatas,
            commitId: element.commitId,
        })
 
    }

    onProgress( event ){
        this.setState({ precent: Math.round( event.detail.numericalValue * 100 )});
    }


    onError( error ){
        console.log("An error: " + error)
    }


    componentWillUnmount(){
        this.props.dispatch({type: "STOPPING"})
        this.props.dispatch({ 
            type: "STOP_CANVAS",
            payload: {
                id: this.canvasId
            },
        })
        //return to default state
        this.setState({
            loading: true,
            precent: 0,
            currentlyRendering: [],
            counter: 0,
            limitReached: false,
        })
        
        if(this.domEl){
            this.domEl.removeEventListener('wheel', this.scroll)
        }

        this.death = true
    }

    loadDemoPanel(){

        if(!this.props.model3d.viewModelFetched) {
            this.props.dispatch(fetchDemoData());
        }

        return(
            <div className="demoPanel">
                <center>
                    <h4>
                        Versions available
                    </h4>
                    <CommitChain commits={this.commits} demo={true}/>
                </center>
            </div>
        );
    }

    Loading = () => {
        if (!this.state.loading) {
            return null
        } else {
            return ( 
                <div className="loading">
                    <Progress inverted percent={this.state.precent} indicating></Progress>            
                </div>
            )
        }
    }

    timeout = 0
    scroll = (event) => {
        this.setState({ ctrl: event.ctrlKey })
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.setState({ ctrl: true })
        }, 1000 * 10)
    }

    // TODO: Fix this shit, make it look decent
    v = (element) => {
        if(element){
            element.addEventListener( 'wheel', this.scroll, false)
            this.domEl = element
        }
    }

    warnScroll = () => {
        return <div className={(this.state.ctrl) ? "warn-ctrl hide" : "warn-ctrl show"}>To zoom in/out press Ctrl and Scroll</div>
    }


    render(){
        //if the current models are fewer than the safe limit, render normally
        if(this.props.page.renderingModelsId.length <= this.props.page.safeLimit) {
            if (this.state.limitReached) {
                return (
                    <div className={"limitReached id" + this.canvasId}>
                        <Icon name="dashboard"/>
                        <p className="limitHeader"> Safe rendering limit for the current device reached.</p>
                        <p> If you want, you can close and reopen this, but this will close the next chronologically opened renderer.<br/>
                        It is prefferable that you close the viewports manually after you finish looking at it.<br/>
                        That is to avoid any performance hits using the website.
                        </p>          
                    </div>
                )
            }

            return(
                <div ref={this.v} id={this.canvasId} className="viewport">
                    {this.warnScroll()}
                    {this.Loading()}
                    {this.manageDiff()} 
                    {/* ^ an event listener basically */}
                    {this.props.demo ? this.loadDemoPanel() : null}
                </div>
            )
        //This if assumes that all ids in the renderingModelsId are ordered chronologically
        //that should be the case since I am .push-ing them one after the other.
        } else if (this.props.page.renderingModelsId[0] === this.canvasId 
                    && !this.state.limitReached) {
            this.props.dispatch({ type: "STOP_SIGNAL", payload: this.canvasId }) 
            this.props.dispatch({type: "STOPPING"})

            this.props.dispatch({ 
                type: "STOP_CANVAS",
                payload: {
                    id: this.canvasId
                },
            })
            this.setState({ limitReached: true })
            return null
        }
        console.warn("Limit is surpassed")
        return(
            <div ref={this.v} id={this.canvasId} className="viewport warn">
                {this.warnScroll()}
                {this.Loading()}
                {this.manageDiff()}
                {this.props.demo ? this.loadDemoPanel() : null}
            </div>
        )
    }
}
