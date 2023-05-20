import { EdModelController } from '../EdModelController';
export declare class EdPageLinkController extends EdModelController {
    node: boolean;
    pageController: any;
    items: any;
    constructor(model: any, parent: any);
    getTitle(): any;
    getStyle(): {
        color: string;
    };
    hasPage(): boolean;
    loadPage(): Promise<void>;
    getActions(): any;
    getPropList(): any;
    setProperty(name: any, value: any): Promise<void>;
    setPageController(pageController: any): void;
    remove(): void;
}
