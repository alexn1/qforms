class View extends ReactComponent{constructor(e){if(super(e),!e.ctrl)throw new Error(this.constructor.name+": no ctrl");if(!e.onCreate)throw new Error(this.constructor.name+": no onCreate")}getCtrl(){return this.props.ctrl}}class AlertView extends View{constructor(e){super(e),this.el=React.createRef()}getHeaderStyle(){return this.getCtrl().options.titleStyle}render(){return React.createElement("div",{className:this.getCssClassNames(),ref:this.el,tabIndex:0,onKeyDown:this.getCtrl().onKeyDown},React.createElement("div",{className:this.getCssBlockName()+"__container"},React.createElement("div",{className:this.getCssBlockName()+"__content flex-column"},React.createElement("div",{className:this.getCssBlockName()+"__header"},React.createElement("div",{className:this.getCssBlockName()+"__title",style:this.getHeaderStyle()},this.getCtrl().options.title||"Alert"),React.createElement("div",{className:this.getCssBlockName()+"__close",onClick:this.getCtrl().onCloseClick},React.createElement(CloseIcon2,null))),React.createElement("div",{className:this.getCssBlockName()+"__main flex-max"},this.getCtrl().options.message),React.createElement("div",{className:this.getCssBlockName()+"__footer"},React.createElement(Button,{classList:[this.getCssBlockName()+"__ok-button"],title:"OK",onClick:this.getCtrl().onOkButtonClick})))))}componentDidMount(){this.getElement().focus()}}class ConfirmView extends View{constructor(e){super(e),this.el=React.createRef()}render(){if(!this.getCtrl().options.yesButton)throw new Error("no yesButton option");if(!this.getCtrl().options.noButton)throw new Error("no noButton option");return React.createElement("div",{className:this.getCssClassNames(),ref:this.el,tabIndex:0,onKeyDown:this.getCtrl().onKeyDown},React.createElement("div",{className:this.getCssBlockName()+"__container"},React.createElement("div",{className:this.getCssBlockName()+"__content flex-column"},React.createElement("div",{className:this.getCssBlockName()+"__header"},React.createElement("div",{className:this.getCssBlockName()+"__title",style:this.getCtrl().options.titleStyle},this.getCtrl().options.title||"Confirm"),React.createElement("div",{className:this.getCssBlockName()+"__close",onClick:this.getCtrl().onCloseClick},React.createElement(CloseIcon2,null))),React.createElement("div",{className:this.getCssBlockName()+"__main flex-max"},this.getCtrl().options.message),React.createElement("div",{className:this.getCssBlockName()+"__footer"},React.createElement(Button,{classList:[this.getCssBlockName()+"__no-button"],title:this.getCtrl().options.noButton,onClick:this.getCtrl().onCloseClick}),React.createElement(Button,{classList:[this.getCssBlockName()+"__yes-button"],title:this.getCtrl().options.yesButton,onClick:this.getCtrl().onYesClick})))))}componentDidMount(){this.getElement().focus()}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class LoginView extends View{constructor(e){super(e),_defineProperty(this,"onLoginFormSubmit",e=>{document.querySelector(".LoginView__button").disabled=!0}),_defineProperty(this,"onChange",e=>{this.errMsgRef.current.innerHTML=""}),this.errMsgRef=React.createRef()}renderLogo(){}renderTitle(){return this.getCtrl().getFrontHostApp().getData().title}render(){return React.createElement("div",{className:this.getCssBlockName()+"__container"},React.createElement("form",{className:this.getCssBlockName()+"__form",method:"post",onSubmit:this.onLoginFormSubmit},React.createElement("input",{type:"hidden",name:"tzOffset",value:JSON.stringify((new Date).getTimezoneOffset())}),React.createElement("input",{type:"hidden",name:"action",value:"login"}),React.createElement("div",{className:this.getCssBlockName()+"__logo-title"},React.createElement("div",{className:this.getCssBlockName()+"__logo"},this.renderLogo()),React.createElement("div",{className:this.getCssBlockName()+"__title"},this.renderTitle())),React.createElement(TextBox,{classList:[this.getCssBlockName()+"__field"],name:"username",placeholder:this.getCtrl().getText().login.username,required:!0,autoFocus:!0,spellCheck:!1,value:this.getCtrl().getFrontHostApp().getData().username||"",onChange:this.onChange}),React.createElement(Password,{classList:[this.getCssBlockName()+"__field2"],name:"password",placeholder:this.getCtrl().getText().login.password,value:this.getCtrl().getFrontHostApp().getData().password||"",onChange:this.onChange}),React.createElement("p",{className:this.getCssBlockName()+"__err-msg",ref:this.errMsgRef},this.getCtrl().getFrontHostApp().getData().errMsg),React.createElement("button",{className:this.getCssBlockName()+"__button",type:"submit"},this.getCtrl().getText().login.signIn)))}}class ImageDialogView extends View{constructor(e){super(e),this.el=React.createRef()}render(){console.log("ImageDialogView.render");const e=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames(),ref:this.el,tabIndex:0,onKeyDown:this.getCtrl().onKeyDown},React.createElement("img",{className:this.getCssBlockName()+"__image",src:e.getSrc()}),React.createElement("div",{className:this.getCssBlockName()+"__close",onClick:e.onCloseClick},React.createElement(CloseIcon2,null)))}componentDidMount(){this.getElement().focus()}}class ModelView extends View{getActionsForDropdownButton(){return this.props.ctrl.getModel().getCol("actions").map(e=>{var t=Model.getName(e);return{name:t,title:this.renderActionIcon?[React.createElement("div",{key:"icon"},this.renderActionIcon(t)),React.createElement("div",{key:"title"},Model.getAttr(e,"caption"))]:Model.getAttr(e,"caption"),enabled:this.getCtrl().isActionEnabled(t)}})}getCssBlockName(){const e=this.props.ctrl.getModel();return e.isAttr("cssBlock")&&e.getAttr("cssBlock")?e.getAttr("cssBlock"):super.getCssBlockName()}getStyle(){}}window.QForms.ModelView=ModelView;class ApplicationView extends ModelView{renderActivePage(){var e=this.props.ctrl;if(e.activePage)return this.renderView(e.activePage)}renderView(e,t={}){return React.createElement(e.getViewClass(),{parent:this,ctrl:e,onCreate:e.onViewCreate,...t})}renderModals(){return this.props.ctrl.modals.map(e=>e instanceof PageController?React.createElement(Modal,{key:e.getId()},this.renderView(e)):this.renderView(e,{key:e.getId()}))}renderHeader(){return React.createElement("header",{className:this.getCssBlockName()+"__header"},React.createElement(Menu,{items:this.getCtrl().getMenuItemsProp(),onClick:this.getCtrl().onMenuItemClick}))}renderMain(){return React.createElement("main",{className:this.getCssBlockName()+"__main"},this.renderActivePage())}renderFooter(){return React.createElement("footer",{className:this.getCssBlockName()+"__footer"},React.createElement(Statusbar,{onCreate:this.getCtrl().onStatusbarCreate}))}render(){return console.log(this.constructor.name+".render",this.props.ctrl.model.getFullName()),React.createElement("div",{className:this.getCssBlockName()+"__container",style:this.getStyle()},this.renderHeader(),this.renderMain(),this.renderFooter(),this.renderModals())}}window.QForms.ApplicationView=ApplicationView;class FieldView extends ModelView{getStyle(e){return this.getCtrl().getViewStyle(e)}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class RowFormFieldView extends FieldView{constructor(e){super(e),_defineProperty(this,"onWidgetCreate",e=>{this.widget=e}),this.widget=null}getWidget(){return this.widget}getClassList(){const e=this.getCtrl();return[...super.getClassList(),...e.isChanged()?["changed"]:[],...null!==e.getErrorMessage()?["error"]:[]]}}window.QForms.RowFormFieldView=RowFormFieldView;class RowFormCheckBoxFieldView extends RowFormFieldView{render(){const e=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()},React.createElement(CheckBox,{onCreate:this.onWidgetCreate,checked:e.getValueForWidget(),readOnly:!e.isEditable(),disabled:!e.isEditable(),onChange:e.onChange}))}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}window.QForms.RowFormCheckBoxFieldView=RowFormCheckBoxFieldView;class RowFormComboBoxFieldView extends RowFormFieldView{constructor(...e){super(...e),_defineProperty(this,"onChange",async e=>{this.rerender(),await this.props.ctrl.onChange(e)})}isCreateButtonVisible(){return"edit"===this.getCtrl().getForm().getMode()&&("disabled"!==this.getCtrl().getModel().getAttr("newRowMode")&&("editPage"===this.getCtrl().getModel().getAttr("newRowMode")?!!this.getCtrl().getModel().getAttr("itemEditPage")&&!!this.getCtrl().getModel().getAttr("itemCreateForm"):"createPage"===this.getCtrl().getModel().getAttr("newRowMode")?!!this.getCtrl().getModel().getAttr("itemCreatePage")&&!!this.getCtrl().getModel().getAttr("itemCreateForm"):void 0))}render(){const e=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()},React.createElement(Select,{classList:[this.getCssBlockName()+"__select"],onCreate:this.onWidgetCreate,nullable:!0,value:e.getValueForWidget(),readOnly:!e.isEditable(),onChange:this.onChange,items:e.getItems(),placeholder:e.getPlaceholder(),onMouseDown:e.getModel().getAttr("itemSelectPage")?e.onItemSelect:null}),e.getModel().getAttr("itemEditPage")&&!!e.getValue()&&React.createElement(Button,{classList:[this.getCssBlockName()+"__edit-button"],onClick:e.onEditButtonClick,enabled:!!e.getValue()},"..."),this.isCreateButtonVisible()&&React.createElement(Button,{classList:[this.getCssBlockName()+"__create-button"],onClick:e.onCreateButtonClick},"+"))}}window.QForms.RowFormComboBoxFieldView=RowFormComboBoxFieldView;class RowFormDateFieldView extends RowFormFieldView{render(){const e=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()},React.createElement(DropdownDatePicker,{classList:[this.getCssBlockName()+"__date-picker"],onCreate:this.onWidgetCreate,value:e.getValueForWidget(),readOnly:!e.isEditable(),onChange:e.onChange,placeholder:e.getPlaceholder(),format:e.getFormat(),oldDates:this.props.oldDates,getMinDate:this.props.getMinDate}))}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}window.QForms.RowFormDateFieldView=RowFormDateFieldView;class RowFormDateTimeFieldView extends RowFormFieldView{constructor(...e){super(...e),_defineProperty(this,"onCloseDown",async e=>{console.log("RowFormDateTimeFieldView.onCloseDown");const t=this.props.ctrl;t.widget2.setState({value:""},()=>{t.onChange2(null)})})}isCloseVisible(){if(this.props.readOnly)return!1;var e=this.props.ctrl;return e.widget2?""!==e.widget2.state.value:void 0!==this.props.value}renderDatePart(){const e=this.props.ctrl;return React.createElement(DropdownDatePicker,{classList:[this.getCssBlockName()+"__dropdown-date-picker"],onCreate:this.onWidgetCreate,value:e.getValueForWidget(),readOnly:!e.isEditable(),onChange:e.onChange,placeholder:e.getPlaceholder(),format:e.getFormat(),oldDates:this.props.oldDates,getMinDate:this.props.getMinDate,highlightedDate:e.getHighlightedDate?e.getHighlightedDate():null})}renderTimePart(){const e=this.props.ctrl;return React.createElement("div",{className:this.getCssBlockName()+"__time"},React.createElement(TimeBox,{classList:[this.getCssBlockName()+"__time-box"],onCreate:e.onView2Create,readOnly:!e.isEditable(),value:e.getValueForTime(),onChange:e.onChange2,onBlur:e.onBlur2,placeholder:e.getPlaceholder2()}),React.createElement("div",{className:this.getCssBlockName()+"__time-close "+(this.isCloseVisible()?"visible":""),onMouseDown:this.onCloseDown},React.createElement(CloseIcon,null)),React.createElement("div",{className:this.getCssBlockName()+"__time-icon"},React.createElement(TimeIcon,null)))}render(){const e=this.getCtrl();var t=e.getRow();return React.createElement("div",{className:this.getCssClassNames()+" "+(e.state.value?"datetime":"date"),style:this.getStyle(t)},this.renderDatePart(),this.renderTimePart())}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}window.QForms.RowFormDateTimeFieldView=RowFormDateTimeFieldView;class RowFormFileFieldView extends RowFormFieldView{constructor(e){super(e),_defineProperty(this,"onClearClick",e=>{this.props.ctrl.onChange("")}),_defineProperty(this,"onChange",async e=>{e=e.target.files[0],e=await Helper.readFileAsDataURL(e);this.props.ctrl.onChange(e)}),_defineProperty(this,"onImageClick",async e=>{console.log("RowFormFileFieldView.onImageClick");const t=this.props.ctrl,s=t.getApp();var r=t.getValueForWidget(),r=new ImageDialogController({app:s,id:s.getNewId(),src:r,onClose:()=>{console.log("onClose"),this.getCtrl().getPage().getView().getElement().focus()}});await s.openModal(r)}),this.image=React.createRef(),this.div=React.createRef()}getImage(){return this.image.current}getDiv(){return this.div.current}updateSize(){var e;this.getImage()&&(e=this.getImage().getNaturalSize(),this.getDiv().innerText=e[0]+"×"+e[1])}render(){const e=this.props.ctrl;var t=e.getRow(),s=e.getValueForWidget();return React.createElement("div",{className:this.getCssClassNames(),style:this.getStyle(t)},!!s&&React.createElement("div",null,React.createElement(Image,{ref:this.image,src:s,onClick:this.onImageClick}),React.createElement("span",{className:"size",ref:this.div}),React.createElement("span",{className:"length"},Helper.formatNumber(s.length))),React.createElement("input",{type:"file",onChange:this.onChange,disabled:!e.isEditable()}),!!s&&React.createElement(Button,{onClick:this.onClearClick,enabled:e.isEditable()},"Clear"))}componentDidMount(){setTimeout(()=>this.updateSize(),0)}componentDidUpdate(e,t,s){setTimeout(()=>this.updateSize(),0)}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}window.QForms.RowFormFileFieldView=RowFormFileFieldView;class RowFormImageFieldView extends RowFormFieldView{constructor(...e){super(...e),_defineProperty(this,"onImageClick",async e=>{this.props.ctrl;console.log("RowFormImageFieldView.onImageClick")})}render(){const e=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames(),style:this.getStyle(e.getRow())},React.createElement(Image,{src:e.getValueForWidget(),onClick:this.onImageClick}))}}window.QForms.RowFormImageFieldView=RowFormImageFieldView;class RowFormLinkFieldView extends RowFormFieldView{render(){const e=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()},React.createElement("a",{href:"#",onClick:e.onClick},e.getValueForWidget()))}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}window.QForms.RowFormLinkFieldView=RowFormLinkFieldView;class RowFormPasswordFieldView extends RowFormFieldView{constructor(e){super(e),_defineProperty(this,"onCloseClick",async e=>{const t=this.props.ctrl;this.getWidget().state.value="",this.getWidget().setState({value:""}),t.onChange(""),this.getWidget().getElement().focus()}),_defineProperty(this,"onFocus",async e=>{this.addCssClass("focus"),await this.rerender()}),_defineProperty(this,"onBlur",async e=>{this.removeCssClass("focus"),await this.rerender()}),_defineProperty(this,"onIconClick",e=>{this.setState(e=>({type:"password"===e.type?"text":"password"}))}),this.state={classList:[],type:"password"}}isCloseVisible(){const e=this.props.ctrl;return!!e.isEditable()&&(this.getWidget()?""!==this.getWidget().state.value:void 0!==this.props.value)}render(){const e=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()},React.createElement(TextBox,{classList:[this.getCssBlockName()+"__input"],type:this.state.type,value:e.getValueForWidget(),readOnly:!e.isEditable(),disabled:!e.isEditable(),autoFocus:e.isAutoFocus(),placeholder:e.getPlaceholder()||null,autocomplete:e.getAutocomplete(),onCreate:this.onWidgetCreate,onChange:e.onChange,onFocus:this.onFocus,onBlur:this.onBlur}),React.createElement("div",{className:this.getCssBlockName()+"__close "+(this.isCloseVisible()?"visible":""),onClick:this.onCloseClick},React.createElement(CloseIcon,null)),React.createElement("div",{className:this.getCssBlockName()+"__icon",onClick:this.onIconClick},"password"===this.state.type?React.createElement(VisibilityIcon,null):React.createElement(VisibilityOffIcon,null)))}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}window.QForms.RowFormPasswordFieldView=RowFormPasswordFieldView;class RowFormPhoneFieldView extends RowFormFieldView{constructor(e){super(e),_defineProperty(this,"onCloseClick",async e=>{const t=this.getCtrl();this.getWidget().state.value="",this.getWidget().setState({value:""}),t.onChange(""),this.getWidget().getElement().focus()}),_defineProperty(this,"onFocus",async e=>{this.addCssClass("focus"),await this.rerender()}),_defineProperty(this,"onBlur",async e=>{this.removeCssClass("focus"),await this.rerender()}),this.state={classList:[]}}isCloseVisible(){const e=this.getCtrl();return!!e.isEditable()&&(this.getWidget()?""!==this.getWidget().state.value:void 0!==this.props.value)}render(){console.log("RowFormPhoneFieldView.render");const e=this.getCtrl();return React.createElement("div",{className:this.getCssClassNames()},React.createElement(PhoneBox,{classList:[this.getCssBlockName()+"__input"],value:e.getValueForWidget(),readOnly:!e.isEditable(),disabled:!e.isEditable(),autoFocus:e.isAutoFocus(),placeholder:e.getPlaceholder()||null,autocomplete:e.getAutocomplete(),onCreate:this.onWidgetCreate,onChange:e.onChange,onFocus:this.onFocus,onBlur:this.onBlur}),React.createElement("div",{className:this.getCssBlockName()+"__close "+(this.isCloseVisible()?"visible":""),onClick:this.onCloseClick},React.createElement(CloseIcon,null)),React.createElement("div",{className:this.getCssBlockName()+"__icon"},React.createElement(PhoneIcon,null)))}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}window.QForms.RowFormPhoneFieldView=RowFormPhoneFieldView;class RowFormTextAreaFieldView extends RowFormFieldView{constructor(e){super(e),_defineProperty(this,"onFocus",async e=>{this.addCssClass("focus"),await this.rerender()}),_defineProperty(this,"onBlur",async e=>{this.removeCssClass("focus"),await this.rerender()}),this.state={classList:[]}}render(){const e=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()},React.createElement(TextArea,{classList:[this.getCssBlockName()+"__textarea"],onCreate:this.onWidgetCreate,value:e.getValueForWidget(),readOnly:!e.isEditable(),disabled:!e.isEditable(),onChange:e.onChange,placeholder:e.getPlaceholder(),rows:e.model.getRows(),cols:e.model.getCols(),onFocus:this.onFocus,onBlur:this.onBlur}))}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}window.QForms.RowFormTextAreaFieldView=RowFormTextAreaFieldView;class RowFormTextBoxFieldView extends RowFormFieldView{constructor(e){super(e),_defineProperty(this,"onCloseClick",async e=>{const t=this.props.ctrl;this.getWidget().state.value="",this.getWidget().setState({value:""}),t.onChange(""),this.getWidget().getElement().focus()}),_defineProperty(this,"onFocus",async e=>{this.addCssClass("focus"),await this.rerender()}),_defineProperty(this,"onBlur",async e=>{this.removeCssClass("focus"),await this.rerender()}),this.state={classList:[]}}isCloseVisible(){const e=this.props.ctrl;return!!e.isEditable()&&(this.getWidget()?""!==this.getWidget().state.value:void 0!==this.props.value)}render(){const e=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()},React.createElement(TextBox,{classList:[this.getCssBlockName()+"__input"],value:e.getValueForWidget(),readOnly:!e.isEditable(),disabled:!e.isEditable(),autoFocus:e.isAutoFocus(),placeholder:e.getPlaceholder()||null,autocomplete:e.getAutocomplete(),onCreate:this.onWidgetCreate,onChange:e.onChange,onFocus:this.onFocus,onBlur:this.onBlur}),React.createElement("div",{className:this.getCssBlockName()+"__close "+(this.isCloseVisible()?"visible":""),onClick:this.onCloseClick},React.createElement(CloseIcon,null)))}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}window.QForms.RowFormTextBoxFieldView=RowFormTextBoxFieldView;class RowFormTimeFieldView extends RowFormFieldView{constructor(...e){super(...e),_defineProperty(this,"onCloseClick",async e=>{console.log("RowFormTimeFieldView.onCloseClick")})}isCloseVisible(){return!this.props.readOnly&&(this.getWidget()?""!==this.getWidget().state.value:void 0!==this.props.value)}render(){const e=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()},React.createElement(TimeBox,{onCreate:this.onWidgetCreate,value:e.getValueForWidget(),readOnly:!e.isEditable(),onChange:e.onChange,onBlur:e.onBlur,placeholder:e.getPlaceholder()}),React.createElement("div",{className:"close "+(this.isCloseVisible()?"visible":""),onClick:this.onCloseClick},React.createElement(CloseIcon,null)))}}window.QForms.RowFormTimeFieldView=RowFormTimeFieldView;class TableFormFieldView extends FieldView{constructor(e){super(e),this.span=React.createRef()}getSpanOffsetWidth(){return this.span.current?this.span.current.offsetWidth:0}}window.QForms.TableFormFieldView=TableFormFieldView;class TableFormCheckBoxFieldView extends TableFormFieldView{render(){var e=this.props.row;const t=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames(),style:this.getStyle(e)},React.createElement(CheckBox,{ref:this.span,checked:t.getValueForWidget(e),readOnly:!0,disabled:!0}))}}window.QForms.TableFormCheckBoxFieldView=TableFormCheckBoxFieldView;class TableFormComboBoxFieldView extends TableFormFieldView{render(){var e=this.props.row;const t=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()+" ellipsis",style:this.getStyle(e)},React.createElement("span",{ref:this.span},t.getValueForWidget(e)))}}window.QForms.TableFormComboBoxFieldView=TableFormComboBoxFieldView;class TableFormDateFieldView extends TableFormFieldView{render(){var e=this.props.row;const t=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()+" ellipsis",style:this.getStyle(e)},React.createElement("span",{ref:this.span},t.getValueForWidget(e)))}}window.QForms.TableFormDateFieldView=TableFormDateFieldView;class TableFormDateTimeFieldView extends TableFormFieldView{render(){var e=this.props.row;const t=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()+" ellipsis",style:this.getStyle(e)},React.createElement("span",{ref:this.span},t.getValueForWidget(e)))}}window.QForms.TableFormDateTimeFieldView=TableFormDateTimeFieldView;class TableFormLinkFieldView extends TableFormFieldView{render(){var e=this.props.row;const t=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()+" ellipsis",style:this.getStyle(e)},React.createElement("a",{href:"#",onClick:t.onClick},t.getValueForWidget(e)))}}window.QForms.TableFormLinkFieldView=TableFormLinkFieldView;class TableFormPhoneFieldView extends TableFormFieldView{render(){var e=this.props.row;return React.createElement("div",{className:this.getCssClassNames()+" ellipsis",style:this.getStyle(e)},React.createElement("span",{ref:this.span},PhoneBox.formatPhoneNumber(this.getCtrl().getValueForWidget(e))))}}class TableFormTextAreaFieldView extends TableFormFieldView{render(){var e=this.props.row;const t=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()+" ellipsis",style:this.getStyle(e)},React.createElement("span",{ref:this.span},t.getValueForWidget(e)))}}window.QForms.TableFormTextAreaFieldView=TableFormTextAreaFieldView;class TableFormTextBoxFieldView extends TableFormFieldView{render(){var e=this.props.row;const t=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()+" ellipsis",style:this.getStyle(e)},React.createElement("span",{ref:this.span},t.getValueForWidget(e)))}}window.QForms.TableFormTextBoxFieldView=TableFormTextBoxFieldView;class TableFormTimeFieldView extends TableFormFieldView{render(){var e=this.props.row;const t=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()+" ellipsis",style:this.getStyle(e)},React.createElement("span",{ref:this.span},t.getValueForWidget(e)))}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}window.QForms.TableFormTimeFieldView=TableFormTimeFieldView;class FormView extends ModelView{constructor(e){super(e),_defineProperty(this,"onActionsClick",async e=>{const t=this.props.ctrl;e=e.dataset.action;try{if(!await t.onActionClick(e,t.getActiveRow(!0)))throw new Error(`no handler for action '${e}'`)}catch(e){await this.getCtrl().getApp().alert({message:e.message})}}),this.checkParent()}shouldComponentUpdate(e,t){return!!(e.updated-this.props.updated)}}window.QForms.FormView=FormView;class RowFormView extends FormView{renderToolbar(){const e=this.props.ctrl;var t=e.getModel().getApp().getText();return React.createElement("div",{className:this.getCssBlockName()+"__toolbar flex grid-gap-5"},e.model.hasDefaultSqlDataSource()&&React.createElement(Button,{key:"edit",classList:["toolbar-button"],onClick:e.onEditClick,visible:"view"===e.getMode()},React.createElement(EditIcon,null),React.createElement("div",null,t.form.edit)),e.model.hasDefaultSqlDataSource()&&React.createElement(Button,{key:"save",classList:["toolbar-button"],enabled:(e.state.changed||e.state.hasNew)&&e.state.valid,onClick:e.onSaveClick,visible:"edit"===e.getMode()},React.createElement(SaveIcon,null),React.createElement("div",null,t.form.save)),e.model.hasDefaultSqlDataSource()&&e.model.getKey()&&React.createElement(Button,{key:"cancel",classList:["toolbar-button"],visible:"edit"===e.getMode()&&!e.state.changed&&e.state.valid,onClick:e.onCancelClick},React.createElement(CancelIcon,null),React.createElement("div",null,t.form.cancel)),e.model.hasDefaultSqlDataSource()&&e.model.getKey()&&React.createElement(Button,{key:"discard",classList:["toolbar-button"],enabled:e.state.changed||!e.isValid(),onClick:e.onDiscardClick,visible:"edit"===e.getMode()&&(e.state.changed||!e.state.valid)},React.createElement(CloseIcon2,null),React.createElement("div",null,t.form.discard)),e.model.hasDefaultSqlDataSource()&&"true"===e.getModel().getAttr("refreshButton")&&React.createElement(Button,{key:"refresh",classList:["toolbar-button"],enabled:!e.state.changed&&!e.state.hasNew,onClick:e.onRefreshClick,visible:"view"===e.getMode()},React.createElement(RefreshIcon,null),React.createElement("div",null,t.form.refresh)),this.isActionsVisible()&&e.model.hasActions()&&React.createElement(DropdownButton,{classList:["toolbar-dropdown-button"],actions:this.getActionsForDropdownButton(),onClick:this.onActionsClick,enabled:this.isActionsEnabled()},React.createElement(MoreVertIcon,null)))}isActionsEnabled(){return!0}isActionsVisible(){return!this.getCtrl().getModel().hasDefaultSqlDataSource()||!!this.getCtrl().getModel().getKey()}renderLabel(e){const t=e.getModel();e=t.getName();return React.createElement("div",{key:"label."+e,className:this.getCssBlockName()+"__label"},t.getCaption(),":",t.isNotNull()&&React.createElement("span",{style:{color:"red"}},"*"))}renderField(e){var t=e.getModel().getName();return React.createElement("div",{key:"field."+t,className:this.getCssBlockName()+"__field"},React.createElement(e.getViewClass(),{onCreate:e.onViewCreate,ctrl:e}))}renderError(e){var t=e.getModel().getName();return React.createElement("div",{key:"tooltip."+t,className:this.getCssBlockName()+"__error"},React.createElement(Tooltip,{position:"left",type:"alert",hidden:null===e.getErrorMessage(),tip:e.getErrorMessage()}))}renderItem(e){e.getModel().getName();return[this.renderLabel(e),this.renderField(e),this.renderError(e)]}renderGrid(){const t=this.props.ctrl;return React.createElement("div",{className:this.getCssBlockName()+"__grid"},Object.keys(t.fields).filter(e=>t.getField(e).isVisible()).map(e=>this.renderItem(t.getField(e))))}render(){return console.log("RowFormView.render",this.getCtrl().getModel().getFullName()),React.createElement("div",{className:this.getCssClassNames()+" flex-column grid-gap-5",style:this.getStyle()},(this.getCtrl().getModel().hasDefaultSqlDataSource()||this.getCtrl().getModel().hasActions())&&this.renderToolbar(),this.renderGrid())}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}window.QForms.RowFormView=RowFormView;class TableFormView extends FormView{constructor(...e){super(...e),_defineProperty(this,"renderGridCellView",(e,t,s,r)=>{const a=this.props.ctrl.getField(t.name);if(!a)throw new Error("no field: "+t.name);return React.createElement(a.getViewClass(),{row:e,column:t,onCreate:s,onUnmount:r,ctrl:a})}),_defineProperty(this,"createLinkCallback",e=>PageController.createLink({page:this.getCtrl().getModel().getAttr("itemEditPage"),...DataSource.keyToParams(e)}))}renderToolbar(){const e=this.props.ctrl,t=e.model;var s=t.getDefaultDataSource();return React.createElement("div",{className:this.getCssBlockName()+"__toolbar flex grid-gap-5"},"disabled"!==t.data.newRowMode&&React.createElement(Button,{key:"new",classList:["toolbar-button","default"],onClick:e.onNewClick,enabled:!e.parent.model.hasNew()},React.createElement(AddIcon,null),React.createElement("div",null,t.getApp().getText().form.new)),"disabled"!==t.data.deleteRowMode&&React.createElement(Button,{key:"delete",classList:["toolbar-button"],onClick:e.onDeleteClick,enabled:e.isRowSelected()},React.createElement(DeleteIcon,null),React.createElement("div",null,t.getApp().getText().form.delete)),"true"===t.data.refreshButton&&"SqlDataSource"===s.constructor.name&&React.createElement(Button,{key:"refresh",classList:["toolbar-button"],onClick:e.onRefreshClick,enabled:!e.parent.model.hasNew()},React.createElement(RefreshIcon,null),React.createElement("div",null,t.getApp().getText().form.refresh)),e.model.hasActions()&&React.createElement(DropdownButton,{classList:["toolbar-dropdown-button"],actions:this.getActionsForDropdownButton(),onClick:this.onActionsClick},React.createElement(MoreVertIcon,null)))}renderPaging(){const e=this.props.ctrl,t=this.props.ctrl.model,s=t.getDefaultDataSource();t.getApp().getText();return React.createElement("div",{className:"paging"},React.createElement("div",{className:"paging__countBlock"},React.createElement("span",{className:"count"},s.getRowsLength()," ",s.getLimit()&&"of "+s.getCount())),s.getLimit()&&React.createElement("div",{className:"paging__gotoBlock"},React.createElement(Button,{enabled:e.canPrev(),onClick:e.onPreviousClick},React.createElement(LeftIcon,{size:18})),React.createElement(ComboBox,{value:e.model.getDefaultDataSource().getFrame().toString(),onChange:e.onFrameChanged,items:new Array(s.getFramesCount()).fill().map((e,t)=>({value:(t+1).toString(),title:(t+1).toString()}))}),React.createElement(Button,{enabled:e.canNext(),onClick:e.onNextClick},React.createElement(RightIcon,{size:18}))))}getGridColumns(){const s=this.props.ctrl;return Object.keys(s.fields).filter(e=>s.getField(e).isVisible()).map(e=>{const t=s.getField(e);return{name:t.getModel().getName(),title:t.getModel().getCaption(),width:t.getModel().getWidth()}})}getRows(){const e=this.props.ctrl;return e.model.getDefaultDataSource().getRows()}getGridExtraColumn(){return!0}getGridClass(){return Grid}renderGrid(){const t=this.props.ctrl;return React.createElement(this.getGridClass(),{classList:["flex-max"],onCreate:t.onGridCreate,name:t.model.getFullName(),columns:this.getGridColumns(),rows:this.getRows(),getRowKey:e=>t.model.getDefaultDataSource().getRowKey(e),onDoubleClick:t.onGridCellDblClick,onDeleteKeyDown:t.onGridDeleteKeyDown,onSelectionChange:t.onGridSelectionChange,onLinkClick:t.onGridLinkClick,renderGridCellView:this.renderGridCellView,updated:t.getUpdated(),extraColumn:this.getGridExtraColumn(),selectedKey:t.getPage().getModel().getOptions().selectedKey,createLinkCallback:this.createLinkCallback})}render(){console.log("TableFormView.render",this.props.ctrl.model.getFullName());const e=this.props.ctrl;return React.createElement("div",{className:this.getCssClassNames()+" full flex-column grid-gap-5",style:this.getStyle()},this.renderToolbar(),this.renderGrid(),e.getModel().hasDefaultSqlDataSource()&&this.renderPaging())}}function _defineProperty(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}window.QForms.TableFormView=TableFormView;class PageView extends ModelView{constructor(e){super(e),_defineProperty(this,"onActionsClick",async e=>{const t=this.props.ctrl;e=e.dataset.action;try{if(!await t.onActionClick(e))throw new Error(`no handler for action '${e}'`)}catch(e){await this.getCtrl().getApp().alert({message:e.message})}}),this.checkParent(),this.el=React.createRef()}renderForm(e,t={}){return React.createElement(e.getViewClass(),{parent:this,key:e.getModel().getName(),ctrl:e,onCreate:e.onViewCreate,updated:e.getUpdated(),...t})}renderRowForms(){return this.getRowForms().map(e=>this.renderForm(e))}renderTitle(){const e=this.props.ctrl,t=e.getModel();return React.createElement("h1",{className:this.getCssBlockName()+"__title"},e.getTitle(),t.hasRowFormWithDefaultSqlDataSource()&&(e.isChanged()||t.hasNew())&&[" ",React.createElement("span",{key:"star",className:this.getCssBlockName()+"__star"},"*")])}renderToolbar(){const e=this.props.ctrl,t=e.model;return React.createElement("div",{className:this.getCssBlockName()+"__toolbar"},t.options.selectMode&&React.createElement(Button,{classList:["toolbar-button","default"],onClick:e.onSelectClick,enabled:!!e.getSelectedRowKey()},React.createElement(DoneIcon,null),React.createElement("div",null,t.getApp().getText().page.select)),t.isModal()&&t.hasRowFormWithDefaultSqlDataSource()&&React.createElement(Button,{classList:["toolbar-button","default"],onClick:e.onSaveAndCloseClick,enabled:e.isValid()&&(t.hasNew()||e.isChanged())},React.createElement(DoneIcon,null),React.createElement("div",null,t.getApp().getText().page.saveAndClose)),t.hasActions()&&React.createElement(DropdownButton,{classList:["toolbar-dropdown-button"],actions:this.getActionsForDropdownButton(),onClick:this.onActionsClick},React.createElement(MoreVertIcon,null)))}isToolbar(){const e=this.getCtrl().getModel();return e.options.selectMode||e.isModal()&&e.hasRowFormWithDefaultSqlDataSource()||e.hasActions()}renderTableForms(){var e=this.getTableForms();return 1===e.length?this.renderForm(e[0]):React.createElement("div",{className:this.getCssBlockName()+"__table-forms flex-max frame"},React.createElement("div",{className:"frame__container"},React.createElement(Tab,{tabs:this.getTabs(),classList:["Tab-blue","full"]})))}getTabs(){return this.getTableForms().map(e=>({name:e.model.getName(),title:e.getTitle(),content:this.renderForm(e)}))}getRowForms(){return this.getCtrl().forms.filter(e=>"RowForm"===e.getModel().getClassName())}getTableForms(){return this.getCtrl().forms.filter(e=>"TableForm"===e.getModel().getClassName())}renderOpenPageHeaderButton(){var e=this.props.ctrl;return React.createElement("div",{key:"open",className:this.getCssBlockName()+"__open",onClick:e.onOpenPageClick},React.createElement(OpenInNewIcon,null))}renderClosePageHeaderButton(){var e=this.props.ctrl;return React.createElement("div",{key:"close",className:this.getCssBlockName()+"__close",onClick:e.onClosePageClick},React.createElement(CloseIcon2,null))}renderHeader(){const e=this.props.ctrl,t=e.getModel();return React.createElement("div",{className:this.getCssBlockName()+"__header"},this.renderTitle(),t.isModal()&&[...t.getKey()?[this.renderOpenPageHeaderButton()]:[],this.renderClosePageHeaderButton()])}renderMain(){const e=this.getCtrl().getModel();return React.createElement("div",{className:this.getCssBlockName()+"__main flex-max frame"},React.createElement("div",{className:"frame__container flex-column grid-gap-10"},this.isToolbar()&&this.renderToolbar(),e.hasRowForm()&&this.renderRowForms(),e.hasTableForm()&&this.renderTableForms()))}renderFooter(){}render(){return console.log("PageView.render",this.getCtrl().getModel().getFullName()),React.createElement("div",{ref:this.el,tabIndex:0,onKeyDown:this.getCtrl().onKeyDown,className:`${this.getCssClassNames()} ${this.getCtrl().isModal()?"":"full"} flex-column`,style:this.getStyle()},this.renderHeader(),this.renderMain(),this.renderFooter())}getStyle(){if(this.getCtrl().isModal())return{width:1e3,height:750}}componentDidMount(){this.getCtrl().isAutoFocus()&&!this.getCtrl().getModel().getKey()||this.focus()}focus(){this.getElement()?this.getElement().focus():console.error(this.getCtrl().getModel().getFullName()+": el is null")}}window.QForms.PageView=PageView;
//# sourceMappingURL=viewer-jsx.6dc0ebe81d6c3148330219fd44f4bba8.js.map
