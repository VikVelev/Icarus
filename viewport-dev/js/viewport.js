//THIS FILE IS ONLY FOR TESTING
//Not final, after everything is working it will be reimplemented.

//TODO: 
//		UNSURE: Eventually implement selection
//		UNSURE: Implement OBJ Loader (Later 3ds max and others)
//      SURE  : Dynamic rendering optimization
//		SURE  : ISOLATE EACH MODEL, AND ALLOW THE SAME MODEL TO BE IN DIFFERENT VIEWPORTS WITHOUT PROBLEM


//The render loop will be the following:
// For the number of objects I got from the ajax:
// make a model
// insert into viewport
// init viewport
// push viewport into an array of viewports
// later use that array to render multiple at once and other stuff.

var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
var material = new THREE.MeshBasicMaterial( {color: 0xff6600} );
var cube = new THREE.Mesh( geometry, material );

var geometry2 = new THREE.BoxGeometry( 0.6, 0.2, 0.4 );
var material2 = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
var cube2 = new THREE.Mesh( geometry2, material2 );

var geometry3 = new THREE.BoxGeometry( 1.1, 0.44, 1.2 );
var material3 = new THREE.MeshBasicMaterial( {color: 0x0ffff0} );
var cube3 = new THREE.Mesh( geometry3, material3 );

var geometry4 = new THREE.BoxGeometry( 1.5, 0.7, 0.5);
var material4 = new THREE.MeshBasicMaterial( {color: 0x4fff44} );
var cube4 = new THREE.Mesh( geometry4, material4 );

var model = new Model3D( cube );
var model2 = new Model3D( cube2 );
var model3 = new Model3D( cube3 );
var model4 = new Model3D( cube4 );

var modelArr = [ model, model2, model3 ]

var diff = new Diff( modelArr );

var viewport = new Viewport( 1, diff );
viewport.init();

var viewport2 = new Viewport( 2, model4 );
viewport2.init();

window.addEventListener( 'resize', onWindowResize, false );

animate();

function animate(){
	requestAnimationFrame( animate )
	renderCurrentViewport()
}

function onWindowResize() {
	viewport.onResize();
	viewport2.onResize();
}

function renderCurrentViewport() {
	//if clicked on current:
	viewport.render();
	viewport2.render();
	//if clicked on this:	
	
}