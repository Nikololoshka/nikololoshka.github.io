import {CircleScheme, SchemeColor, SchemeData} from "types/crochet-types";
import {hexToRgb, rgbToHex} from "utils/utils";
import {JBBArray, JBBEntity, JBBMap} from "../../types/crochet-jbb";

const parseCBBData = (cbb: string) => {
    const data = atob(cbb.slice(7))
    const cbbScheme = JSON.parse(data)
    const cbbData = JSON.parse(cbbScheme.data)
    return JSON.parse(cbbData.data)
}

export const parseCBBColors = (cbb: string): Array<SchemeColor> => {
    const data = parseCBBData(cbb)
    return data.col.map((hex: string) => ({color: hex}))
}

export const parseCBBScheme = (cbb: string, fillColor: number): SchemeData => {
    const data = parseCBBData(cbb)

    const width = data.rw
    const height = data.re.length / width

    const colors = parseCBBColors(cbb)
    const beats: Array<number> = data.re.filter((num: number) => (num !== 0) && (num !== fillColor))

    return {
        colors: colors,
        data: beats,
        width: width,
        height: height
    }
}

export const parseJBBColors = (jbb: string): Array<SchemeColor> => {
    const colorRegExp = /rgb\s?([0-9]{1,3})\s?([0-9]{1,3})\s?([0-9]{1,3})/g
    const colors = Array.from(jbb.matchAll(colorRegExp), (colorMatch) => {
        const r = colorMatch[1]
        const g = colorMatch[2]
        const b = colorMatch[3]
        return {color: rgbToHex(Number(r), Number(g), Number(b))}
    })

    // доп. белый цвет вначале
    if (colors[0].color.toLowerCase() === "#ffffff") {
        return colors.slice(1)
    }
    return colors
}

export const parseJBBScheme = (jbb: string, fillColor: number): SchemeData => {
    const colors = parseJBBColors(jbb)

    const rowRegExp = /row\s?(.+?)?\)/g
    const rawData = Array.from(jbb.matchAll(rowRegExp), (rowMatch) =>
        rowMatch[1].trim().split(" ").map((ch: string) => Number(ch))
    )
    const data = rawData.flatMap(row => row).filter((num: number) => num !== 0 && num !== fillColor)

    const height = rawData.length
    const width = data.length / height

    return {
        colors: colors,
        data: data,
        width: width,
        height: height,
    }
}

export const createJBBScheme = (
    name: string,
    scheme: CircleScheme,
    colors: Array<SchemeColor>,
    startSpacing: number,
    fillColor: number
): string => {

    const root = new JBBMap("jbb");
    root.addAll([
        new JBBEntity("version", 1),
        new JBBEntity("author", "\"Anonymous\""),
        new JBBEntity("organization", "\"\""),
        new JBBEntity("notes", "\"\""),
    ])

    const jbbColors = new JBBArray("colors", false)

    // доп. белый цвет вначале
    //if (colors[0].color.toLowerCase() !== "#ffffff") {
        const jbbColor = new JBBArray("rgb", true)
        jbbColor.addAll([255, 255, 255])
        jbbColors.add(jbbColor)
    //}

    for (const color of colors) {
        const rgb = hexToRgb(color.color)
        if (rgb != null) {
            const [r, g, b] = rgb
            const jbbColor = new JBBArray("rgb", true)
            jbbColor.addAll([r, g, b])
            jbbColors.add(jbbColor)
        }
    }

    root.add(jbbColors)

    const jbbView = new JBBMap("view")
    jbbView.addAll([
        new JBBEntity("draft-visible", "true"),
        new JBBEntity("corrected-visible", "true"),
        new JBBEntity("simulation-visible", "true"),
        new JBBEntity("report-visible", "true"),
        new JBBEntity("selected-tool", "\"pencil\""),
        new JBBEntity("selected-color", 2),
        new JBBEntity("zoom", 2),
        new JBBEntity("scroll", 0),
        new JBBEntity("shift", 0),
        new JBBEntity("draw-colors", "true"),
        new JBBEntity("draw-symbols", "false"),
        new JBBEntity("symbols", "\"·abcdefghijklmnopqrstuvwxyz+-/\\*\""),
    ])

    root.add(jbbView)

    const jbbModel = new JBBArray("model", false)

    const {parts, radius} = scheme.settings

    let index = 0
    for (let i = 0; i < radius; i++) {
        const spacing = startSpacing + radius - i
        const count = (i + 1) * parts

        const jbbRow = new JBBArray("row", true);
        jbbRow.addAll(Array(radius).fill(fillColor))

        for (let j = 0; j < count; j++) {
            const bead = scheme.beads[index + j]
            jbbRow.add(bead)

            if ((j + 1) % (i + 1) === 0) {
                jbbRow.addAll(Array(spacing).fill(fillColor))
            }
        }

        index += count
        jbbModel.add(jbbRow)
    }

    root.add(jbbModel)

    return root.build(0)
}