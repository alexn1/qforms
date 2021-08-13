class View extends ReactComponent {
  getActionsForDropdownButton() {
    return this.props.ctrl.model.data.actions.map(data => ({
      name: Model.getName(data),
      title: Model.getAttr(data, 'caption')
    }));
  }

}

window.QForms.View = View;
class ApplicationView extends ReactComponent {
  renderActivePage() {
    const ctrl = this.props.ctrl;

    if (ctrl.activePage) {
      return ApplicationView.renderPage(ctrl.activePage);
    }
  }

  static renderPage(pageCtrl) {
    return React.createElement(pageCtrl.getViewClass(), {
      ctrl: pageCtrl,
      onCreate: pageCtrl.onViewCreate
    });
  }

  renderModalPages() {
    return this.props.ctrl.modalPages.map(pageCtrl => /*#__PURE__*/React.createElement(Modal, {
      key: pageCtrl.model.getId()
    }, ApplicationView.renderPage(pageCtrl)));
  }
  /*render() {
      console.log('ApplicationView.render', this.props.ctrl.model.getFullName());
      const ctrl = this.props.ctrl;
      const model = ctrl.model;
      return (
          <div className={`ApplicationView ${model.data.theme}`}>
              {this.renderActivePage()}
              {this.renderModalPages()}
          </div>
      );
  }*/


}

window.QForms.ApplicationView = ApplicationView;
class MdiApplicationView extends ApplicationView {
  getTabs() {
    return this.props.ctrl.pages.map(pageCtrl => {
      return {
        name: pageCtrl.model.getId(),
        title: pageCtrl.model.getCaption(),
        content: React.createElement(pageCtrl.getViewClass(), {
          ctrl: pageCtrl,
          onCreate: pageCtrl.onViewCreate
        })
      };
    });
  }

  render() {
    console.log('MdiApplicationView.render', this.props.ctrl.model.getFullName());
    const ctrl = this.props.ctrl;
    const model = ctrl.model;
    return /*#__PURE__*/React.createElement("div", {
      className: `MdiApplicationView ${model.getAttr('theme')}`
    }, /*#__PURE__*/React.createElement(Menu, {
      items: ctrl.getMenuItemsProp(),
      onClick: ctrl.onMenuItemClick
    }), /*#__PURE__*/React.createElement(Tab, {
      tabs: this.getTabs(),
      canClose: true,
      onTabClose: ctrl.onTabClose,
      onCreate: ctrl.onTabCreate,
      getActive: ctrl.getActivePageIndex,
      onTabMouseDown: ctrl.onTabMouseDown
    }), /*#__PURE__*/React.createElement(Statusbar, {
      onCreate: ctrl.onStatusbarCreate
    }), this.renderModalPages());
  }

}

window.QForms.MdiApplicationView = MdiApplicationView;
class SdiApplicationView extends ApplicationView {
  render() {
    console.log('SdiApplicationView.render', this.props.ctrl.model.getFullName());
    const ctrl = this.props.ctrl;
    const model = ctrl.model;
    return /*#__PURE__*/React.createElement("div", {
      className: `SdiApplicationView__container ${model.getAttr('theme')}`
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement(Menu, {
      items: ctrl.getMenuItemsProp(),
      onClick: ctrl.onMenuItemClick
    })), /*#__PURE__*/React.createElement("main", {
      className: "SdiApplicationView__main"
    }, this.renderActivePage()), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement(Statusbar, {
      onCreate: ctrl.onStatusbarCreate
    })), this.renderModalPages());
  }

}

window.QForms.SdiApplicationView = SdiApplicationView;
class RowFormFieldView extends ReactComponent {
  getClassList() {
    const ctrl = this.props.ctrl;
    return [...super.getClassList(), ...(ctrl.isChanged() ? ['changed'] : []), ...(ctrl.getErrorMessage() !== null ? ['error'] : [])];
  }

}

window.QForms.RowFormFieldView = RowFormFieldView;
class RowFormCheckBoxFieldView extends RowFormFieldView {
  render() {
    // console.log('RowFormCheckBoxFieldView.render');
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getClassName()
    }, /*#__PURE__*/React.createElement(CheckBox, {
      onCreate: ctrl.onWidgetCreate,
      checked: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: ctrl.onChange
    }));
  }

}

