export declare class EventEmitter {
    list: any;
    constructor();
    on(name: any, cb: any): void;
    off(name: any, cb: any): void;
    emit(name: any, e: any): Promise<void>;
}
