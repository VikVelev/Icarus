import React, { Component } from 'react'
import { BoxGeometry, MeshBasicMaterial, Mesh }  from 'three'

import Viewport from './es6-threejs-classes/Viewport'
import Model3D from './es6-threejs-classes/Model3D';

export default class Canvas3D extends Component {

    constructor(props){
        super(props)

        typeof(this.props.canvasId) ? this.canvasId = Math.round(Math.random()*100) : this.canvasId = this.props.canvasId

        this.geometry = new BoxGeometry( Math.random(), Math.random(), Math.random() )
        this.material = new MeshBasicMaterial( {color: 0xff6600} )
        this.cube = new Mesh( this.geometry, this.material )
        this.model3D = new Model3D( this.cube )
     
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
        this.rootElement.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        this.viewport = new Viewport( this.canvasId, this.model3D, this.rootElement )
        this.viewport.init()
        this.onWindowResize()
        this.animate()
    }

    componentWillUnmount(){
        console.log("Unmounting")
    }

    render(){
        return(
            <div id={this.canvasId} className="viewport"></div>
        )
    }
}