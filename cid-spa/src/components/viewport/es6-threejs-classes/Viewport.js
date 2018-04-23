import { Scene, PerspectiveCamera, GridHelper } from 'three'
import  { WebGLRenderer, PointLight, AmbientLight, BufferGeometry, Mesh, Color } from 'three'
import { Raycaster, Vector2, MeshNormalMaterial, CubeGeometry } from 'three'
import OrbitControls from 'three-orbitcontrols'

import dat from 'dat.gui'

import Model3D from './Model3D.js'
//import Diff from './Diff.js'

export default class Viewport {
    // ifDiff - diff object --> still not implemented will probably have
    // modelBefore, modelAfter, date, vertices, normals, surface difference
    constructor ( _index, _objectToRender, _objectToAppendTo, _diff ) {

        this.objectToRender = _objectToRender;
        this.objectToAppendTo = _objectToAppendTo;
        this.index = _index;
        this.diff = _diff !== undefined ? _diff : false ;
        this.currentlyRendering = [];
        // this.camera;
        // this.controls;

        /* this is for adding selections in the future */
        // this.INTERSECTED;
        // this.mouse;
        // this.raycaster;
        /* this is for adding selections in the future */
    
        // this.scene;
        // this.renderer;
        // this.gridHelper;
        // this.optionBox;
        this.active = false; 
        // for the future dynamic rendering
        // this.state;

        if ( this.objectToRender instanceof Model3D ) {

            this.state = "normal"

        }
    }

    init() {
        
        // For object detection onClick
        this.particleMaterial = new Color(155,155,0);
        this.raycaster = new Raycaster()
        this.mouse = new Vector2();

        //Scene init
        this.scene = new Scene();
        this.light = new PointLight( 0xffffff, 1, 1000);
        this.ambient = new AmbientLight( 0xeeeeee, 0.5 );
        
        this.scene.add( this.ambient );
        this.scene.add( this.light );
        
        this.camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.0001, 15 );
        
        this.camera.position.y = 1
        this.camera.position.x = -1.3
        this.camera.position.z = 1.3             
        
        this.light.position.set( 0, 3, 0);
        
        this.gridHelper = new GridHelper( 10, 10, 0xffffff, 0x808080 );
        this.gridHelper.position.x = 0;
        this.gridHelper.position.y = 0;
        this.gridHelper.position.z = 0;
        
        this.divWrapper = document.createElement('div')
        
        this.divWrapper.id += " " + this.index;
        this.divWrapper.className += "viewport";
        
        this.renderer = new WebGLRenderer( { antialiasing: true } );
        
        this.renderer.setSize( this.divWrapper.clientWidth,  this.divWrapper.clientHeight);
        this.renderer.setClearColor(0xffffff, 1)
        
        this.renderer.domElement.id = this.index;
        
        if (this.isNormal()) {
            this.optionBox = new dat.GUI( { autoplace: false, width: 200, resizable: false } );
            this.optionBox.domElement.id = 'gui' + this.index;
            this.divWrapper.appendChild( this.optionBox.domElement );
        }
        
        this.divWrapper.appendChild( this.renderer.domElement );
        
        this.objectToAppendTo.appendChild( this.divWrapper );
        
        this.controls = new OrbitControls( this.camera, document.getElementById( this.index ) );
        this.controls.enableDamping = true;
        this.controls.minDistance = 0; 
        this.controls.maxDistance = 9;
        this.controls.maxPolarAngle = Math.PI;

        document.addEventListener( 'mousedown', this.onDocumentMouseDown.bind(this), false );
        document.addEventListener( 'touchstart', this.onDocumentTouchStart, false );

        let params = {

            vNormals: false,
            fNormals: false,
            textures: true,
            mesh: true,
            wireframe: false,
            opacity: 0.7,
        
        };

        //If the viewport is normal
        if (this.isNormal()) {
            //TODO: FIX THIS
            // this.optionBox.add( params, "vNormals" ).name( "Vertex Normals" ).onFinishChange( (function( value ) {

            //     this.objectToRender.toggleVertexNormals();
                    
            // }).bind(this)); 

            // this.optionBox.add( params, "fNormals" ).name( "Face Normals" ).onFinishChange( (function( value ) {
                
            //         this.objectToRender.toggleFaceNormals();
                    
            // }).bind(this)); 

            this.optionBox.add( params, "textures" ).name( "Textures" ).onFinishChange( (function( value ) {

                this.objectToRender.toggleTextures();
                    
            }).bind(this));
            
            this.optionBox.add( params, "wireframe" ).name( "Wireframe" ).onFinishChange( (function( value ) {
                        
                this.objectToRender.toggleWireframe();

            }).bind(this)); 

            this.optionBox.add( params, "mesh" ).name( "Mesh" ).onFinishChange( (function( value ) {

                this.objectToRender.toggleMesh();

            }).bind(this));
        }
        

        
        this.scene.add( this.gridHelper );
        
