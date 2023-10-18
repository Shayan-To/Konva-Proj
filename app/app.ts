import Konva from "konva";
import { createStage } from "./base";
import { Image } from "konva/lib/shapes/Image"; 

import { Shape } from "konva/lib/Shape";

const logicalWidth = 1000;
const logicalHeight = 1000;
const cellDim = logicalHeight/8; 
type Point = readonly [x: number, y: number];
const XX = 2; 
const stage = createStage(logicalWidth, logicalHeight);
const layer = new Konva.Layer({});
stage.add(layer);
function BlackOrWhite (x: number, y : number) : boolean{
    if((x % 2 === 0 && y % 2 !== 0) || (x % 2 !== 0 && y % 2 == 0)) {
        return false; 
    }
    return true; 
}
for (let i = 1; i <= 8; i ++) {
    for (let j = 1; j <= 8; j ++) {
        createCell(i, j, BlackOrWhite(i, j)); 
    }
}
function createCell (x : number, y : number, b : boolean) : void{
    const cell = new Konva.Rect({
        fill : "Black", 
        width : cellDim , 
        height : cellDim, 
        x : cellDim * (x - 1), 
        y : cellDim * (y - 1), 
    }); 
    if(b) {
        cell.fill("Orange"); 
    }
    layer.add(cell); 
}

