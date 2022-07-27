let tilesColour: string = 'forestgreen';
let tileBorderColour: string = 'black';

class Tile {
    x: number;
    y: number;
    dimension: number;
    index: number;
    colour: string;
    borderColour: string;
    highlighted: boolean;

    // These three properties are to be added subsequent to constructor.
    calc: any[];
    neighbours: any[];
    rowIsEvenNum: boolean;

    constructor(x: number, y: number, dimension: number, index: number) {
        this.x = x;
        this.y = y;
        this.dimension = dimension;
        this.index = index;
        this.colour = tilesColour;
        this.borderColour = tileBorderColour;
        this.highlighted = false;
    }
}
