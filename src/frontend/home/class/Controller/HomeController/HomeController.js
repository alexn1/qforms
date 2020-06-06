'use strict';

class HomeController {

    init() {
        $('#btnRun').click(() => {
            this.btnRun_Click();
        });
        $('#lbApp').dblclick(() => {
            this.lbApp_dblclick();
        });
        $('#btnEdit').click(() => {
            this.btnEdit_Click();
        });
        $('#btnCreate').click(() => {
            this.btnCreate_Click();
        });
    }

    lbApp_dblclick() {
        if ($('#lbApp').val()) {
            window.location.href = "view/{app}/".replace("{app}",$('#lbApp').val());
        }
    }

    btnRun_Click() {
        if ($('#lbApp').val()) {
            window.location.href = "view/{app}/".replace("{app}",$('#lbApp').val());
        }
    }

    btnEdit_Click() {
        if ($('#lbApp').val()) {
            window.location.href = "edit/{app}/".replace("{app}",$('#lbApp').val());
        }
    }

    btnCreate_Click() {
        const self = this;
        $.get('home/html/newapp.html', function(html) {
            $(document.body).append(html);
            $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
            $("#myModal button[name='create']").click(function() {
                const folderName = $("#myModal input[id='folderName']").val();
                const appName = $("#myModal input[id='appName']").val();
                self.createApp(folderName, appName);
                $('#myModal').modal('hide');
            });
            $('#myModal').modal('show');
            $("#myModal input[id='folderName']").focus();
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
                if (app.route) {
                    option.innerHTML = option.value = app.route;
                } else {
                    option.innerHTML = option.value = app.folder + '/' + app.file2;
                }
                if (app.name === appName) {
                    option.selected = true;
                }
                lbApp.appendChild(option);
            });
        }
    }

}
