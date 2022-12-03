import {CircleScheme, SchemeColor, SchemeSettings} from "types/crochet-types";

export enum DrawMethod {
    Polyhedral= "polyhedral",
    Circle = "circle"
}

export const drawScheme = (
    canvas: CanvasRenderingContext2D,
    size: number,
    scale: number,
    scheme: CircleScheme,
    colors: Array<SchemeColor>,
    isDebug: boolean
) => {
    let w = size * scale;
    let h = size * scale;

    let cw = w / 2;
    let ch = h / 2;

    // Отчистка и стартовая точка
    canvas.clearRect(0, 0, w, h);
    canvas.fillStyle = '#000000';
    canvas.fillRect(cw - 5, ch - 5, 10, 10);


    const {parts, radius} = scheme.settings;

    const beadPaddingCount = 1 // start padding
    const angleOffset = -180;

    const partAngle = (360 / parts)
    const schemaHeight = ch * 0.8
    const schemaLevelHeight = schemaHeight / (radius + beadPaddingCount)

    const beadHeight = schemaLevelHeight
    const beadWidth = beadHeight * 0.8

    const startParts = parts;


    const step = 0.5
    for (let i = 0; i < parts; i++) {
        canvas.beginPath();
        canvas.fillStyle = "#000000"
        canvas.lineWidth = 4

        canvas.moveTo(cw, ch);

        for (let j = 1; j < radius - step; j += step) {
            const radiusPartAngle1 = 360 / (parts * (j + 1.0))
            const angle = (
                angleOffset - radiusPartAngle1 + partAngle * i + swingIn(1 - j / radius) * parts
            ) * Math.PI / 180

            canvas.lineTo(
                cw + Math.cos(angle) * beadHeight * (j + 1.5),
                ch + Math.sin(angle) * beadHeight * (j + 1.5)
            );
        }
        canvas.stroke();
    }
    canvas.lineWidth = 1


    let prevParts = 0
    for (let r = 0; r < radius; r++) {
        const levelParts = startParts * (r + 1);

        // фоновые окружности
        let levelBackgroundRadius = (r + 1) * beadHeight + beadHeight / 2

        canvas.beginPath();
        canvas.fillStyle = "#000000"
        canvas.ellipse(
            cw,
            ch,
            levelBackgroundRadius,
            levelBackgroundRadius,
            0,
            0,
            2 * Math.PI,
            false
        );
        canvas.stroke();

        // бисеринки по кругу
        for (let i = 0; i < levelParts; i++) {
            //  + swingIn(1 - r / radius) * parts
            const angle = ((360 / levelParts) * i + angleOffset + swingIn(1 - r / radius) * parts) * Math.PI / 180;
            const colorId = scheme.beads.at(i + prevParts) ?? 1;

            canvas.fillStyle = colors[colorId - 1].color

            const x = cw + Math.cos(angle) * beadHeight * (r + 1.5);
            const y = ch + Math.sin(angle) * beadHeight * (r + 1.5);

            // бисеринка
            canvas.beginPath();
            canvas.ellipse(
                x,
                y,
                beadHeight * 0.45,
                beadWidth * 0.45,
                angle,
                0,
                2 * Math.PI,
                false);
            canvas.fill();
            canvas.stroke();


            if (isDebug) {
                canvas.fillStyle = "#000000"
                canvas.fillText((i + prevParts).toString(), x - beadWidth * 0.45, y + 2);
            }
        }

        prevParts += levelParts
    }
}

const swingIn = (a: number): number => {
    return Math.pow(2.5 * a + 0.75, 2)
}

export const drawPolyhedralScheme = (
    canvas: CanvasRenderingContext2D,
    size: number,
    scale: number,
    scheme: CircleScheme,
    colors: Array<SchemeColor>,
    isDebug: boolean
) => {
    const w = size * scale;
    const h = size * scale;

    const cw = w / 2;
    const ch = h / 2;

    // Отчистка и стартовая точка
    canvas.clearRect(0, 0, w, h);
    canvas.fillStyle = '#000000';
    canvas.fillRect(cw - 5, ch - 5, 10, 10);


    const {parts, radius} = scheme.settings;

    const beadPaddingCount = 0.75 // -1/4 start padding
    const angleOffset = -90;

    const partAngle = (360 / parts) * Math.PI / 180 // в рад.
    const offsetAngle = -partAngle / 2 + angleOffset * Math.PI / 180 // в рад.

    // равнобедренный треугольник
    const triangleHeight = (ch * 0.8) * Math.cos(partAngle / 2)
    const triangleLevelHeight = triangleHeight / (radius + beadPaddingCount)
    const triangleWidth = triangleHeight * Math.tan(partAngle / 2) * 2
    const triangleLevelWidth = triangleWidth / (radius + beadPaddingCount)

    const beadHeight = triangleLevelHeight
    const beadWidth = triangleLevelWidth

    const polyhedralSize = ch * 0.8
    for (let p = 0; p <= parts; p++) {
        const angle = offsetAngle + partAngle * p

        canvas.beginPath();
        canvas.fillStyle = '#000000';
        canvas.moveTo(cw, ch)
        canvas.lineTo(
            cw + polyhedralSize * Math.cos(angle),
            ch + polyhedralSize * Math.sin(angle)
        );
        canvas.lineTo(
            cw + polyhedralSize * Math.cos(angle + partAngle),
            ch + polyhedralSize * Math.sin(angle + partAngle)
        );
        canvas.stroke();
    }

    let index = 0
    for (let r = 0; r < radius; r++) {
        const levelCount = r + 1

        for (let p = 0; p < parts; p++) {
            const currentAngle = p * partAngle
            const levelWidth = triangleLevelWidth * r

            const dy = -beadHeight / 4 - beadHeight * (r + 1) // added start padding

            for (let b = 0; b < levelCount; b++) {
                const dx = -levelWidth / 2 + b * levelWidth / (levelCount - 1 <= 0 ? 1 : levelCount - 1)

                const x = cw + dx * Math.cos(currentAngle) - dy * Math.sin(currentAngle)
                const y = ch + dx * Math.sin(currentAngle) + dy * Math.cos(currentAngle)

                const colorId = scheme.beads.at(index++) ?? 1;
                if (colors[colorId - 1] === undefined) {
                    debugger
                }
                canvas.fillStyle = colors[colorId - 1].color

                // бисеринка
                canvas.beginPath();
                canvas.ellipse(
                    x,
                    y,
                    beadWidth / 2,
                    beadHeight / 2,
                    currentAngle,
                    0,
                    2 * Math.PI,
                    false);
                canvas.fill();
                canvas.stroke();

                if (isDebug) {
                    canvas.fillStyle = "#000000"
                    canvas.fillText((index - 1).toString(), x - beadWidth / 2, y + 2);
                }
            }
        }
    }
}

