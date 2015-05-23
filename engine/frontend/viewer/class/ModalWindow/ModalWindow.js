"use strict"
/*
////////////////////////////////////////////////////////////////////////////////////////////////////
function ModalWindow(app,pageName,newMode,params) {
    this.app = app;
    this.pageName = pageName;
    this.newMode = newMode;
    this.params = params;
    this.overlay = null;
    this.page = null;
}
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
ModalWindow.prototype.show = function() {
    var args = {
        "action":"modal",
        "page":this.pageName,
        "newMode":this.newMode,
        "params":this.params
    };
    QForms.doHttpRequest(this,args,function(response) {
        var data = response.data;
        var html = response.html;
        var self = this;
        this.overlay = $(html).get(0);
        var content = this.overlay.querySelector("div.overlay > div");
        content.style.width = data.width + "px";
        content.style.height = data.height + "px";
        content.querySelector("button.close").onclick = function() {self.close();}
        document.body.appendChild(this.overlay);
        this.page = new Page(this.app,data,this);
        this.page.init();
        this.page.fill(this.newMode);
    });
}
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
ModalWindow.prototype.close = function() {
    this.page.deinit();
    document.body.removeChild(this.overlay);
}
*/
