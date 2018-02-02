//THIS FILE IS ONLY FOR TESTING
//Not final, after everything is working it will be reimplemented.

//TODO: Add optionBoxes to each and every viewport,
//		Eventually implement selection
//      Make options working, global(for the whole viewport) and local(for the selected object),
//      Implement Diff class
//		Implement OBJ Loader (Later 3ds max and others)
//      Dynamic rendering optimization
// 		To make Diff functionality for N number of versions
//		


var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
var material = new THREE.MeshBasicMaterial( {color: 0xff6600} );
var cube = new THREE.Mesh( geometry, material );

var geometry2 = new THREE.BoxGeometry( 0.6, 0.2, 0.4 );
var material2 = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
var cube2 = new THREE.Mesh( geometry2, material2 );

var model = new Model3D( cube );
var model2 = new Model3D( cube2 );

var diff = new Diff( model, model2 );

var viewport = new Viewport( 1, diff );

viewport.init();


window.addEventListener( 'resize', onWindowResize, false );

animate();

function animate(){

	requestAnimationFrame( animate )
	renderCurrentViewport()

}

function onWindowResize() {

	viewport.camera.aspect = window.innerWidth / window.innerHeight;
	viewport.camera.updateProjectionMatrix();
	viewport.renderer.setSize( window.innerWidth / 2.2, window.innerHeight / 2.2 );
}

function renderCurrentViewport() {
	//if clicked on current:
	viewport.renderer.render( viewport.scene, viewport.camera );
	//if clicked on this:	
	
}