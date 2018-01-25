class Model3D {
    //model = 3D THREE.js Geometry Object
    //constructor TOTHINK does name matter?
    constructor( model, scene, diffmode ){
        //diffmode indicates the following - { active: false, type: "before"}
        this.diffmode = diffmode;
        this.selected = false;
        this.scene = scene;
        this.model = model;
        this.vertexNormals  = new THREE.VertexNormalsHelper( cube, 0.15 );
        this.faceNormals = new THREE.FaceNormalsHelper( cube, 0.15 );

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

        THREE.SceneUtils.detach( this.faceNormals, this.model, this.scene );
        THREE.SceneUtils.attach( this.faceNormals, this.scene, this.model );

        THREE.SceneUtils.detach( this.vertexNormals, this.model, this.scene );
        THREE.SceneUtils.attach( this.vertexNormals, this.scene, this.model );

        this.scene.add(this.model);
        this.scene.add(this.wireframe);
        this.scene.add(this.vertexNormals);
        this.scene.add(this.faceNormals);
    
        //These names are there so I can address all of these objects alter.
        this.model.name = "mesh"
        this.vertexNormals.name = "vnormals"
        this.wireframe.name = "wireframe"
        this.faceNormals.name = "fnormals"

        this.faceNormals.visible = false;
        this.vertexNormals.visible = false;
        this.wireframe.visible = false;
    }

    toggleDiffMode(){
        if ( this.diffmode.active ){
            if( this.diffmode.type == "before" ){

                this.wireframe.material = new THREE.LineBasicMaterial(
                {
                    color: 0xff1212,
                    linewidth: 4.5
                });
                this.wireframe.visible = true;


            } else if ( this.diffmode.type == "after" ){

                this.wireframe.material = new THREE.LineBasicMaterial(
                {
                    color: 0x12ff12,
                    linewidth: 4.5
                });
                this.wireframe.visible = true;
            }
        }
    }

    moveModel( x, y, z ){
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
    }

    toggleMesh(){
        this.model.visible = !this.model.visible
    }

}