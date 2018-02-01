class Viewport {
    // ifDiff - diff object --> still not implemented will probably have
    // modelBefore, modelAfter, date, vertices, normals, surface difference
    constructor ( _index, _objectToRender ) {

        this.objectToRender = _objectToRender;
        this.index = _index;
        this.camera;
        this.controls;
        this.scene;
        this.renderer;
        this.gridHelper;
        this.active = false;
        // implement this
        this.optionBox;

    }

    init() {

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100/*set this to the mesh's size*/ );
        this.camera.position.x = 0.5;
        this.camera.position.y = 0.5;
        this.camera.position.z = 1;

        this.gridHelper = new THREE.GridHelper( 10, 10, 0xffffff, 0x808080 );
        this.gridHelper.position.x = 0;
        this.gridHelper.position.y = 0;
        this.gridHelper.position.z = 0;

        this.renderer = new THREE.WebGLRenderer( { antialiasing: true } );
        this.renderer.setSize( window.innerWidth / 2.2, window.innerHeight / 2.2 );
        
        this.renderer.domElement.id = this.index;

        let divWrapper = document.createElement( "div" )
        
        divWrapper.id = "viewport" + this.index;
        divWrapper.className = "viewport";

        this.optionBox = new dat.GUI( { autoplace: false } );
        this.optionBox.domElement.id = 'gui' + this.index;

        let params = {

            vNormals: false,
            fNormals: false,
            textures: false,
            wireframe: false,
        
        };

        let ref = this;
    
        this.optionBox.add( params, "vNormals" ).name( "Vertex Normals" ).onFinishChange( function( value ) {
            // refresh based on the new value
            ref.objectToRender.toggleVertexNormals();
        });
        this.optionBox.add( params, "fNormals" ).name( "Face Normals" ).onFinishChange( function( value ) {
            // refresh based on the new value
            ref.objectToRender.toggleFaceNormals();          
        });
        this.optionBox.add( params, "textures" ).name( "Textures" ).onFinishChange( function( value ) {
            // refresh based on the new value
            ref.objectToRender.toggleTextures();
        });
        this.optionBox.add( params, "wireframe" ).name( "Wireframe" ).onFinishChange( function( value ) {
            // refresh based on the new value
            ref.objectToRender.toggleWireframe();       
        });

        divWrapper.appendChild( this.optionBox.domElement );
        divWrapper.appendChild( this.renderer.domElement );

        document.body.appendChild( divWrapper );

        this.controls = new THREE.OrbitControls( this.camera, document.getElementById( this.index ) );
        this.controls.minDistance = 0; 
        this.controls.maxDistance = 20; // set this to the mesh's size * 5
        this.controls.maxPolarAngle = Math.PI;

        // check if it's diff object or not and then
        this.scene.add( this.gridHelper );
        this.scene.add( this.objectToRender.model );
        this.scene.add( this.objectToRender.wireframe );
        this.scene.add( this.objectToRender.vertexNormals );
        this.scene.add( this.objectToRender.faceNormals );
        
    }
}