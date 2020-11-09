'use strict';

class HomeController {

    constructor(data) {
        console.log('HomeController.constructor', data);
        this.data = data;
    }

    init() {
        $('#btnRun').click(() => {
            this.run();
        });
        $('#lbApp').dblclick(() => {
            this.run();
        });
        $('#lbApp').change(() => {
            this.onChange();
        });
        $('#btnEdit').click(() => {
            this.edit();
        });
        $('#btnCreate').click(() => {
            this.btnCreate_Click();
        });
    }

    getItems() {
        return this.data.appInfos.map(appInfo => {
            return {
                value: appInfo.fullName,
                title: appInfo.fullName
            };
        });
    }

    onChange() {
        const fullName = $('#lbApp').val();

        // console.log('selected', fullName, env);
        const app = this.data.appInfos.find(app => app.fullName === fullName);
        if (!app) throw new Error(`no app ${fullName}`);
        // console.log('app:', app);
        HomeController.fillSelect('ddEnv', app.envs.map(env => ({value: env, innerHTML: env})));
    }

    run() {
        if ($('#lbApp').val()) {
            const appFullName = $('#lbApp').val();
            const env = $('#ddEnv').val();
            const href = `view/${appFullName}/${env}/`;
            console.log('href:', href);
            window.location.href = href;
        }
    }

    edit() {
        if ($('#lbApp').val()) {
            const appFullName = $('#lbApp').val();
            const env = $('#ddEnv').val();
            const href = `edit/${appFullName}/${env}/`;
            console.log('href:', href);
            window.location.href = href;
        }
    }

    btnCreate_Click() {
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
        });
    }

    static fillSelect(id, options) {
        console.log('HomeController.fillSelect', id, options);
        const elSelect = document.getElementById(id);
        elSelect.innerHTML = '';
        options.forEach(option => {
            const elOption = document.createElement('option');
            ({value: elOption.value, innerHTML: elOption.innerHTML} = option);
            elSelect.appendChild(elOption);
        });
    }

    async createApp(folderName, appName) {
        const args = {
            action: 'new',
            folder: folderName,
            name  : appName
        };
        const data = await QForms.doHttpRequest(args);
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
}
