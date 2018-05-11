import React, { Component } from 'react'
import { Progress, Icon, } from 'semantic-ui-react'

/* Not written by me */
import MTLLoader from './es6-threejs-classes/MTLLoader.js'
/* Not written by me */

/* Written by me 100% */
import Viewport from './es6-threejs-classes/Viewport'
import Model3D from './es6-threejs-classes/Model3D';
/* Written by me 100% */

import { connect } from 'react-redux';

import OBJLoader from 'three-obj-loader'

let THREE = require('three')

let LoaderSupport = require('./es6-threejs-classes/LoaderSupport.js')
LoaderSupport(THREE, MTLLoader)

let OBJLoader2 = require('./es6-threejs-classes/OBJLoader2.js')
OBJLoader2(THREE, MTLLoader)

<<<<<<< HEAD
let Validator = THREE.LoaderSupport.Validator;

//console.log(THREE.OBJLoader2)

=======
>>>>>>> b35746ba486399ef80e96dfee76b2b0339312943
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
        //9 digits so we don't overflow 32 bit int
        this.canvasId = Math.round(Math.random()*(10**9)) 
        : this.canvasId = this.props.canvasId
        
        //this.loader = new OBJLoader()
        this.workerDirector = new THREE.LoaderSupport.WorkerDirector( THREE.OBJLoader2 )
        this.logging = {
			enabled: false,
			debug: false
        };
        
		this.workerDirector.setLogging( this.logging.enabled, this.logging.debug );
		this.workerDirector.setCrossOrigin( 'anonymous' );
        this.workerDirector.setForceWorkerDataCopy( true );
        this.Validator = THREE.LoaderSupport.Validator;

        this.state = {
            loading: true,
            precent: 0,
            currentlyRendering: [],
            counter: 0,
            limitReached: false,
        }
    }

    animate() {
        requestAnimationFrame( this.animate.bind(this) )
        this.viewport.render();
    }

    onWindowResize() {
        this.viewport.onResize();
    }

    canvasInit(model){
        this.model3d = null
        if( model !== undefined ) {
            this.model3d = new Model3D( model )
        }
        this.viewport = new Viewport( this.canvasId, this.model3d, this.rootElement, this.props.diff )
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
            this.onModelLoad(event, commitId)
            this.setState({ loading: false, })
        };

        let callbackReportProgress = (event) => {
            //console.log(event)
        };

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
        callbacks.setCallbackOnProgress( callbackReportProgress );
        callbacks.setCallbackOnLoad( callbackOnLoad );
        callbacks.setCallbackOnMeshAlter( callbackMeshAlter );
        callbacks.setCallbackOnLoadMaterials( callbackOnLoadMaterials );

        this.workerDirector.prepareWorkers( callbacks, maxQueueSize, maxWebWorkers );

        let prepData;
        let modelName = this.props.modelPath.split("/")[4]
        modelName = modelName.split(".")[0]

        if (modelPrepDatas.length === 0) {
            prepData = new THREE.LoaderSupport.PrepData( modelName );
            prepData.addResource( new THREE.LoaderSupport.ResourceDescriptor( this.props.modelPath, 'OBJ ') );
            if (textures) {
                prepData.addResource( new THREE.LoaderSupport.ResourceDescriptor( this.props.texturePath, 'MTL' ) );
            }
            prepData.setLogging( false, false );
            modelPrepDatas.push( prepData );
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
        this.viewport.addModel(addingModel, commitId)
        this.setState({ loading: false })
    }

    componentDidMount(){
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
        if (!this.props.diff) {
            this.enqueueAllAssests({
                maxQueueSize: 1,
                maxWebWorkers: 4,
                streamMeshes: false,
                textures: (this.props.texturePath !== undefined && this.props.texturePath !== null)
            })
        }
    }

    manageDiff() {
        // Actually thought of an intresting architecture to allow communicating between react components
        if (this.props.model3d.addModelCallback.called) {
            this.addModel(this.props.model3d.addModelCallback.query)
        }

        if (this.props.model3d.removeModelCallback.called) {
            this.removeModel(this.props.model3d.removeModelCallback.query.commitId)
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

    addModel(element) {
        // I'm using the commit ID to refer to each model when removing them.
        this.setState({ loading:true, precent: 0 })
        // this is concluding the callback
        let modelPrepDatas = [];

        let modelName = element.mesh.split("/")[4]
        modelName = modelName.split(".")[0]

        let prepData = new THREE.LoaderSupport.PrepData( modelName );
        prepData.setLogging( false, false );

        prepData.addResource( new THREE.LoaderSupport.ResourceDescriptor( element.mesh, 'OBJ ') );
        
        if (element.textures !== null) {
            prepData.addResource( new THREE.LoaderSupport.ResourceDescriptor( element.textures, 'MTL' ) );
        }
        modelPrepDatas.push( prepData );
        this.props.dispatch({ type: "STOP_ADD_TO_COMPARE" })

        //{ maxQueueSize, maxWebWorkers, streamMeshes, textures, modelPrepDatas }
        
        this.enqueueAllAssests({
            maxQueueSize: 1,
            maxWebWorkers: 4,
            streamMeshes: false,
            textures: (element.textures !== null),
            modelPrepDatas:  modelPrepDatas,
            commitId: element.commitId
        })
 
    }

    onProgress( xhr ){
        this.setState({ precent: Math.round( xhr.loaded / xhr.total * 100 )});
        if (this.state.precent === 100) {
            setTimeout(this.setState({ loading: false }), 3000);
        }
        
        if (this.state.precent === 100) {
            this.setState({ counter: this.state.counter + 1 })
        }
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
    }


    Loading = () => {
        if (!this.state.loading) {
            return null
        } else {
            return ( 
                <div className="loading">
                    <Progress inverted percent={100} indicating></Progress>            
                </div>
            )
        }
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
                <div id={this.canvasId} className="viewport">
                   {this.Loading()}
                   {this.manageDiff()}
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
            <div id={this.canvasId} className="viewport warn">
               {this.Loading()}
               {this.manageDiff()}
            </div>
        )
    }
}
