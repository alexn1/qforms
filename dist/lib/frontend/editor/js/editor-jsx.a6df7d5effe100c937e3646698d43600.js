function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ActionList extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onClick", async li => {
      console.log('ActionList.onClick', li);
      await this.props.onClick(li.dataset.action);
    });

    this.state = {
      item: null
    };
  }

  render() {
    // console.log('ActionList.render', this.state.item);
    return /*#__PURE__*/React.createElement(DropdownButton, {
      title: 'Actions',
      onClick: this.onClick,
      actions: this.state.item ? this.state.item.getActions().map(action => {
        return {
          name: action.action,
          title: action.caption
        };
      }) : []
    });
  }

}
class EditorFrontHostAppView extends ReactComponent {
  renderDocumentView(document) {
    if (!document.controller.getDocumentViewClass()) return /*#__PURE__*/React.createElement("div", null, "no document view for ", document.controller.constructor.name);
    return React.createElement(document.controller.getDocumentViewClass(), {
      onCreate: c => document.view = c,
      document: document,
      ctrl: document.controller
    });
  }

  getTabs() {
    console.log('EditorFrontHostAppView.getTabs', this.props.ctrl.documents);
    return this.props.ctrl.documents.map(document => ({
      name: document.controller.model.getFullName(),
      title: document.controller.model.getFullName(),
      content: this.renderDocumentView(document)
    }));
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "EditorFrontHostAppView"
    }, /*#__PURE__*/React.createElement("div", {
      className: 'EditorFrontHostAppView__sidebar'
    }, /*#__PURE__*/React.createElement("div", {
      className: 'tree-bar'
    }, /*#__PURE__*/React.createElement("a", {
      href: ctrl.runAppLink,
      target: "_blank"
    }, "Run Application"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ActionList, {
      onCreate: c => ctrl.actionList = c,
      onClick: ctrl.onActionClick
    }))), /*#__PURE__*/React.createElement("div", {
      className: 'frame full'
    }, /*#__PURE__*/React.createElement("div", {
      className: 'frame__container'
    }, /*#__PURE__*/React.createElement(TreeWidget, {
      classList: ['full'],
      onCreate: c => ctrl.treeWidget2 = c,
      items: ctrl.items,
      onItemSelect: ctrl.onItemSelect2,
      onItemDoubleClick: ctrl.onItemDoubleClick2,
      onItemOpen: ctrl.onItemOpen2
    }))), /*#__PURE__*/React.createElement(Tab, {
      classList: ['Tab-blue', 'full'],
      tabs: [{
        name: 'properties',
        title: 'Properties',
        content: /*#__PURE__*/React.createElement(PropertyGrid, {
          onCreate: c => ctrl.pg = c,
          onChange: ctrl.onPropertyGrid2Change
        })
      }]
    })), /*#__PURE__*/React.createElement("div", {
      className: 'EditorFrontHostAppView__client'
    }, /*#__PURE__*/React.createElement(Tab, {
      classList: ['full'],
      canClose: true,
      onTabClose: ctrl.onDocumentClose,
      onCreate: c => ctrl.tabWidget = c,
      tabs: this.getTabs()
    })), ctrl.modal && React.createElement(ModalView, {
      ctrl: ctrl.modal
    }));
  }

}
class ModalView extends ReactComponent {
  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement(Modal, null, React.createElement(ctrl.getViewClass(), {
      ctrl
    }));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ChangeClassView extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCreate", async e => {
      // console.log('NewDataSourceView.onCreate');
      await this.props.ctrl.onCreate({
        class: this.class.getValue()
      });
    });

    this.class = null;
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: ctrl.onClose
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "Change Field Class")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "class"
    }, "Class"), /*#__PURE__*/React.createElement(ComboBox, {
      id: "class",
      classList: ['form-control'],
      items: [{
        value: 'TextBoxField',
        title: 'TextBoxField'
      }, {
        value: 'ComboBoxField',
        title: 'ComboBoxField'
      }, {
        value: 'TextAreaField',
        title: 'TextAreaField'
      }, {
        value: 'LinkField',
        title: 'LinkField'
      }, {
        value: 'ImageField',
        title: 'ImageField'
      }, {
        value: 'LabelField',
        title: 'LabelField'
      }, {
        value: 'DateField',
        title: 'DateField'
      }, {
        value: 'TimeField',
        title: 'TimeField'
      }, {
        value: 'DateTimeField',
        title: 'DateTimeField'
      }, {
        value: 'CheckBoxField',
        title: 'CheckBoxField'
      }, {
        value: 'FileField',
        title: 'FileField'
      }],
      value: ctrl.options.fieldCtrl.model.getClassName(),
      onCreate: c => this.class = c
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      name: "change",
      type: "button",
      className: "btn btn-primary",
      onClick: this.onCreate
    }, "Change"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      onClick: ctrl.onClose
    }, "Close")));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewActionView extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCreate", async e => {
      // console.log('NewActionView.onCreate');
      await this.props.ctrl.onCreate({
        name: this.name.getValue(),
        caption: this.caption.getValue()
      });
    });

    this.name = null;
    this.caption = null;
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: ctrl.onClose
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "New Action")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: "name",
      classList: ['form-control'],
      onCreate: c => this.name = c,
      autocomplete: 'off',
      autoFocus: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "caption"
    }, "Caption"), /*#__PURE__*/React.createElement(TextBox, {
      id: "caption",
      classList: ['form-control'],
      onCreate: c => this.caption = c,
      autocomplete: 'off'
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      name: "create",
      type: "button",
      className: "btn btn-primary",
      onClick: this.onCreate
    }, "Create"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      onClick: ctrl.onClose
    }, "Close")));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewColumnView extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCreate", async e => {
      // console.log('NewParamView.onCreate');
      await this.props.ctrl.onCreate({
        name: this.name.getValue()
      });
    });

    this.name = null;
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: ctrl.onClose
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "New Column")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "columnName"
    }, "Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: "columnName",
      classList: ['form-control'],
      onCreate: c => this.name = c
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      name: "create",
      type: "button",
      className: "btn btn-primary",
      onClick: this.onCreate
    }, "Create"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      onClick: ctrl.onClose
    }, "Close")));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewDataSourceView extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCreate", async e => {
      // console.log('NewDataSourceView.onCreate');
      await this.props.ctrl.onCreate({
        name: this.name.getValue(),
        class: this.class.getValue()
      });
    });

    this.name = null;
    this.class = null;
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "NewDataSourceView modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: ctrl.onClose
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "New Data Source")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: 'name',
      classList: ['form-control'],
      onCreate: c => this.name = c,
      autocomplete: 'off'
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "class"
    }, "Class"), /*#__PURE__*/React.createElement(ComboBox, {
      id: "class",
      classList: ['form-control'],
      items: [{
        value: 'DataSource',
        title: 'DataSource'
      }, {
        value: 'SqlDataSource',
        title: 'SqlDataSource'
      }],
      onCreate: c => this.class = c,
      value: 'SqlDataSource'
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement(Button, {
      name: "create",
      classList: ['btn', 'btn-primary'],
      onClick: this.onCreate
    }, "Create"), /*#__PURE__*/React.createElement(Button, {
      classList: ['btn', 'btn-default'],
      onClick: ctrl.onClose
    }, "Close")));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewDatabaseView extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCreate", async e => {
      // console.log('NewDatabaseView.onCreate');
      await this.props.ctrl.onCreate({
        class: this.class.getValue(),
        name: this.name.getValue(),
        host: this.host.getValue(),
        database: this.database.getValue(),
        user: this.user.getValue(),
        password: this.password.getValue()
      });
    });

    this.class = null;
    this.name = null;
    this.host = null;
    this.database = null;
    this.user = null;
    this.password = null;
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "NewDatabaseView modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: ctrl.onClose
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "New Database")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "class"
    }, "Class"), /*#__PURE__*/React.createElement(ComboBox, {
      id: 'class',
      classList: ['form-control'],
      items: [{
        value: 'MySqlDatabase',
        title: 'MySqlDatabase'
      }, {
        value: 'PostgreSqlDatabase',
        title: 'PostgreSqlDatabase'
      }],
      onCreate: c => this.class = c,
      value: 'PostgreSqlDatabase'
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: 'name',
      classList: ['form-control'],
      value: 'default',
      onCreate: c => this.name = c,
      autocomplete: 'off'
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "host"
    }, "Host"), /*#__PURE__*/React.createElement(TextBox, {
      id: 'host',
      classList: ['form-control'],
      value: 'localhost',
      onCreate: c => this.host = c,
      autocomplete: 'off'
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "database"
    }, "Database"), /*#__PURE__*/React.createElement(TextBox, {
      id: 'database',
      classList: ['form-control'],
      value: 'test',
      onCreate: c => this.database = c,
      autocomplete: 'off'
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "user"
    }, "User"), /*#__PURE__*/React.createElement(TextBox, {
      id: 'user',
      classList: ['form-control'],
      value: 'test',
      onCreate: c => this.user = c,
      autocomplete: 'off'
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "user"
    }, "Password"), /*#__PURE__*/React.createElement(TextBox, {
      id: 'password',
      classList: ['form-control'],
      value: '123qwe',
      onCreate: c => this.password = c,
      autocomplete: 'off'
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement(Button, {
      name: "create",
      classList: ['btn', 'btn-primary'],
      onClick: this.onCreate
    }, "Create"), /*#__PURE__*/React.createElement(Button, {
      classList: ['btn', 'btn-default'],
      onClick: ctrl.onClose
    }, "Close")));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewFieldView extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCreate", async e => {
      // console.log('NewFieldView.onCreate');
      await this.props.ctrl.onCreate({
        class: this.class.getValue(),
        name: this.name.getValue(),
        caption: this.caption.getValue() || this.name.getValue(),
        type: this.type.getValue()
      });
    });

    this.class = null;
    this.name = null;
    this.caption = null;
    this.type = null;
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: ctrl.onClose
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "New Field")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "class"
    }, "Class"), /*#__PURE__*/React.createElement(ComboBox, {
      id: "class",
      classList: ['form-control'],
      items: [{
        value: 'TextBoxField',
        title: 'TextBoxField'
      }, {
        value: 'ComboBoxField',
        title: 'ComboBoxField'
      }, {
        value: 'TextAreaField',
        title: 'TextAreaField'
      }, {
        value: 'LinkField',
        title: 'LinkField'
      }, {
        value: 'ImageField',
        title: 'ImageField'
      }, {
        value: 'LabelField',
        title: 'LabelField'
      }, {
        value: 'DateField',
        title: 'DateField'
      }, {
        value: 'TimeField',
        title: 'TimeField'
      }, {
        value: 'DateTimeField',
        title: 'DateTimeField'
      }, {
        value: 'CheckBoxField',
        title: 'CheckBoxField'
      }, {
        value: 'FileField',
        title: 'FileField'
      }],
      onCreate: c => this.class = c
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: "name",
      classList: ['form-control'],
      onCreate: c => this.name = c,
      autocomplete: 'off',
      autoFocus: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "caption"
    }, "Caption"), /*#__PURE__*/React.createElement(TextBox, {
      id: "caption",
      classList: ['form-control'],
      onCreate: c => this.caption = c,
      autocomplete: 'off'
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "type"
    }, "Type"), /*#__PURE__*/React.createElement(ComboBox, {
      id: "type",
      classList: ['form-control'],
      value: '',
      items: [{
        value: '',
        title: ''
      }, {
        value: 'string',
        title: 'string'
      }, {
        value: 'number',
        title: 'number'
      }, {
        value: 'boolean',
        title: 'boolean'
      }, {
        value: 'object',
        title: 'object'
      }, {
        value: 'date',
        title: 'date'
      }],
      onCreate: c => this.type = c
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      name: "create",
      type: "button",
      className: "btn btn-primary",
      onClick: this.onCreate
    }, "Create"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      onClick: ctrl.onClose
    }, "Close")));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewFormView extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCreate", async e => {
      // console.log('NewDataSourceView.onCreate');
      await this.props.ctrl.onCreate({
        name: this.name.getValue(),
        caption: this.caption.getValue(),
        class: this.class.getValue()
      });
    });

    this.name = null;
    this.caption = null;
    this.class = null;
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: ctrl.onClose
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "New Form")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: "name",
      classList: ['form-control'],
      onCreate: c => this.name = c,
      autocomplete: 'off',
      autoFocus: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "caption"
    }, "Caption"), /*#__PURE__*/React.createElement(TextBox, {
      id: "caption",
      classList: ['form-control'],
      onCreate: c => this.caption = c,
      autocomplete: 'off'
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "formClass"
    }, "Class"), /*#__PURE__*/React.createElement(ComboBox, {
      id: "formClass",
      classList: ['form-control'],
      value: 'TableForm',
      items: [{
        value: 'RowForm',
        title: 'RowForm'
      }, {
        value: 'TableForm',
        title: 'TableForm'
      }, {
        value: 'Form',
        title: 'Form'
      }],
      onCreate: c => this.class = c
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      name: "create",
      type: "button",
      className: "btn btn-primary",
      onClick: this.onCreate
    }, "Create"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      onClick: ctrl.onClose
    }, "Close")));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewFormFromTableView extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCreate", async e => {
      // console.log('NewDataSourceView.onCreate');
      await this.props.ctrl.onCreate({
        page: this.page.getValue(),
        class: this.class.getValue(),
        name: this.name.getValue(),
        caption: this.caption.getValue()
      });
    });

    this.page = null;
    this.class = null;
    this.name = null;
    this.caption = null;
  }

  render() {
    const ctrl = this.props.ctrl;
    const tableController = ctrl.options.tableController;
    const pages = tableController.model.parent.parent.pageLinks.map(pageLink => ({
      value: pageLink.getName(),
      title: pageLink.getName()
    }));
    console.log('pages:', pages);
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: ctrl.onClose
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "New Form")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "table"
    }, "Table"), /*#__PURE__*/React.createElement(TextBox, {
      id: "table",
      classList: ['form-control'],
      disabled: true,
      value: tableController.model.getName()
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "page"
    }, "Page"), /*#__PURE__*/React.createElement(ComboBox, {
      id: "page",
      classList: ['form-control'],
      items: pages,
      value: pages[pages.length - 1].value,
      onCreate: c => this.page = c
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "class"
    }, "Form Class"), /*#__PURE__*/React.createElement(ComboBox, {
      id: "class",
      classList: ['form-control'],
      value: 'TableForm',
      items: [{
        value: 'RowForm',
        title: 'RowForm'
      }, {
        value: 'TableForm',
        title: 'TableForm'
      }],
      onCreate: c => this.class = c
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: "name",
      classList: ['form-control'],
      value: ctrl.options.tableController.model.getName(),
      onCreate: c => this.name = c,
      autocomplete: 'off',
      autoFocus: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "caption"
    }, "Caption"), /*#__PURE__*/React.createElement(TextBox, {
      id: "caption",
      classList: ['form-control'],
      onCreate: c => this.caption = c,
      autocomplete: 'off'
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      name: "create",
      type: "button",
      className: "btn btn-primary",
      onClick: this.onCreate
    }, "Create"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      onClick: ctrl.onClose
    }, "Close")));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewKeyColumnView extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCreate", async e => {
      // console.log('NewParamView.onCreate');
      await this.props.ctrl.onCreate({
        name: this.name.getValue()
      });
    });

    this.name = null;
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: ctrl.onClose
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "New Key Column")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: "name",
      classList: ['form-control'],
      onCreate: c => this.name = c,
      autocomplete: 'off'
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      name: "create",
      type: "button",
      className: "btn btn-primary",
      onClick: this.onCreate
    }, "Create"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      onClick: ctrl.onClose
    }, "Close")));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewPageView extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCreate", async e => {
      // console.log('NewPageView.onCreate');
      await this.props.ctrl.onCreate({
        name: this.name.getValue(),
        caption: this.caption.getValue(),
        startup: this.startup.getValue()
      });
    });

    this.name = null;
    this.caption = null;
    this.startup = null;
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: ctrl.onClose
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "New Page")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: "name",
      classList: ['form-control'],
      onCreate: c => this.name = c,
      autocomplete: 'off',
      autoFocus: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "caption"
    }, "Caption"), /*#__PURE__*/React.createElement(TextBox, {
      id: "caption",
      classList: ['form-control'],
      onCreate: c => this.caption = c,
      autocomplete: 'off'
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "startup"
    }, "Startup"), /*#__PURE__*/React.createElement(ComboBox, {
      id: "startup",
      classList: ['form-control'],
      items: [{
        value: 'false',
        title: 'false'
      }, {
        value: 'true',
        title: 'true'
      }],
      onCreate: c => this.startup = c
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      name: "create",
      type: "button",
      className: "btn btn-primary",
      onClick: this.onCreate
    }, "Create"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      onClick: ctrl.onClose
    }, "Close")));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewParamView extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCreate", async e => {
      // console.log('NewParamView.onCreate');
      await this.props.ctrl.onCreate({
        name: this.name.getValue()
      });
    });

    this.name = null;
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: ctrl.onClose
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "New Param")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: "name",
      classList: ['form-control'],
      onCreate: c => this.name = c,
      autocomplete: 'off',
      autoFocus: true
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      name: "create",
      type: "button",
      className: "btn btn-primary",
      onClick: this.onCreate
    }, "Create"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      onClick: ctrl.onClose
    }, "Close")));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewTableView extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCreate", async e => {
      // console.log('NewParamView.onCreate');
      await this.props.ctrl.onCreate({
        name: this.name.getValue()
      });
    });

    this.name = null;
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "close",
      onClick: ctrl.onClose
    }, /*#__PURE__*/React.createElement("span", null, "\xD7")), /*#__PURE__*/React.createElement("h4", {
      className: "modal-title"
    }, "New Table")), /*#__PURE__*/React.createElement("div", {
      className: "modal-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "tableName"
    }, "Name"), /*#__PURE__*/React.createElement(TextBox, {
      id: "tableName",
      classList: ['form-control'],
      onCreate: c => this.name = c
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      name: "create",
      type: "button",
      className: "btn btn-primary",
      onClick: this.onCreate
    }, "Create"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      onClick: ctrl.onClose
    }, "Close")));
  }

}
class DocumentView extends ReactComponent {
  static createCM(textarea, value) {
    const cm = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true
    });
    cm.setOption('theme', 'cobalt');
    cm.setValue(value);
    return cm;
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SqlDataSourceView extends DocumentView {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", async (i, o) => {
      // console.log('SqlDataSourceView.onChange');
      await this.rerender();
    });

    _defineProperty(this, "onSaveClick", async e => {
      console.log('SqlDataSourceView.onSaveClick');
      const ctrl = this.props.ctrl;
      await ctrl.onSaveClick(this.state.selected, this[this.state.selected].getValue());
      await this.rerender();
    });

    this.singleRef = React.createRef();
    this.multipleRef = React.createRef();
    this.countRef = React.createRef();
    this.state = {
      selected: 'singleQuery'
    };
    this.singleQuery = null;
    this.multipleQuery = null;
    this.countQuery = null;
  }

  componentDidMount() {
    const ctrl = this.props.ctrl;
    this.singleQuery = DocumentView.createCM(this.singleRef.current, ctrl.model.getAttr('singleQuery'));
    this.multipleQuery = DocumentView.createCM(this.multipleRef.current, ctrl.model.getAttr('multipleQuery'));
    this.countQuery = DocumentView.createCM(this.countRef.current, ctrl.model.getAttr('countQuery'));
    this.singleQuery.on('change', this.onChange);
    this.multipleQuery.on('change', this.onChange);
    this.countQuery.on('change', this.onChange);
  }

  componentWillUnmount() {
    this.singleQuery.off('change', this.onChange);
    this.multipleQuery.off('change', this.onChange);
    this.countQuery.off('change', this.onChange);
  }

  isChanged() {
    const ctrl = this.props.ctrl;
    const cm = this[this.state.selected];
    if (!cm) return false;
    return cm.getValue() !== ctrl.model.getAttr(this.state.selected);
  }

  getButtonClass(name) {
    return this.state.selected === name ? 'btn-primary' : 'btn-default';
  }

  getVisibility(name) {
    return this.state.selected === name ? 'visible' : 'hidden';
  }

  isSelected(name) {
    return this.state.selected === name;
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: 'SqlDataSourceView full flex-column'
    }, /*#__PURE__*/React.createElement("div", {
      className: "toolbar"
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: this.onSaveClick,
      enabled: this.isChanged()
    }, "Save"), /*#__PURE__*/React.createElement(Button, {
      onClick: ctrl.onCreateModelBack
    }, "Model.back.js"), "\xA0", /*#__PURE__*/React.createElement("div", {
      className: "btn-group",
      role: "group"
    }, /*#__PURE__*/React.createElement("button", {
      className: `${this.getButtonClass('singleQuery')}`,
      style: {
        fontWeight: this.isSelected('singleQuery') ? 'bold' : null
      },
      onClick: e => this.setState({
        selected: 'singleQuery'
      })
    }, "singleQuery"), /*#__PURE__*/React.createElement("button", {
      className: `${this.getButtonClass('multipleQuery')}`,
      style: {
        fontWeight: this.isSelected('multipleQuery') ? 'bold' : null
      },
      onClick: e => this.setState({
        selected: 'multipleQuery'
      })
    }, "multipleQuery"), /*#__PURE__*/React.createElement("button", {
      className: `${this.getButtonClass('countQuery')}`,
      style: {
        fontWeight: this.isSelected('countQuery') ? 'bold' : null
      },
      onClick: e => this.setState({
        selected: 'countQuery'
      })
    }, "countQuery"))), /*#__PURE__*/React.createElement("div", {
      className: "edit flex-max full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cm-container full",
      style: {
        visibility: this.getVisibility('singleQuery')
      }
    }, /*#__PURE__*/React.createElement("textarea", {
      ref: this.singleRef
    })), /*#__PURE__*/React.createElement("div", {
      className: "cm-container full",
      style: {
        visibility: this.getVisibility('multipleQuery')
      }
    }, /*#__PURE__*/React.createElement("textarea", {
      ref: this.multipleRef
    })), /*#__PURE__*/React.createElement("div", {
      className: "cm-container full",
      style: {
        visibility: this.getVisibility('countQuery')
      }
    }, /*#__PURE__*/React.createElement("textarea", {
      ref: this.countRef
    }))));
  }

}
class DatabaseView extends ReactComponent {
  renderGrid() {
    // console.log('DatabaseView.renderGrid');
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement(Grid, {
      classList: ['flex-max'],
      columns: [{
        name: 'name',
        title: 'name',
        width: 100
      }, {
        name: 'type',
        title: 'type',
        width: 60
      }, {
        name: 'key',
        title: 'key',
        width: 60
      }, {
        name: 'auto',
        title: 'auto',
        width: 60
      }, {
        name: 'nullable',
        title: 'nullable',
        width: 60
      }, {
        name: 'dbType',
        title: 'dbType',
        width: 200
      }, {
        name: 'comment',
        title: 'comment',
        width: 100
      }],
      rows: ctrl.tableInfo,
      getRowKey: row => row.name
    });
  }

