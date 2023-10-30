import Konva from "konva";
import { createStage } from "./base";
import * as piecesSvg__ from "raw-string:../assets/kosal/*.svg";
import { createSvgImage } from "./base";

const piecesSvg: { [key: string]: string } = piecesSvg__ as any;

type PieceType = "P" | "N" | "B" | "R" | "Q" | "K";

const logicalWidth = 800;
const logicalHeight = 800;
const cellDim = logicalHeight / 8;
type Point = readonly [x: number, y: number];
var firstclick : boolean = false; 
var secondclick : boolean = false; 
const stage = createStage(logicalWidth, logicalHeight);
const layer = new Konva.Layer({});
stage.add(layer); 
const Border = new Konva.Rect({
    fill:"Black", 
    width : logicalWidth + 10, 
    height : logicalHeight + 10, 
    x : -5, 
    y : -5, 
})
layer.add(Border); 

async function createPiece(x: number, y: number, b: boolean, p: PieceType) {
    const piece = await createSvgImage(piecesSvg[`${b ? "w" : "b"}${p}`], {
        width: cellDim,
        height: cellDim,
        x: cellDim * (x - 1),
        y: cellDim * (y - 1),
    });
    console.log(typeof(piece)); 
    layer.add(piece);
    piece.on("click", ()=>{
        firstclick = true; 
        // movePiece(piece, cell); 
        piece.remove(); 
    })
}

createPiece(1, 1, true, "B"); 