window.QForms.RowFormCheckBoxFieldView = RowFormCheckBoxFieldView;
class RowFormComboBoxFieldView extends RowFormFieldView {
  render() {
    // console.log('RowFormComboBoxFieldView.render', this.props.ctrl.getItems());
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getClassName()
    }, /*#__PURE__*/React.createElement(ComboBox, {
      onCreate: ctrl.onWidgetCreate,
      nullable: true,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: ctrl.onChange,
      items: ctrl.getItems(),
      placeholder: ctrl.getPlaceholder()
    }), ctrl.getModel().getAttr('itemEditPage') && ctrl.getValue() && /*#__PURE__*/React.createElement(Button, {
      onClick: ctrl.onEditButtonClick // enabled={!!ctrl.getModel().getAttr('itemEditPage')}

    }, "..."), ctrl.getModel().getAttr('newRowMode') && ctrl.getModel().getAttr('newRowMode') !== 'disabled' && ctrl.getForm().getMode() === 'edit' && /*#__PURE__*/React.createElement(Button, {
      onClick: ctrl.onCreateButtonClick
    }, "+"));
  }

}

window.QForms.RowFormComboBoxFieldView = RowFormComboBoxFieldView;
class RowFormDatePickerFieldView extends RowFormFieldView {
  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getClassName()
    }, /*#__PURE__*/React.createElement(DropdownDatePicker, {
      onCreate: ctrl.onWidgetCreate,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: ctrl.onChange,
      placeholder: ctrl.getPlaceholder(),
      format: ctrl.model.getFormat(),
      oldDates: this.props.oldDates,
      getMinDate: this.props.getMinDate
    }));
  }

}

window.QForms.RowFormDatePickerFieldView = RowFormDatePickerFieldView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RowFormDateTimeFieldView extends RowFormFieldView {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onCloseDown", async e => {
      console.log('RowFormDateTimeFieldView.onCloseDown');
      const ctrl = this.props.ctrl;
      ctrl.widget2.setState({
        value: ''
      }, () => {
        ctrl.onChange2(null);
      });
    });
  }

  isCloseVisible() {
    if (this.props.readOnly) return false;
    const ctrl = this.props.ctrl;

    if (!ctrl.widget2) {
      return this.props.value !== undefined;
    }

    return ctrl.widget2.state.value !== '';
  }

  getClassName() {
    return `${super.getClassName()} ${this.props.ctrl.state.value ? 'datetime' : 'date'}`;
  }

  render() {
    // console.log('RowFormDateTimeFieldView.render');
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getClassName(),
      style: ctrl.renderViewStyle(ctrl.getRow())
    }, /*#__PURE__*/React.createElement(DropdownDatePicker, {
      onCreate: ctrl.onWidgetCreate,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: ctrl.onChange,
      placeholder: ctrl.getPlaceholder(),
      format: ctrl.model.getFormat(),
      oldDates: this.props.oldDates,
      getMinDate: this.props.getMinDate
    }), /*#__PURE__*/React.createElement("div", {
      className: 'time'
    }, /*#__PURE__*/React.createElement(TimeBox, {
      onCreate: ctrl.onView2Create,
      readOnly: !ctrl.isEditable(),
      value: ctrl.getValueForTime(),
      onChange: ctrl.onChange2,
      onBlur: ctrl.onBlur2,
      placeholder: ctrl.getPlaceholder2()
    }), /*#__PURE__*/React.createElement("div", {
      className: `close ${this.isCloseVisible() ? 'visible' : ''}`,
      onMouseDown: this.onCloseDown
    }, /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 10 10"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "2",
      y1: "2",
      x2: "8",
      y2: "8",
      stroke: "#aaa",
      strokeWidth: "1.1",
      strokeLinecap: "round",
      strokeMiterlimit: "10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "2",
      x2: "2",
      y2: "8",
      stroke: "#aaa",
      strokeWidth: "1.1",
      strokeLinecap: "round",
      strokeMiterlimit: "10"
    })))));
  }

}

