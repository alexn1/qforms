import { BkHelper } from './BkHelper';
import { BaseModel } from './BaseModel';
import { debug } from '../console';
import { Nullable } from '../types';
import { exists2, readTextFile, writeFile2 } from './file-helper';

export class JsonFile {
    content: Nullable<string> = null;

    constructor(public filePath: string, public data: any = null) {}

    async create(): Promise<void> {
        const exists = await exists2(this.filePath);
        if (exists) throw new Error(`File ${this.filePath} already exists`);
        if (this.data) {
        } else if (this.content) {
            this.data = JSON.parse(this.content);
        } else {
            this.data = {};
        }
        this.content = JSON.stringify(this.data, null, 4);
        await writeFile2(this.filePath, this.content);
    }

    async read(): Promise<void> {
        const content = await readTextFile(this.filePath);
        this.content = content;
        this.data = JSON.parse(content);
    }

    async save(): Promise<void> {
        debug('JsonFile.save', this.filePath);
        this.content = JSON.stringify(this.data, null, 4);
        await writeFile2(this.filePath, this.content);
    }

    getAttr(name: string): string {
        const value = BaseModel.getAttr(this.data, name);
        if (value === undefined) throw new Error(`no attribute '${name}'`);
        return value;
    }
}
