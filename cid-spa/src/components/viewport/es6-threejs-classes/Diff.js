import { LineBasicMaterial } from 'three'

export default class Diff {
    // Model3D objects - _before and _after
    // _arrayOfObjects is an array of objects to be compared. They should be indexed in order from older to newer
    // eventually add commit class in the constructor
    constructor( _arrayOfObjects ) {
        this.objectsToCompare = _arrayOfObjects;
        this.colors = this.generateColors();
        //TODO: Implement those
        //this.normalDifference;
        //this.vertexDifference;
        //this.faceSurfaceDifference;
        
    }
    //Since this works with N number of models, we need colors to classify them from oldest to newest
    
    generateColors() {

        let red = 255;
        let green = 0; //blue should be untouched since we need a gradient from red to green
        let steps = 255 / ( this.objectsToCompare.length - 1 );
        let colors = [];

        for ( let i = 0; i < this.objectsToCompare.length; i++ ) {

            let color = "rgb( " + Math.round( red ) + "," + Math.round( green ) + ", 0 )"
            this.objectsToCompare[i].wireframe.material = new LineBasicMaterial( { color: color, linewidth: 4 } );
            colors.push( color );

            red -= steps;
            green += steps;
        }

        return colors;
    }
}