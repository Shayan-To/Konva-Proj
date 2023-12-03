// atomic chess -> 
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
var captureOp : boolean; 
stage.add(layer); 
const timeCheck = 300; 
var turn = true; 
var occupied : boolean[][] = []; 
var blackCheck = false; 
var whiteCheck = false; 


occupied[0] = []; 
for (var i = 1; i <= 8; i ++) {
    occupied[i] = []; 
    for (var j = 1; j <= 8; j ++) {
        occupied[i][j] = false; 
    }
}
for (var j = 1; j <= 8; j ++) {
    occupied[j][1] = true; 
    occupied[j][2] = true;
    occupied[j][7] = true; 
    occupied[j][8] = true;  
}

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
var wht : boolean; 
var pce : Konva.Node;
var moh : Konva.Node;  
var redline : Konva.Rect; 

async function createPiece(x: number, y: number, b: boolean, p: PieceType) {
    const piece = await createSvgImage(piecesSvg[`${b ? "w" : "b"}${p}`], {
        width: cellDim - 2,
        height: cellDim,
        x: cellDim * (x - 1),
        y: cellDim * (y - 1),
    });
    // console.log(typeof(piece)); 
    layer.add(piece);
    piece.on("click", ()=>{
        //x1 = x; y1 = y; 
        //if(turn && b){
        var tst = false; 
        // زدن مهره 
        if(firstClick) {
            if(b != wht) {
                x2 = x, y2 = y; 
                if(validMove()){
                    firstClick = false; 
                    piece.remove (); 
                    pieceMove (); 
                    tst = true; 
                }
            }
        }

        // حالتی که قرار نیستش مهره رو بزنیم 
        if(((turn && b) || (!turn && !b))) {

            // عوض کردن مهره‌ای که میخوای باهاش بازی کنی
            if(firstClick) {
                // capturing a piece 
                // console.log(turn , b , wht)
                redline.remove();
                firstClick = false;  
                if(b != wht) {
                    piece.remove (); 
                    x2 = x; y2 = y; 
                    pieceMove(); 
                    tst = true; 
                    // pieceCapture (); 
                    // captureOp = true; 
                }
            }
            if(!tst) {
                x1 = x; 
                y1 = y; 
                tpe = p; 
                wht = b; 
                pce = piece; 
                firstClick = true; 
                const underline = new Konva.Rect({
                    fill : "RED", 
                    x : (x - 1 + 1/20) * cellDim ,
                    y : (y - 1/30) * cellDim,
                    height : -cellDim/20, 
                    width : 9 * cellDim / 10, 
                })
                layer.add(underline); 
                redline = underline; 
            }
            //captureOp = false; 
        }
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
        fill: "#26D701",
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
            x2 = x; 
            y2 = y; 
            if(validMove ()) {
                
                secondClick = true; 
                
                pieceMove(); 
            }
            else {
                console.log("choose another place"); 
            }
        }

    } )

}

// check 
// piece on the way 
// type of piece and move 

//type PieceType = "P" | "N" | "B" | "R" | "Q" | "K";
function validMove () : boolean {

    //  piece type 
    var valid = false; 
    // not done yet. 
    if(tpe === "K") {
        if(abs(x1 - x2) <= 1 && abs(y1 - y2) <= 1) {
            // valid = true;

        }
        else {
            return false; 
        }
    }

    // done 
    else if(tpe === "B") {
        if (abs(x1 - x2) === abs(y1 - y2)) {
            var a = x2 - x1, b = y2 - y1; 
            console.log(`${x1} - ${y1} - ${x2} - ${y2}\n`); 
            for (var i = a/abs(a), j = b/abs(b); abs(i) < abs(a) ; i += (a/abs(a)), j += b/abs(b)) {
                if(occupied[x1 + i][y1 + j]) return false; 

                // j += (b/abs(b)); 
            }          
            // return true; 
        }
        else return false; 
    }

    // not done yet
    else if (tpe === "Q") {
        if((abs(x1 - x2) === abs(y1 - y2)) || (x1 === x2 || y1 === y2)) {
            if ((x1 === x2) || (y1 === y2)) {
                var a = x2 - x1, b = y2 - y1; 
                console.log(`${x1} - ${y1} - ${x2} - ${y2}\n`); 
                
                if (a == 0) {
                    for (var i = b/abs(b); abs(i) < abs(b); i += b/abs(b)) {
                        if (occupied[y1 + i][x1]) return false; 
                    }
                    
                }        
                else {
                    for (var i = a/abs(a); abs(i) < abs(a); i += a/abs(b)) {
                        if(occupied[y1][x1 + i]) return false; 
                    }
                }
                return true; 
            }
            else {
                if (abs(x1 - x2) === abs(y1 - y2)) {
                    var a = x2 - x1, b = y2 - y1; 
                    console.log(`${x1} - ${y1} - ${x2} - ${y2}\n`); 
                    for (var i = a/abs(a), j = b/abs(b); abs(i) < abs(a) ; i += (a/abs(a)), j += b/abs(b)) {
                        if(occupied[x1 + i][y1 + j]) {
                            console.log(`${x1} - ${y1} - ${x2} - ${y2}\n`); 
                            return false; 
                        }
        
                        // j += (b/abs(b)); 
                    }          
                    return true; 
                }
            }
        }
        else {
            return false; 
        }
        return true; 
    }

    // done
    else if (tpe == "N") {
        if ((abs(x1 - x2) === 1 && abs(y1 - y2) === 2) || (abs(x1 - x2) === 2 && abs(y1 - y2) === 1)) {
            valid = true; 
        }
        else return false; 
    }

    // not done yet
    else if (tpe == "P") {
        
        if (wht && y1 === y2 + 1 && (x2 === x1 + 1 || x2 === x1 - 1) || (!wht && y1 === y2 - 1 && (x2 === x1 - 1 || x2 === x1 + 1))) {
            // return true; 
            if (!occupied[x2][y2]) return false; 
        }
        else if((wht && y1 === y2 + 1 && x1 === x2) || (!wht && y1 === y2 - 1 && x1 === x2) || 
        (wht && y1 === 7 && (y1 === y2 + 2 && x1 === x2)) || (!wht && y1 === 2 && (y1 === y2 - 2 && x1 === x2))) {
            if (occupied[x2][y2]) return false; 
            
        }   
        
        else {
            return false; 
        }
        return true; 
    }

    // done 
    else if (tpe == "R") {
        if(x1 === x2 || y1 === y2) {
            // valid = true; 
            var a = x2 - x1, b = y2 - y1; 
            console.log(`${x1} - ${y1} - ${x2} - ${y2}\n`); 
            
            if (a == 0) {
                for (var i = b/abs(b); abs(i) < abs(b); i += b/abs(b)) {
                    if (occupied[y1 + i][x1]) return false; 
                }
                
            }          
            else {
                for (var i = a/abs(a); abs(i) < abs(a); i += a/abs(b)) {
                    if(occupied[y1][x1 + i]) return false; 
                }
            }
            return true; 
        }       
        else {
            return false; 
        }
    }

    return true; 
}

function pieceMove() : void {
    pce.remove(); 
    createPiece(x2, y2, wht, tpe);
    firstClick = false; 
     secondClick = false;  
    redline.remove (); 
    occupied[x1][y1] = false; 
    occupied[x2][y2] = true; 
    turn = !turn; 
}

function abs (num : number) : number {
    if (num > 0) return num; 
    else return -num; 
}
// atomic chess . 