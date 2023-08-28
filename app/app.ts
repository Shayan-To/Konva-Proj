import Konva from "konva";

const logicalWidth = 1000;
const logicalHeight = 1000;

const rootDiv = document.getElementById("root")! as HTMLDivElement;

new ResizeObserver(() => {
    const [width, height] = [rootDiv.clientWidth, rootDiv.clientHeight];
    stage.width(width).height(height);
    const scale = Math.min(width / logicalWidth, height / logicalHeight);
    stage.scale({ x: scale, y: scale });
    stage.position({
        x: (width - scale * logicalWidth) / 2,
        y: (height - scale * logicalHeight) / 2,
    });
}).observe(rootDiv);

const stage = new Konva.Stage({
    container: rootDiv,
    width: rootDiv.clientWidth,
    height: rootDiv.clientHeight,
});

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
