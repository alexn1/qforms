class View extends ReactComponent {
  constructor(props) {
    super(props);
    if (!props.ctrl) throw new Error(`${this.constructor.name}: no ctrl`);
    if (!props.onCreate) throw new Error(`${this.constructor.name}: no onCreate`);
  }

  getCtrl() {
    return this.props.ctrl;
  }

}
class AlertView extends View {
  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames(),
      ref: this.el,
      tabIndex: 0,
      onKeyDown: this.getCtrl().onKeyDown
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__container`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__content flex-column`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__header`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__title`,
      style: this.getCtrl().options.titleStyle || {
        color: 'red'
      }
    }, this.getCtrl().options.title || 'Alert'), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__close`,
      onClick: this.getCtrl().onCloseClick
    }, /*#__PURE__*/React.createElement(CloseIcon2, null))), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__main flex-max`
    }, this.getCtrl().options.message), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__footer`
    }, /*#__PURE__*/React.createElement(Button, {
      classList: [`${this.getCssBlockName()}__ok-button`],
      title: 'OK',
      onClick: this.getCtrl().onOkButtonClick
    })))));
  }

  componentDidMount() {
    this.getElement().focus();
  }

}
class ConfirmView extends View {
  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

  render() {
    // console.log('ConfirmView.render', this.getCtrl().options);
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames(),
      ref: this.el,
      tabIndex: 0,
      onKeyDown: this.getCtrl().onKeyDown
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__container`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__content flex-column`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__header`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__title`,
      style: this.getCtrl().options.titleStyle
    }, this.getCtrl().options.title || 'Confirm'), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__close`,
      onClick: this.getCtrl().onCloseClick
    }, /*#__PURE__*/React.createElement(CloseIcon2, null))), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__main flex-max`
    }, this.getCtrl().options.message), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__footer`
    }, /*#__PURE__*/React.createElement(Button, {
      classList: [`${this.getCssBlockName()}__cancel-button`],
      title: this.getCtrl().options.cancelButton || 'Cancel',
      onClick: this.getCtrl().onCloseClick
    }), /*#__PURE__*/React.createElement(Button, {
      classList: [`${this.getCssBlockName()}__ok-button`],
      title: 'OK',
      onClick: this.getCtrl().onOkButtonClick
    })))));
  }

  componentDidMount() {
    this.getElement().focus();
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LoginView extends View {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onLoginFormSubmit", e => {
      // console.log('LoginView.onLoginFormSubmit');
      document.querySelector('.LoginView__button').disabled = true; // e.preventDefault();
    });
  }

  renderLogo() {
    return /*#__PURE__*/React.createElement(PhoneIcon, null);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__container`
    }, /*#__PURE__*/React.createElement("form", {
      className: `${this.getCssBlockName()}__form`,
      method: 'post',
      onSubmit: this.onLoginFormSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: 'hidden',
      name: 'tzOffset',
      value: JSON.stringify(new Date().getTimezoneOffset())
    }), /*#__PURE__*/React.createElement("input", {
      type: 'hidden',
      name: 'action',
      value: 'login'
    }), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__logo`
    }, this.renderLogo()), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__title`
    }, this.getCtrl().getFrontHostApp().getData().title), /*#__PURE__*/React.createElement("input", {
      className: `${this.getCssBlockName()}__field`,
      type: 'text',
      name: 'username',
      placeholder: this.getCtrl().getText().login.username,
      required: true,
      autoFocus: true,
      spellCheck: false
    }), /*#__PURE__*/React.createElement(Password, {
      classList: [`${this.getCssBlockName()}__field2`],
      name: 'password',
      placeholder: this.getCtrl().getText().login.password
    }), /*#__PURE__*/React.createElement("p", {
      className: `${this.getCssBlockName()}__err-msg`
    }, this.getCtrl().getFrontHostApp().getData().errMsg), /*#__PURE__*/React.createElement("button", {
      className: `${this.getCssBlockName()}__button`,
      type: 'submit'
    }, this.getCtrl().getText().login.signIn)));
  }

}
class ImageDialogView extends View {
  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

  render() {
    console.log('ImageDialogView.render');
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames(),
      ref: this.el,
      tabIndex: 0,
      onKeyDown: this.getCtrl().onKeyDown
    }, /*#__PURE__*/React.createElement("img", {
      className: `${this.getCssBlockName()}__image`,
      src: ctrl.getSrc()
    }), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__close`,
      onClick: ctrl.onCloseClick
    }, /*#__PURE__*/React.createElement(CloseIcon2, null)));
  }

  componentDidMount() {
    this.getElement().focus();
  }

}
class ModelView extends View {
  getActionsForDropdownButton() {
    return this.props.ctrl.getModel().getCol('actions').map(data => {
      const actionName = Model.getName(data);
      return {
        name: actionName,
        title: this.renderActionIcon ? [/*#__PURE__*/React.createElement("div", {
          key: 'icon'
        }, this.renderActionIcon(actionName)), /*#__PURE__*/React.createElement("div", {
          key: 'title'
        }, Model.getAttr(data, 'caption'))] : Model.getAttr(data, 'caption'),
        enabled: this.getCtrl().isActionEnabled(actionName)
      };
    });
  }

