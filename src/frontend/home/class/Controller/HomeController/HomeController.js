class HomeController {

    constructor(data) {
        console.log('HomeController.constructor', data);
        this.data = data;
        this.view = null;
        this.currentAppFullName = undefined;
        this.currentAppEnv      = undefined;
        this.modals = [];
        this.folderNameTextBox = null;
        this.folderName = null;
        this.appName = null;
    }

    init() {
        // console.log('HomeController.init');
        const appInfo = this.data.appInfos[0];
        this.currentAppFullName = appInfo ? appInfo.fullName : undefined;
        this.currentAppEnv = appInfo && appInfo.envs[0] ? appInfo.envs[0] : undefined;
        console.log('this.currentAppEnv:', this.currentAppEnv);
    }

    createView(root) {
        this.view = Helper.createReactComponent(root, AppView, {ctrl: this});
    }

    getAppItems() {
        return this.data.appInfos.map(appInfo => ({
            value: appInfo.fullName,
            title: appInfo.fullName
        }));
    }

    getEnvItems() {
        // console.log('HomeController.getEnvItems', this.currentAppFullName);
        if (this.currentAppFullName) {
            const appInfo = this.getAppInfo(this.currentAppFullName);
            if (appInfo) return appInfo.envs.map(env => ({value: env, title: env}));
        }
    }

    getAppInfo(fullName) {
        // console.log('HomeController.getAppInfo', fullName);
        return this.data.appInfos.find(appInfo => appInfo.fullName === fullName);
    }

    onAppChange = fullName => {
        console.log('HomeController.onAppChange', fullName);
        this.currentAppFullName = fullName;
        const appInfo = this.data.appInfos.find(app => app.fullName === fullName);
        if (!appInfo) throw new Error(`no appInfo ${fullName}`);
        this.currentAppEnv = appInfo.envs[0];
        // console.log('appInfo:', appInfo);
        // HomeController.fillSelect('ddEnv', appInfo.envs.map(env => ({value: env, innerHTML: env})));
        this.view.rerender();
    }

    onEnvChange = env => {
        console.log('HomeController.onEnvChange', env);
        this.currentAppEnv = env;
    }

    run = e => {
        if (this.currentAppFullName) {
            const href = `view/${this.currentAppFullName}/${this.currentAppEnv}/`;
            console.log('href:', href);
            window.location.href = href;
        }
    }

    edit = e => {
        if (this.currentAppFullName) {
            const href = `edit/${this.currentAppFullName}/${this.currentAppEnv}/`;
            console.log('href:', href);
            window.location.href = href;
        }
    }

    btnCreate_Click = async e => {
        this.modals.push({id: 1});
        await this.view.rerender();
        this.folderNameTextBox.getInput().focus();

        /*
        $.get('home/html/newapp.html', (html) => {
            $(document.body).append(html);
            $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
            $("#myModal button[name='create']").click(() => {
                const folderName = $("#myModal input[id='folderName']").val();
                const appName = $("#myModal input[id='appName']").val();
                this.createApp(folderName, appName);
                $('#myModal').modal('hide');
            });
            $('#myModal').modal('show');
            $("#myModal input[id='folderName']").focus();
        });*/
    }

    /*static fillSelect(id, options) {
        console.log('HomeController.fillSelect', id, options);
        const elSelect = document.getElementById(id);
        elSelect.innerHTML = '';
        options.forEach(option => {
            const elOption = document.createElement('option');
            ({value: elOption.value, innerHTML: elOption.innerHTML} = option);
            elSelect.appendChild(elOption);
        });
    }*/

    async createApp(folderName, appName) {

        const data = await QForms.doHttpRequest({
            action: 'new',
            folder: folderName,
            name  : appName
        });
        console.log('data:', data);
        if (data.appList) {
            const lbApp = document.getElementById('lbApp');
            lbApp.innerHTML = '';
            data.appList.forEach(function(app) {
                const option = document.createElement('option');
                if (!app.fullName) throw new Error('no app.fullName');
                option.value = app.fullName
                option.innerHTML = app.fullName;
                option.selected = app.name === appName;
                lbApp.appendChild(option);
            });
        }
    }

    closeModal = () => {
        console.log('HomeController.closeModal');
        this.modals.pop();
        this.view.rerender();
    }
    onFolderNameCreate = textBox => {
        console.log('HomeController.onFolderNameCreate');
        this.folderNameTextBox = textBox;
    }
    onFolderNameChange = folderName => {
        // console.log('HomeController.onFolderNameChange', folderName);
        this.folderName = folderName;
    }
    onAppNameChange = appName => {
        this.appName = appName;
    }
    onCreateClick = async e => {
        console.log('HomeController.onCreateClick');
        console.log(this.folderName, this.appName);
        this.closeModal();
        await this.createApp(this.folderName, this.appName);
    }
}
