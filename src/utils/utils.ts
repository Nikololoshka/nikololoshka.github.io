export const resize = (arr: Array<any>, newSize: number, defaultValue: any): Array<any> => {
    if (newSize < arr.length) {
        return arr.slice(0, newSize)
    }
    return [...arr, ...Array(newSize - arr.length).fill(defaultValue)];
};