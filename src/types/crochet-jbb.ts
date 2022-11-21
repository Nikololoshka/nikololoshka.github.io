
class JBBElement {
    space(level: number): string {
        return " ".repeat(level * 4)
    }

    build(level: number): string {
        return ""
    }
}

export class JBBMap extends JBBElement {
    name: string;
    flat: boolean;
    array: Array<JBBElement>;

    constructor(name: string) {
        super();

        this.name = name;
        this.flat = false;
        this.array = Array<JBBElement>()
    }

    add(value: JBBElement) {
        this.array.push(value)
    }

    addAll(values: Array<JBBElement>) {
        this.array.push(...values)
    }

    override build(level: number): string {
        let text = this.space(level) + `(${this.name}\n`
        for (let i = 0; i < this.array.length; i++) {
            text += this.array[i].build(level + 1)
            if (i < this.array.length - 1) {
                text += "\n"
            }
        }
        return text + ")"
    }
}

export class JBBEntity extends JBBElement {
    name: string;
    value: any;

    constructor(name: string, value: any) {
        super();
        this.name = name;
        this.value = value;
    }

    override build(level: number): string {
        return this.space(level) + `(${this.name} ${this.value})`
    }
}

export class JBBArray extends JBBElement {
    name: string;
    flat: boolean;
    array: Array<any | JBBArray>;

    constructor(name: string, flat: boolean) {
        super();

        this.name = name;
        this.flat = flat;
        this.array = Array<any | JBBArray>()
    }

    add(value: any | JBBArray) {
        this.array.push(value)
    }

    addAll(values: Array<any | JBBArray>) {
        this.array.push(...values)
    }

    override build(level: number): string {
        let text = this.space(level) + `(${this.name}`;
        if (!this.flat) {
            text += "\n"
        }

        for (let i = 0; i < this.array.length; i++) {
            const element = this.array[i];
            if (element instanceof JBBArray) {
                text += element.build(this.flat ? 0 : (level + 1))
                if (i !== this.array.length - 1) {
                    text += "\n"
                }
            } else {
                text += ` ${element}`
            }
        }

        return text + ")";
    }
}