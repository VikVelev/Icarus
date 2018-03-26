import React, { Component } from 'react'
import { Progress } from 'semantic-ui-react'

/* Not written by me */
import OBJLoader from 'three-react-obj-loader'
import MTLLoader from './es6-threejs-classes/MTLLoader.js'
/* Not written by me */

/* Written by me 100% */
import Viewport from './es6-threejs-classes/Viewport'
import Model3D from './es6-threejs-classes/Model3D';
/* Written by me 100% */
import { connect } from 'react-redux';

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
        typeof(this.props.canvasId) ? this.canvasId = Math.round(Math.random()*100) : this.canvasId = this.props.canvasId

        this.corePath = this.props.modelPath.substring(0, this.props.modelPath.length - 4) // removing the extension .obj

        var path = this.corePath.split("/");
        this.modelName = path.pop() //removing the extensionless name

        this.modelPath = path.join("/") + "/"; //CORE
        this.texturePath = this.modelPath
        
        this.meshName = this.modelName + ".obj"
        this.textureName = this.modelName + ".mtl"
        

        this.loader = new OBJLoader()
        this.texLoader = new MTLLoader()
        
        this.state = {
            loading: true,
            precent: 0,
            locked: false,
            currentlyRendering: []
        }
    }

    animate() {
        requestAnimationFrame( this.animate.bind(this) )
        this.viewport.render();
    }

    onWindowResize() {
        this.viewport.onResize();
    }

    // TODO Add texture support
    componentDidMount(){
        
        this.props.dispatch({type: "RENDERING_CANVAS3D"})
        
        this.rootElement = document.getElementById(this.canvasId)

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        this.texLoader.setPath(this.modelPath)
        this.loader.setPath(this.modelPath)
        
        if(this.props.texturePath !== undefined){
            //With textures
            this.texLoader.load(
                this.textureName,
                (function ( materials ) {
    
                    materials.preload();
                    this.loader.setMaterials(materials);
                    this.loader.load(this.meshName, (function ( object ) {
    
                        this.model3D = new Model3D ( object )
                        this.state.currentlyRendering.push({...this.model3D})
                        this.viewport = new Viewport( this.canvasId, this.model3D, this.rootElement )
                        this.viewport.init()
                        this.onWindowResize()
                        this.animate()
    
                    }).bind(this), this.onProgress.bind(this), this.onError.bind(this)) 
    
                }).bind(this)
            );
        } else {
            //without textures
            this.loader.load(this.meshName, (function ( object ) {

                this.model3D = new Model3D ( object )
                this.viewport = new Viewport( this.canvasId, this.model3D, this.rootElement )
                this.viewport.init()              
                this.onWindowResize()
                this.animate()

            }).bind(this), this.onProgress.bind(this), this.onError.bind(this))
        }
    }
    
    manageDiff() {
        // Actually thought of an intresting architecture to allow communicating between react components
        if (this.props.model3d.addModelCallback.called) {
            // TODO: Implement download
            this.addModel(this.props.model3d.addModelCallback.query)
        }

        if (this.props.model3d.removeModelCallback.called) {

            this.removeModel(this.props.model3d.removeModelCallback.query.commitId)
        }

    }

    removeModel( name ) {
        //this id is the element.modelId
        this.props.dispatch({ type: "STOP_REMOVE_FROM_COMPARE" })

        let removeIndices = []

        this.state.currentlyRendering.forEach(element => {
            if(element.model.name === name) {
                this.state.currentlyRendering.splice(this.state.currentlyRendering.indexOf(element), 1)        
            }
        })
        this.viewport.removeModel( name )

    }

    addModel(element) {
        //This is so it doesn't run every component update
        //for each model in comparing array, load it with obj loader and then add into the viewport?

        //I'm using the commit ID to refer to them
        this.props.dispatch({ type: "STOP_ADD_TO_COMPARE" })

        this.texLoader.setPath("")
        this.loader.setPath("") 
        
        this.loader.setMaterials(null)
        //Try starting the loading screen again
        
        if(element.textures !== null){
            //With textures
            
            this.texLoader.load(
                element.textures,
                (function ( materials ) {
                    
                    materials.preload();
                    this.loader.setMaterials(materials);

                    this.loader.load(element.mesh, (function ( object ) {

                        let model3D = new Model3D ( object )
                        this.viewport.addModel( model3D, element.commitId )
                        
                        this.state.currentlyRendering.push({...model3D})

                    }).bind(this), this.onProgress.bind(this), this.onError.bind(this)) 
    
                }).bind(this)
            );
        } else {
            //without textures
            this.loader.load(element.mesh, (function ( object ) {
                
                let model3D = new Model3D ( object )           
                this.viewport.addModel( model3D, element.commitId )

                this.state.currentlyRendering.push({...model3D})                

            }).bind(this), this.onProgress.bind(this), this.onError.bind(this))
        }

    }


    onProgress( xhr ){
        this.setState({ precent: Math.round( xhr.loaded / xhr.total * 100 )});

        if (this.state.precent === 100) {
            setTimeout(this.setState({ loading: false }), 2000);
        }
    }


    onError( error ){
        console.log("An error: " + error)
    }


    componentWillUnmount(){
        this.props.dispatch({type: "STOPPING_CANVAS3D"})
    }


    Loading = () => {
        if (!this.state.loading) {
            //console.log("not showing")
            return null
        } else {
            //console.log("showing")            
            return ( 
                <div className="loading">
                    <Progress inverted percent={this.state.precent} indicating></Progress>            
                </div>
            )
        }
    }


    render(){
        let locked = this.state.locked  
        return(
            <div id={this.canvasId} className="viewport">
               {this.Loading()}
               {this.manageDiff()}
            </div>
        )
    }
}