window.QForms.RowFormDateTimeFieldView = RowFormDateTimeFieldView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RowFormFileFieldView extends RowFormFieldView {
  constructor(props) {
    super(props);

    _defineProperty(this, "onClearClick", e => {
      this.props.ctrl.onChange('');
    });

    _defineProperty(this, "onChange", async e => {
      const file = e.target.files[0];
      const widgetValue = await Helper.readFileAsDataURL(file); // console.log('widgetValue:', widgetValue);

      this.props.ctrl.onChange(widgetValue);
    });

    this.image = React.createRef();
    this.div = React.createRef();
  }

  getImage() {
    return this.image.current;
  }

  getDiv() {
    return this.div.current;
  }

  updateSize() {
    if (this.getImage()) {
      const ns = this.getImage().getNaturalSize();
      this.getDiv().innerText = `${ns[0]}×${ns[1]}`;
    }
  }

  render() {
    const ctrl = this.props.ctrl;
    const value = ctrl.getValueForWidget();
    return /*#__PURE__*/React.createElement("div", {
      className: this.getClassName(),
      style: ctrl.renderViewStyle(ctrl.getRow())
    }, !!value && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Image, {
      ref: this.image,
      src: value
    }), /*#__PURE__*/React.createElement("span", {
      className: "size",
      ref: this.div
    }), /*#__PURE__*/React.createElement("span", {
      className: "length"
    }, value.length)), /*#__PURE__*/React.createElement("input", {
      type: "file",
      onChange: this.onChange,
      disabled: !ctrl.isEditable()
    }), !!value && /*#__PURE__*/React.createElement(Button, {
      onClick: this.onClearClick,
      enabled: ctrl.isEditable()
    }, "Clear"));
  }

  componentDidMount() {
    // console.log('RowFormFileFieldView.componentDidMount', this.props.ctrl.model.getFullName());
    setTimeout(() => this.updateSize(), 0);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('RowFormFileFieldView.componentDidUpdate', this.props.ctrl.model.getFullName(), snapshot);
    setTimeout(() => this.updateSize(), 0);
  }

}

window.QForms.RowFormFileFieldView = RowFormFileFieldView;
class RowFormImageFieldView extends RowFormFieldView {
  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getClassName(),
      style: ctrl.renderViewStyle(ctrl.getRow())
    }, /*#__PURE__*/React.createElement(Image, {
      src: ctrl.getValueForWidget()
    }));
  }

}

window.QForms.RowFormImageFieldView = RowFormImageFieldView;
class RowFormLinkFieldView extends RowFormFieldView {
  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getClassName()
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: ctrl.onClick
    }, ctrl.getValueForWidget()));
  }

}

window.QForms.RowFormLinkFieldView = RowFormLinkFieldView;
class RowFormTextAreaFieldView extends RowFormFieldView {
  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getClassName()
    }, /*#__PURE__*/React.createElement(TextArea, {
      onCreate: ctrl.onWidgetCreate,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: ctrl.onChange,
      placeholder: ctrl.getPlaceholder(),
      rows: ctrl.model.getRows(),
      cols: ctrl.model.getCols()
    }));
  }

}

window.QForms.RowFormTextAreaFieldView = RowFormTextAreaFieldView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RowFormTextBoxFieldView extends RowFormFieldView {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onCloseClick", async e => {
      console.log('RowFormTextBoxFieldView.onCloseClick');
      const ctrl = this.props.ctrl;
      ctrl.widget.state.value = '';
      ctrl.widget.setState({
        value: ''
      });
      ctrl.onChange('');
    });
  }

  isCloseVisible() {
    // console.log('RowFormTextBoxFieldView.isCloseVisible', this.props.value);
    const ctrl = this.props.ctrl;
    if (!ctrl.isEditable()) return false;

    if (!ctrl.widget) {
      return this.props.value !== undefined;
    } // console.log('ctrl.widget.state.value:', ctrl.widget.state.value);


    return ctrl.widget.state.value !== '';
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getClassName()
    }, /*#__PURE__*/React.createElement(TextBox, {
      onCreate: ctrl.onWidgetCreate,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: ctrl.onChange,
      placeholder: ctrl.getPlaceholder()
    }), /*#__PURE__*/React.createElement("div", {
      className: `close ${this.isCloseVisible() ? 'visible' : ''}`,
      onClick: this.onCloseClick
    }, /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 10 10"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "2",
      y1: "2",
      x2: "8",
      y2: "8",
      stroke: "#aaa",
      strokeWidth: "1.1",
      strokeLinecap: "round",
      strokeMiterlimit: "10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "2",
      x2: "2",
      y2: "8",
      stroke: "#aaa",
      strokeWidth: "1.1",
      strokeLinecap: "round",
      strokeMiterlimit: "10"
    }))));
  }

}

