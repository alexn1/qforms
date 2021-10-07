class View extends ReactComponent {
  getActionsForDropdownButton() {
    return this.props.ctrl.getModel().getCol('actions').map(data => ({
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
      return this.renderPage(ctrl.activePage);
    }
  }

  renderPage(pageCtrl, props = {}) {
    return React.createElement(pageCtrl.getViewClass(), {
      parent: this,
      ctrl: pageCtrl,
      onCreate: pageCtrl.onViewCreate,
      ...props
    });
  }

  renderModalPages() {
    return this.props.ctrl.modalPages.map(pageCtrl => /*#__PURE__*/React.createElement(Modal, {
      key: pageCtrl.getModel().getId()
    }, this.renderPage(pageCtrl)));
  }

  render() {
    console.log(`${this.constructor.name}.render`, this.props.ctrl.model.getFullName());
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__container`
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement(Menu, {
      items: ctrl.getMenuItemsProp(),
      onClick: ctrl.onMenuItemClick
    })), /*#__PURE__*/React.createElement("main", {
      className: `${this.getCssBlockName()}__main`
    }, this.renderActivePage()), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement(Statusbar, {
      onCreate: ctrl.onStatusbarCreate
    })), this.renderModalPages());
  }

}

window.QForms.ApplicationView = ApplicationView;
// class MdiApplicationView extends ApplicationView {
//     getTabs() {
//         return this.props.ctrl.pages.map(pageCtrl => {
//             return {
//                 name   : pageCtrl.model.getId(),
//                 title  : pageCtrl.getTitle(),
//                 content: React.createElement(pageCtrl.getViewClass(), {
//                     ctrl    : pageCtrl,
//                     onCreate: pageCtrl.onViewCreate
//                 })
//             };
//         });
//     }
//     render() {
//         console.log('MdiApplicationView.render', this.props.ctrl.model.getFullName());
//         const ctrl = this.props.ctrl;
//         const model = ctrl.model;
//         return (
//             <div className={`MdiApplicationView ${model.getAttr('theme')}`}>
//                 <Menu items={ctrl.getMenuItemsProp()} onClick={ctrl.onMenuItemClick}/>
//                 <Tab
//                     tabs={this.getTabs()}
//                     canClose={true}
//                     onTabClose={ctrl.onTabClose}
//                     onCreate={ctrl.onTabCreate}
//                     getActive={ctrl.getActivePageIndex}
//                     onTabMouseDown={ctrl.onTabMouseDown}
//                 />
//                 <Statusbar onCreate={ctrl.onStatusbarCreate}/>
//                 {this.renderModalPages()}
//             </div>
//         );
//     }
// }
//
// window.QForms.MdiApplicationView = MdiApplicationView;
/*
class SdiApplicationView extends ApplicationView {

}

window.QForms.SdiApplicationView = SdiApplicationView;
*/
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
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement(CheckBox, {
      onCreate: ctrl.onWidgetCreate,
      checked: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      disabled: !ctrl.isEditable(),
      onChange: ctrl.onChange
    }));
  }

}

window.QForms.RowFormCheckBoxFieldView = RowFormCheckBoxFieldView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RowFormComboBoxFieldView extends RowFormFieldView {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onChange", async widgetValue => {
      // console.log('RowFormComboBoxFieldView.onChange', widgetValue);
      this.rerender();
      await this.props.ctrl.onChange(widgetValue);
    });
  }

  render() {
    // console.log('RowFormComboBoxFieldView.render', this.props.ctrl.getItems(), this.props.ctrl.getValue());
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement(ComboBox, {
      onCreate: ctrl.onWidgetCreate,
      nullable: true,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: this.onChange,
      items: ctrl.getItems(),
      placeholder: ctrl.getPlaceholder(),
      onMouseDown: ctrl.getModel().getAttr('itemSelectPage') ? ctrl.onItemSelect : null
    }), ctrl.getModel().getAttr('itemEditPage') && /*#__PURE__*/React.createElement(Button, {
      onClick: ctrl.onEditButtonClick,
      enabled: !!ctrl.getValue()
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
      className: this.getCssClassNames()
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

  render() {
    // console.log('RowFormDateTimeFieldView.render');
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ${this.props.ctrl.state.value ? 'datetime' : 'date'}`,
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
      className: this.getCssClassNames(),
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
      className: this.getCssClassNames(),
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
      className: this.getCssClassNames()
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
      className: this.getCssClassNames()
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
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement(TextBox, {
      onCreate: ctrl.onWidgetCreate,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: ctrl.onChange,
      placeholder: ctrl.getPlaceholder() || null,
      autocomplete: ctrl.getModel().getAttr('autocomplete') || null
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
      className: this.getCssClassNames()
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
    // console.log('TableFormFieldView.getSpanOffsetWidth', this.span.current);
    if (!this.span.current) return 0;
    return this.span.current.offsetWidth;
  }

}

window.QForms.TableFormFieldView = TableFormFieldView;
class TableFormCheckBoxFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames(),
      style: ctrl.renderViewStyle(row)
    }, /*#__PURE__*/React.createElement(CheckBox, {
      ref: this.span,
      checked: ctrl.getValueForWidget(row),
      readOnly: true,
      disabled: true
    }));
  }

}

