//gotta work on this, not working as of 30 Jan 18'
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
		if ( object.name == 'fnormals' ){
			object.visible = !object.visible
		}
	});
}

function toggleWireframe(){
	scene.traverse (function (object)
	{
		if ( object.name == 'wireframe' ){
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
		if ( object.name == 'mesh' ){
			object.visible = !object.visible
		}
	});
}