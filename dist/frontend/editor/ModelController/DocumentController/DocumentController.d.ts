import { ModelController } from '../ModelController';
export declare class DocumentController extends ModelController {
    document: any;
    constructor(model: any, parent: any);
    createDocument(): Promise<any>;
    onDocumentClose(): void;
}
