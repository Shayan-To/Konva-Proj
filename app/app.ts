import Konva from "konva";
import { createStage } from "./base";

const logicalWidth = 1000;
const logicalHeight = 1000;

const stage = createStage(logicalWidth, logicalHeight);
const layer = new Konva.Layer({});
stage.add(layer);

const rect = new Konva.Rect({
    fill: "red",
    width: logicalWidth,
    height: logicalHeight,
});
layer.add(rect);

const rect2 = new Konva.Rect({
    fill: "blue",
    x: 0,
    y: 0,
    width: logicalWidth / 10,
    height: logicalHeight / 10,
});
layer.add(rect2);
