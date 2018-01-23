let camera, controls, scene, renderer;
let gridHelper;
let	loader, geometry, material, mesh;
let objectsInScene = [];

init();
animate();

function init() {
	//Initialising camera
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
	camera.position.z = 1;
	camera.position.y = 0.5;
	camera.position.x = 0.5;

	//Initialising misc.
	controls = new THREE.OrbitControls(camera);
	scene = new THREE.Scene();
	loader = new THREE.OBJLoader();
	
	gridHelper = new THREE.GridHelper(10, 10, 0x00ff00, 0x808080);
	gridHelper.position.x = 0;
	gridHelper.position.y = 0;
	gridHelper.position.z = 0;	
	
	scene.add(gridHelper);

	//Initialising objects	
	// loader.load(
	// 	'../model.obj',
	// 	function (object) {
			
	// 		object.name = "model"
	// 		object.traverse(function(child){
	// 			if(child instanceof THREE.Mesh){
	// 				child.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	// 			}
	// 		})
	// 		objectsInScene.push(object)
	// 		scene.add(object);

	// 	},
	// 	function (xhr) {
			
	// 		console.log((xhr.loaded / xhr.total * 100 ) + '% loaded');
		
	// 	},
	// 	function (error) {
		
	// 		console.log('An error happened' + error);
		
	// 	}
	// );
	
	var cube = new THREE.Mesh(new THREE.CubeGeometry(0.5, 0.5, 0.5), new THREE.MeshNormalMaterial());
	cube.position.x = 0;
	cube.position.y = 0;
	cube.position.z = 0;

	scene.add(cube);

	//Initialising canvas/renderer
	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene,camera);

}