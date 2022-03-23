declare class Helper {
    static getRandomString(length: any): string;
    static getFilePathsSync(publicDirPath: any, subDirPath: any, ext: any): any;
    static _glob(path: any): Promise<any[]>;
    static getFilePaths(dirPath: any, ext: any): Promise<string[]>;
    static currentTime(): string;
    static templateToJsString(value: any, params: any): any;
    static readTextFile(path: any): Promise<string>;
    static getFileContent(filePath: any): Promise<string>;
    static getFileContentSync(filePath: any): any;
    static readBinaryFile(filePath: any): Promise<unknown>;
    static createPath(arr: any): any;
    static getDirPath(filePath: any): any;
    static createDirIfNotExists2(originalDirPath: any): Promise<void>;
    static createDirIfNotExists(dirPath: any): Promise<void>;
    static createDirIfNotExistsSync(dirPath: any): void;
    static moveArrItem(arr: any, item: any, offset: any): void;
    static copyFile3(source: any, target: any): Promise<void>;
    static exists(path: any): Promise<unknown>;
    static writeFile(filePath: any, content: any): Promise<void>;
    static writeFileSync(filePath: any, content: any): any;
    static writeFile2(filePath: any, content: any): Promise<void>;
    static mapObject(object: any, cb: any): {};
    static fsUnlink(filePath: any): Promise<void>;
    static today(timeOffset: any): Date;
    static dateTimeReviver(key: any, value: any): any;
    static decodeValue(rawValue: any): any;
    static encodeValue(value: any): string;
    static decodeObject(obj: any): {};
    static SECOND(): number;
    static MINUTE(): number;
    static HOUR(): number;
    static DAY(): number;
    static Session_save(session: any): Promise<void>;
    static addMinutes(date: any, minutes: any): void;
    static fillArray(n: number): number[];
    static formatDate(date: any, format: any): any;
    static getFirstField(object: any): any;
    static getCommandLineParams(): {};
    static getWebSocketIP(webSocket: any): any;
    static getWebSocketPort(webSocket: any): any;
    static templateArray(arr: any): any;
}
export = Helper;
