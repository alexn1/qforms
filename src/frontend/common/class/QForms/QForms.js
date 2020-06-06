'use strict';

class QForms {
    constructor(data) {
        console.log('QForms.constructor'/*, data*/);
        if (data) {
            QForms.env = data.env;
        }
        window.onerror = QForms.errorHandler;
        window.onunhandledrejection = (e) => {
            console.warn('window.onunhandledrejection', e.constructor.name);
            //console.log('typeof e:', typeof e);
            //console.log('e:', e);
            if (e instanceof Error) {
                const err = e;
                console.error(err.message, ', stack:' ,err.stack);
                alert(err.message);
            } else {
                //const promise = e.promise ? e.promise : e.detail.promise;
                const err     = e.reason  ? e.reason  : e.detail.reason;
                err.message = 'unhandledrejection: ' + err.message;
                console.error(err.message, ', stack:' , err.stack);
                // alert(err.message);
            }
        };
        //window.onbeforeunload = QForms.exit;
    }

    static exit(evt) {
        const message = 'After refreshing or closing of page, all opened pages and unsaved data will be lost.';
        if (typeof evt === 'undefined') {
            evt = window.event;
        }
        if (evt) {
            evt.returnValue = message;
        }
        return message;
    }

    static errorHandler(errorMsg) {
        console.error('QForms.errorHandler:', errorMsg);
        let msg;
        if (QForms.env === 'development') {
            msg = 'QForms Error Handler:\n' + errorMsg;
            if (arguments[4] !== undefined && arguments[4].stack !== undefined) {
                const stack = arguments[4].stack;
                msg += '\n\nstack:\n' + stack;
                console.error('stack:', stack);
            }
        } else {
            msg = errorMsg;
        }
        alert(msg);
    }

    static doHttpRequest(data) {
        console.warn('QForms.doHttpRequest', 'POST', window.location.href, data);
        return new Promise((resolve, reject) => {
            const contentType = data instanceof FormData ? false : 'application/json; charset=UTF-8';
            const _data       = data instanceof FormData ? data  : JSON.stringify(data);
            $('html').addClass("wait");
            $.ajax({
                url        : window.location.href,
                type       : 'POST',
                data       : _data,
                contentType: contentType,
                processData: false,
                cache      : false,
                success    : (data, textStatus, jqXHR) => {
                    $('html').removeClass("wait");
                    console.warn('doHttpRequest data:', data);
                    resolve(data);
                },
                error: (jqXHR, statusText, errorThrown) => {
                    //console.log('jqXHR:'      , jqXHR);
                    //console.log('statusText:' , statusText);
                    //console.log('errorThrown:', errorThrown);
                    $('html').removeClass("wait");
                    reject(new Error(jqXHR.statusText + ': ' + jqXHR.responseText));
                }
            });
        });
    }

    static go(url, method, params) {
        let inputs = '';
        for (const name in params) {
            inputs += '<input type="hidden" name="{name}" value="{value}">'
                .replace('{name}',  name)
                .replace('{value}', params[name]);
        }
        const form =  '<form action="{url}" method="{method}" target="_blank">{inputs}</form>'
            .replace('{url}',    url)
            .replace('{method}', method)
            .replace('{inputs}', inputs);
        $(form).appendTo('body').submit().remove();
    }

    static insertNewNodeAt(parent, child, i) {
        if (i < 0 || i > parent.children.length) {
            throw new Error('invalid index i = ' + i + ', length = ' + parent.childNodes.length);
        } else if (i === parent.children.length) {
            parent.appendChild(child);
        } else {
            parent.insertBefore(child, parent.children[i]);
        }
    }

    static elementIndex(el) {
        const children = el.parentNode.childNodes;
        for (let i = 0; i < children.length; i++) if (children[i] === el) return i;
        return -1;
    }

    static moveNode(parent, child, oldIndex, newIndex) {
        if (oldIndex < 0 || oldIndex >= parent.children.length || newIndex < 0 || newIndex >= parent.children.length) {
            throw new Error('invalid index');
        } else {
            if (newIndex < oldIndex) {
                parent.insertBefore(child, parent.children[newIndex]);
            } else {
                parent.insertBefore(child, parent.children[newIndex+1]);
            }
        }
    }

    static moveArrayElement(arr, oldIndex, newIndex) {
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr;
    }

    static merge(o1, o2) {
        const oN = {};
        for (const name in o1) {
            oN[name] = o1[name];
        }
        for (const name in o2) {
            oN[name] = o2[name];
        }
        return oN;
    }

    static keyToParams(key, paramName = 'key') {
        if (typeof key !== 'string') throw new Error('key not string');
        const params = {};
        const arr = JSON.parse(key);
        if (arr.length === 1) {
            params[paramName] = arr[0];
        } else  if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                params[`${paramName}${i + 1}`] = arr[i];
            }
        } else {
            throw new Error(`invalid key: ${key}`);
        }
        return params;
    }

    static now() {
      return new Date();
    }

    static render(view, data) {
        return new EJS({text:view}).render(data);
    }

    static templateValue(value, params) {
        return value.replace(/\{([\w\.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return params[name];
            } else {
                return null;
            }
        });
    }
}
