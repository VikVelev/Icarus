import { VertexNormalsHelper, LineSegments, LineBasicMaterial, } from 'three'
import { EdgesGeometry, /*WireframeGeometry*/ }  from 'three'


//import FaceNormalsHelper from 'three'

export default class Model3D {
    // model = 3D THREE.js Geometry Object
    constructor( model ) {

        this.selected = false;
        this.model = model;
        
        if ( this.model.children[0].name === "Plane") {
            this.model.children.splice(0, 1);
        }
        this.extractedGeometry = this.extractGeometry(this.model)

        this.vertexNormals = new VertexNormalsHelper( this.model, 0.15 );

        console.log(this.vertexNormals)
        //Work out the issue with facenormals
        //this.faceNormals = new FaceNormalsHelper( this.model, 0.15 );

        //Work out the issue with vertexnormals

        var mat = new LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
        this.wireframeLines = []
        //Work out the issue with the Wireframe not entirely working.        
        //IMPORTANT NOTE FOR FURTHER DEBUGGING, the Wireframes that are not showing, were showing before as meshes only,
        //before the meshes magic fix by disabling the visibility.
        this.wireframeLines.numOf = 'multiple'  // This is needed for the Viewport class to recognize and add its elements.     

        this.extractedGeometry.forEach(edge => {
            var line = new LineSegments( edge, mat );
            this.wireframeLines.push(line)
        });


        // this is so, when I'm importing them in the scene I don't need to write all this separately.
        this.import = [ this.wireframeLines, this.vertexNormals/*, this.faceNormals,*/, this.model ]

        //every model starts at the center, you can move it using the moveModel() method.
        this.model.position.x = 0;
        this.model.position.y = 0;
        this.model.position.z = 0;

        //this.faceNormals.visible = false;
        this.vertexNormals.visible = false;

        this.wireframeLines.forEach(element => {
            element.visible = false;
        });

    }

    extractGeometry(model){

        let allEdges = []
        model.children.forEach(mesh => {
            var edge = new EdgesGeometry(mesh.geometry, 0xffffff);
            allEdges.push(edge)
        });

        return allEdges
    }
    
    moveModel( x, y, z ) {

        this.model.position.x = x
        this.vertexNormals.position.x = x
        this.faceNormals.position.x = x
        this.wireframeLines.position.x = x

        this.model.position.y = y
        this.vertexNormals.position.y = y
        this.faceNormals.position.y = y
        this.wireframeLines.position.y = y

        this.model.position.z = z
        this.vertexNormals.position.z = z
        this.faceNormals.position.z = z
        this.wireframeLines.position.z = z

    }
    //there are global toggle methods and local, these are the local ones.
    toggleVertexNormals(){

        this.vertexNormals.visible = !this.vertexNormals.visible

    }

    toggleFaceNormals(){
        console.log("stub! fn")
        //this.faceNormals.visible = !this.faceNormals.visible

    }

    toggleWireframe(){
        this.wireframeLines.forEach(line => {
            line.visible = !line.visible
        });

    }

    toggleTextures(){

        //TODO: Implement this
        console.log("stub!")

    }

    toggleMesh(){

        this.model.visible = !this.model.visible

    }

    setOpacity(value){
        this.model.material.opacity = value;
    }
}