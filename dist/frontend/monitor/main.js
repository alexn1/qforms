"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MonitorView_1 = require("./MonitorView/MonitorView");
const Helper_1 = require("../common/Helper");
require("./style/monitor.less");
document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
    console.debug('data:', data);
    Helper_1.Helper.createReactComponent(document.querySelector('.monitor__root'), MonitorView_1.MonitorView, { data });
});
