import { ReactComponent } from '../../common/ReactComponent';
export declare class EdModalController {
    options: any;
    view: ReactComponent;
    constructor(options: any);
    onClose: (e: any) => Promise<void>;
    onCreate: (values: any) => Promise<void>;
    close(): Promise<void>;
    getViewClass(): void;
}
