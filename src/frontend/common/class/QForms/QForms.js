'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function QForms(data) {
    var self = this;
    if (data) {
        QForms.env = data.env;
    }
    window.onerror = QForms.errorHandler;
    window.onunhandledrejection = function (e) {
        //console.log('window.onunhandledrejection', typeof e, e);
        if (e instanceof Error) {
            var err = e;
            console.error(err.message, err.stack);
            alert(err.message);
        } else {
            var promise = e.promise ? e.promise : e.detail.promise;
            var err     = e.reason  ? e.reason  : e.detail.reason;
            err.message = 'unhandled promise error: ' + err.message;
            console.error(err.message, err.stack);
            alert(err.message);
        }
    };
    //window.onbeforeunload = QForms.exit;

}

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.exit = function (evt) {
    var message = 'After refreshing or closing of page, all opened pages and unsaved data will be lost.';
    if (typeof evt === 'undefined') {
        evt = window.event;
    }
    if (evt) {
        evt.returnValue = message;
    }
    return message;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.errorHandler = function(errorMsg) {
    var msg;
    if (QForms.env === 'development') {
        msg = 'QForms Error Handler:\n' + errorMsg;
        if (arguments[4] !== undefined && arguments[4].stack !== undefined) {
            msg += '\n\nstack:\n' + arguments[4].stack;
        }
    } else {
        msg = errorMsg;
    }
    alert(msg);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.doHttpRequest = function(data) {
    console.warn('QForms.doHttpRequest', 'POST', window.location.href, data);
    return new Promise(function (resolve, reject) {
        var contentType = data instanceof FormData ? false : 'application/json; charset=UTF-8';
        var _data       = data instanceof FormData ? data  : JSON.stringify(data);
        $('html').addClass("wait");
        $.ajax({
            url        : window.location.href,
            type       : 'POST',
            data       : _data,
            contentType: contentType,
            processData: false,
            cache      : false,
            success    : function(data, textStatus, jqXHR) {
                $('html').removeClass("wait");
                console.warn('data:', data);
                resolve(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.log('jqXHR:'      , jqXHR);
                //console.log('textStatus:' , textStatus);
                //console.log('errorThrown:', errorThrown);
                $('html').removeClass("wait");
                var err;
                if (QForms.env === 'development') {
                    err = new Error(jqXHR.statusText + ', ' + jqXHR.responseText);
                } else {
                    err = new Error(jqXHR.responseText);
                }
                reject(err);
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.go = function(url, method, params) {
    var inputs = '';
    for (var name in params) {
        inputs += '<input type="hidden" name="{name}" value="{value}">'
            .replace('{name}',  name)
            .replace('{value}', params[name]);
    }
    var form =  '<form action="{url}" method="{method}" target="_blank">{inputs}</form>'
        .replace('{url}',    url)
        .replace('{method}', method)
        .replace('{inputs}', inputs);
    $(form).appendTo('body').submit().remove();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.insertNewNodeAt = function(parent, child, i) {
    if (i < 0 || i > parent.children.length) {
        throw new Error('invalid index i = ' + i + ', length = ' + parent.childNodes.length);
    } else if (i === parent.children.length) {
        parent.appendChild(child);
    } else {
        parent.insertBefore(child, parent.children[i]);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.moveNode = function(parent, child, oldIndex, newIndex) {
    if (oldIndex < 0 || oldIndex >= parent.children.length || newIndex < 0 || newIndex >= parent.children.length) {
        throw new Error('invalid index');
    } else {
        if (newIndex < oldIndex) {
            parent.insertBefore(child, parent.children[newIndex]);
        } else {
            parent.insertBefore(child, parent.children[newIndex+1]);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.inherit = function(className, baseClassName) {
    className.prototype = Object.create(baseClassName.prototype);
    className.prototype.constructor = className;
    className.super_   = baseClassName;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.inherits = function(className, baseClassName) {
    className.prototype = Object.create(baseClassName.prototype);
    className.prototype.constructor = className;
    className.super_   = baseClassName;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.moveArrayElement = function(arr, oldIndex, newIndex) {
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.merge = function(o1, o2) {
    var oN = {};
    for (var name in o1) {
        oN[name] = o1[name];
    }
    for (var name in o2) {
        oN[name] = o2[name];
    }
    return oN;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.keyToParams = function(key, paramName) {
    var paramName = (paramName !== undefined) ? paramName : 'key';
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
        throw new Error('invalid key');
    }
    return params;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.now = function() {
  return new Date();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.currentTime = function() {
    var now = new Date();
    var hh = now.getHours();if (hh < 10) hh = '0' + hh;
    var mm = now.getMinutes();if (mm < 10) mm = '0' + mm;
    var ss = now.getSeconds();if (ss < 10) ss = '0' + ss;
    return [hh, mm, ss].join(':');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.currentDate = function() {
    var now = new Date();
    var dd = now.getDate();if (dd < 10) dd = '0' + dd;
    var mm = now.getMonth()+1;if (mm < 10) mm = '0' + mm;   /*January is 0!*/
    var yyyy = now.getFullYear();
    return [yyyy, mm, dd].join('-');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.currentDateTime = function() {
    return QForms.currentDate() + ' ' + QForms.currentTime();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.render = function(view, data) {
    return new EJS({text:view}).render(data);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
QForms.templateValue = function(value, params) {
    return value.replace(/\{([\w\.@]+)\}/g, function (text, name) {
        if (params.hasOwnProperty(name)) {
            return params[name];
        } else {
            return null;
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
String.prototype.template = function (values) {
    var self = this;
    return self.replace(/\{([\w]+)\}/g, function (text, name) {
        return values.hasOwnProperty(name) ? values[name] : text;
    });
};