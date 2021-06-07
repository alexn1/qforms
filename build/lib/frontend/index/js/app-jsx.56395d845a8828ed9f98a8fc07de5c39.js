class IndexView extends ReactComponent {
  renderModals() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", null, ctrl.modals.map(modal => /*#__PURE__*/React.createElement(Modal, {
      key: modal.id.toString()
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-dialog modal-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement(Button, {
      classList: ['close'],
      onClick: ctrl.closeModal
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "New Application")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "folderName"
    }, "Folder Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: "folderName",
      classList: ['form-control'],
      onCreate: ctrl.onFolderNameCreate,
      onChange: ctrl.onFolderNameChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "appName"
    }, "Application Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: "appName",
      classList: ['form-control'],
      onChange: ctrl.onAppNameChange
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement(Button, {
      name: "create",
      classList: ['btn', 'btn-primary'],
      onClick: ctrl.onCreateClick
    }, "Create"), /*#__PURE__*/React.createElement(Button, {
      classList: ['btn', 'btn-default'],
      onClick: ctrl.closeModal
    }, "Close")))))));
  }

  render() {
    console.log('IndexView.render');
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "IndexView"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container",
      style: {
        backgroundColor: '#eee'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "row",
      style: {
        margin: '50px 0'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ComboBox, {
      value: ctrl.currentAppFullName,
      items: ctrl.getAppItems(),
      size: 15,
      style: {
        width: '100%'
      },
      onDoubleClick: ctrl.run,
      onChange: ctrl.onAppChange
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement(ComboBox, {
      value: ctrl.currentAppEnv,
      classList: ['form-control'],
      items: ctrl.getEnvItems(),
      onChange: ctrl.onEnvChange
    })), /*#__PURE__*/React.createElement(Button, {
      classList: ['btn', 'btn-primary', 'btn-block'],
      onClick: ctrl.run
    }, "Run"), ctrl.data.nodeEnv === 'development' && /*#__PURE__*/React.createElement(Button, {
      classList: ['btn', 'btn-default', 'btn-block'],
      onClick: ctrl.edit
    }, "Edit"), ctrl.data.nodeEnv === 'development' && /*#__PURE__*/React.createElement(Button, {
      classList: ['btn', 'btn-default', 'btn-block'],
      onClick: ctrl.btnCreate_Click
    }, "New...")))), this.renderModals());
  }

}