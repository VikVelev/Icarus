import React, { Component } from 'react'
//import { BoxGeometry, MeshBasicMaterial, Mesh,}  from 'three'

import OBJLoader from 'three-react-obj-loader'

import Viewport from './es6-threejs-classes/Viewport'
import Model3D from './es6-threejs-classes/Model3D';

export default class Canvas3D extends Component {

    constructor(props){
        super(props)
        //TODO Fix this
        typeof(this.props.canvasId) ? this.canvasId = Math.round(Math.random()*100) : this.canvasId = this.props.canvasId


        //Make this dynamic
        this.loader = new OBJLoader()
     
        this.state = {
            
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

        //FIX THE COMPONENT MOUNTING SO ONLY ONE COMPONENT SHOULD BE MOUNTED AT A TIME
        this.rootElement = document.getElementById(this.canvasId)     
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        this.loader.load(
            // resource URL
            this.props.model,
            (function ( object ) {
                this.model3D = new Model3D ( object )
                this.viewport = new Viewport( this.canvasId, this.model3D, this.rootElement )
                this.viewport.init()
                this.onWindowResize()
                this.animate()
            }).bind(this),
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function ( error ) {
                console.log( 'An error happened' + error );
            }
        );

    }

    componentWillUnmount(){
        // TODO Utilize this.
        console.log("Unmounting")
    }

    render(){
        return(
            <div id={this.canvasId} className="viewport"></div>
        )
    }
}