window.QForms.RowFormTextBoxFieldView = RowFormTextBoxFieldView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RowFormTimeFieldView extends RowFormFieldView {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onCloseClick", async e => {
      console.log('RowFormTimeFieldView.onCloseClick');
      /*const ctrl = this.props.ctrl;
      ctrl.widget.state.value = '';
      ctrl.widget.setState({value: ''});
      ctrl.onChange(null);*/
    });
  }

  isCloseVisible() {
    // console.log('RowFormTimeFieldView.isCloseVisible', this.props.value);
    if (this.props.readOnly) return false;
    const ctrl = this.props.ctrl;

    if (!ctrl.widget) {
      return this.props.value !== undefined;
    } // console.log('ctrl.widget.state.value:', ctrl.view.state.value);


    return ctrl.widget.state.value !== '';
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getClassName()
    }, /*#__PURE__*/React.createElement(TimeBox, {
      onCreate: ctrl.onWidgetCreate,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: ctrl.onChange,
      onBlur: ctrl.onBlur,
      placeholder: ctrl.getPlaceholder()
    }), /*#__PURE__*/React.createElement("div", {
      className: `close ${this.isCloseVisible() ? 'visible' : ''}`,
      onClick: this.onCloseClick
    }, /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 10 10"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "2",
      y1: "2",
      x2: "8",
      y2: "8",
      stroke: "#aaa",
      strokeWidth: "1.1",
      strokeLinecap: "round",
      strokeMiterlimit: "10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "2",
      x2: "2",
      y2: "8",
      stroke: "#aaa",
      strokeWidth: "1.1",
      strokeLinecap: "round",
      strokeMiterlimit: "10"
    }))));
  }

}

window.QForms.RowFormTimeFieldView = RowFormTimeFieldView;
class TableFormFieldView extends ReactComponent {
  constructor(props) {
    super(props);
    this.span = React.createRef();
  }

  getSpanOffsetWidth() {
    return this.span.current.offsetWidth;
  }

}

window.QForms.TableFormFieldView = TableFormFieldView;
class TableFormCheckBoxFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "TableFormCheckBoxFieldView",
      style: ctrl.renderViewStyle(row)
    }, /*#__PURE__*/React.createElement(CheckBox, {
      checked: ctrl.getValueForWidget(row),
      readOnly: true // disabled={true}

    }));
  }

}

window.QForms.TableFormCheckBoxFieldView = TableFormCheckBoxFieldView;
class TableFormComboBoxFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "TableFormComboBoxFieldView",
      style: ctrl.renderViewStyle(row)
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormComboBoxFieldView = TableFormComboBoxFieldView;
class TableFormDatePickerFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "TableFormDatePickerFieldView",
      style: ctrl.renderViewStyle(row)
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormDatePickerFieldView = TableFormDatePickerFieldView;
class TableFormLinkFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "TableFormLinkFieldView",
      style: ctrl.renderViewStyle(row)
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: ctrl.onClick
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormLinkFieldView = TableFormLinkFieldView;
class TableFormTextBoxFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "TableFormTextBoxFieldView",
      style: ctrl.renderViewStyle(row)
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormTextBoxFieldView = TableFormTextBoxFieldView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FormView extends View {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onActionsClick", async li => {
      // console.log('FormView.onActionsClick:', li);
      const ctrl = this.props.ctrl;
      const name = li.dataset.action;
      const result = await ctrl.onActionClick(name, ctrl.getActiveRow(true));

      if (!result) {
        throw new Error(`no handler for action '${name}'`);
      }
    });
  }

}

