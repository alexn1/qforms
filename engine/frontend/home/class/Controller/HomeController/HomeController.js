'use strict';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function HomeController() {
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
HomeController.prototype.init = function() {

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
HomeController.prototype.btnCreate_Click = function() {
    var self = this;
    $.get('home/html/newapp.html', function(html) {
        $(document.body).append(html);
        $('#myModal').on('hidden.bs.modal',function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var folderName = $("#myModal input[id='folderName']").val();
            var appName = $("#myModal input[id='appName']").val();
            self.createApp(folderName,appName);
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='folderName']").focus();
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
HomeController.prototype.createApp = function(folderName,appName) {
    var args = {
        action:'new',
        folder:folderName,
        name:appName
    };
    QForms.doHttpRequest(this,args,function(data){
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