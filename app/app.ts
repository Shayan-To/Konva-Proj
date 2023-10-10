import Konva from "konva"
import { createStage } from './base';
const logwid = 1000;
const loghei = 1000;

type point = readonly[
    x : number,
    y : number
];

const stage = createStage(logwid, loghei);
const layer = new Konva.Layer({});
stage.add(layer);
const back = new Konva.Rect({
    fill: "lightblue",
    width: logwid,
    height: loghei,
});
layer.add(back);
const cellDim = 100;
const gridWid = logwid/ cellDim;
const gridHei = loghei/ cellDim;
const bodyQue : Konva.Rect[] = [];
const bodyRec : point[] = [];
const food : Konva.Rect[] = [];
let done = true, game = true;
let direction : point = [1,0];
let head = negate(direction);
const moveDel = 400; //ms
// let food : Konva.Rect;

(async () => {
    let prize = makePoint();
    for (const _ of new Array(3).fill(0).map((_, i) => i)) {
        moveHead();
        createCell(head);
        bodyRec.push(head);
        await delay(moveDel);
        done = true;
    }
    while(bodyRec.find(i => i === prize)) {
        food[0].remove();
        food.pop();
        makePoint();
    }
    createFood(prize);

    while (game) {
        let q = head;
        q = add(q, direction);
        if(bodyRec.find(i => equ(i, head)) && bodyRec.findIndex(i => equ(i, head)) !== bodyRec.length - 1) {
            game = false;
        }
        if(game === false) {
            const end = new Konva.Rect({
                fill : "dark blue",
                height : loghei,
                width : logwid,
            })
            layer.add(end);
            console.log(`Game over`);
            break;
        }
        moveHead();
        createCell(head);
        bodyRec.push(head);


        if(!equ(prize, head)) {
            bodyQue.splice(0, 1)[0].remove();
            bodyRec.splice(0, 1);
        }
        else {
            food[0].remove();
            food.pop();
            prize = makePoint();
            // while()
            while(bodyRec.find(i => equ(prize, i))) {
                prize = makePoint();
            }
            createFood(prize);
        }
        await delay(moveDel);
        done = true;

    }
})();

document.onkeydown = (e) => {
    let newDirection: point | undefined;
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
                if (newDirection !== undefined && !equ(newDirection, negate(direction)) && done) {
                    direction = newDirection; done = false;
                }
};

function delay(ms: number) {
    return new Promise((resolve) => setInterval(resolve, ms));
}
function add ([x1, y1] : point, [x2, y2] : point) : point{
    return [x1 + x2, y1 + y2];
};
function negate ([x, y] : point) : point{
    return [-x, -y];
}
function mod([x1, y1]  : point , [x2, y2] : point) : point{
    return [((x1 % x2) + x2 )% x2, ((y1 % y2) + y2) % y2] ;
}
/*
function mod([x1, y1]: Point, [x2, y2]: Point): Point {
    return [((x1 % x2) + x2) % x2, ((y1 % y2) + y2) % y2];
}
*/
function equ ([x1, y1] : point, [x2, y2] : point)  : boolean{
    return x1 === x2 && y1 === y2;
}
function moveHead () {
    head = mod(add(head, direction), [gridWid, gridHei]);
}
function makePoint () : point {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
}
function createCell([x, y]: point) {
    const cell = new Konva.Rect({
        fill: `black`, //`hsl(${Math.random() * 360}, 100%, 50%)`,
        width: cellDim,
        height: cellDim,
        x: x * cellDim,
        y: y * cellDim,
    });
    layer.add(cell);
    bodyQue.push(cell);

}
function createFood ([x, y] : point) {
    const cell = new Konva.Rect({
        fill : `purple`,
        width : cellDim,
        height : cellDim,
        x : x * cellDim,
        y : y * cellDim,
    });
    layer.add(cell);
    // food = cell;
    food.push(cell);

}


/*
function createCell([x, y]: point) {
    const cell = new Konva.Rect({
        fill: "black", // `hsl(${Math.random() * 360}, 100%, 50%)`,
        width: cellDim,
        height: cellDim,
        x: x * cellDim,
        y: y * cellDim,
    });
    layer.add(cell);
    bodyQue.push(cell);
}
*/
