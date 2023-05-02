"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Helper_1 = require("../../common/Helper");
const ReactComponent_1 = require("../../common/ReactComponent");
require("./MonitorView.less");
class MonitorView extends ReactComponent_1.ReactComponent {
    renderApplication(app) {
        return ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsxs)("div", { children: [app.route, " ", (0, jsx_runtime_1.jsxs)("span", Object.assign({ style: { color: 'gray' } }, { children: ["version: ", app.version] }))] }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("div", { children: "pages:" }), (0, jsx_runtime_1.jsx)("ul", { children: app.pages.map((page) => ((0, jsx_runtime_1.jsx)("li", { children: page.name }, page.name))) })] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("div", { children: "clients:" }), (0, jsx_runtime_1.jsx)("ul", { children: app.clients.map((client) => ((0, jsx_runtime_1.jsxs)("li", { children: [client.uuid, "\u00A0", (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { color: 'blue' } }, { children: client.ip })), "\u00A0 v", client.version, "\u00A0", (0, jsx_runtime_1.jsx)("span", Object.assign({ style: {
                                                    color: 'green',
                                                } }, { children: `userId: ${client.userId}` }))] }, client.uuid))) })] })] })] }, app.route));
    }
    render() {
        console.log('MonitorView.render', this.props.data);
        const data = this.props.data;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "MonitorView" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: ["nodeEnv: ", data.nodeEnv] }), (0, jsx_runtime_1.jsxs)("div", { children: ["uptime: ", Helper_1.Helper.formatNumber(data.uptime), " ms"] }), (0, jsx_runtime_1.jsx)("div", { children: "applications:" }), (0, jsx_runtime_1.jsx)("ul", { children: data.applications.map((app) => this.renderApplication(app)) })] })));
    }
}
exports.MonitorView = MonitorView;
