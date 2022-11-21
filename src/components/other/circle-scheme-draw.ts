import {CircleScheme, SchemeColor, SchemeSettings} from "types/crochet-types";


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

    const startParts = parts;
    const startBeatSize = 10
    const angleOffset = -90;

    const beatSize = startBeatSize * scale;
    const beatSpacing = startBeatSize * 1.5 * scale;

    let prevParts = 0
    for (let r = 0; r < radius; r++) {
        const levelParts = startParts * (r + 1);

        // фоновые окружности
        let levelBackgroundRadius = r * beatSpacing + beatSize + beatSize / 2

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
            const angle = ((360 / levelParts) * i + angleOffset) * Math.PI / 180;
            const colorId = scheme.beads.at(i + prevParts) ?? 1;

            canvas.fillStyle = colors[colorId - 1].color

            const x = cw + Math.cos(angle) * beatSpacing * (r + 1) - beatSize / 2;
            const y = ch + Math.sin(angle) * beatSpacing * (r + 1) - beatSize / 2;

            // бисеринка
            canvas.beginPath();
            canvas.ellipse(
                x + beatSize / 2,
                y + beatSize / 2,
                beatSize / 1.5,
                beatSize / 2,
                angle,
                0,
                2 * Math.PI,
                false);
            canvas.fill();
            canvas.stroke();


            if (isDebug) {
                canvas.fillStyle = "#000000"
                canvas.fillText((i + prevParts).toString(), x + beatSize / 3, y + beatSize / 2);
            }
        }

        prevParts += levelParts
    }
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

    console.log(`Size: ${size * scale}; Center: ${center}; Radius: ${r}; XY: ${x} - ${y}`)


    let startBeatSize = 10
    let beatSize = startBeatSize * scale;
    let spacing = startBeatSize * 1.5 * scale;

    console.log(`Scale: ${scale}; Size: ${beatSize}; Spacing: ${spacing}`)

    let level = -1
    let dist = settings.radius * spacing

    for (let i = 0; i < settings.radius; i++) {
        const currentDist = Math.abs((i + 1) * spacing - r)
        if (currentDist < dist && currentDist < beatSize / 1.5) {
            dist = currentDist
            level = i
        }
    }

    if (level === -1) return -1

    let smallBeat = 360 / ((level + 1) * settings.parts)
    console.log(`Level: ${level}; Level angle: ${smallBeat}`)

    /*
    let clins = level * schemeSettings.parts
    for (let i = 0; i < clins; i++) {
        let angle = (360 / clins) * i;
        console.log(angle)
    }
     */

    let angle = Math.atan((y - center) / (x - center)) * 180 / Math.PI + 90
    if (x - center < 0) angle += 180

    let order = Math.round(angle / smallBeat)
    if (order === (level + 1) * settings.parts) {
        order = 0
    }

    let index = (settings.parts + level * settings.parts) / 2 * level + order
    console.log(`Angle: ${angle}; Order: ${order}; Index: ${index}`)

    return index
}
