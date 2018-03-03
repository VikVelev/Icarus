import { Scene, Vector2, PerspectiveCamera, GridHelper } from 'three'
import  { WebGLRenderer, PointLight, AmbientLight, Box3 } from 'three'
import OrbitControls from 'three-orbitcontrols'

import dat from 'dat.gui'

import Model3D from './Model3D.js'
import Diff from './Diff.js'

export default class Viewport {
    // ifDiff - diff object --> still not implemented will probably have
    // modelBefore, modelAfter, date, vertices, normals, surface difference
    constructor ( _index, _objectToRender, _objectToAppendTo ) {

        this.objectToRender = _objectToRender;
        this.objectToAppendTo = _objectToAppendTo;
        this.index = _index;

        
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

        } else if ( this.objectToRender instanceof Diff ) {

            this.state = "diff"
        }
        
    }

    init() {
        
        this.scene = new Scene();
        this.mouse = new Vector2();

        this.light = new PointLight( 0xffffff, 1, 1000);
        this.ambient = new AmbientLight( 0xeeeeee, 0.5 );
        
        this.scene.add( this.ambient );
        this.scene.add( this.light );
        
        
        let sizeRef = new Box3().setFromObject( this.objectToRender.model );
        
        //used for a size refference so I can scale up camera as big as the model,
        // but I think it is smarter just to scale the model down :TODO
        this.sizeRef = sizeRef.getSize();
        
        this.camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, this.sizeRef.x*this.sizeRef.z);
        
        this.camera.position.x = -this.sizeRef.y*2;
        this.camera.position.y = this.sizeRef.y;
        this.camera.position.z = this.sizeRef.y*2;
        
        this.light.position.set( 0, this.sizeRef.y*3, 0);
        
        this.gridHelper = new GridHelper( this.sizeRef.x*2, this.sizeRef.z*2, 0xffffff, 0x808080 );
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
        
        this.optionBox = new dat.GUI( { autoplace: false, width: 200, resizable: false } );
        this.optionBox.domElement.id = 'gui' + this.index;
        
        this.divWrapper.appendChild( this.optionBox.domElement );
        this.divWrapper.appendChild( this.renderer.domElement );
        
        this.objectToAppendTo.appendChild( this.divWrapper );
        
        this.controls = new OrbitControls( this.camera, document.getElementById( this.index ) );
        this.controls.enableDamping = true;
        this.controls.minDistance = 0; 
        this.controls.maxDistance = this.sizeRef.y*5; // set this to the mesh's size * 5
        this.controls.maxPolarAngle = Math.PI;

        let params = {

            vNormals: false,
            fNormals: false,
            textures: false,
            mesh: true,
            wireframe: false,
            opacity: 0.7,
        
        };
                        
        this.optionBox.add( params, "vNormals" ).name( "Vertex Normals" ).onFinishChange( (function( value ) {
            
            if ( this.state === "diff" ) {
                
                for ( let i = 0; i < this.objectToRender.objectsToCompare.length; i++ ) {
                    this.objectToRender.objectsToCompare[ i ].toggleVertexNormals()
                }

            } else if ( this.state === "normal" ) {

                this.objectToRender.toggleVertexNormals();
            }
                
        }).bind(this)); 

        this.optionBox.add( params, "fNormals" ).name( "Face Normals" ).onFinishChange( (function( value ) {
            
            if ( this.state === "diff" ) {
                
                for ( let i = 0; i < this.objectToRender.objectsToCompare.length; i++ ) {
                    this.objectToRender.objectsToCompare[ i ].toggleFaceNormals()
                }

            } else if ( this.state === "normal" ) {

                this.objectToRender.toggleFaceNormals();
            }
                
        }).bind(this)); 

        this.optionBox.add( params, "textures" ).name( "Textures" ).onFinishChange( (function( value ) {
            
            if ( this.state === "diff" ) {
                
                for ( let i = 0; i < this.objectToRender.objectsToCompare.length; i++ ) {
                    this.objectToRender.objectsToCompare[ i ].toggleTextures()
                }

            } else if ( this.state === "normal" ) {

                this.objectToRender.toggleTextures();
            }
                
        }).bind(this));
        
        this.optionBox.add( params, "wireframe" ).name( "Wireframe" ).onFinishChange( (function( value ) {
            
            if ( this.state === "diff" ) {
                
                for ( let i = 0; i < this.objectToRender.objectsToCompare.length; i++ ) {
                    this.objectToRender.objectsToCompare[ i ].toggleWireframe()
                }

            } else if ( this.state === "normal" ) {             
                this.objectToRender.toggleWireframe();
            }

        }).bind(this)); 

        this.optionBox.add( params, "mesh" ).name( "Mesh" ).onFinishChange( (function( value ) {

            if ( this.state === "diff" ) {
                
                for ( let i = 0; i < this.objectToRender.objectsToCompare.length; i++ ) {
                    this.objectToRender.objectsToCompare[ i ].toggleMesh()
                }

            } else if ( this.state === "normal" ) {

                this.objectToRender.toggleMesh();
            }

        }).bind(this));

        
        this.scene.add( this.gridHelper );
        
        if ( this.state === "normal" ) {
            
            this.objectToRender.import.forEach(element => {
                this.scene.add( element );
            });
            
        } else if ( this.state === "diff" ) {
            this.optionBox.add(params, 'opacity', 0.00, 1.00).name("Mesh Opacity").onFinishChange( (function( value ) {
                for ( let i = 0; i < this.objectToRender.objectsToCompare.length; i++ ) {
                    this.objectToRender.objectsToCompare[ i ].setOpacity(value);
                }
            }).bind(this));

            this.objectToRender.objectsToCompare.forEach( model => {
                
                model.setOpacity(params.opacity);
                model.import.forEach( element => {

                    this.scene.add( element );

                });
            });
        }
    }

    addModel(model3d){
        model3d.import.forEach( element => {
            this.scene.add( element );
        })
    }

    render() {

        this.renderer.render( this.scene, this.camera );

    }

    onResize() {
    
        this.camera.aspect = this.divWrapper.clientWidth / this.divWrapper.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.divWrapper.clientWidth, this.divWrapper.clientHeight);

    }
}