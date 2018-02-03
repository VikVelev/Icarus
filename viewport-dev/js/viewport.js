//THIS FILE IS ONLY FOR TESTING
//Not final, after everything is working it will be reimplemented.

//TODO: 
//      SURE  : Add optionBoxes to each and every viewport,
//		UNSURE: Eventually implement selection
//      SURE  : Make options working, global(for the whole viewport) and local(for the selected object),
//      SURE  : Implement Diff class
//		UNSURE: Implement OBJ Loader (Later 3ds max and others)
//      SURE  : Dynamic rendering optimization
//		


var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
var material = new THREE.MeshBasicMaterial( {color: 0xff6600} );
var cube = new THREE.Mesh( geometry, material );

var geometry2 = new THREE.BoxGeometry( 0.6, 0.2, 0.4 );
var material2 = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
var cube2 = new THREE.Mesh( geometry2, material2 );

var geometry3 = new THREE.BoxGeometry( 1.1, 0.44, 1.2 );
var material3 = new THREE.MeshBasicMaterial( {color: 0x0ffff0} );
var cube3 = new THREE.Mesh( geometry3, material3 );

var model = new Model3D( cube );
var model2 = new Model3D( cube2 );
var model3 = new Model3D( cube3 );

var modelArr = [ model, model2, model3 ]

var diff = new Diff( modelArr );

var viewport = new Viewport( 1, diff );

viewport.init();

window.addEventListener( 'resize', onWindowResize, false );

animate();

function animate(){
	requestAnimationFrame( animate )
	renderCurrentViewport()
}

function onWindowResize() {
	viewport.onResize();
}

function renderCurrentViewport() {
	//if clicked on current:
	viewport.render();
	//if clicked on this:	
	
}