  getCssBlockName() {
    const model = this.props.ctrl.getModel();

    if (model.isAttr('cssBlock') && model.getAttr('cssBlock')) {
      return model.getAttr('cssBlock');
    }

    return super.getCssBlockName();
  }

  getStyle() {}

}

window.QForms.ModelView = ModelView;
class ApplicationView extends ModelView {
  renderActivePage() {
    const ctrl = this.props.ctrl;

    if (ctrl.activePage) {
      return this.renderView(ctrl.activePage);
    }
  }

  renderView(ctrl, props = {}) {
    return React.createElement(ctrl.getViewClass(), {
      parent: this,
      ctrl: ctrl,
      onCreate: ctrl.onViewCreate,
      ...props
    });
  }

  renderModals() {
    return this.props.ctrl.modals.map(ctrl => {
      if (ctrl instanceof PageController) {
        return /*#__PURE__*/React.createElement(Modal, {
          key: ctrl.getId()
        }, this.renderView(ctrl));
      }

      return this.renderView(ctrl, {
        key: ctrl.getId()
      });
    });
  }

  renderHeader() {
    return /*#__PURE__*/React.createElement("header", {
      className: `${this.getCssBlockName()}__header`
    }, /*#__PURE__*/React.createElement(Menu, {
      items: this.getCtrl().getMenuItemsProp(),
      onClick: this.getCtrl().onMenuItemClick
    }));
  }

  renderMain() {
    return /*#__PURE__*/React.createElement("main", {
      className: `${this.getCssBlockName()}__main`
    }, this.renderActivePage());
  }

  renderFooter() {
    return /*#__PURE__*/React.createElement("footer", {
      className: `${this.getCssBlockName()}__footer`
    }, /*#__PURE__*/React.createElement(Statusbar, {
      onCreate: this.getCtrl().onStatusbarCreate
    }));
  }

