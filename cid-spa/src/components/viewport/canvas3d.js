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
        page: store.pageManagement
    }
})
export default class Canvas3D extends Component {

    constructor(props){
        super(props)
        //TODO Fix this
        typeof(this.props.canvasId) ? this.canvasId = Math.round(Math.random()*100) : this.canvasId = this.props.canvasId

        this.corePath = this.props.modelPath.substring(0, this.props.modelPath.length - 4)
        
        var path = this.corePath.split("/");
        this.modelName = path.pop()

        this.modelPath = path.join("/") + "/"; //CORE
        this.texturePath = this.modelPath
        
        this.meshName = this.modelName + ".obj"
        this.textureName = this.modelName + ".mtl"
        
        console.log(this.meshPath, this.modelPath)

        //Make this dynamic
        this.loader = new OBJLoader()
        this.texLoader = new MTLLoader()
        
        this.state = {
            loading: true,
            precent: 0,
        }
    }

    animate() {
        requestAnimationFrame( this.animate.bind(this) )
        this.viewport.render();
    }

    linkCheck(url){
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status !== 404;
    }

    onWindowResize() {
        this.viewport.onResize();
    }

    componentDidMount(){

        this.props.dispatch({type: "RENDERING_CANVAS3D"})
        
        this.rootElement = document.getElementById(this.canvasId)

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        this.texLoader.setPath(this.modelPath)
        this.loader.setPath(this.modelPath)
        
        console.log(this.texturePath)
        if(this.linkCheck(this.modelPath + this.textureName)){

            this.texLoader.load(
                this.textureName,
                (function ( materials ) {
    
                    materials.preload();
                    this.loader.setMaterials(materials);
                    this.loader.load(this.meshName, (function ( object ) {
    
                        this.model3D = new Model3D ( object )
                        this.viewport = new Viewport( this.canvasId, this.model3D, this.rootElement )
                        this.viewport.init()
                        this.onWindowResize()
                        this.animate()
    
                    }).bind(this), this.onProgress.bind(this), this.onError.bind(this)) 
    
                }).bind(this)
            );
        } else {
            this.loader.load(this.meshName, (function ( object ) {
    
                this.model3D = new Model3D ( object )
                this.viewport = new Viewport( this.canvasId, this.model3D, this.rootElement )
                this.viewport.init()
                this.onWindowResize()
                this.animate()

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
        // TODO Utilize this.
        this.props.dispatch({type: "STOPPING_CANVAS3D"})
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

    render(){
        return(
            <div id={this.canvasId} className="viewport">
               {this.Loading()}
            </div>
        )
    }
}

