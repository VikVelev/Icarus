var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
	camera.position.z = 1;
	camera.position.y = 0.5;
	camera.position.x = 0.5;
	controls = new THREE.OrbitControls( camera );

	scene = new THREE.Scene();

	var loader = new THREE.OBJLoader();
	
	objectsInScene = []
	
	loader.load(
		'../model.obj',
		function ( object ) {
			object.name = "model"
			object.traverse(function(child){
				if(child instanceof THREE.Mesh){
					child.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
				}
			})

			objectsInScene.push(object)
			scene.add( object );
		},
		// called when loading is in progresses
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		// called when loading has errors
		function (error) {
			console.log('An error happened' + error);
		}
	);

	var gridHelper = new THREE.GridHelper(10, 10, 0x00ff00, 0x808080 );
	gridHelper.position.y = 0;
	gridHelper.position.x = 0;
	scene.add( gridHelper );

	renderer = new THREE.WebGLRenderer( { antialias: true } );

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