  render() {
    console.log(`${this.constructor.name}.render`, this.props.ctrl.model.getFullName());
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__container`,
      style: this.getStyle()
    }, this.renderHeader(), this.renderMain(), this.renderFooter(), this.renderModals());
  }

}

window.QForms.ApplicationView = ApplicationView;
class FieldView extends ModelView {
  getStyle(row) {
    return this.getCtrl().getViewStyle(row);
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RowFormFieldView extends FieldView {
  constructor(props) {
    super(props);

    _defineProperty(this, "onWidgetCreate", widget => {
      this.widget = widget;
    });

    this.widget = null;
  }

  getWidget() {
    return this.widget;
  }

  getClassList() {
    const ctrl = this.getCtrl();
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
      onCreate: this.onWidgetCreate,
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

  isCreateButtonVisible() {
    if (this.getCtrl().getForm().getMode() !== 'edit') {
      return false;
    }

    if (this.getCtrl().getModel().getAttr('newRowMode') === 'disabled') {
      return false;
    }

    if (this.getCtrl().getModel().getAttr('newRowMode') === 'editPage') {
      return !!this.getCtrl().getModel().getAttr('itemEditPage') && !!this.getCtrl().getModel().getAttr('itemCreateForm');
    }

    if (this.getCtrl().getModel().getAttr('newRowMode') === 'createPage') {
      return !!this.getCtrl().getModel().getAttr('itemCreatePage') && !!this.getCtrl().getModel().getAttr('itemCreateForm');
    }
  }

  render() {
    // console.log('RowFormComboBoxFieldView.render', this.props.ctrl.getItems(), this.props.ctrl.getValue());
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement(Select, {
      classList: [`${this.getCssBlockName()}__select`],
      onCreate: this.onWidgetCreate,
      nullable: true,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: this.onChange,
      items: ctrl.getItems(),
      placeholder: ctrl.getPlaceholder(),
      onMouseDown: ctrl.getModel().getAttr('itemSelectPage') ? ctrl.onItemSelect : null
    }), ctrl.getModel().getAttr('itemEditPage') && !!ctrl.getValue() && /*#__PURE__*/React.createElement(Button, {
      classList: [`${this.getCssBlockName()}__edit-button`],
      onClick: ctrl.onEditButtonClick,
      enabled: !!ctrl.getValue()
    }, "..."), this.isCreateButtonVisible() && /*#__PURE__*/React.createElement(Button, {
      classList: [`${this.getCssBlockName()}__create-button`],
      onClick: ctrl.onCreateButtonClick
    }, "+"));
  }

}

window.QForms.RowFormComboBoxFieldView = RowFormComboBoxFieldView;
class RowFormDateFieldView extends RowFormFieldView {
  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement(DropdownDatePicker, {
      classList: [`${this.getCssBlockName()}__date-picker`],
      onCreate: this.onWidgetCreate,
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

window.QForms.RowFormDateFieldView = RowFormDateFieldView;
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

  renderDatePart() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement(DropdownDatePicker, {
      classList: [`${this.getCssBlockName()}__dropdown-date-picker`],
      onCreate: this.onWidgetCreate,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: ctrl.onChange,
      placeholder: ctrl.getPlaceholder(),
      format: ctrl.model.getFormat(),
      oldDates: this.props.oldDates,
      getMinDate: this.props.getMinDate
    });
  }

  renderTimePart() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__time`
    }, /*#__PURE__*/React.createElement(TimeBox, {
      classList: [`${this.getCssBlockName()}__time-box`],
      onCreate: ctrl.onView2Create,
      readOnly: !ctrl.isEditable(),
      value: ctrl.getValueForTime(),
      onChange: ctrl.onChange2,
      onBlur: ctrl.onBlur2,
      placeholder: ctrl.getPlaceholder2()
    }), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__time-close ${this.isCloseVisible() ? 'visible' : ''}`,
      onMouseDown: this.onCloseDown
    }, /*#__PURE__*/React.createElement(CloseIcon, null)), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__time-icon`
    }, /*#__PURE__*/React.createElement(TimeIcon, null)));
  }

  render() {
    // console.log('RowFormDateTimeFieldView.render');
    const ctrl = this.getCtrl();
    const row = ctrl.getRow();
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ${ctrl.state.value ? 'datetime' : 'date'}`,
      style: this.getStyle(row)
    }, this.renderDatePart(), this.renderTimePart());
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

    _defineProperty(this, "onImageClick", async e => {
      console.log('RowFormFileFieldView.onImageClick');
      const ctrl = this.props.ctrl;
      const app = ctrl.getApp();
      const src = ctrl.getValueForWidget();
      const imageDialogCtrl = new ImageDialogController({
        app,
        id: app.getNewId(),
        src,
        onClose: () => {
          console.log('onClose');
          this.getCtrl().getPage().getView().getElement().focus();
        }
      });
      await app.openModal(imageDialogCtrl);
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
    const row = ctrl.getRow();
    const value = ctrl.getValueForWidget();
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames(),
      style: this.getStyle(row)
    }, !!value && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Image, {
      ref: this.image,
      src: value,
      onClick: this.onImageClick
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RowFormImageFieldView extends RowFormFieldView {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onImageClick", async e => {
      const ctrl = this.props.ctrl;
      console.log('RowFormImageFieldView.onImageClick');
    });
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames(),
      style: this.getStyle(ctrl.getRow())
    }, /*#__PURE__*/React.createElement(Image, {
      src: ctrl.getValueForWidget(),
      onClick: this.onImageClick
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RowFormPasswordFieldView extends RowFormFieldView {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCloseClick", async e => {
      // console.log('RowFormPasswordFieldView.onCloseClick');
      const ctrl = this.props.ctrl;
      this.getWidget().state.value = '';
      this.getWidget().setState({
        value: ''
      });
      ctrl.onChange('');
      this.getWidget().getElement().focus();
    });

    _defineProperty(this, "onFocus", async e => {
      // console.log('RowFormPasswordFieldView.onFocus');
      this.addCssClass('focus');
      await this.rerender();
    });

    _defineProperty(this, "onBlur", async e => {
      // console.log('RowFormPasswordFieldView.onBlur');
      this.removeCssClass('focus');
      await this.rerender();
    });

    _defineProperty(this, "onIconClick", e => {
      this.setState(prevState => {
        return {
          type: prevState.type === 'password' ? 'text' : 'password'
        };
      });
    });

    this.state = {
      classList: [],
      type: 'password'
    };
  }

  isCloseVisible() {
    // console.log('RowFormPasswordFieldView.isCloseVisible', this.props.value);
    const ctrl = this.props.ctrl;
    if (!ctrl.isEditable()) return false;

    if (!this.getWidget()) {
      return this.props.value !== undefined;
    } // console.log('this.getWidget().state.value:', this.getWidget().state.value);


    return this.getWidget().state.value !== '';
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement(TextBox, {
      classList: [`${this.getCssBlockName()}__input`],
      type: this.state.type,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      disabled: !ctrl.isEditable(),
      autoFocus: ctrl.isAutoFocus(),
      placeholder: ctrl.getPlaceholder() || null,
      autocomplete: ctrl.getAutocomplete(),
      onCreate: this.onWidgetCreate,
      onChange: ctrl.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur
    }), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`,
      onClick: this.onCloseClick
    }, /*#__PURE__*/React.createElement(CloseIcon, null)), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__icon`,
      onClick: this.onIconClick
    }, this.state.type === 'password' ? /*#__PURE__*/React.createElement(VisibilityIcon, null) : /*#__PURE__*/React.createElement(VisibilityOffIcon, null)));
  }

}

window.QForms.RowFormPasswordFieldView = RowFormPasswordFieldView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RowFormPhoneFieldView extends RowFormFieldView {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCloseClick", async e => {
      const ctrl = this.getCtrl();
      this.getWidget().state.value = '';
      this.getWidget().setState({
        value: ''
      });
      ctrl.onChange('');
      this.getWidget().getElement().focus();
    });

    _defineProperty(this, "onFocus", async e => {
      this.addCssClass('focus');
      await this.rerender();
    });

    _defineProperty(this, "onBlur", async e => {
      this.removeCssClass('focus');
      await this.rerender();
    });

    this.state = {
      classList: []
    };
  }

  isCloseVisible() {
    const ctrl = this.getCtrl();
    if (!ctrl.isEditable()) return false;

    if (!this.getWidget()) {
      return this.props.value !== undefined;
    } // console.log('this.getWidget().state.value:', this.getWidget().state.value);


    return this.getWidget().state.value !== '';
  }

  render() {
    console.log('RowFormPhoneFieldView.render');
    const ctrl = this.getCtrl();
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement(PhoneBox, {
      classList: [`${this.getCssBlockName()}__input`],
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      disabled: !ctrl.isEditable(),
      autoFocus: ctrl.isAutoFocus(),
      placeholder: ctrl.getPlaceholder() || null,
      autocomplete: ctrl.getAutocomplete(),
      onCreate: this.onWidgetCreate,
      onChange: ctrl.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur
    }), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`,
      onClick: this.onCloseClick
    }, /*#__PURE__*/React.createElement(CloseIcon, null)), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__icon`
    }, /*#__PURE__*/React.createElement(PhoneIcon, null)));
  }

}

window.QForms.RowFormPhoneFieldView = RowFormPhoneFieldView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RowFormTextAreaFieldView extends RowFormFieldView {
  constructor(props) {
    super(props);

    _defineProperty(this, "onFocus", async e => {
      // console.log('RowFormTextAreaFieldView.onFocus');
      this.addCssClass('focus');
      await this.rerender();
    });

    _defineProperty(this, "onBlur", async e => {
      // console.log('RowFormTextAreaFieldView.onBlur');
      this.removeCssClass('focus');
      await this.rerender();
    });

    this.state = {
      classList: []
    };
  }

  render() {
    // console.log('RowFormTextAreaFieldView.render', this.state);
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement(TextArea, {
      classList: [`${this.getCssBlockName()}__textarea`],
      onCreate: this.onWidgetCreate,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      disabled: !ctrl.isEditable(),
      onChange: ctrl.onChange,
      placeholder: ctrl.getPlaceholder(),
      rows: ctrl.model.getRows(),
      cols: ctrl.model.getCols(),
      onFocus: this.onFocus,
      onBlur: this.onBlur
    }));
  }

}

window.QForms.RowFormTextAreaFieldView = RowFormTextAreaFieldView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RowFormTextBoxFieldView extends RowFormFieldView {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCloseClick", async e => {
      // console.log('RowFormTextBoxFieldView.onCloseClick');
      const ctrl = this.props.ctrl;
      this.getWidget().state.value = '';
      this.getWidget().setState({
        value: ''
      });
      ctrl.onChange('');
      this.getWidget().getElement().focus();
    });

    _defineProperty(this, "onFocus", async e => {
      // console.log('RowFormTextBoxFieldView.onFocus');
      this.addCssClass('focus');
      await this.rerender();
    });

    _defineProperty(this, "onBlur", async e => {
      // console.log('RowFormTextBoxFieldView.onBlur');
      this.removeCssClass('focus');
      await this.rerender();
    });

    this.state = {
      classList: []
    };
  }

  isCloseVisible() {
    // console.log('RowFormTextBoxFieldView.isCloseVisible', this.props.value);
    const ctrl = this.props.ctrl;
    if (!ctrl.isEditable()) return false;

    if (!this.getWidget()) {
      return this.props.value !== undefined;
    } // console.log('this.getWidget().state.value:', this.getWidget().state.value);


    return this.getWidget().state.value !== '';
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement(TextBox, {
      classList: [`${this.getCssBlockName()}__input`],
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      disabled: !ctrl.isEditable(),
      autoFocus: ctrl.isAutoFocus(),
      placeholder: ctrl.getPlaceholder() || null,
      autocomplete: ctrl.getAutocomplete(),
      onCreate: this.onWidgetCreate,
      onChange: ctrl.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur
    }), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`,
      onClick: this.onCloseClick
    }, /*#__PURE__*/React.createElement(CloseIcon, null)));
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
      this.getWidget().state.value = '';
      this.getWidget().setState({value: ''});
      ctrl.onChange(null);*/
    });
  }

  isCloseVisible() {
    // console.log('RowFormTimeFieldView.isCloseVisible', this.props.value);
    if (this.props.readOnly) return false;

    if (!this.getWidget()) {
      return this.props.value !== undefined;
    } // console.log('this.getWidget().state.value:', ctrl.view.state.value);


    return this.getWidget().state.value !== '';
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement(TimeBox, {
      onCreate: this.onWidgetCreate,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: ctrl.onChange,
      onBlur: ctrl.onBlur,
      placeholder: ctrl.getPlaceholder()
    }), /*#__PURE__*/React.createElement("div", {
      className: `close ${this.isCloseVisible() ? 'visible' : ''}`,
      onClick: this.onCloseClick
    }, /*#__PURE__*/React.createElement(CloseIcon, null)));
  }

}