window.QForms.FormView = FormView;
class RowFormView extends FormView {
  renderToolbar() {
    // console.log('RowFormView.renderToolbar');
    const ctrl = this.props.ctrl;
    const text = ctrl.getModel().getApp().getText();
    const width = '120px';
    return /*#__PURE__*/React.createElement("div", {
      className: 'RowFormView__toolbar'
    }, ctrl.model.hasDefaultSqlDataSource() && /*#__PURE__*/React.createElement(Button, {
      key: "edit",
      title: text.form.edit,
      onClick: ctrl.onEditClick,
      visible: ctrl.getMode() === 'view',
      width: width
    }), ctrl.model.hasDefaultSqlDataSource() && /*#__PURE__*/React.createElement(Button, {
      key: "save",
      title: text.form.save,
      enabled: (ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid,
      onClick: ctrl.onSaveClick,
      visible: ctrl.getMode() === 'edit',
      width: width
    }), ctrl.model.hasDefaultSqlDataSource() && /*#__PURE__*/React.createElement(Button, {
      key: "cancel",
      title: text.form.cancel,
      visible: ctrl.getMode() === 'edit' && !ctrl.state.changed && ctrl.state.valid,
      onClick: ctrl.onCancelClick,
      width: width
    }), ctrl.model.hasDefaultSqlDataSource() && /*#__PURE__*/React.createElement(Button, {
      key: "discard",
      title: text.form.discard,
      enabled: ctrl.state.changed || !ctrl.isValid(),
      onClick: ctrl.onDiscardClick,
      visible: ctrl.getMode() === 'edit' && (ctrl.state.changed || !ctrl.state.valid),
      width: width
    }), ctrl.model.hasDefaultSqlDataSource() && /*#__PURE__*/React.createElement(Button, {
      key: "refresh",
      title: text.form.refresh,
      enabled: !ctrl.state.changed && !ctrl.state.hasNew,
      onClick: ctrl.onRefreshClick,
      visible: ctrl.getMode() === 'view',
      width: width
    }), ctrl.model.hasActions() && /*#__PURE__*/React.createElement(DropdownButton, {
      actions: this.getActionsForDropdownButton(),
      title: text.form.actions,
      onClick: this.onActionsClick
    }));
  }

  static renderLabel(fieldCtrl, key) {
    const model = fieldCtrl.model;
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: "label"
    }, model.getCaption(), ":", model.isNotNull() && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'red'
      }
    }, "*"));
  }

  static renderField(fieldCtrl, props = {}) {
    // console.log('RowFormView.renderField', fieldCtrl.model.getClassName());
    return React.createElement(fieldCtrl.getViewClass(), {
      classList: ['field'],
      onCreate: fieldCtrl.onViewCreate,
      ctrl: fieldCtrl,
      ...props
    });
  }

  static renderError(fieldCtrl, key) {
    // console.log('RowFormView.renderError:', fieldCtrl.state);
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: "tooltip"
    }, /*#__PURE__*/React.createElement(Tooltip, {
      position: "left",
      type: "alert",
      hidden: fieldCtrl.getErrorMessage() === null,
      tip: fieldCtrl.getErrorMessage()
    }));
  }

  renderFields() {
    // console.log('RowFormView.renderFields');
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "RowFormView__form-grid"
    }, Object.keys(ctrl.fields).filter(name => ctrl.fields[name].model.isVisible()).map(name => {
      const fieldCtrl = ctrl.fields[name];
      return [RowFormView.renderLabel(fieldCtrl, `label.${fieldCtrl.model.getName()}`), RowFormView.renderField(fieldCtrl, {
        key: `field.${fieldCtrl.model.getName()}`
      }), RowFormView.renderError(fieldCtrl, `tooltip.${fieldCtrl.model.getName()}`)];
    }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('RowFormView.shouldComponentUpdate', nextProps.updated - this.props.updated);
    if (nextProps.updated - this.props.updated) return true;
    return false;
  }

  render() {
    console.log('RowFormView.render', this.props.ctrl.model.getFullName());
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: "RowFormView flex-rows"
    }, (ctrl.model.hasDefaultSqlDataSource() || ctrl.model.hasActions()) && this.renderToolbar(), this.renderFields());
  }

}

