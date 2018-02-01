class Model3D {
    //model = 3D THREE.js Geometry Object
    //constructor TOTHINK does name matter?
    //Abstract more - remove the scene
    constructor( model ) {

        this.selected = false;
        this.model = model;
        this.vertexNormals  = new THREE.VertexNormalsHelper( this.model, 0.15 );
        this.faceNormals = new THREE.FaceNormalsHelper( this.model, 0.15 );

        this.wireframe = new THREE.LineSegments(
                            new THREE.WireframeGeometry( this.model.geometry ),
                            new THREE.LineBasicMaterial({
                                color: 0xffffff,
                                linewidth: 2
                            }));

        //every model starts at the center, you can move it using the moveModel() method.
        this.model.position.x = 0;
        this.model.position.y = 0;
        this.model.position.z = 0;
    
        //These names are there so I can address all of these objects alter.
        this.model.name = "mesh"
        this.vertexNormals.name = "vnormals"
        this.wireframe.name = "wireframe"
        this.faceNormals.name = "fnormals"

        this.faceNormals.visible = false;
        this.vertexNormals.visible = false;
        this.wireframe.visible = false;

    }

    moveModel( x, y, z ) {

        this.model.position.x = x
        this.vertexNormals.position.x = x
        this.faceNormals.position.x = x
        this.wireframe.position.x = x

        this.model.position.y = y
        this.vertexNormals.position.y = y
        this.faceNormals.position.y = y
        this.wireframe.position.y = y

        this.model.position.z = z
        this.vertexNormals.position.z = z
        this.faceNormals.position.z = z
        this.wireframe.position.z = z

    }
    //there are global toggle methods and local, these are the local ones.
    toggleVertexNormals(){

        this.vertexNormals.visible = !this.vertexNormals.visible

    }

    toggleFaceNormals(){

        this.faceNormals.visible = !this.faceNormals.visible

    }

    toggleWireframe(){

        this.wireframe.visible = !this.wireframe.visible	

    }

    toggleTextures(){

        //TODO: Implement this
        console.log("stub!")

    }

    toggleMesh(){

        this.model.visible = !this.model.visible
        
    }

}