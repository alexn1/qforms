export declare class ModalController {
    options: any;
    constructor(options: any);
    onClose: (e: any) => Promise<void>;
    onCreate: (values: any) => Promise<void>;
    close(): Promise<void>;
    getViewClass(): void;
}