window.QForms.RowFormView = RowFormView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TableFormView extends FormView {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderGridCellView", (row, column, onCreate, onUnmount) => {
      // console.log('TableFormView.renderGridCellView');
      const ctrl = this.props.ctrl.fields[column.name]; // console.log(column.name, ctrl.constructor.name);

      return React.createElement(ctrl.getViewClass(), {
        row,
        column,
        onCreate,
        onUnmount,
        ctrl
      });
    });
  }

  renderToolbar() {
    const ctrl = this.props.ctrl;
    const model = ctrl.model;
    const dataSource = model.getDefaultDataSource();
    const width = '120px';
    return /*#__PURE__*/React.createElement("div", {
      className: 'TableFormView__toolbar'
    }, model.data.refreshButton === 'true' && dataSource.constructor.name === 'SqlDataSource' && /*#__PURE__*/React.createElement(Button, {
      key: "refresh",
      width: width,
      title: model.getApp().getText().form.refresh,
      onClick: ctrl.onRefreshClick,
      enabled: !ctrl.parent.model.hasNew()
    }), model.data.newRowMode !== 'disabled' && /*#__PURE__*/React.createElement(Button, {
      key: "new",
      width: width,
      title: model.getApp().getText().form.new,
      onClick: ctrl.onNewClick,
      enabled: !ctrl.parent.model.hasNew()
    }), model.data.deleteRowMode !== 'disabled' && /*#__PURE__*/React.createElement(Button, {
      key: "delete",
      width: width,
      title: model.getApp().getText().form.delete,
      onClick: ctrl.onDeleteClick,
      enabled: ctrl.isRowSelected()
    }), ctrl.model.hasActions() && /*#__PURE__*/React.createElement(DropdownButton, {
      title: model.getApp().getText().form.actions,
      actions: this.getActionsForDropdownButton(),
      onClick: this.onActionsClick,
      enabled: ctrl.isRowSelected()
    }));
  }

  renderPaging() {
    const ctrl = this.props.ctrl;
    const model = this.props.ctrl.model;
    const dataSource = model.getDefaultDataSource();
    const text = model.getApp().getText();
    return /*#__PURE__*/React.createElement("div", {
      className: "paging"
    }, /*#__PURE__*/React.createElement("div", {
      className: "paging__countBlock"
    }, /*#__PURE__*/React.createElement("span", {
      className: "count"
    }, dataSource.getRowsLength(), " ", dataSource.getLimit() && `of ${dataSource.getCount()}`)), dataSource.getLimit() && /*#__PURE__*/React.createElement("div", {
      className: "paging__gotoBlock"
    }, /*#__PURE__*/React.createElement(Button, {
      enabled: ctrl.canPrev(),
      onClick: ctrl.onPreviousClick,
      width: "100px"
    }, text.form.previous), /*#__PURE__*/React.createElement(ComboBox, {
      value: ctrl.model.getDefaultDataSource().getFrame().toString(),
      onChange: ctrl.onFrameChanged,
      items: new Array(dataSource.getFramesCount()).fill().map((val, i) => ({
        value: (i + 1).toString(),
        title: (i + 1).toString()
      }))
    }), /*#__PURE__*/React.createElement(Button, {
      enabled: ctrl.canNext(),
      onClick: ctrl.onNextClick,
      width: "100px"
    }, text.form.next)));
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('TableFormView.shouldComponentUpdate', nextProps.updated - this.props.updated);
    if (nextProps.updated - this.props.updated) return true;
    return false;
  }

  getGridColumns() {
    const ctrl = this.props.ctrl;
    return Object.keys(ctrl.fields).filter(name => ctrl.fields[name].model.isVisible()).map(name => {
      const field = ctrl.fields[name];
      return {
        name: field.model.getName(),
        title: field.model.getCaption(),
        width: field.model.getWidth()
      };
    });
  }

  getRows() {
    const ctrl = this.props.ctrl;
    return ctrl.model.getDefaultDataSource().getRows();
  }

  render() {
    console.log('TableFormView.render', this.props.ctrl.model.getFullName());
    const ctrl = this.props.ctrl;
    const dataSource = ctrl.model.getDefaultDataSource();
    return /*#__PURE__*/React.createElement("div", {
      className: "TableFormView full flex-rows"
    }, this.renderToolbar(), /*#__PURE__*/React.createElement(Grid, {
      classList: ['flex-max'],
      name: ctrl.model.getFullName(),
      columns: this.getGridColumns(),
      rows: this.getRows(),
      getRowKey: row => ctrl.model.getDefaultDataSource().getRowKey(row),
      onDoubleClick: ctrl.onGridCellDblClick,
      onSelectionChange: ctrl.onSelectionChange,
      getActiveRowIndex: ctrl.getActiveRowIndex,
      renderGridCellView: this.renderGridCellView,
      updated: ctrl.getUpdated()
    }), dataSource.constructor.name === 'SqlDataSource' && this.renderPaging());
  }

}

