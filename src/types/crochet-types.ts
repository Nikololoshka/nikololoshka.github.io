export interface CircleScheme {
    beats: Array<number>;
    settings: SchemeSettings;
}

export interface SchemeSettings {
    parts: number,
    radius: number
}

export interface SchemeColor {
    color: string;
}

export interface SchemeData {
    colors: Array<SchemeColor>;
    data: Array<number>;
    width: number;
    height: number
}