window.QForms.RowFormTimeFieldView = RowFormTimeFieldView;
class TableFormFieldView extends FieldView {
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
      style: this.getStyle(row)
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
      style: this.getStyle(row)
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormComboBoxFieldView = TableFormComboBoxFieldView;
class TableFormDateFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ellipsis`,
      style: this.getStyle(row)
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormDateFieldView = TableFormDateFieldView;
class TableFormDateTimeFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ellipsis`,
      style: this.getStyle(row)
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
      style: this.getStyle(row)
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: ctrl.onClick
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormLinkFieldView = TableFormLinkFieldView;
class TableFormPhoneFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ellipsis`,
      style: this.getStyle(row)
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, PhoneBox.formatPhoneNumber(this.getCtrl().getValueForWidget(row))));
  }

}
class TableFormTextAreaFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ellipsis`,
      style: this.getStyle(row)
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormTextAreaFieldView = TableFormTextAreaFieldView;
class TableFormTextBoxFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ellipsis`,
      style: this.getStyle(row)
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormTextBoxFieldView = TableFormTextBoxFieldView;
class TableFormTimeFieldView extends TableFormFieldView {
  render() {
    const row = this.props.row;
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ellipsis`,
      style: this.getStyle(row)
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, ctrl.getValueForWidget(row)));
  }

}

