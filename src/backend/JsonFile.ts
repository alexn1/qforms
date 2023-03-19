import { BkHelper } from './BkHelper';
import { BaseModel } from './BaseModel';

export class JsonFile {
    content: string | null = null;

    constructor(public filePath: string, public data: any = null) {}

    async create(): Promise<void> {
        const exists = await BkHelper.exists(this.filePath);
        if (exists) throw new Error(`File ${this.filePath} already exists`);
        if (this.data) {
        } else if (this.content) {
            this.data = JSON.parse(this.content);
        } else {
            this.data = {};
        }
        this.content = JSON.stringify(this.data, null, 4);
        await BkHelper.writeFile2(this.filePath, this.content);
    }

    async read(): Promise<void> {
        const content = await BkHelper.readTextFile(this.filePath);
        this.content = content;
        this.data = JSON.parse(content);
    }

    async save(): Promise<void> {
        console.log('JsonFile.save', this.filePath);
        this.content = JSON.stringify(this.data, null, 4);
        await BkHelper.writeFile2(this.filePath, this.content);
    }

    getAttr(name) {
        const value = BaseModel.getAttr(this.data, name);
        if (value === undefined) throw new Error(`no attribute '${name}'`);
        return value;
    }
}
