class Diff {
    // Model3D objects - _before and _after
    // _arrayOfObjects is an array of objects to be compared. They should be indexed in order from older to newer
    constructor( _arrayOfObjects ) {
        this.objectsToCompare = _arrayOfObjects;
        this.colors = this.generateColors();
        //TODO: Implement those
        this.normalDifference;
        this.vertexDifference;
        this.faceSurfaceDifference;
        
    }
    //Since this works with N number of models, we need colors to classify them from oldest to newest
    
    generateColors(object) {
        let red = 255;
        let green = 0; //blue should be untouched since we need a gradient from red to green
        let steps = 255 / (this.objectsToCompare.length - 1);
        let colors = [];

        for ( let i = 0; i < this.objectsToCompare.length; i++ ) {

            colors.push("rgb("+red+","+green+",0)");
            this.objectsToCompare[i].wireframe.material = new THREE.LineBasicMaterial({color: "rgb("+Math.round(red)+","+Math.round(green)+",0)", linewidth: 4});
            red -= steps;
            green += steps;
        }

        return colors;
    }
}