window.QForms.TableFormCheckBoxFieldView = TableFormCheckBoxFieldView;
class TableFormComboBoxFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ellipsis`,
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
      className: `${this.getCssClassNames()} ellipsis`,
      style: ctrl.renderViewStyle(row)
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormDatePickerFieldView = TableFormDatePickerFieldView;
class TableFormDateTimeFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ellipsis`,
      style: ctrl.renderViewStyle(row)
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormDateTimeFieldView = TableFormDateTimeFieldView;
class TableFormLinkFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ellipsis`,
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
      className: `${this.getCssClassNames()} ellipsis`,
      style: ctrl.renderViewStyle(row)
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormTextBoxFieldView = TableFormTextBoxFieldView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FormView extends View {
  constructor(props) {
    super(props);

    _defineProperty(this, "onActionsClick", async li => {
      // console.log('FormView.onActionsClick:', li);
      const ctrl = this.props.ctrl;
      const name = li.dataset.action;
      const result = await ctrl.onActionClick(name, ctrl.getActiveRow(true));

      if (!result) {
        throw new Error(`no handler for action '${name}'`);
      }
    });

    this.checkParent();
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
      className: `${this.getCssBlockName()}__toolbar`
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
      className: `${this.getCssBlockName()}__form-grid`
    }, Object.keys(ctrl.fields).filter(name => ctrl.getField(name).getModel().isVisible()).map(name => {
      const fieldCtrl = ctrl.getField(name);
      return [RowFormView.renderLabel(fieldCtrl, `label.${fieldCtrl.getModel().getName()}`), RowFormView.renderField(fieldCtrl, {
        key: `field.${fieldCtrl.getModel().getName()}`
      }), RowFormView.renderError(fieldCtrl, `tooltip.${fieldCtrl.getModel().getName()}`)];
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
      className: `${this.getCssClassNames()} flex-rows grid-gap-5`
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
      const ctrl = this.props.ctrl.getField(column.name);
      if (!ctrl) throw new Error(`no field: ${column.name}`); // console.log(column.name, ctrl.constructor.name);

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
      className: `${this.getCssBlockName()}__toolbar`
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
    return Object.keys(ctrl.fields).filter(name => ctrl.getField(name).getModel().isVisible()).map(name => {
      const field = ctrl.getField(name);
      return {
        name: field.getModel().getName(),
        title: field.getModel().getCaption(),
        width: field.getModel().getWidth()
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
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} full flex-rows grid-gap-5`
    }, this.renderToolbar(), /*#__PURE__*/React.createElement(Grid, {
      classList: ['flex-max'],
      onCreate: ctrl.onGridCreate,
      name: ctrl.model.getFullName(),
      columns: this.getGridColumns(),
      rows: this.getRows(),
      getRowKey: row => ctrl.model.getDefaultDataSource().getRowKey(row),
      onDoubleClick: ctrl.onGridCellDblClick,
      onDeleteClick: ctrl.onGridDeleteClick,
      onSelectionChange: ctrl.onGridSelectionChange,
      onLinkClick: ctrl.onGridLinkClick,
      renderGridCellView: this.renderGridCellView,
      updated: ctrl.getUpdated(),
      extraColumn: true,
      selectedKey: ctrl.getParent().getModel().options.selectedKey,
      createLinkCallback: ctrl.createLinkCallback
    }), ctrl.getModel().hasDefaultSqlDataSource() && this.renderPaging());
  }

}

