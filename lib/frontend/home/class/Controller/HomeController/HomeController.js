'use strict';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function HomeController() {
    var self = this;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
HomeController.prototype.init = function() {
    var self = this;
    $('#btnRun').click(function() {
        self.btnRun_Click();
    });
    $('#lbApp').dblclick(function() {
        self.lbApp_dblclick();
    });
    $('#btnEdit').click(function() {
        self.btnEdit_Click();
    });
    $('#btnCreate').click(function() {
        self.btnCreate_Click();
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
HomeController.prototype.lbApp_dblclick = function() {
    var self = this;
    if ($('#lbApp').val()) {
        window.location.href = "/view/{app}".replace("{app}",$('#lbApp').val());
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
HomeController.prototype.btnRun_Click = function() {
    var self = this;
    if ($('#lbApp').val()) {
        window.location.href = "/view/{app}".replace("{app}",$('#lbApp').val());
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
HomeController.prototype.btnEdit_Click = function() {
    var self = this;
    if ($('#lbApp').val()) {
        window.location.href = "/edit/{app}".replace("{app}",$('#lbApp').val());
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
HomeController.prototype.btnCreate_Click = function() {
    var self = this;
    $.get('home/html/newapp.html', function(html) {
        $(document.body).append(html);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var folderName = $("#myModal input[id='folderName']").val();
            var appName = $("#myModal input[id='appName']").val();
            self.createApp(folderName, appName);
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='folderName']").focus();
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
HomeController.prototype.createApp = function(folderName, appName) {
    var self = this;
    var args = {
        action: 'new',
        folder: folderName,
        name  : appName
    };
    QForms.doHttpRequest(self, args, function(data) {
        if (data.appList) {
            var lbApp = document.getElementById('lbApp');
            lbApp.innerHTML = '';
            data.appList.forEach(function(app) {
                var option = document.createElement('option');
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
    });
};