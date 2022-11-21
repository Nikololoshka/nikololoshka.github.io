export const resize = (arr: Array<any>, newSize: number, defaultValue: any): Array<any> => {
    if (newSize < arr.length) {
        return arr.slice(0, newSize)
    }
    return [...arr, ...Array(newSize - arr.length).fill(defaultValue)];
};

export const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

export const hexToRgb = (hex: string): Array<number> | null => {
    const rgb = hex.match(/[0-9A-Fa-f]{2}/g);
    if (rgb == null) return null

    return [
        parseInt(rgb[0], 16),
        parseInt(rgb[1], 16),
        parseInt(rgb[2], 16)
    ];
}