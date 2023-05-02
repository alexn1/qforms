export declare class IndexFrontHostApp {
    data: any;
    view: any;
    currentAppFullName: string;
    currentAppEnv: any;
    modals: any[];
    folderNameTextBox: any;
    folderName: string;
    appName: string;
    constructor(data: any);
    init(): void;
    createView(root: any): void;
    getAppItems(): any;
    getEnvItems(): any;
    getAppInfo(fullName: any): any;
    onAppChange: (fullName: any) => void;
    onEnvChange: (env: any) => void;
    run: (e: any) => void;
    edit: (e: any) => void;
    btnCreate_Click: (e: any) => Promise<void>;
    createApp(folderName: any, appName: any): Promise<void>;
    closeModal: () => void;
    onFolderNameCreate: (textBox: any) => void;
    onFolderNameChange: (folderName: any) => void;
    onAppNameChange: (appName: any) => void;
    onCreateClick: (e: any) => Promise<void>;
}
