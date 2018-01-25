//THIS FILE IS ONLY FOR TESTING
//Not final, after everything is working it will be reimplemented.

let camera, controls, scene, renderer;
let gridHelper;
let	loader, geometry, material, mesh, mesh2, cube;
let objectsInScene = [];
let faceNormals, vertexNormals, wireframe;

init();
animate();

//TODO: Implement selection.
//TODO: OOP -> Viewport class, so I can run multiple instances of viewports
function createCube(){
	geometry = new THREE.CubeGeometry( 0.4, 0.4, 0.4 )
	cube = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
	mesh = new Model3D(cube, scene, {active: true, type: "before"})

	geometry = new THREE.CubeGeometry( 0.45, 0.45, 0.45 )
	cube = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
	mesh2 = new Model3D( cube, scene, {active: true, type: "after"} )
	mesh2.moveModel( 1, 0, 0 )

	mesh.toggleDiffMode()
	mesh2.toggleDiffMode()


	//TODO: implement opacity if it's in diff mode
}

function createHelpers(){
	gridHelper = new THREE.GridHelper( 10, 10, 0xffffff, 0x808080 );
	gridHelper.position.x = 0;
	gridHelper.position.y = 0;
	gridHelper.position.z = 0;

	var axes =  new THREE.AxesHelper( 10 )
	scene.add( axes );
	scene.add( new THREE.AmbientLight( 0x222222 ) );

	scene.add( gridHelper );
}

function init() {
	//Initialising camera
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100/*set this to the mesh's size*/ );
	camera.position.x = 0.5;
	camera.position.y = 0.5;
	camera.position.z = 1;

	//Initialising misc.
	controls = new THREE.OrbitControls( camera );
	controls.minDistance = 0; 
	controls.maxDistance = 20; //set this to the mesh's size
	controls.maxPolarAngle = Math.PI;

	scene = new THREE.Scene();
	loader = new THREE.OBJLoader();

	createHelpers()
	//Initialising objects
	createCube()

	//Initialising canvas/renderer
	renderer = new THREE.WebGLRenderer( {antialias: true} );

	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}

function toggleVertexNormals(){
	
	scene.traverse ( function( object )
	{
		if ( object.name == 'vnormals' ){
			object.visible = !object.visible
		}
	});

}

function toggleFaceNormals(){
	scene.traverse (function (object)
	{
		if (object.name == 'fnormals'){
			object.visible = !object.visible
		}
	});
}

function toggleWireframe(){
	scene.traverse (function (object)
	{
		if (object.name == 'wireframe'){
			object.visible = !object.visible
		}
	});	
}

function toggleTextures(){
	//TODO: Implement this
}

function toggleMesh(){
	scene.traverse (function (object)
	{
		if (object.name == 'mesh'){
			object.visible = !object.visible
		}
	});
}