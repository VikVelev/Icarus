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
        
        this.loader = new OBJLoader()
        this.texLoader = new MTLLoader()
        
        this.state = {
            loading: true,
            precent: 0,
            currentlyRendering: [],
            counter: 0,
        }
    }

    animate() {
        requestAnimationFrame( this.animate.bind(this) )
        this.viewport.render();
    }

    onWindowResize() {
        this.viewport.onResize();
    }

    componentDidMount(){
                
        this.rootElement = document.getElementById(this.canvasId)

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        if(this.props.texturePath !== undefined && this.props.texturePath !== null){
            //With textures
            this.texLoader.load(
                this.props.texturePath,
                (function ( materials ) {
    
                    materials.preload();
                    this.loader.setMaterials(materials);
                    this.loader.load(this.props.modelPath, (function ( object ) {
    
                        this.model3D = new Model3D ( object )
                        if (!this.props.diff) {
                            this.state.currentlyRendering.push({...this.model3D})
                        }

                        // TODO Make viewport declaring independent from the model, 
                        // and scale the model between 0 and 1 and not the viewport

                        this.viewport = new Viewport( this.canvasId, this.model3D, this.rootElement, this.props.diff )
                        this.viewport.init()
                        this.onWindowResize()
                        this.animate()
                        this.props.dispatch({type: "RENDERING"})
                        
    
                    }).bind(this), this.onProgress.bind(this), this.onError.bind(this)) 
    
                }).bind(this)
            );
        } else {
            //without textures
            this.loader.load(this.props.modelPath, (function ( object ) {

                this.model3D = new Model3D ( object )
                if (this.props.diff) {
                    this.state.currentlyRendering.push({...this.model3D})
                }
                this.viewport = new Viewport( this.canvasId, this.model3D, this.rootElement, this.props.diff )
                this.viewport.init()
                this.onWindowResize()
                this.animate()
                this.props.dispatch({type: "RENDERING"})
                

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
        //I'm using the commit ID to refer to each model when removing them.
        this.setState({ loading:true, precent: 0 })
        //this is concluding the callback
        this.props.dispatch({ type: "STOP_ADD_TO_COMPARE" })

        //Clearing the cache
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

        if (this.state.precent === 100 && this.state.counter === this.state.currentlyRendering.length + 1) {
            let timeout = 2000
            if (this.props.model3d.diffMode) {
                timeout = 10000
            }
            setTimeout(this.setState({ loading: false }), timeout);                
        }
        if (this.state.precent === 100) {
            this.state.counter++
        }
    }


    onError( error ){
        console.log("An error: " + error)
    }


    componentWillUnmount(){
        this.props.dispatch({type: "STOPPING"})
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
        return(
            <div id={this.canvasId} className="viewport">
               {this.Loading()}
               {this.manageDiff()}
            </div>
        )
    }
}
