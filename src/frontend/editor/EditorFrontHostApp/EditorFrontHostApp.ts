import { FrontHostApp } from '../../common/FrontHostApp';
import { ApplicationEditor } from '../Editor/ApplicationEditor/ApplicationEditor';
import { EdApplicationController } from '../EdModelController/EdDocumentController/EdVisualController/EdApplicationController/EdApplicationController';
import { EditorFrontHostAppView } from './EditorFrontHostAppView';
import { EdPageLinkController } from '../EdModelController/EdPageLinkController/EdPageLinkController';
import { EdModelController } from '../EdModelController/EdModelController';
import { EdDocumentController } from '../EdModelController/EdDocumentController/EdDocumentController';
import { ReactHelper } from '../../common';
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
        console.debug('EditorFrontHostApp.constructor', data);
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
        console.debug('EditorFrontHostApp.run');

        // app
        const app = new ApplicationEditor(this.data.app);
        app.init();
        // console.debug('app:', app);

        // application controller
        const applicationController = new EdApplicationController(app, this);
        applicationController.init();
        this.items = [applicationController];

        // view
        this.view = ReactHelper.createReactComponent(
            document.querySelector('.editor__root')!,
            EditorFrontHostAppView,
            { ctrl: this, key: 'editor' },
        );
    }

    deinit() {}

    onItemOpen2 = async (item) => {
        console.debug('EditorFrontHostApp.onItemOpen2', item.getTitle());
        // console.debug('parent:', item.view.parent);
        if (item instanceof EdPageLinkController && !item.hasPage()) {
            await item.loadPage();
        }
    };

    onItemSelect2 = async (item) => {
        console.debug('EditorFrontHostApp.onItemSelect2', item ? item.getTitle() : null);
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
        console.debug('EditorFrontHostApp.onPropertyGrid2Change', name, value);
        const controller = this.treeWidget2.getSelectedItem();
        // console.debug('controller', controller);
        controller.setProperty(name, value);
    };

    beginEdit(obj, options) {
        console.debug('EditorFrontHostApp.beginEdit', obj, options);
        this.pg.setState({ object: { obj, options } });
    }

    endEdit() {
        console.debug('EditorFrontHostApp.endEdit');
        this.pg.setState({ object: null });
    }

    static async fetchPageData(fileName) {
        console.debug('EditorFrontHostApp.fetchPageData', fileName);
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action: 'get',
            params: { fileName },
        });
    }

    fillActions(item) {
        // console.debug('EditorFrontHostApp.fillActions');
        this.actionList.setState({ item });
    }

    clearActions() {
        // console.debug('EditorFrontHostApp.clearActions');
        this.actionList.setState({ item: null });
    }

    onItemDoubleClick2 = async (item) => {
        console.debug('EditorFrontHostApp.onItemDoubleClick2', item.getTitle());
        const controller = item instanceof EdPageLinkController ? item.pageController : item;
        if (!controller || !(controller instanceof EdDocumentController)) return;
        await this.openDocument(controller);
    };

    async openDocument(controller) {
        console.debug('EditorFrontHostApp.openDocument', controller.getTitle());
        let document = this.findDocument(controller);
        if (!document) {
            document = await controller.createDocument();
            this.documents.push(document);
            // console.debug('document:', document);
        }
        this.tabWidget.state.active = this.documents.indexOf(document);
        await this.view.rerender();
    }

    findDocument(controller) {
        return this.documents.find((document) => document.controller === controller) || null;
    }

    onDocumentClose = (i) => {
        console.debug('EditorFrontHostApp.onDocumentClose', i, this.tabWidget.state.active);
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
        console.debug('EditorFrontHostApp.openModal');
        this.modal = modalController;
        await this.view.rerender();
        /* if (modalController.view.el) {
            console.debug('element', modalController.view.getElement());
            modalController.view.getElement().focus();
        } */
    }

    async onModalClose() {
        console.debug('EditorFrontHostApp.onModalClose');
        this.modal = null;
        await this.view.rerender();
    }

    onActionClick = async (actionName) => {
        console.debug('EditorFrontHostApp.onActionClick', actionName);
        const item = this.treeWidget2.getSelectedItem();
        // console.debug('item', item);
        const controller = item instanceof EdPageLinkController ? item.pageController : item;
        await controller.doAction(actionName);
    };
}
