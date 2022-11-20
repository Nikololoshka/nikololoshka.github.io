import {SchemeColor, SchemeData} from "types/crochet-types";

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

    const beats: Array<number> = data.re.filter((num: number) => (num !== 0) && (num !== fillColor))
    const colors = parseCBBColors(cbb)

    return {
        colors: colors,
        data: beats,
        width: width,
        height: height
    }
}

export const parseJBBColors = (jbb: string): Array<SchemeColor> => {
    const colorRegExp = /rgb\s?([0-9]{1,3})\s?([0-9]{1,3})\s?([0-9]{1,3})/g
    return Array.from(jbb.matchAll(colorRegExp), (colorMatch) => {
        const r = colorMatch[1]
        const g = colorMatch[2]
        const b = colorMatch[3]
        return {color: rgbToHex(Number(r), Number(g), Number(b))}
    })
}

export const parseJBBScheme = (jbb: string, fillColor: number): SchemeData => {
    const colors = parseJBBColors(jbb)

    const rowRegExp = /row\s?(.+)?\)/g
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

const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}