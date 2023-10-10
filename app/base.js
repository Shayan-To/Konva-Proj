"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStage = void 0;
var konva_1 = require("konva");
function createStage(logicalWidth, logicalHeight) {
    var rootDiv = document.getElementById("root");
    new ResizeObserver(function () {
        var _a = [rootDiv.clientWidth, rootDiv.clientHeight], width = _a[0], height = _a[1];
        stage.width(width).height(height);
        var scale = Math.min(width / logicalWidth, height / logicalHeight);
        stage.scale({ x: scale, y: scale });
        stage.position({
            x: (width - scale * logicalWidth) / 2,
            y: (height - scale * logicalHeight) / 2,
        });
    }).observe(rootDiv);
    var stage = new konva_1.default.Stage({
        container: rootDiv,
        width: rootDiv.clientWidth,
        height: rootDiv.clientHeight,
    });
    return stage;
}
exports.createStage = createStage;
/*
function createStage (logicalWidth : number, logicalHeight: number) {
    const rootDiv  = document.getElementByID("root")! as HTMLDivElement;
}
*/ 
