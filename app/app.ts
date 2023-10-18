import Konva from "konva";
import { createStage } from "./base";

const cellDim = 100;
const gridWidth = 15;
const gridHeight = 10;
const logicalWidth = gridWidth * cellDim;
const logicalHeight = gridHeight * cellDim;

type Point = readonly [x: number, y: number];

const stage = createStage(logicalWidth, logicalHeight);
const layer = new Konva.Layer({});
stage.add(layer);
const back = new Konva.Rect({
    fill: "lightblue",
    width: logicalWidth,
    height: logicalHeight,
});
layer.add(back);

const bodyRects: Konva.Rect[] = [];
const bodyQueue: Point[] = [];
let foodRect: Konva.Rect | null = null;

let directionQueue: Point[] = [[1, 0]];
let head = negate(directionQueue[0]);
let food = makePoint();

const minMoveDelay = 100; //ms
const maxMoveDelay = 400; //ms
let moveDelay = maxMoveDelay;

let version = 0;

async function main() {
    version += 1;
    const currentVersion = version;

    back.fill("lightblue");
    bodyRects.splice(0).forEach((r) => r.remove());
    bodyQueue.splice(0);
    foodRect?.remove();
    directionQueue = [[1, 0]];
    head = negate(directionQueue[0]);
    moveDelay = maxMoveDelay;

    for (const _ of new Array(3).fill(0).map((_, i) => i)) {
        moveHead();
        createCell(head);
        bodyQueue.push(head);
        await delay(moveDelay);
    }

    createFood();

    while (version === currentVersion) {
        moveHead();
        bodyQueue.push(head);
        createCell(head);

        if (!equals(food, head)) {
            bodyRects.splice(0, 1)[0].remove();
            bodyQueue.splice(0, 1);
        } else {
            createFood();
            moveDelay -= (moveDelay * 7) / 100;
            moveDelay = Math.max(minMoveDelay, moveDelay);
        }

        if (
            bodyQueue.find(
                (p, i) => i !== bodyQueue.length - 1 && equals(p, head)
            )
        ) {
            back.fill("red");
            console.log(`Game over`);
            break;
        }

        await delay(moveDelay);
    }
}

main();

document.onkeydown = (e) => {
    let newDirection: Point | undefined;
    console.log(e.key);
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
        case "r":
        case "R":
            main();
            break;
    }
    if (newDirection === undefined) {
        return;
    }
    while (directionQueue.length > 2) {
        directionQueue.pop();
    }
    if (
        !equals(newDirection, negate(directionQueue[directionQueue.length - 1]))
    ) {
        directionQueue.push(newDirection);
    }
};

function delay(ms: number) {
    return new Promise((resolve) => setInterval(resolve, ms));
}

function add([x1, y1]: Point, [x2, y2]: Point): Point {
    return [x1 + x2, y1 + y2];
}

function negate([x, y]: Point): Point {
    return [-x, -y];
}

function mod([x1, y1]: Point, [x2, y2]: Point): Point {
    return [((x1 % x2) + x2) % x2, ((y1 % y2) + y2) % y2];
}

function equals([x1, y1]: Point, [x2, y2]: Point): boolean {
    return x1 === x2 && y1 === y2;
}

function moveHead() {
    if (directionQueue.length > 1) {
        directionQueue.splice(0, 1);
    }
    head = mod(add(head, directionQueue[0]), [gridWidth, gridHeight]);
}

function makePoint(): Point {
    const x = Math.floor(Math.random() * gridWidth);
    const y = Math.floor(Math.random() * gridHeight);
    return [x, y];
}

function createCell(p: Point) {
    const cell = createRect(p, "black");
    layer.add(cell);
    bodyRects.push(cell);
}

function createFood() {
    foodRect?.remove();
    foodRect = null;
    while (true) {
        food = makePoint();
        if (!bodyQueue.find((p) => equals(food, p))) {
            break;
        }
    }

    const cell = createRect(food, "purple");
    cell.on("click", () => cell.fill("blue"));
    layer.add(cell);
    foodRect = cell;
}

function createRect([x, y]: Point, color: string) {
    return new Konva.Rect({
        fill: color, //`hsl(${Math.random() * 360}, 100%, 50%)`,
        width: cellDim,
        height: cellDim,
        x: x * cellDim,
        y: y * cellDim,
    });
}
