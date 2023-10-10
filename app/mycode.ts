import Konva from "konva";
import { createStage } from "./base";

const logicalWidth = 1000;
const logicalHeight = 1000;

const stage = createStage(logicalWidth, logicalHeight);

const layer = new Konva.Layer({});
stage.add(layer);
const back = new Konva.Rect({
    fill: "lightblue",
    width: logicalWidth,
    height: logicalHeight,
});
layer.add(back);

const cellDim = 100;
const gridWidth = logicalWidth / cellDim;
const gridHeight = logicalHeight / cellDim;
const bodyQueue: Konva.Rect[] = [];
let direction: Point = [1, 0];
let head = negate(direction);
let moveDelay = 500;
// arrow function === lambda

(async () => {
    for (const _ of new Array(4).fill(0).map((_, i) => i)) {
        moveHead();
        createCell(head);
        await delay(moveDelay);
    }
    
    while (true) {
        moveHead();
        createCell(head);
        bodyQueue.splice(0, 1)[0].remove();
        await delay(moveDelay);
    }
})();

function delay(ms: number) {
    return new Promise((resolve) => setInterval(resolve, ms));
}
document.onkeydown = (e) => {
    let newDirection: Point | undefined;
    switch (e.key) {
        case "ArrowLeft":
            newDirection = [-1, 0];
            break;
        case "ArrowRight":
            newDirection = [1, 0];
            break;
            case "ArrowUp":
                newDirection = [0, -1];
                break;
                case "ArrowDown":
                    newDirection = [0, 1];
                    break;
                }
                if (newDirection !== undefined && !eq(newDirection, negate(direction)) && done) {
                    direction = newDirection; 
                }
};
            
function mod([x1, y1]: Point, [x2, y2]: Point): Point {
    return [((x1 % x2) + x2) % x2, ((y1 % y2) + y2) % y2];
}
function add([x1, y1]: Point, [x2, y2]: Point): Point {
    return [x1 + x2, y1 + y2];
}
function moveHead() {
    head = mod(add(head, direction), [gridWidth, gridHeight]);
}


function negate([x, y]: Point): Point {
    return [-x, -y];
}


function eq([x1, y1]: Point, [x2, y2]: Point) {
    return x1 === x2 && y1 === y2;
}

function createCell([x, y]: Point) {
    const cell = new Konva.Rect({
        fill: "black", // `hsl(${Math.random() * 360}, 100%, 50%)`,
        width: cellDim,
        height: cellDim,
        x: x * cellDim,
        y: y * cellDim,
    });
    layer.add(cell);
    bodyQueue.push(cell);
}

type Point = readonly [x: number, y: number];
