"use strict"

////////////////////////////////////////////////////////////////////////////////////////////////////
function QForms() {
    window.onerror = QForms.errorHandler;
    //window.onbeforeunload = QForms.exit;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.exit = function (evt) {
    var message = "После обновления или закрытия страницы, все открытые формы и несохраненные данные будут потеряны.";
    if (typeof evt === "undefined") {
        evt = window.event;
    }
    if (evt) {
        evt.returnValue = message;
    }
    return message;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.errorHandler = function(errorMsg) {
    var msg = "QForms Error Handler:\n" + errorMsg;
    if (arguments[4] !== undefined && arguments[4].stack !== undefined) {
        msg += "\n\nstack:\n" + arguments[4].stack;
    }
    alert(msg);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.doHttpRequest = function(self,params,callback) {
    var request = new XMLHttpRequest();
    request.open("POST", window.location.href);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status !== 200) {
                throw new Error(request.statusText + ", " + request.responseText);
            }
            callback.call(self,JSON.parse(request.responseText));
        }
    };
    request.send(JSON.stringify(params));
}

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.insertNewNodeAt = function(parent,child,i) {
    if (i < 0 || i > parent.children.length) {
        throw new Error("invalid index i = " + i + ", length = " + parent.childNodes.length);
    } else if (i === parent.children.length) {
        parent.appendChild(child);
    } else {
        parent.insertBefore(child,parent.children[i]);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.moveNode = function(parent,child,oldIndex,newIndex) {
    if (oldIndex < 0 || oldIndex >= parent.children.length || newIndex < 0 || newIndex >= parent.children.length) {
        throw new Error("invalid index");
    } else {
        if (newIndex < oldIndex) {
            parent.insertBefore(child,parent.children[newIndex]);
        } else {
            parent.insertBefore(child,parent.children[newIndex+1]);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.inherit = function(className,baseClassName) {
    className.prototype = Object.create(baseClassName.prototype);
    className.prototype.constructor = className;
    className.__base__ = baseClassName.prototype;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.moveArrayElement = function(arr,oldIndex, newIndex) {
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.merge = function(o1,o2) {
    var oN = {};
    for (var name in o1) {
        oN[name] = o1[name];
    }
    for (var name in o2) {
        oN[name] = o2[name];
    }
    return oN;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.keyToParams = function(key,paramName) {
    var paramName = (paramName !== undefined) ? paramName : "key";
    var params = {};
    var arr = JSON.parse(key);
    if (arr.length == 1) {
        params[paramName] = arr[0];
    } else  if (arr.length > 1) {
        for (var i=0;i<arr.length;i++) {
            var n = i + 1;
            params[paramName + n] = arr[i];
        }
    } else {
        throw new Error("невалидный ключ");
    }
    return params;
}


////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.currentTime = function() {
    var now = new Date();
    var hh = now.getHours();if (hh < 10) hh = '0' + hh;
    var mm = now.getMinutes();if (mm < 10) mm = '0' + mm;
    var ss = now.getSeconds();if (ss < 10) ss = '0' + ss;
    return [hh,mm,ss].join(":");
}

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.currentDate = function() {
    var now = new Date();
    var dd = now.getDate();if (dd < 10) dd = '0' + dd;
    var mm = now.getMonth()+1;if (mm < 10) mm = '0' + mm;   /*January is 0!*/
    var yyyy = now.getFullYear();
    return [yyyy,mm,dd].join("-");
}

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.render = function(view,data) {
    return new EJS({text:view}).render(data);
}