  render() {
    // console.log('DatabaseView.render');
    const ctrl = this.props.ctrl;
    const document = this.props.document;
    return /*#__PURE__*/React.createElement("div", {
      className: 'DatabaseView frame'
    }, /*#__PURE__*/React.createElement("div", {
      className: 'client frame'
    }, /*#__PURE__*/React.createElement("div", {
      className: 'frame__container'
    }, /*#__PURE__*/React.createElement("div", {
      className: 'divTableInfo full flex-column'
    }, ctrl.tableInfo && this.renderGrid(), ctrl.tableInfo && /*#__PURE__*/React.createElement(Button, {
      onClick: ctrl.onCreateTableClick
    }, "Create Table")))), /*#__PURE__*/React.createElement(TreeWidget, {
      classList: ['sidebar'],
      items: document.treeWidgetItems,
      onItemSelect: ctrl.onTableSelect2
    }));
  }

}
class TableView extends ReactComponent {
  renderRows() {
    const ctrl = this.props.ctrl;
    return ctrl.columns.map(column => /*#__PURE__*/React.createElement("tr", {
      key: column.model.getName()
    }, /*#__PURE__*/React.createElement("td", null, column.model.getAttr('name')), /*#__PURE__*/React.createElement("td", null, column.model.getAttr('caption')), /*#__PURE__*/React.createElement("td", null, column.model.getAttr('type')), /*#__PURE__*/React.createElement("td", null, column.model.getAttr('key')), /*#__PURE__*/React.createElement("td", null, column.model.getAttr('auto')), /*#__PURE__*/React.createElement("td", null, column.model.getAttr('nullable'))));
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement("div", {
      className: "client frame"
    }, /*#__PURE__*/React.createElement("div", {
      className: "frame__container flex-column"
    }, /*#__PURE__*/React.createElement(Grid, {
      classList: ['flex-max'],
      columns: [{
        name: 'name',
        title: 'name',
        width: 100
      }, {
        name: 'caption',
        title: 'caption',
        width: 100
      }, {
        name: 'type',
        title: 'type',
        width: 60
      }, {
        name: 'key',
        title: 'key',
        width: 60
      }, {
        name: 'auto',
        title: 'auto',
        width: 60
      }, {
        name: 'nullable',
        title: 'nullable',
        width: 60
      }],
      rows: ctrl.columns.map(column => column.model.getAttributes()),
      getRowKey: row => row.name
    }), /*#__PURE__*/React.createElement(Button, {
      onClick: ctrl.onCreateFormButtonClick
    }, "Create Form"))));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class VisualView extends DocumentView {
  constructor(props) {
    super(props);

    _defineProperty(this, "onControllerSave", async e => {
      const ctrl = this.props.ctrl;
      await ctrl.onControllerSave(this.cm.getValue());
    });

    _defineProperty(this, "onChange", async (instance, changeObj) => {
      // console.log('VisualView.onChange', this.isChanged());
      await this.rerender();
    });

    this.textarea = React.createRef();
    this.cm = null;
  }

  getTextarea() {
    if (this.textarea) return this.textarea.current;
    return null;
  }

  componentDidMount() {
    // console.log('VisualView.componentDidMount', this.getTextarea());
    const ctrl = this.props.ctrl;

    if (ctrl.data.js) {
      this.cm = DocumentView.createCM(this.getTextarea(), ctrl.data.js);
      this.cm.on('change', this.onChange);
    }
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate', this.getTextarea());
    const ctrl = this.props.ctrl;
    const textarea = this.getTextarea();

    if (textarea && ctrl.data.js && !this.cm) {
      this.cm = DocumentView.createCM(this.getTextarea(), ctrl.data.js);
    }
  }

  componentWillUnmount() {
    // console.log('VisualView.componentWillUnmount');
    if (this.cm) {
      this.cm.off('change', this.onChange);
    }
  }

  isChanged() {
    if (!this.cm) {
      return false;
    }

    return this.props.ctrl.data.js !== this.cm.getValue();
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: 'VisualView full'
    }, /*#__PURE__*/React.createElement("div", {
      className: "full flex-column"
    }, /*#__PURE__*/React.createElement("div", {
      className: "toolbar"
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: ctrl.onCreateModelBack
    }, "Model.back.js"), !ctrl.data.js && /*#__PURE__*/React.createElement(Button, {
      onClick: ctrl.onCreateCustomController
    }, "Controller.front.js"), !ctrl.data.jsx && /*#__PURE__*/React.createElement(Button, {
      onClick: ctrl.onCreateCustomView
    }, "View.jsx"), !ctrl.data.less && /*#__PURE__*/React.createElement(Button, {
      onClick: ctrl.onCreateCustomStyle
    }, "View.less"), ctrl.data.js && /*#__PURE__*/React.createElement(Button, {
      onClick: this.onControllerSave,
      enabled: this.isChanged()
    }, "Save")), /*#__PURE__*/React.createElement("div", {
      className: 'edit flex-max full'
    }, /*#__PURE__*/React.createElement("div", {
      className: 'cm-container full'
    }, ctrl.data.js && /*#__PURE__*/React.createElement("textarea", {
      ref: this.textarea
    })))));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PropertyGrid extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", (name, value) => {
      // console.log('PropertyGrid.onChange', name, value);
      if (this.props.onChange) {
        this.props.onChange(name, value);
      }
    });

    this.state = {};
  }

  getObj() {
    if (this.state.object) {
      return this.state.object.obj;
    }

    return null;
  }

  getOptions() {
    if (this.state.object) {
      return this.state.object.options;
    }

    return null;
  }

  renderInput(name) {
    const obj = this.getObj();
    return /*#__PURE__*/React.createElement(TextBox, {
      name: name,
      value: obj[name],
      spellCheck: "false",
      onChange: value => this.onChange(name, value),
      autocomplete: 'off'
    });
  }

  renderSelect(name) {
    const obj = this.getObj();
    const options = this.getOptions();
    return /*#__PURE__*/React.createElement(ComboBox, {
      name: name,
      value: obj[name],
      items: options[name].map(value => ({
        value: value,
        title: value
      })),
      onChange: value => this.onChange(name, value)
    });
  }

  renderRows() {
    const obj = this.getObj();
    const options = this.getOptions();
    return Object.keys(obj).map(name => /*#__PURE__*/React.createElement("tr", {
      key: name
    }, /*#__PURE__*/React.createElement("td", null, name), /*#__PURE__*/React.createElement("td", null, options[name] !== undefined ? this.renderSelect(name) : this.renderInput(name))));
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: 'PropertyGrid full frame'
    }, /*#__PURE__*/React.createElement("div", {
      className: 'frame__container'
    }, /*#__PURE__*/React.createElement("table", {
      className: 'PropertyGrid__table',
      cellPadding: 0,
      cellSpacing: 0
    }, /*#__PURE__*/React.createElement("tbody", null, this.getObj() && this.renderRows()))));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TreeItem extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onDivMouseDown", e => {
      // console.log('TreeItem.onDivMouseDown', e.currentTarget);
      const item = this.props.item;
      const tree = this.props.tree;
      tree.select(item);
    });

    _defineProperty(this, "onDivDoubleClick", e => {
      // console.log('TreeItem.onDivDoubleClick');
      const item = this.props.item;
      const tree = this.props.tree;
      tree.onDoubleClick(item);
    });

    _defineProperty(this, "onNodeMouseDown", e => {
      // console.log('TreeItem.onNodeMouseDown', e.currentTarget);
      const item = this.props.item;
      const tree = this.props.tree;
      const opened = this.state.opened;
      e.stopPropagation();
      this.setState(prevState => {
        return {
          opened: !prevState.opened
        };
      });

      if (!opened) {
        tree.onOpen(item);
      }
    });

    this.state = {
      opened: props.item.opened !== undefined ? props.item.opened : false
    };
    this.li = React.createRef();
  }

  isSelected() {
    return this.props.tree.getSelectedItem() === this.props.item;
  }

  isOpened() {
    return this.state.opened;
  }

  getElement() {
    return this.li.current;
  }

  open() {
    console.log('TreeItem.open', this.props.item.getTitle());
    this.state.opened = true;

    if (this.parent) {
      this.parent.open();
    } else {
      console.log('this.parent', this.parent);
    }
  }

  render() {
    // console.log('TreeItem.render', this.props.item.getTitle());
    const tree = this.props.tree;
    const item = this.props.item;
    const items = item.items;
    const hasItems = !!(items && items.length);
    const isNode = item.node || hasItems;
    const style = item.getStyle ? item.getStyle() : null;
    const title = item.getTitle();
    return /*#__PURE__*/React.createElement("li", {
      key: title,
      ref: this.li,
      className: this.isOpened() ? 'opened' : null
    }, /*#__PURE__*/React.createElement("div", {
      className: this.isSelected() ? 'active' : null,
      style: {
        paddingLeft: this.props.paddingLeft
      },
      onMouseDown: this.onDivMouseDown,
      onDoubleClick: this.onDivDoubleClick
    }, /*#__PURE__*/React.createElement("span", {
      className: isNode ? 'node' : 'leaf',
      onMouseDown: this.onNodeMouseDown
    }), "\xA0", /*#__PURE__*/React.createElement("span", {
      style: style
    }, title)), hasItems && /*#__PURE__*/React.createElement("ul", null, items.map(item => /*#__PURE__*/React.createElement(TreeItem, {
      key: item.getTitle(),
      tree: tree,
      item: item,
      paddingLeft: this.props.paddingLeft + 15,
      onCreate: c => {
        // console.log('onCreate', this.props.item.getTitle(), item.getTitle());
        c.parent = this;
        item.view = c;
      }
    }))));
  }

}
class TreeWidget extends ReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null
    };
  }

  async select(item) {
    console.log('TreeWidget.select', item ? item.getTitle() : null);
    if (this.isSelected(item)) return;
    return new Promise(resolve => {
      this.setState({
        selectedItem: item
      }, () => {
        if (this.props.onItemSelect) this.props.onItemSelect(item);
        resolve();
      });
    });
  }

  onDoubleClick(item) {
    // console.log('TreeWidget.onDoubleClick', item);
    if (this.props.onItemDoubleClick) this.props.onItemDoubleClick(item);
  }

  onOpen(item) {
    if (this.props.onItemOpen) this.props.onItemOpen(item);
  }

  isSelected(item) {
    return this.state.selectedItem === item;
  }

  getSelectedItem() {
    return this.state.selectedItem;
  }

  scrollToSelected() {
    console.log('TreeWidget.scrollToSelected', this.getSelectedItem().getTitle());
    this.getSelectedItem().view.getElement().scrollIntoView();
  }

  render() {
    console.log('TreeWidget.render'
    /*, this.props.items*/
    );
    const items = this.props.items;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement("ul", null, items.map(item => /*#__PURE__*/React.createElement(TreeItem, {
      key: item.getTitle(),
      tree: this,
      item: item,
      paddingLeft: 5,
      onCreate: c => item.view = c
    }))));
  }

}