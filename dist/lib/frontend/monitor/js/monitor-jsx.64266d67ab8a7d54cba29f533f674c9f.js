class MonitorView extends ReactComponent {
  renderApplication(app) {
    return /*#__PURE__*/React.createElement("li", {
      key: app.route
    }, /*#__PURE__*/React.createElement("div", null, app.route, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'gray'
      }
    }, "version: ", app.version)), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", null, "pages:"), /*#__PURE__*/React.createElement("ul", null, app.pages.map(page => /*#__PURE__*/React.createElement("li", {
      key: page.name
    }, page.name)))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", null, "clients:"), /*#__PURE__*/React.createElement("ul", null, app.clients.map(client => /*#__PURE__*/React.createElement("li", {
      key: client.uuid
    }, client.uuid, " ", client.userId))))));
  }

  render() {
    console.log('MonitorView.render', this.props.data);
    const data = this.props.data;
    return /*#__PURE__*/React.createElement("div", {
      className: "MonitorView"
    }, /*#__PURE__*/React.createElement("div", null, "nodeEnv: ", data.nodeEnv), /*#__PURE__*/React.createElement("div", null, "uptime: ", Helper.formatNumber(data.uptime), " ms"), /*#__PURE__*/React.createElement("div", null, "applications:"), /*#__PURE__*/React.createElement("ul", null, data.applications.map(app => this.renderApplication(app))));
  }

}