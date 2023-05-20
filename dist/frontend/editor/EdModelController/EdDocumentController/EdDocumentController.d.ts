import { EdModelController } from '../EdModelController';
export declare class EdDocumentController extends EdModelController {
    document: any;
    constructor(model: any, parent: any);
    createDocument(): Promise<any>;
    onDocumentClose(): void;
}