        if ( this.state === "normal" ) {
            if (this.isNormal()) {
                this.objectToRender.import.forEach(element => {
                    this.scene.add( element );
                });
                this.currentlyRendering.push(this.objectToRender)
            }
        }
    }

    onDocumentTouchStart( event ) {
        event.preventDefault();
        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
        this.onDocumentMouseDown( event );
    }

    onDocumentMouseDown( event ) {
        //TODO: Finish implementing this
        event.preventDefault();
        this.mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;
        this.raycaster.setFromCamera( this.mouse, this.camera );
        
        //console.log(this.currentlyRendering[0])
        let intersects = []
        if (this.currentlyRendering[1] !== undefined) {
            intersects = this.raycaster.intersectObjects( this.currentlyRendering[1].extractedGeometry.children );
        } else {
            intersects = this.raycaster.intersectObjects( this.currentlyRendering[0].extractedGeometry.children );            
        }
        //console.log("Throwing a ray at ", this.mouse.x, this.mouse.y, intersects)

        if ( intersects.length > 0 ) {

            for ( let i = 0; i < intersects.length; i++ ) {
                if (intersects[ i ].object.material.color !== undefined){
                    intersects[ i ].object.material.color.set( 0xff0000 );
                }
            }   

            intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
     
            let particle = new Mesh( new CubeGeometry( 0.1, 0.1, 0.1 ), new MeshNormalMaterial() );
            particle.colors = new Color(155,155,0);
            //console.log("I just intersected with" ,intersects[0])

            particle.position.x = intersects[ 0 ].point.x ;
            particle.position.y = intersects[ 0 ].point.y ;
            particle.position.z = intersects[ 0 ].point.z ;
            
            //this.scene.add( particle );
        }
        /*
        // Parse all the faces
        for ( let i in intersects ) {
            intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );
        }
        */
    }


    addModel(model3d, id){
        let green = 0x00ff00
        let red = 0xff0000

        model3d.import.forEach( element => {
            element.name = id + "model3d"

            if ( element.type === "Group" && this.currentlyRendering.length !== 0) {
                
                element.children.forEach(mesh => {              

                    if(mesh.geometry.type !== "BufferGeometry") {
                        mesh.geometry = new BufferGeometry().fromGeometry( mesh.geometry );
                    }

                    //console.log(mesh.name)
                    //console.log(mesh)                    
                    if(mesh.name === "Mesh1_032Group2_032Group1_032Lamborghini_Aventador1_032Model") {
                        mesh.geometry = new BufferGeometry()
                    }
                //TODO: Implement a newer version of the algorithm
                // Convert faces to lines and check if lines intersect with each other, after that
                // cut them out of the rest and create a shape geometry
                // do what you want with that shape geometry

                    if (mesh.geometry !== undefined && mesh.geometry !== null ){
                        //if the version is older
                        mesh.scale.x = mesh.scale.y = mesh.scale.z = parseFloat("0.98"+id, 10)

                        if (id < parseInt(this.currentlyRendering[0].import[0].name[0], 10)) {
                            mesh.material.color = new Color(red)
                        } else {
                            mesh.material.color = new Color(green)
                        }
                    }
                })
            }

            this.scene.add( element );
        })

        this.currentlyRendering.push(model3d)
    }

    removeModel(id){
        //the idea is that I have this.currentlyRendering which represents the currents state and I can address every each one of the 
        //models in there
        let toRemove = []
        id += "model3d"
        let spliced = false

        this.scene.traverse( object => {

            if(!spliced) {
                //Finds the id in this.currentlyRendering corresponding to the model I want to delete
                for (let i = 0; i < this.currentlyRendering.length; i++) {
                    for (let j = 0; j < this.currentlyRendering[i].import.length; j++) {
                        if(object.name === this.currentlyRendering[i].import[j].name && object.name === id ) {
                            this.currentlyRendering.splice(i,1)                       
                            spliced = true;
                            break
                        }
                    }
                }
            }


            if (object.name === id) {
                toRemove.push(object)
            }
            
        })
        
        toRemove.forEach(element => {
            this.scene.remove(element)
        })
    }

    clear() {
        let toRemove = []

        //Not tested
        this.scene.traverse( object => {
            toRemove.push(object)
        })

        toRemove.forEach(element => {
            this.scene.remove(element)
        })
    }

    clearObjects() {
        let toRemove = []
        //Not tested
        this.scene.traverse( object => {
            if (object instanceof Mesh) {
                toRemove.push(object)
            }
        })

        toRemove.forEach(element => {
            this.scene.remove(element)
        })
    }

    render() {

        this.renderer.render( this.scene, this.camera );

    }

    isNormal() {
        return !this.diff || this.diff === undefined
    }

    onResize() {
    
        this.camera.aspect = this.divWrapper.clientWidth / this.divWrapper.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.divWrapper.clientWidth, this.divWrapper.clientHeight);

    }
}