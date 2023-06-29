import { FrontHostApp } from '../../common/FrontHostApp';
import { ApplicationEditor } from '../Editor/ApplicationEditor/ApplicationEditor';
import { EdApplicationController } from '../EdModelController/EdDocumentController/EdVisualController/EdApplicationController/EdApplicationController';
import { EditorFrontHostAppView } from './EditorFrontHostAppView';
import { EdPageLinkController } from '../EdModelController/EdPageLinkController/EdPageLinkController';
import { EdModelController } from '../EdModelController/EdModelController';
import { EdDocumentController } from '../EdModelController/EdDocumentController/EdDocumentController';
import { Helper } from '../../common';
import { EdModalController } from '../EdModalController/EdModalController';

export class EditorFrontHostApp extends FrontHostApp {
    public static editorApp: any;
    data: any;
    runAppLink: string;
    view: any;
    actionList: any;
    treeWidget2: any;
    pg: any;
    items: any;
    tabWidget: any;
    documents: any[];
    modal: EdModalController | null;

    constructor(data, runAppLink: string) {
        super();
        console.log('EditorFrontHostApp.constructor', data);
        if (!data) throw new Error('no data');
        this.data = data;
        // @ts-ignore
        EditorFrontHostApp.editorApp = this;
        this.runAppLink = runAppLink;
        this.view = null;
        this.actionList = null;
        this.treeWidget2 = null;
        this.pg = null; // property grid
        this.items = null; // treeWidget2 items
        this.tabWidget = null;
        this.documents = [];
        this.modal = null;
    }

    async run() {
        console.log('EditorFrontHostApp.run');

        // app
        const app = new ApplicationEditor(this.data.app);
        app.init();
        // console.log('app:', app);

        // application controller
        const applicationController = new EdApplicationController(app, this);
        applicationController.init();
        this.items = [applicationController];

        // view
        this.view = Helper.createReactComponent(
            document.querySelector('.editor__root')!,
            EditorFrontHostAppView,
            { ctrl: this, key: 'editor' },
        );
    }

    deinit() {}

    onItemOpen2 = async (item) => {
        console.log('EditorFrontHostApp.onItemOpen2', item.getTitle());
        // console.log('parent:', item.view.parent);
        if (item instanceof EdPageLinkController && !item.hasPage()) {
            await item.loadPage();
        }
    };

    onItemSelect2 = async (item) => {
        console.log('EditorFrontHostApp.onItemSelect2', item ? item.getTitle() : null);
        if (item instanceof EdModelController) {
            if (item instanceof EdPageLinkController && !item.hasPage()) {
                await item.loadPage();
            }
            this.fillActions(item);
            this.fillPropertyGrid(item);
        } else {
            this.clearActions();
            this.endEdit();
        }
    };

    fillPropertyGrid(ctrl) {
        const propList = ctrl.getPropList();
        this.beginEdit(propList['list'], propList['options']);
    }

    onPropertyGrid2Change = (name, value) => {
        console.log('EditorFrontHostApp.onPropertyGrid2Change', name, value);
        const controller = this.treeWidget2.getSelectedItem();
        // console.log('controller', controller);
        controller.setProperty(name, value);
    };

    beginEdit(obj, options) {
        console.log('EditorFrontHostApp.beginEdit', obj, options);
        this.pg.setState({ object: { obj, options } });
    }

    endEdit() {
        console.log('EditorFrontHostApp.endEdit');
        this.pg.setState({ object: null });
    }

    static async fetchPageData(fileName) {
        console.log('EditorFrontHostApp.fetchPageData', fileName);
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action: 'get',
            params: { fileName },
        });
    }

    fillActions(item) {
        // console.log('EditorFrontHostApp.fillActions');
        this.actionList.setState({ item });
    }

    clearActions() {
        // console.log('EditorFrontHostApp.clearActions');
        this.actionList.setState({ item: null });
    }

    onItemDoubleClick2 = async (item) => {
        console.log('EditorFrontHostApp.onItemDoubleClick2', item.getTitle());
        const controller = item instanceof EdPageLinkController ? item.pageController : item;
        if (!controller || !(controller instanceof EdDocumentController)) return;
        await this.openDocument(controller);
    };

    async openDocument(controller) {
        console.log('EditorFrontHostApp.openDocument', controller.getTitle());
        let document = this.findDocument(controller);
        if (!document) {
            document = await controller.createDocument();
            this.documents.push(document);
            // console.log('document:', document);
        }
        this.tabWidget.state.active = this.documents.indexOf(document);
        await this.view.rerender();
    }

    findDocument(controller) {
        return this.documents.find((document) => document.controller === controller) || null;
    }

    onDocumentClose = (i) => {
        console.log('EditorFrontHostApp.onDocumentClose', i, this.tabWidget.state.active);
        const document = this.documents[i];
        const activeDocument = this.documents[this.tabWidget.state.active];
        this.documents.splice(i, 1);
        document.controller.onDocumentClose();
        if (document === activeDocument) {
            if (this.documents.length) {
                if (this.tabWidget.state.active >= this.documents.length) {
                    this.tabWidget.state.active = this.documents.length - 1;
                }
            } else {
                this.tabWidget.state.active = null;
            }
        } else {
            this.tabWidget.state.active = this.documents.indexOf(activeDocument);
        }
        this.view.rerender();
    };

    async openModal(modalController: EdModalController) {
        console.log('EditorFrontHostApp.openModal');
        this.modal = modalController;
        await this.view.rerender();
        /* if (modalController.view.el) {
            console.log('element', modalController.view.getElement());
            modalController.view.getElement().focus();
        } */
    }

    async onModalClose() {
        console.log('EditorFrontHostApp.onModalClose');
        this.modal = null;
        await this.view.rerender();
    }

    onActionClick = async (actionName) => {
        console.log('EditorFrontHostApp.onActionClick', actionName);
        const item = this.treeWidget2.getSelectedItem();
        // console.log('item', item);
        const controller = item instanceof EdPageLinkController ? item.pageController : item;
        await controller.doAction(actionName);
    };
}
