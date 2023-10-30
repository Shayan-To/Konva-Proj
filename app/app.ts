import Konva from "konva";
import { createStage } from "./base";
import * as piecesSvg__ from "raw-string:../assets/kosal/*.svg";
import { createSvgImage } from "./base";

const piecesSvg: { [key: string]: string } = piecesSvg__ as any;

type PieceType = "P" | "N" | "B" | "R" | "Q" | "K";
/*
P : Pawn, N : Night (knight), B : Bishop, R : Rook, Q : Queen, K : King 
*/
const logicalWidth = 800;
const logicalHeight = 800;
const cellDim = logicalHeight / 8;
type Point = readonly [x: number, y: number];
var firstClick : boolean = false; 
var secondClick : boolean = false; 
const stage = createStage(logicalWidth, logicalHeight);
const layer = new Konva.Layer({});

stage.add(layer); 
const timeCheck = 300; 
const Border = new Konva.Rect({
    fill:"Black", 
    width : logicalWidth + 10, 
    height : logicalHeight + 10, 
    x : -5, 
    y : -5, 
})
layer.add(Border); 

function BlackOrWhite(x: number, y: number): boolean {
    if ((x % 2 === 0 && y % 2 !== 0) || (x % 2 !== 0 && y % 2 == 0)) {
        return false;
    }
    return true;
}


for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
        createCell(i, j, BlackOrWhite(i, j));
        
    }
}

// createPiece(1, 1, false, "B");
// Now we place our pieces ; 
// false -> Black 
// true -> white 




// createPiece(1, 1, "false, "R"); 
var tpe : PieceType; 
var x1 : number, x2 : number, y1 : number, y2 : number; 
var blk : boolean; 
var pce : Konva.Node; 
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
        firstClick = true; 
        x1 = x; 
        y1 = y; 
        tpe = p; 
        blk = b; 
        pce = piece; 
        // movePiece(piece, cell); 
    })
}

// cell.on("click", () => cell.fill("blue"));
// layer.add(cell);
// foodRect = cell;


function piecePlace() : void {
    for (let i = 1; i <= 8; i ++) {
        createPiece(i, 2, false, "P"); 
        createPiece(i, 7, true, "P"); 
    }
    createPiece(1, 1, false, "R");
    createPiece(8, 1, false, "R");  
    createPiece(1, 8, true, "R"); 
    createPiece(8, 8, true, "R"); 
    
    createPiece(2, 1, false, "N"); 
    createPiece(7, 1, false, "N"); 
    createPiece(2, 8, true, "N"); 
    createPiece(7, 8, true, "N"); 
    
    createPiece(3, 1, false, "B"); 
    createPiece(6, 1, false, "B"); 
    createPiece(3, 8, true, "B"); 
    createPiece(6, 8, true, "B"); 
    
    createPiece(4, 1, false, "Q"); 
    createPiece(4, 8, true, "Q"); 
    
    createPiece(5, 1, false, "K"); 
    createPiece(5, 8, true, "K"); 
    
}

piecePlace (); 

function createCell(x: number, y: number, b: boolean): void {
    const cell = new Konva.Rect({
        fill: "Blue",
        width: cellDim ,
        height: cellDim ,
        x: (cellDim ) * (x - 1),
        y: (cellDim ) * (y - 1),
    });
    if (b) {
        cell.fill("white");
    }
    layer.add(cell);
    cell.on("click",()=>{
        if(!firstClick) {
            console.log(`First you must choose a piece to move`); 
        }
        else {
            secondClick = true; 
            x2 = x; 
            y2 = y; 
            
            pieceMove(); 
        }

    } )

}
function pieceMove() : void {
    pce.remove(); 
    createPiece(x2, y2, blk, tpe);
    firstClick = false; 
    secondClick = false;  
}