window.QForms.TableFormView = TableFormView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PageView extends View {
  constructor(props) {
    super(props);

    _defineProperty(this, "onActionsClick", async li => {
      // console.log('PageView.onActionsClick:', li);
      const ctrl = this.props.ctrl;
      const name = li.dataset.action;
      const result = await ctrl.onActionClick(name);

      if (!result) {
        throw new Error(`no handler for action '${name}'`);
      }
    });

    this.checkParent();
  }

  getTabs() {
    const ctrl = this.props.ctrl;
    return ctrl.forms.filter(form => form.model.getClassName() === 'TableForm').map(form => {
      return {
        name: form.model.getName(),
        title: form.getTitle(),
        content: this.renderForm(form)
      };
    });
  }

  renderForm(formCtrl, props = {}) {
    return React.createElement(formCtrl.getViewClass(), {
      parent: this,
      key: formCtrl.getModel().getName(),
      ctrl: formCtrl,
      onCreate: formCtrl.onViewCreate,
      updated: formCtrl.getUpdated(),
      ...props
    });
  }

  renderRowForms() {
    const ctrl = this.props.ctrl;
    return ctrl.forms.filter(form => form.model.getClassName() === 'RowForm').map(form => {
      return this.renderForm(form);
    });
  }

  renderTitle() {
    const ctrl = this.props.ctrl;
    const model = ctrl.getModel();
    const title = ctrl.getTitle();

    if (model.hasRowFormWithDefaultSqlDataSource() && (ctrl.isChanged() || model.hasNew())) {
      return [title, ' ', /*#__PURE__*/React.createElement("span", {
        key: 'star',
        className: `${this.getCssBlockName()}__star`
      }, "*")];
    }

    return title;
  }

  renderCaption() {
    const ctrl = this.props.ctrl;
    const model = ctrl.getModel();
    return /*#__PURE__*/React.createElement("h1", {
      className: `${this.getCssBlockName()}__caption`
    }, this.renderTitle(), model.isModal() && /*#__PURE__*/React.createElement("span", {
      className: `${this.getCssBlockName()}__close`,
      onClick: ctrl.onClosePageClick
    }, "\xD7"));
  }

  renderToolbar() {
    const ctrl = this.props.ctrl;
    const model = ctrl.model;
    const width = 150;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__toolbar`
    }, model.options.selectMode && /*#__PURE__*/React.createElement(Button, {
      title: model.getApp().getText().page.select,
      onClick: ctrl.onSelectClick,
      enabled: !!ctrl.getSelectedRowKey()
    }), model.options.selectMode && /*#__PURE__*/React.createElement(Button, {
      title: model.getApp().getText().page.reset,
      onClick: ctrl.onResetClick
    }), model.hasRowFormWithDefaultSqlDataSource() && model.isModal() && /*#__PURE__*/React.createElement(Button, {
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
  /*shouldComponentUpdate(nextProps, nextState) {
      return false;
  }*/


  render() {
    console.log('PageView.render', this.props.ctrl.model.getFullName());
    const ctrl = this.props.ctrl;
    const model = ctrl.getModel();
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()} full frame`
    }, /*#__PURE__*/React.createElement("div", {
      className: "frame__container flex-rows"
    }, this.renderCaption(),
    /*(model.hasRowFormWithDefaultDs() || model.hasActions()) &&*/
    this.renderToolbar(), model.hasRowForm() && this.renderRowForms(), model.hasTableForm() && /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__table-forms flex-max frame`
    }, /*#__PURE__*/React.createElement("div", {
      className: "frame__container"
    }, /*#__PURE__*/React.createElement(Tab, {
      tabs: this.getTabs(),
      classList: ['Tab-blue', 'full']
    })))));
  }

}

window.QForms.PageView = PageView;
class PageView2 extends PageView {
  getCssBlockName() {
    return 'PageView';
  }

  getAllTabs() {
    const ctrl = this.props.ctrl;
    return ctrl.forms.map(form => {
      return {
        name: form.model.getName(),
        title: form.getTitle(),
        content: this.renderForm(form)
      };
    });
  }

  render() {
    console.log('PageView2.render', this.props.ctrl.model.getFullName());
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()} full frame`
    }, /*#__PURE__*/React.createElement("div", {
      className: 'frame__container flex-rows'
    }, this.renderCaption(),
    /*(model.hasRowFormWithDefaultDs() || model.hasActions()) &&*/
    this.renderToolbar(), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__table-forms flex-max frame`
    }, /*#__PURE__*/React.createElement("div", {
      className: 'frame__container'
    }, /*#__PURE__*/React.createElement(Tab, {
      tabs: this.getAllTabs(),
      classList: ['Tab-blue', 'full']
    })))));
  }

}

window.QForms.PageView2 = PageView2;