window.QForms.TableFormTimeFieldView = TableFormTimeFieldView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FormView extends ModelView {
  constructor(props) {
    super(props);

    _defineProperty(this, "onActionsClick", async li => {
      // console.log('FormView.onActionsClick:', li);
      const ctrl = this.props.ctrl;
      const name = li.dataset.action;

      try {
        const result = await ctrl.onActionClick(name, ctrl.getActiveRow(true));

        if (!result) {
          throw new Error(`no handler for action '${name}'`);
        }
      } catch (err) {
        await this.getCtrl().getApp().alert({
          message: err.message
        });
      }
    });

    this.checkParent();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('FormView.shouldComponentUpdate', nextProps.updated - this.props.updated);
    if (nextProps.updated - this.props.updated) return true;
    return false;
  }

}

window.QForms.FormView = FormView;
class RowFormView extends FormView {
  renderToolbar() {
    // console.log('RowFormView.renderToolbar');
    const ctrl = this.props.ctrl;
    const text = ctrl.getModel().getApp().getText();
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__toolbar flex grid-gap-5`
    }, ctrl.model.hasDefaultSqlDataSource() && /*#__PURE__*/React.createElement(Button, {
      key: "edit",
      classList: ['toolbar-button'],
      onClick: ctrl.onEditClick,
      visible: ctrl.getMode() === 'view'
    }, /*#__PURE__*/React.createElement(EditIcon, null), /*#__PURE__*/React.createElement("div", null, text.form.edit)), ctrl.model.hasDefaultSqlDataSource() && /*#__PURE__*/React.createElement(Button, {
      key: "save",
      classList: ['toolbar-button'],
      enabled: (ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid,
      onClick: ctrl.onSaveClick,
      visible: ctrl.getMode() === 'edit'
    }, /*#__PURE__*/React.createElement(SaveIcon, null), /*#__PURE__*/React.createElement("div", null, text.form.save)), ctrl.model.hasDefaultSqlDataSource() && ctrl.model.getKey() && /*#__PURE__*/React.createElement(Button, {
      key: "cancel",
      classList: ['toolbar-button'],
      visible: ctrl.getMode() === 'edit' && !ctrl.state.changed && ctrl.state.valid,
      onClick: ctrl.onCancelClick
    }, /*#__PURE__*/React.createElement(CancelIcon, null), /*#__PURE__*/React.createElement("div", null, text.form.cancel)), ctrl.model.hasDefaultSqlDataSource() && ctrl.model.getKey() && /*#__PURE__*/React.createElement(Button, {
      key: "discard",
      classList: ['toolbar-button'],
      enabled: ctrl.state.changed || !ctrl.isValid(),
      onClick: ctrl.onDiscardClick,
      visible: ctrl.getMode() === 'edit' && (ctrl.state.changed || !ctrl.state.valid)
    }, /*#__PURE__*/React.createElement(CloseIcon2, null), /*#__PURE__*/React.createElement("div", null, text.form.discard)), ctrl.model.hasDefaultSqlDataSource() && ctrl.getModel().getAttr('refreshButton') === 'true' && /*#__PURE__*/React.createElement(Button, {
      key: "refresh",
      classList: ['toolbar-button'],
      enabled: !ctrl.state.changed && !ctrl.state.hasNew,
      onClick: ctrl.onRefreshClick,
      visible: ctrl.getMode() === 'view'
    }, /*#__PURE__*/React.createElement(RefreshIcon, null), /*#__PURE__*/React.createElement("div", null, text.form.refresh)), this.isActionsVisible() && ctrl.model.hasActions() && /*#__PURE__*/React.createElement(DropdownButton, {
      classList: ['toolbar-dropdown-button'],
      actions: this.getActionsForDropdownButton(),
      onClick: this.onActionsClick,
      enabled: this.isActionsEnabled()
    }, /*#__PURE__*/React.createElement(MoreVertIcon, null)));
  }

  isActionsEnabled() {
    // return this.getCtrl().state.mode === 'view';
    return true;
  }

  isActionsVisible() {
    if (this.getCtrl().getModel().hasDefaultSqlDataSource()) {
      return !!this.getCtrl().getModel().getKey();
    }

    return true;
  }

  renderLabel(fieldCtrl, key) {
    const model = fieldCtrl.model;
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: `${this.getCssBlockName()}__label`
    }, model.getCaption(), ":", model.isNotNull() && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'red'
      }
    }, "*"));
  }

  renderField(fieldCtrl, key) {
    // console.log('RowFormView.renderField2', fieldCtrl.model.getClassName());
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: `${this.getCssBlockName()}__field`
    }, React.createElement(fieldCtrl.getViewClass(), {
      onCreate: fieldCtrl.onViewCreate,
      ctrl: fieldCtrl
    }));
  }

  renderError(fieldCtrl, key) {
    // console.log('RowFormView.renderError:', fieldCtrl.state);
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: `${this.getCssBlockName()}__error`
    }, /*#__PURE__*/React.createElement(Tooltip, {
      position: "left",
      type: "alert",
      hidden: fieldCtrl.getErrorMessage() === null,
      tip: fieldCtrl.getErrorMessage()
    }));
  }

  renderItem(fieldCtrl) {
    const name = fieldCtrl.getModel().getName();
    return [this.renderLabel(fieldCtrl, `label.${name}`), this.renderField(fieldCtrl, `field.${name}`), this.renderError(fieldCtrl, `tooltip.${name}`)];
  }

  renderGrid() {
    // console.log('RowFormView.renderGrid');
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__grid`
    }, Object.keys(ctrl.fields).filter(name => ctrl.getField(name).isVisible()).map(name => {
      return this.renderItem(ctrl.getField(name));
    }));
  }

  render() {
    console.log('RowFormView.render', this.getCtrl().getModel().getFullName());
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} flex-column grid-gap-5`,
      style: this.getStyle()
    }, (this.getCtrl().getModel().hasDefaultSqlDataSource() || this.getCtrl().getModel().hasActions()) && this.renderToolbar(), this.renderGrid());
  }
  /*renderActionIcon() {
      return <CancelIcon/>;
  }*/


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

    _defineProperty(this, "createLinkCallback", key => {
      return PageController.createLink({
        page: this.getCtrl().getModel().getAttr('itemEditPage'),
        ...DataSource.keyToParams(key)
      });
    });
  }

  renderToolbar() {
    const ctrl = this.props.ctrl;
    const model = ctrl.model;
    const dataSource = model.getDefaultDataSource();
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__toolbar flex grid-gap-5`
    }, model.data.newRowMode !== 'disabled' && /*#__PURE__*/React.createElement(Button, {
      key: "new",
      classList: ['toolbar-button', 'default'],
      onClick: ctrl.onNewClick,
      enabled: !ctrl.parent.model.hasNew()
    }, /*#__PURE__*/React.createElement(AddIcon, null), /*#__PURE__*/React.createElement("div", null, model.getApp().getText().form.new)), model.data.deleteRowMode !== 'disabled' && /*#__PURE__*/React.createElement(Button, {
      key: "delete",
      classList: ['toolbar-button'],
      onClick: ctrl.onDeleteClick,
      enabled: ctrl.isRowSelected()
    }, /*#__PURE__*/React.createElement(DeleteIcon, null), /*#__PURE__*/React.createElement("div", null, model.getApp().getText().form.delete)), model.data.refreshButton === 'true' && dataSource.constructor.name === 'SqlDataSource' && /*#__PURE__*/React.createElement(Button, {
      key: "refresh",
      classList: ['toolbar-button'],
      onClick: ctrl.onRefreshClick,
      enabled: !ctrl.parent.model.hasNew()
    }, /*#__PURE__*/React.createElement(RefreshIcon, null), /*#__PURE__*/React.createElement("div", null, model.getApp().getText().form.refresh)), ctrl.model.hasActions() && /*#__PURE__*/React.createElement(DropdownButton, {
      classList: ['toolbar-dropdown-button'],
      actions: this.getActionsForDropdownButton(),
      onClick: this.onActionsClick
    }, /*#__PURE__*/React.createElement(MoreVertIcon, null)));
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
      onClick: ctrl.onPreviousClick
    }, /*#__PURE__*/React.createElement(LeftIcon, null)), /*#__PURE__*/React.createElement(ComboBox, {
      value: ctrl.model.getDefaultDataSource().getFrame().toString(),
      onChange: ctrl.onFrameChanged,
      items: new Array(dataSource.getFramesCount()).fill().map((val, i) => ({
        value: (i + 1).toString(),
        title: (i + 1).toString()
      }))
    }), /*#__PURE__*/React.createElement(Button, {
      enabled: ctrl.canNext(),
      onClick: ctrl.onNextClick
    }, /*#__PURE__*/React.createElement(RightIcon, null))));
  }

  getGridColumns() {
    const ctrl = this.props.ctrl;
    return Object.keys(ctrl.fields).filter(name => ctrl.getField(name).isVisible()).map(name => {
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

  getGridExtraColumn() {
    return true;
  }

  getGridClass() {
    return Grid;
  }

  renderGrid() {
    const ctrl = this.props.ctrl;
    return React.createElement(this.getGridClass(), {
      classList: ['flex-max'],
      onCreate: ctrl.onGridCreate,
      name: ctrl.model.getFullName(),
      columns: this.getGridColumns(),
      rows: this.getRows(),
      getRowKey: row => ctrl.model.getDefaultDataSource().getRowKey(row),
      onDoubleClick: ctrl.onGridCellDblClick,
      onDeleteKeyDown: ctrl.onGridDeleteKeyDown,
      onSelectionChange: ctrl.onGridSelectionChange,
      onLinkClick: ctrl.onGridLinkClick,
      renderGridCellView: this.renderGridCellView,
      updated: ctrl.getUpdated(),
      extraColumn: this.getGridExtraColumn(),
      selectedKey: ctrl.getPage().getModel().getOptions().selectedKey,
      createLinkCallback: this.createLinkCallback
    });
  }

  render() {
    console.log('TableFormView.render', this.props.ctrl.model.getFullName());
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} full flex-column grid-gap-5`,
      style: this.getStyle()
    }, this.renderToolbar(), this.renderGrid(), ctrl.getModel().hasDefaultSqlDataSource() && this.renderPaging());
  }

}

window.QForms.TableFormView = TableFormView;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PageView extends ModelView {
  constructor(props) {
    super(props);

    _defineProperty(this, "onActionsClick", async li => {
      // console.log('PageView.onActionsClick:', li);
      const ctrl = this.props.ctrl;
      const name = li.dataset.action;

      try {
        const result = await ctrl.onActionClick(name);

        if (!result) {
          throw new Error(`no handler for action '${name}'`);
        }
      } catch (err) {
        await this.getCtrl().getApp().alert({
          message: err.message
        });
      }
    });

    this.checkParent();
    this.el = React.createRef();
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
    return this.getRowForms().map(form => this.renderForm(form));
  }

  renderTitle() {
    const ctrl = this.props.ctrl;
    const model = ctrl.getModel();
    return /*#__PURE__*/React.createElement("h1", {
      className: `${this.getCssBlockName()}__title`
    }, ctrl.getTitle(), model.hasRowFormWithDefaultSqlDataSource() && (ctrl.isChanged() || model.hasNew()) && [' ', /*#__PURE__*/React.createElement("span", {
      key: 'star',
      className: `${this.getCssBlockName()}__star`
    }, "*")]);
  }

  renderToolbar() {
    const ctrl = this.props.ctrl;
    const model = ctrl.model;
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__toolbar`
    }, model.options.selectMode && /*#__PURE__*/React.createElement(Button, {
      classList: ['toolbar-button', 'default'],
      onClick: ctrl.onSelectClick,
      enabled: !!ctrl.getSelectedRowKey()
    }, /*#__PURE__*/React.createElement(DoneIcon, null), /*#__PURE__*/React.createElement("div", null, model.getApp().getText().page.select)), model.isModal() && model.hasRowFormWithDefaultSqlDataSource() && /*#__PURE__*/React.createElement(Button, {
      classList: ['toolbar-button', 'default'],
      onClick: ctrl.onSaveAndCloseClick,
      enabled: ctrl.isValid() && (model.hasNew() || ctrl.isChanged())
    }, /*#__PURE__*/React.createElement(DoneIcon, null), /*#__PURE__*/React.createElement("div", null, model.getApp().getText().page.saveAndClose)), model.hasActions() && /*#__PURE__*/React.createElement(DropdownButton, {
      classList: ['toolbar-dropdown-button'],
      actions: this.getActionsForDropdownButton(),
      onClick: this.onActionsClick
    }, /*#__PURE__*/React.createElement(MoreVertIcon, null)));
  }
  /*shouldComponentUpdate(nextProps, nextState) {
      return false;
  }*/


  isToolbar() {
    const model = this.getCtrl().getModel();
    return model.options.selectMode || model.isModal() && model.hasRowFormWithDefaultSqlDataSource() || model.hasActions();
  }

  renderTableForms() {
    const tableForms = this.getTableForms();

    if (tableForms.length === 1) {
      return this.renderForm(tableForms[0]);
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: `${this.getCssBlockName()}__table-forms flex-max frame`
      }, /*#__PURE__*/React.createElement("div", {
        className: "frame__container"
      }, /*#__PURE__*/React.createElement(Tab, {
        tabs: this.getTabs(),
        classList: ['Tab-blue', 'full']
      })));
    }
  }

  getTabs() {
    return this.getTableForms().map(form => {
      return {
        name: form.model.getName(),
        title: form.getTitle(),
        content: this.renderForm(form)
      };
    });
  }

  getRowForms() {
    return this.getCtrl().forms.filter(form => form.getModel().getClassName() === 'RowForm');
  }

  getTableForms() {
    return this.getCtrl().forms.filter(form => form.getModel().getClassName() === 'TableForm');
  }

  renderOpenPageHeaderButton() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      key: 'open',
      className: `${this.getCssBlockName()}__open`,
      onClick: ctrl.onOpenPageClick
    }, /*#__PURE__*/React.createElement(OpenInNewIcon, null));
  }

  renderClosePageHeaderButton() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/React.createElement("div", {
      key: 'close',
      className: `${this.getCssBlockName()}__close`,
      onClick: ctrl.onClosePageClick
    }, /*#__PURE__*/React.createElement(CloseIcon2, null));
  }

  renderHeader() {
    const ctrl = this.props.ctrl;
    const model = ctrl.getModel();
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__header`
    }, this.renderTitle(), model.isModal() && [...(model.getKey() ? [this.renderOpenPageHeaderButton()] : []), this.renderClosePageHeaderButton()]);
  }

  renderMain() {
    const model = this.getCtrl().getModel();
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__main flex-max frame`
    }, /*#__PURE__*/React.createElement("div", {
      className: "frame__container flex-column grid-gap-10"
    }, this.isToolbar() && this.renderToolbar(), model.hasRowForm() && this.renderRowForms(), model.hasTableForm() && this.renderTableForms()));
  }

  renderFooter() {}

  render() {
    console.log('PageView.render', this.getCtrl().getModel().getFullName());
    return /*#__PURE__*/React.createElement("div", {
      ref: this.el,
      tabIndex: 0,
      onKeyDown: this.getCtrl().onKeyDown,
      className: `${this.getCssClassNames()} ${this.getCtrl().isModal() ? '' : 'full'} flex-column`,
      style: this.getStyle()
    }, this.renderHeader(), this.renderMain(), this.renderFooter());
  }

  getStyle() {
    if (this.getCtrl().isModal()) {
      return {
        width: 1000,
        height: 750
      };
    }
  }

  componentDidMount() {
    // console.log('PageView.componentDidMount', this.getCtrl().getModel().getFullName());
    if (this.getCtrl().isAutoFocus() && !this.getCtrl().getModel().getKey()) {} else {
      this.focus();
    }
  }

  focus() {
    // console.log('PageView.focus', this.getCtrl().getModel().getFullName());
    if (this.getElement()) {
      // console.log('focus', this.getElement());
      this.getElement().focus();
    } else {
      console.error(`${this.getCtrl().getModel().getFullName()}: element is null`);
    }
  }

}

window.QForms.PageView = PageView;