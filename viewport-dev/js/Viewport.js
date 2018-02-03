class Viewport {
    // ifDiff - diff object --> still not implemented will probably have
    // modelBefore, modelAfter, date, vertices, normals, surface difference
    constructor ( _index, _objectToRender ) {

        this.objectToRender = _objectToRender;
        this.index = _index;
        this.camera;
        this.controls;

        /* this is for adding selections in the future */
        this.INTERSECTED;
        this.mouse;
        this.raycaster;
        /* this is for adding selections in the future */
    
        this.scene;
        this.renderer;
        this.gridHelper;
        this.optionBox;
        this.active = false; // for the future dynamic rendering
        this.state;

        if ( this.objectToRender instanceof Model3D ) {

            this.state = "normal"

        } else if ( this.objectToRender instanceof Diff ) {

            this.state = "diff"
        }

        if ( document.getElementById(this.index) != null ){

            console.log("REPEATING INDICES BECAREFUL!", _index)

        }
    }

    init() {

        this.scene = new THREE.Scene();
        this.mouse = new THREE.Vector2();

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100/*set this to the mesh's size*/ );
        this.camera.position.x = 0.5;
        this.camera.position.y = 0.5;
        this.camera.position.z = 1;

        this.gridHelper = new THREE.GridHelper( 10, 10, 0xffffff, 0x808080 );
        this.gridHelper.position.x = 0;
        this.gridHelper.position.y = 0;
        this.gridHelper.position.z = 0;

        this.renderer = new THREE.WebGLRenderer( { antialiasing: true } );
        this.renderer.setSize( window.innerWidth / 1.6, window.innerHeight / 1.6 );
        
        this.renderer.domElement.id = this.index;

        let divWrapper = document.createElement( "div" )
        
        divWrapper.id = "viewport" + this.index;
        divWrapper.className = "viewport";

        this.optionBox = new dat.GUI( { autoplace: false } );
        this.optionBox.domElement.id = 'gui' + this.index;

        divWrapper.appendChild( this.optionBox.domElement );
        divWrapper.appendChild( this.renderer.domElement );

        document.body.appendChild( divWrapper );

        this.controls = new THREE.OrbitControls( this.camera, document.getElementById( this.index ) );
        this.controls.minDistance = 0; 
        this.controls.maxDistance = 20; // set this to the mesh's size * 5
        this.controls.maxPolarAngle = Math.PI;

        let params = {

            vNormals: false,
            fNormals: false,
            textures: false,
            mesh: true,
            wireframe: false,
            opacity: 0.7,
        
        };

        let ref = this; //reference to the main object

        this.optionBox.add( params, "vNormals" ).name( "Vertex Normals" ).onFinishChange( function( value ) {
            
            if ( ref.state == "diff" ) {
                
                for ( let i = 0; i < ref.objectToRender.objectsToCompare.length; i++ ) {
                    ref.objectToRender.objectsToCompare[ i ].toggleVertexNormals()
                }

            } else if ( ref.state == "normal" ) {

                ref.objectToRender.toggleVertexNormals();
            }
                
        }); 

        this.optionBox.add( params, "fNormals" ).name( "Face Normals" ).onFinishChange( function( value ) {
            
            if ( ref.state == "diff" ) {
                
                for ( let i = 0; i < ref.objectToRender.objectsToCompare.length; i++ ) {
                    ref.objectToRender.objectsToCompare[ i ].toggleFaceNormals()
                }

            } else if ( ref.state == "normal" ) {

                ref.objectToRender.toggleFaceNormals();
            }
                
        }); 

        this.optionBox.add( params, "textures" ).name( "Textures" ).onFinishChange( function( value ) {
            
            if ( ref.state == "diff" ) {
                
                for ( let i = 0; i < ref.objectToRender.objectsToCompare.length; i++ ) {
                    ref.objectToRender.objectsToCompare[ i ].toggleTextures()
                }

            } else if ( ref.state == "normal" ) {

                ref.objectToRender.toggleTextures();
            }
                
        });

        this.optionBox.add( params, "wireframe" ).name( "Wireframe" ).onFinishChange( function( value ) {

            if ( ref.state == "diff" ) {
                
                for ( let i = 0; i < ref.objectToRender.objectsToCompare.length; i++ ) {
                    ref.objectToRender.objectsToCompare[ i ].toggleWireframe()
                }

            } else if ( ref.state == "normal" ) {

                ref.objectToRender.toggleWireframe();
            }

        }); 

        this.optionBox.add( params, "mesh" ).name( "Mesh" ).onFinishChange( function( value ) {

            if ( ref.state == "diff" ) {
                
                for ( let i = 0; i < ref.objectToRender.objectsToCompare.length; i++ ) {
                    ref.objectToRender.objectsToCompare[ i ].toggleMesh()
                }

            } else if ( ref.state == "normal" ) {

                ref.objectToRender.toggleMesh();
            }

        });

        
        this.scene.add( this.gridHelper );
        
        if ( this.state == "normal" ) {
    
            this.objectToRender.import.forEach(element => {
                this.scene.add( element );
            });
            
        } else if ( this.state == "diff" ) {
            this.optionBox.add(params, 'opacity', 0.00, 1.00).name("Mesh Opacity").onFinishChange( function( value ) {
                for ( let i = 0; i < ref.objectToRender.objectsToCompare.length; i++ ) {
                    ref.objectToRender.objectsToCompare[ i ].setOpacity(value);
                }
            });

            this.objectToRender.objectsToCompare.forEach( model => {
                
                model.setOpacity(params.opacity);
                model.import.forEach( element => {
                    this.scene.add( element );
                });
            });
        }
    }

    render() {

        this.renderer.render( this.scene, this.camera );

    }

    onResize() {
    
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth / 2.2, window.innerHeight / 2.2 );

    }
}