window.QForms.TableFormView = TableFormView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PageView extends View {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onActionsClick", async li => {
      // console.log('PageView.onActionsClick:', li);
      const ctrl = this.props.ctrl;
      const name = li.dataset.action;
      const result = await ctrl.onActionClick(name);

      if (!result) {
        throw new Error(`no handler for action '${name}'`);
      }
    });
  }

  getTabs() {
    const ctrl = this.props.ctrl;
    return ctrl.forms.filter(form => form.model.getClassName() === 'TableForm').map(form => {
      return {
        name: form.model.getName(),
        title: form.model.getCaption(),
        content: PageView.renderForm(form)
      };
    });
  }

  static renderForm(formCtrl) {
    return React.createElement(formCtrl.getViewClass(), {
      key: formCtrl.model.getName(),
      ctrl: formCtrl,
      onCreate: formCtrl.onViewCreate,
      updated: formCtrl.getUpdated()
    });
  }

  renderRowForms() {
    const ctrl = this.props.ctrl;
    return ctrl.forms.filter(form => form.model.getClassName() === 'RowForm').map(form => {
      return PageView.renderForm(form);
    });
  }

  renderCaption() {
    const ctrl = this.props.ctrl;
    const model = ctrl.getModel();
    const key = model.getKey();
    let caption = ctrl.getCaption();

    if (ApplicationController.isInDebugMode()) {
      caption += ` (${model.getId()})`;
    }

    if (key) {
      caption += ` ${key}`;
    }

    if (model.hasRowFormWithDefaultSqlDataSource() && (ctrl.isChanged() || model.hasNew())) {
      return [caption, ' ', /*#__PURE__*/React.createElement("span", {
        key: 'star',
        className: "PageView__star"
      }, "*")];
    }

    return caption;
  }

  renderToolbar() {
    const ctrl = this.props.ctrl;
    const model = ctrl.model;
    const width = 150;
    return /*#__PURE__*/React.createElement("div", {
      className: 'PageView__toolbar'
    }, model.hasRowFormWithDefaultSqlDataSource() && /*#__PURE__*/React.createElement(Button, {
      key: "saveAndClose",
      width: width,
      title: model.getApp().getText().page.saveAndClose,
      onClick: ctrl.onSaveAndCloseClick,
      enabled: ctrl.isValid() && (model.hasNew() || ctrl.isChanged())
    }), model.hasActions() && /*#__PURE__*/React.createElement(DropdownButton, {
      title: model.getApp().getText().page.actions,
      actions: this.getActionsForDropdownButton(),
      onClick: this.onActionsClick
    }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  renderCaption2() {
    const ctrl = this.props.ctrl;
    const model = ctrl.getModel();
    return /*#__PURE__*/React.createElement("h3", {
      className: "PageView__caption"
    }, this.renderCaption(), model.isModal() && /*#__PURE__*/React.createElement("span", {
      className: 'PageView__close',
      onClick: ctrl.onClosePageClick
    }, "\xD7"));
  }

  render() {
    console.log('PageView.render', this.props.ctrl.model.getFullName());
    const ctrl = this.props.ctrl;
    const model = ctrl.getModel();
    return /*#__PURE__*/React.createElement("div", {
      className: "PageView full frame"
    }, /*#__PURE__*/React.createElement("div", {
      className: "frame__content flex-rows"
    }, this.renderCaption2(),
    /*(model.hasRowFormWithDefaultDs() || model.hasActions()) &&*/
    this.renderToolbar(), model.hasRowForm() && this.renderRowForms(), model.hasTableForm() && /*#__PURE__*/React.createElement("div", {
      className: "PageView__table-forms flex-max frame"
    }, /*#__PURE__*/React.createElement("div", {
      className: "frame__content"
    }, /*#__PURE__*/React.createElement(Tab, {
      tabs: this.getTabs(),
      classList: ['Tab-blue', 'full']
    })))));
  }

}

window.QForms.PageView = PageView;
class PageView2 extends PageView {
  getAllTabs() {
    const ctrl = this.props.ctrl;
    return ctrl.forms.map(form => {
      return {
        name: form.model.getName(),
        title: form.model.getCaption(),
        content: PageView.renderForm(form)
      };
    });
  }

  render() {
    console.log('PageView2.render', this.props.ctrl.model.getFullName());
    return /*#__PURE__*/React.createElement("div", {
      className: "PageView full frame"
    }, /*#__PURE__*/React.createElement("div", {
      className: "frame__content flex-rows"
    }, this.renderCaption2(),
    /*(model.hasRowFormWithDefaultDs() || model.hasActions()) &&*/
    this.renderToolbar(), /*#__PURE__*/React.createElement("div", {
      className: "PageView__table-forms flex-max frame"
    }, /*#__PURE__*/React.createElement("div", {
      className: "frame__content"
    }, /*#__PURE__*/React.createElement(Tab, {
      tabs: this.getAllTabs(),
      classList: ['Tab-blue', 'full']
    })))));
  }

}

window.QForms.PageView2 = PageView2;