export const computePolyhedralSchemeCoords = (
    x: number,
    y: number,
    size: number,
    scale: number,
    settings: SchemeSettings,
): number => {

    const center = (size * scale) / 2;
    // const r = Math.sqrt(Math.pow(x - center, 2) + Math.pow(y - center, 2))
    // console.log(`Size: ${size * scale}; Center: ${center}; Radius: ${r}; XY: ${x} - ${y}`)

    const {parts, radius} = settings;
    const partAngle = (360 / parts)

    let angle = Math.atan((y - center) / (x - center)) * 180 / Math.PI + 90
    if (x - center < 0) angle += 180

    const part = Math.trunc(((angle + partAngle / 2) % 360) / partAngle)
    if (part < 0 || part >= parts) {
        return -1
    }

    const localX = x - center
    const localY = y - center
    const localAngle = (360 - part * partAngle) * Math.PI / 180

    const normalX = localX * Math.cos(localAngle) - localY * Math.sin(localAngle)
    const normalY = localX * Math.sin(localAngle) + localY * Math.cos(localAngle)

    // console.log(p, (360 - p * partAngle), normalX, normalY)

    const beadPaddingCount = 0.75 // -1/4 start padding
    const partAngleRad = partAngle * Math.PI / 180

    const triangleHeight = (center * 0.8) * Math.cos(partAngleRad / 2)
    const triangleLevelHeight = triangleHeight / (radius + beadPaddingCount)
    const triangleWidth = triangleHeight * Math.tan(partAngleRad / 2) * 2
    const triangleLevelWidth = triangleWidth / (radius + beadPaddingCount)

    const level = (Math.abs(normalY) - triangleLevelHeight / 4 + triangleLevelHeight / 2) / triangleLevelHeight - 1
    const levelIndex = Math.trunc(level)
    if (level < 0 || Math.abs(level - levelIndex) > triangleLevelHeight / 2 || levelIndex >= radius) {
        return -1
    }

    const levelWidth = triangleLevelWidth * level
    const order = (normalX + levelWidth / 2 + triangleLevelWidth / 4) / triangleLevelWidth
    const orderIndex = Math.trunc(order)
    if (order < 0 || Math.abs(order - orderIndex) > triangleLevelWidth / 2 || orderIndex > levelIndex) {
        return -1
    }

    return ((parts + parts * levelIndex) / 2 * levelIndex) + part * (levelIndex + 1) + orderIndex
}

export const computeSchemeCoords = (
    x: number,
    y: number,
    size: number,
    scale: number,
    settings: SchemeSettings,
): number => {

    const center = (size * scale) / 2;
    const r = Math.sqrt(Math.pow(x - center, 2) + Math.pow(y - center, 2))

    const {parts, radius} = settings;

    const beadPaddingCount = 1 // start padding
    const angleOffset = -180;

    const partAngle = (360 / parts)
    const schemaHeight = center * 0.8
    const schemaLevelHeight = schemaHeight / (radius + beadPaddingCount)

    const beadHeight = schemaLevelHeight
    const beadWidth = beadHeight * 0.8

    const level = (r - beadHeight) / beadHeight
    if (level < 0 || level >= radius) {
        return -1
    }
    const levelIndex = Math.trunc(level)
    // console.log(`Radius: ${r}; Level: ${levelIndex}`)

    const offset = swingIn(1 - levelIndex / radius) * parts
    let angle = Math.atan((y - center) / (x - center)) * 180 / Math.PI + 90
    if (x - center < 0) angle += 180

    // console.log(offset, beadWidth / 2)
    angle = (angle - offset - angleOffset - 90) % 360

    const levelAngle = 360 / ((levelIndex + 1) * parts)
    const order = angle / levelAngle
    let orderIndex = Math.round(order)
    if (orderIndex === (levelIndex + 1) * parts) {
        orderIndex = 0
    }

    const index = (parts + levelIndex * parts) / 2 * levelIndex + orderIndex

    console.log(`Angle: ${angle}; Order: ${order}; Index: ${index}`, 2 * Math.PI * r)

    /*


    let smallBeat = 360 / ((level + 1) * settings.parts)
    console.log(`Level: ${level}; Level angle: ${smallBeat}`)



    let angle = Math.atan((y - center) / (x - center)) * 180 / Math.PI + 90
    if (x - center < 0) angle += 180

    let order = Math.round(angle / smallBeat)
    if (order === (level + 1) * settings.parts) {
        order = 0
    }

    let index = (settings.parts + level * settings.parts) / 2 * level + order
    console.log(`Angle: ${angle}; Order: ${order}; Index: ${index}`)
    */

    return index
}
