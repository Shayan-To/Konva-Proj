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

export function createSvgImage(svgString: string, config: Partial<Konva.ImageConfig>) {
    const domParser = new DOMParser();
    const xmlSerializer = new XMLSerializer();

    var svgDoc = domParser.parseFromString(svgString, "image/svg+xml");
    svgDoc.documentElement.setAttribute("width", "50px");
    svgDoc.documentElement.setAttribute("height", "50px");

    return new Promise<Konva.Image>((resolve, reject) => {
        var img = document.createElement("img");
        img.onload = function () {
            resolve(
                new Konva.Image({
                    ...config,
                    image: img,
                })
            );
        };
        img.onerror = (event, source, lineno, colno, error) =>
            reject({ event, source, lineno, colno, error });
        img.crossOrigin = "Anonymous";
        img.src = URL.createObjectURL(
            new Blob([xmlSerializer.serializeToString(svgDoc)], {
                type: "image/svg+xml",
            })
        );
    });
}
