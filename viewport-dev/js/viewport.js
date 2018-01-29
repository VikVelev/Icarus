//THIS FILE IS ONLY FOR TESTING
//Not final, after everything is working it will be reimplemented.
var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var cube = new THREE.Mesh( geometry, material );

var geometry2 = new THREE.BoxGeometry( 0.6, 0.2, 0.4 );
var material2 = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
var cube2 = new THREE.Mesh( geometry2, material2 );

var model = new Model3D( cube );
var model2 = new Model3D( cube2 );

var viewport = new Viewport( 1, model );
var viewport2 = new Viewport( 2, model2 );

viewport.init();
viewport2.init();
window.addEventListener( 'resize', onWindowResize, false );

animate();

function animate(){

	requestAnimationFrame( animate );
	//render all viewports here
	viewport.renderer.render( viewport.scene, viewport.camera );
	viewport2.renderer.render( viewport2.scene, viewport2.camera );
}

function onWindowResize() {

	viewport.camera.aspect = window.innerWidth / window.innerHeight;
	viewport.camera.updateProjectionMatrix();
	viewport.renderer.setSize( window.innerWidth, window.innerHeight );

	viewport2.camera.aspect = window.innerWidth / window.innerHeight;
	viewport2.camera.updateProjectionMatrix();
	viewport2.renderer.setSize( window.innerWidth, window.innerHeight );
}