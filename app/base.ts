import Konva from "konva";

export function createStage(logicalWidth: number, logicalHeight: number) {
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
    return stage;
}
/*

*/