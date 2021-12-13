window.QForms = {};

class ReactComponent extends React.Component {
  constructor(props) {
    super(props);
    if (props.onCreate) props.onCreate(this, this.props.name);
    this.allowRerender = true;
  }

  getElement() {
    return this.el.current;
  }

  checkParent() {
    if (!this.props.parent) throw new Error(`${this.constructor.name}: no parent`);
  }

  getClassList() {
    return [this.getCssBlockName(), ...(this.props.classList || []), ...(this.state && this.state.classList ? this.state.classList : [])];
  }

  addCssClass(className) {
    if (this.state.classList.indexOf(className) === -1) {
      this.state.classList.push(className);
    }
  }

  removeCssClass(className) {
    this.state.classList.splice(this.state.classList.indexOf(className), 1);
  }

  getCssBlockName() {
    return this.constructor.name;
  }

  getCssClassNames() {
    return this.getClassList().join(' ');
  }

  rerender(logTime = true) {
    // console.log(`${this.constructor.name}.rerender`, this.state);
    if (!this.canRerender()) return Promise.resolve();
    return new Promise(resolve => {
      const start = Date.now();
      this.forceUpdate(() => {
        if (logTime) {
          console.log(`${this.constructor.name}.rerender time:`, Date.now() - start);
        }

        resolve();
      });
    });
  }

  canRerender() {
    if (!this.allowRerender) return false;
    if (this.props.parent) return this.props.parent.canRerender();
    return true;
  }

  disableRerender() {
    console.log(`${this.constructor.name}.disableRerender`);
    this.allowRerender = false;
  }

  enableRerender() {
    console.log(`${this.constructor.name}.enableRerender`);
    this.allowRerender = true;
  }

  componentWillUnmount() {
    // console.log('ReactComponent.componentWillUnmount');
    if (this.props.onUnmount) this.props.onUnmount(this, this.props.name);
  }
  /*componentDidMount() {
      console.log('ReactComponent.componentDidMount', this.constructor.name);
  }*/


  isEnabled() {
    if (this.props.enabled !== undefined) {
      return this.props.enabled;
    }

    if (this.props.disabled !== undefined) {
      return !this.props.disabled;
    }

    return true;
  }

  isDisabled() {
    return !this.isEnabled();
  }

}

window.QForms.ReactComponent = ReactComponent;
class AddIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
    }));
  }

}
class ArrowIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 10 6"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M1.429.253a.819.819 0 0 0-1.184 0 .883.883 0 0 0 0 1.22l4.142 4.274A.821.821 0 0 0 5 6a.821.821 0 0 0 .612-.253l4.143-4.273a.883.883 0 0 0 0-1.221.819.819 0 0 0-1.184 0L5 3.937 1.429.253z"
    }));
  }

}
class CancelIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none",
      opacity: ".87"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"
    }));
  }

}
class CloseIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      width: "10px",
      height: "10px",
      viewBox: "0 0 10 10"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "2",
      y1: "2",
      x2: "8",
      y2: "8",
      stroke: "#aaa",
      strokeWidth: 1,
      strokeMiterlimit: "10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "2",
      x2: "2",
      y2: "8",
      stroke: "#aaa",
      strokeWidth: 1,
      strokeMiterlimit: "10"
    }));
  }

}
class CloseIcon2 extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24px",
      height: "24px",
      viewBox: "0 0 24 24",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
    }));
  }

}
class DateIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "18px",
      viewBox: "0 0 24 24",
      width: "18px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"
    }));
  }

}
class DeleteIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"
    }));
  }

}
class DoneIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
    }));
  }

}
class EditIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
    }));
  }

}
class LeftIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "18px",
      viewBox: "0 0 24 24",
      width: "18px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"
    }));
  }

}
class MoreVertIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
    }));
  }

}
class OpenInNewIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
    }));
  }

}
class PasswordIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      enableBackground: "new 0 0 24 24",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M0,0h24v24H0V0z",
      fill: "none"
    })), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z"
    }))));
  }

}
class PhoneIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z"
    }));
  }

}
class RefreshIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
    }));
  }

}
class RightIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "18px",
      viewBox: "0 0 24 24",
      width: "18px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
    }));
  }

}
class SaveIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"
    }));
  }

}
class TimeIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      enableBackground: "new 0 0 24 24",
      height: "18px",
      viewBox: "0 0 24 24",
      width: "18px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      fill: "none",
      height: "24",
      width: "24",
      x: "0"
    })), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M12.5,7H11v6l5.2,3.2l0.8-1.3l-4.5-2.7V7z"
    }))));
  }

}
class VisibilityIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"
    }));
  }

}
class VisibilityOffIcon extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z"
    }));
  }

}
class DropDownIcon extends ReactComponent {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames(),
      style: {
        width: this.props.size,
        height: this.props.size
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 10 10"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "5",
      cy: "5",
      r: "5",
      style: {
        fill: 'gray'
      }
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "2,4 5,7 8,4",
      fill: "none",
      stroke: "white",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })));
  }

}

window.QForms.DropDownIcon = DropDownIcon;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Box extends ReactComponent {
  constructor(props) {
    console.log('Box.constructor', props);
    super(props);

    _defineProperty(this, "update", () => {
      console.log('Box.update');
      this.setState({
        backgroundColor: 'green'
      });
    });

    this.state = {
      backgroundColor: 'purple'
    };
  } // componentWillMount() {
  //     console.log('Box.componentWillMount');
  // }


  componentDidMount() {
    console.log('Box.componentDidMount');
  }

  componentWillUnmount() {
    console.log('Box.componentWillUnmount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Box.shouldComponentUpdate', nextProps, nextState);
    return true;
  }

  componentDidUpdate() {
    console.log('Box.componentDidUpdate');
  }

  render() {
    console.log('Box.render');
    return /*#__PURE__*/React.createElement("div", {
      className: "Box"
    }, /*#__PURE__*/React.createElement(Button, {
      name: "one"
    }), /*#__PURE__*/React.createElement(Button, {
      name: "two"
    }), /*#__PURE__*/React.createElement(Button, {
      name: "three"
    }));
  }

}

window.QForms.Box = Box;
class Button extends ReactComponent {
  constructor(props) {
    // console.log('Button.constructor', props);
    super(props);
    this.state = {
      disabled: false
    };
    this.el = React.createRef();
  }

  isDisabled() {
    if (this.props.enabled !== undefined) return !this.props.enabled;
    return this.state.disabled;
  }

  isVisible() {
    return this.props.visible === undefined ? true : this.props.visible;
  }

  getStyle() {
    return {
      display: !this.isVisible() ? 'none' : null,
      width: this.props.width
    };
  }

  disable() {
    this.setState({
      disabled: true
    });
  }

  enable() {
    this.setState({
      disabled: false
    });
  }

  render() {
    // console.log('Button.render', this.props.title, this.props);
    return /*#__PURE__*/React.createElement("button", {
      className: this.getCssClassNames(),
      ref: this.el,
      id: this.props.id,
      type: this.props.type,
      name: this.props.name,
      disabled: this.isDisabled(),
      onClick: this.props.onClick,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
      onKeyDown: this.props.onKeyDown,
      style: this.getStyle()
    }, this.props.title || this.props.children);
  }

}

window.QForms.Button = Button;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CheckBox extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", e => {
      // console.log('CheckBox.onChange', e.target.checked, this.props.readOnly);
      if (!this.props.readOnly) {
        this.setState(prevState => {
          if (this.props.onChange) this.props.onChange(!prevState.checked);
          return {
            checked: !prevState.checked
          };
        });
      }
    });

    _defineProperty(this, "onClick", e => {
      if (!this.props.readOnly) {
        if (this.props.onChange) this.props.onChange(true);
        this.setState({
          checked: true
        });
      }
    });

    if (this.props.checked !== undefined && this.props.checked !== null && typeof this.props.checked !== 'boolean') {
      throw new Error(`wrong checked prop: ${this.props.checked}`);
    }

    this.state = {
      checked: typeof this.props.checked === 'boolean' ? this.props.checked : null
    };
  }

  getValue() {
    return this.state.checked;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('TextBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
    this.state.checked = typeof nextProps.checked === 'boolean' ? nextProps.checked : null;
    return true;
  }

  render() {
    if (this.state.checked === null) {
      return /*#__PURE__*/React.createElement("span", {
        style: {
          width: '16px',
          height: '16px',
          // backgroundColor: 'yellow',
          display: 'inline-block',
          textAlign: 'center',
          cursor: 'default'
        },
        onClick: this.onClick
      }, "?");
    }

    return /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: this.state.checked,
      readOnly: this.props.readOnly,
      disabled: this.props.disabled,
      onChange: this.onChange
    });
  }

}

window.QForms.CheckBox = CheckBox;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ComboBox extends ReactComponent {
  constructor(props) {
    // console.log('ComboBox.constructor', props.value, typeof props.value, props.items);
    super(props);

    _defineProperty(this, "onChange", async e => {
      // console.log('ComboBox.onChange', e.target.value, typeof e.target.value);
      this.setState({
        value: e.target.value
      });

      if (this.props.onChange) {
        await this.props.onChange(e.target.value);
      }
    });

    _defineProperty(this, "onMouseDown", async e => {
      // console.log('ComboBox.onMouseDown', e.button);
      if (this.props.onMouseDown) {
        await this.props.onMouseDown(e);
      }
    });

    if (!props.items) throw new Error('no ComboBox items');
    this.state = {
      value: this.getInitialValue()
    };
  }

  getInitialValue() {
    let value = null;

    if (this.props.value !== undefined && this.props.value !== null) {
      value = this.props.value;
      const item = this.props.items.find(item => item.value === this.props.value);

      if (!item) {
        if (this.props.nullable && value === '') {} else {
          console.error(`no item for value:`, this.props.value, typeof this.props.value);
          console.log('items:', this.props.items);
        }
      }
    } else {
      if (this.props.items.length) {
        value = this.props.items[0].value;
      } else {
        value = '';
      }
    }

    if (value === null) throw new Error('null is wrong value for ComboBox'); // console.log('combobox value:', value);

    return value;
  }

  getValue() {
    return this.state.value;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('ComboBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
    this.state.value = nextProps.value;
    return true;
  }

  render() {
    // console.log('ComboBox.render', this.state.value);
    return /*#__PURE__*/React.createElement("select", {
      className: this.getCssClassNames(),
      onChange: this.onChange,
      value: this.state.value,
      disabled: this.props.readOnly,
      size: this.props.size,
      style: this.props.style,
      id: this.props.id,
      onDoubleClick: this.props.onDoubleClick,
      onMouseDown: this.onMouseDown
    }, this.props.nullable && /*#__PURE__*/React.createElement("option", {
      value: ''
    }, this.props.placeholder), this.props.items && this.props.items.map(item => /*#__PURE__*/React.createElement("option", {
      key: item.value,
      value: item.value
    }, item.title || item.value)));
  }

}

window.QForms.ComboBox = ComboBox;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// props
//  visible boolean true
//  selectedDate array [2021, 0, 1]
//  minDate array [2021, 0, 1]
//  onMouseDown function
//  onDateSelected function
//  getDateStyle function
//  selectToday boolean false
//  highlightedDate array [2021, 0, 1]
class DatePicker extends ReactComponent {
  constructor(props) {
    // console.log('DatePicker.constructor', props);
    super(props);

    _defineProperty(this, "onClick", e => {
      console.log('DatePicker.onClick', e.target);

      if (e.target.nodeName === 'TD' && e.target.classList.contains('selectable')) {
        return this.onDateClick(e.target);
      }
    });

    _defineProperty(this, "onMouseDown", e => {
      // console.log('DatePicker.onMouseDown');
      if (this.props.onMouseDown) {
        return this.props.onMouseDown(e);
      }
    });

    _defineProperty(this, "onNextClick", e => {
      // console.log('DatePicker.next');
      this.setState(prevState => {
        const next = new Date(prevState.selectedMonth[0], prevState.selectedMonth[1]);
        next.setMonth(next.getMonth() + 1);
        return {
          selectedMonth: [next.getFullYear(), next.getMonth()]
        };
      });
    });

    _defineProperty(this, "onPrevClick", e => {
      // console.log('DatePicker.prev');
      this.setState(prevState => {
        const prev = new Date(prevState.selectedMonth[0], prevState.selectedMonth[1]);
        prev.setMonth(prev.getMonth() - 1);
        return {
          selectedMonth: [prev.getFullYear(), prev.getMonth()]
        };
      });
    });

    if (this.props.minDate && !(this.props.minDate instanceof Array)) throw new Error('minDate must be array');
    this.state = {
      selectedMonth: this.calcSelectedMonth()
    };
    this.MONTH = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  }

  static createDateFromArr(arr) {
    return new Date(arr[0], arr[1], arr[2]);
  }

  isVisible() {
    if (this.props.visible === false) return false;
    return true;
  }

  calcSelectedMonth() {
    // console.log('DatePicker.calcSelectedMonth', this.props.selectedDate);
    if (this.props.selectedDate) {
      return [this.props.selectedDate[0], this.props.selectedDate[1]];
    } else {
      const dates = [Helper.today().getTime()];
      if (this.props.minDate) dates.push(DatePicker.createDateFromArr(this.props.minDate).getTime()); // if (this.props.selectedDate) dates.push(DatePicker.createDateFromArr(this.props.selectedDate).getTime());
      // if (this.props.selectedMonth) dates.push(new Date(this.props.selectedMonth[0], this.props.selectedMonth[1], 1).getTime());

      const date = new Date(Math.min(...dates)); // console.log('date:', date);

      return [date.getFullYear(), date.getMonth()];
    }
  }

  static getTodayArr() {
    return DatePicker.dateToArray(new Date());
  }

  static dateToArray(date) {
    return [date.getFullYear(), date.getMonth(), date.getDate()];
  }

  static getDay(date) {
    let day = date.getDay() - 1;
    if (day === -1) day = 6;
    if (day === 0) day = 7;
    return day;
  }

  createSelectedDate() {
    if (!this.isDateSelected()) throw new Error('date not selected');
    return new Date(...this.props.selectedDate);
  }

  isDateSelected() {
    return !!this.props.selectedDate;
  }

  getFirstDateOfTable() {
    const date = new Date(this.state.selectedMonth[0], this.state.selectedMonth[1], 1); // first day of month

    date.setDate(date.getDate() - DatePicker.getDay(date)); // first day of table

    return date;
  }

  createMinDate() {
    if (!this.props.minDate) throw new Error('no min date');
    return new Date(this.props.minDate[0], this.props.minDate[1], this.props.minDate[2]);
  }

  isMinDate() {
    return !!this.props.minDate;
  }

  isPrevAllowed() {
    const prev = new Date(this.state.selectedMonth[0], this.state.selectedMonth[1]);
    prev.setMonth(prev.getMonth() - 1);
    return this.isMonthAllowed(prev);
  }

  isMonthAllowed(month) {
    if (this.isMinDate()) {
      const minMonth = new Date(this.props.minDate[0], this.props.minDate[1]);
      return month.getTime() >= minMonth.getTime();
    }

    return true;
  }

  onDateClick(target) {
    // console.log('DatePicker.onDateClick', target.dataset.date);
    if (this.props.onDateSelected) {
      this.props.onDateSelected(JSON.parse(target.dataset.date));
    }
  }

  render() {
    // console.log('DatePicker.render', this.props, this.state);
    const date = this.getFirstDateOfTable();
    const today = Helper.today();
    const minDate = this.isMinDate() ? this.createMinDate() : null;
    const selectedDate = this.isDateSelected() ? this.createSelectedDate() : null;
    const highlightedDate = this.props.highlightedDate ? new Date(...this.props.highlightedDate) : null;
    return /*#__PURE__*/React.createElement("table", {
      className: `${this.getCssClassNames()} ${this.isVisible() ? 'visible' : ''}`,
      onClick: this.onClick,
      onMouseDown: this.onMouseDown
    }, /*#__PURE__*/React.createElement("caption", {
      className: `${this.getCssBlockName()}__caption`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__caption-content`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__caption-link ${this.isPrevAllowed() ? 'enabled' : ''}`,
      onClick: this.onPrevClick
    }, /*#__PURE__*/React.createElement(LeftIcon, null)), /*#__PURE__*/React.createElement("span", {
      className: `${this.getCssBlockName()}__caption-title`
    }, `${this.MONTH[this.state.selectedMonth[1]]}, ${this.state.selectedMonth[0]}`), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__caption-link enabled`,
      onClick: this.onNextClick
    }, /*#__PURE__*/React.createElement(RightIcon, null)))), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      className: `${this.getCssBlockName()}__th`
    }, "\u041F\u043D"), /*#__PURE__*/React.createElement("th", {
      className: `${this.getCssBlockName()}__th`
    }, "\u0412\u0442"), /*#__PURE__*/React.createElement("th", {
      className: `${this.getCssBlockName()}__th`
    }, "\u0421\u0440"), /*#__PURE__*/React.createElement("th", {
      className: `${this.getCssBlockName()}__th`
    }, "\u0427\u0442"), /*#__PURE__*/React.createElement("th", {
      className: `${this.getCssBlockName()}__th`
    }, "\u041F\u0442"), /*#__PURE__*/React.createElement("th", {
      className: `${this.getCssBlockName()}__th weekend`
    }, "\u0421\u0431"), /*#__PURE__*/React.createElement("th", {
      className: `${this.getCssBlockName()}__th weekend`
    }, "\u0412\u0441"))), /*#__PURE__*/React.createElement("tbody", null, Array.from(Array(6).keys()).map(i => /*#__PURE__*/React.createElement("tr", {
      key: i
    }, Array.from(Array(7).keys()).map(j => {
      const classList = [];
      if (j === 5 || j === 6) classList.push('weekend');
      if (this.isSelectToday() && date.getTime() === today.getTime()) classList.push('today');
      if (date.getMonth() !== this.state.selectedMonth[1]) classList.push('out');
      if (!minDate) classList.push('selectable');else if (date.getTime() >= minDate.getTime()) classList.push('selectable');
      if (selectedDate && date.getTime() === selectedDate.getTime()) classList.push('selected');
      if (highlightedDate && highlightedDate.getTime() === date.getTime()) classList.push('highlight');
      const text = date.getDate().toString();
      const dataDate = JSON.stringify(DatePicker.dateToArray(date));
      const style = this.props.getDateStyle ? this.props.getDateStyle(date) : null;
      date.setDate(date.getDate() + 1);
      return /*#__PURE__*/React.createElement("td", {
        key: text,
        className: `${this.getCssBlockName()}__td  ${classList.join(' ')}`,
        style: style,
        "data-date": dataDate
      }, text);
    })))));
  }

  isSelectToday() {
    if (this.props.selectToday === false) return false;
    return true;
  }

}

window.QForms.DatePicker = DatePicker;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DropdownButton extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onButtonClick", e => {
      // console.log('DropdownButton.onButtonClick');
      this.setState(state => ({
        open: !state.open
      }));
    });

    _defineProperty(this, "onButtonBlur", e => {
      // console.log('DropdownButton.onButtonBlur');
      if (this.state.open) {
        this.setState({
          open: false
        });
      }
    });

    _defineProperty(this, "onKeyDown", e => {
      // console.log('DropdownButton.onKeyDown', e.key);
      if (e.key === 'Escape' && this.state.open) {
        this.setState({
          open: false
        });
        e.stopPropagation();
      }
    });

    _defineProperty(this, "onUlMouseDown", e => {
      // console.log('DropdownButton.onUlMouseDown');
      e.preventDefault();
    });

    _defineProperty(this, "onLiClick", async e => {
      // console.log('DropdownButton.onLiClick', e.currentTarget);
      const li = e.currentTarget;
      this.setState({
        open: false
      }, () => {
        if (this.props.onClick) {
          this.props.onClick(li);
        }
      });
    });

    this.state = {
      open: false,
      disabled: false
    };
  }

  isEnabled() {
    if (this.props.enabled !== undefined) return this.props.enabled; // if (this.props.isDisabled) return this.props.isDisabled(this.props.name);

    return !this.state.disabled;
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ${this.state.open && 'show'}`
    }, /*#__PURE__*/React.createElement(Button, {
      classList: [`${this.getCssBlockName()}__button`],
      onClick: this.onButtonClick,
      onBlur: this.onButtonBlur,
      enabled: this.isEnabled(),
      onKeyDown: this.onKeyDown
    }, this.props.title || this.props.children), /*#__PURE__*/React.createElement("ul", {
      className: `${this.getCssBlockName()}__dropdown`,
      onMouseDown: this.onUlMouseDown
    }, this.props.actions && this.props.actions.map(action => /*#__PURE__*/React.createElement("li", {
      className: `${this.getCssBlockName()}__item ${action.enabled === false ? 'disabled' : ''}`,
      key: action.name,
      "data-action": action.name,
      onClick: action.enabled !== false ? this.onLiClick : null
    }, action.title))));
  }

}

window.QForms.DropdownButton = DropdownButton;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// oldDates boolean true
class DropdownDatePicker extends ReactComponent {
  constructor(props) {
    // console.log('DropdownDatePicker.constructor', props);
    super(props);

    _defineProperty(this, "onInputClick", e => {
      // console.log('DropdownDatePicker.onInputClick', e);
      if (this.props.readOnly) return;
      this.setState(prevState => ({
        open: !prevState.open
      }));
    });

    _defineProperty(this, "onInputKeyDown", e => {
      // console.log('DropdownDatePicker.onInputKeyDown', e.key);
      if (e.key === 'Escape' && this.state.open) {
        this.setState({
          open: false
        });
        e.stopPropagation();
      }
    });

    _defineProperty(this, "onCloseDown", async e => {
      // console.log('DropdownDatePicker.onCloseDown', e);
      this.setState({
        value: null
      });

      if (this.props.onChange) {
        this.props.onChange(null);
      }
    });

    _defineProperty(this, "onBlur", e => {
      // console.log('DropdownDatePicker.onBlur');
      if (this.state.open) {
        this.setState({
          open: false
        });
      }
    });

    _defineProperty(this, "onDatePickerMouseDown", e => {
      // console.log('DropdownDatePicker.onDatePickerMouseDown');
      e.preventDefault(); // e.stopPropagation();
      // return false;
    });

    _defineProperty(this, "onDatePickerDateSelected", date => {
      // console.log('DropdownDatePicker.onDatePickerDateSelected', date);
      const value = new Date(date[0], date[1], date[2]);
      this.setState({
        open: false,
        value
      });

      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });

    this.state = {
      open: false,
      value: props.value || null
    };

    if (props.value && !(props.value instanceof Date)) {
      throw new Error(`need Date type, got ${typeof props.value}`);
    }
  }

  getFormat() {
    // if (this.props.format) return this.props.format;
    // return '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}';
    return this.props.format || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}';
  }

  getStringValue() {
    const value = this.getValue();

    if (value) {
      let format = this.getFormat();

      if (ApplicationController.isDebugMode()) {
        const time = Helper.formatDate(value, '{hh}:{mm}:{ss}');

        if (format === '{DD}.{MM}.{YYYY}' && time !== '00:00:00') {
          format = '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}';
        }
      }

      return Helper.formatDate(value, format);
    }

    return '';
  }

  getMinDate() {
    if (this.props.getMinDate) {
      return this.props.getMinDate();
    } else if (this.props.oldDates === false) {
      return DatePicker.getTodayArr();
    }

    return null;
  }

  getSelectedMonth() {
    if (this.getValue()) {
      return [this.getValue().getFullYear(), this.getValue().getMonth()];
    }

    return null;
  }

  getSelectedDate() {
    if (this.getValue()) {
      return [this.getValue().getFullYear(), this.getValue().getMonth(), this.getValue().getDate()];
    }

    return null;
  }

  getValue() {
    return this.state.value;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('DropdownDatePicker.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
    this.state.value = nextProps.value;
    return true;
  }

  getClassList() {
    return [...super.getClassList(), ...(this.props.readOnly ? ['read-only'] : [])];
  }

  render() {
    // console.log('DropdownDatePicker.render', this.props, this.state);
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement("input", {
      className: `${this.getCssBlockName()}__input`,
      readOnly: true,
      onClick: this.onInputClick,
      onBlur: this.onBlur,
      value: this.getStringValue(),
      placeholder: this.props.placeholder,
      onKeyDown: this.onInputKeyDown
    }), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__close ${this.getStringValue() !== '' && !this.props.readOnly ? 'visible' : ''}`,
      onMouseDown: this.onCloseDown
    }, /*#__PURE__*/React.createElement(CloseIcon, null)), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__icon`
    }, /*#__PURE__*/React.createElement(DateIcon, null)), this.state.open && /*#__PURE__*/React.createElement(DatePicker, {
      classList: [`${this.getCssBlockName()}__date-picker`],
      minDate: this.getMinDate(),
      selectedMonth: this.getSelectedMonth(),
      selectedDate: this.getSelectedDate(),
      onMouseDown: this.onDatePickerMouseDown,
      onDateSelected: this.onDatePickerDateSelected,
      selectToday: this.props.selectToday,
      highlightedDate: this.props.highlightedDate
    }));
  }

}

window.QForms.DropdownDatePicker = DropdownDatePicker;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Grid extends ReactComponent {
  constructor(props) {
    console.log('Grid.constructor', props);
    super(props);

    _defineProperty(this, "onCellMouseDown", async e => {
      console.log('Grid.onCellMouseDown', this.isLink());
      e.preventDefault(); // prevent text selection on double click

      if (this.isDisabled()) return;
      this.getElement().focus(); // if (this.isLink()) return;

      const button = e.button;
      const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
      const row = this.props.rows[i];
      const key = e.currentTarget.dataset.row;
      await this.selectCell(key, j);

      if (button === 0 && this.props.onClick) {
        this.props.onClick(row, key);
      }
    });

    _defineProperty(this, "onRowMouseDown", async e => {
      console.log('Grid.onRowMouseDown', this.isLink()); // if (this.isLink()) return;

      const key = e.currentTarget.dataset.row;
      await this.selectRow(key);
    });

    _defineProperty(this, "onCellDoubleClick", async e => {
      // console.log('Grid.onCellDoubleClick');
      const button = e.button;
      const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
      const row = this.props.rows[i];
      const key = e.currentTarget.dataset.row; // console.log('row:', row);

      if (button === 0 && this.props.onDoubleClick) {
        await this.props.onDoubleClick(row, key);
      }
    });

    _defineProperty(this, "onRowDoubleClick", async e => {
      // console.log('Grid.onRowDoubleClick');
      const i = parseInt(e.currentTarget.dataset.r);
      const row = this.props.rows[i];
      const key = e.currentTarget.dataset.row; // console.log('row:', row);

      if (this.props.onDoubleClick) {
        await this.props.onDoubleClick(row, key);
      }
    });

    _defineProperty(this, "onKeyDown", async e => {
      // console.log('Grid.onKeyDown', e.keyCode, e.ctrlKey, e.shiftKey);
      if (this.isDisabled()) return;

      switch (e.keyCode) {
        case 37:
          e.preventDefault();
          await this.onLeft();
          break;

        case 38:
          e.preventDefault();
          await this.onUp();
          break;

        case 39:
          e.preventDefault();
          await this.onRight();
          break;

        case 40:
          e.preventDefault();
          await this.onDown();
          break;

        case 13:
          e.preventDefault();
          await this.onEnter();
          break;

        case 46:
          e.preventDefault();
          await this.onDelete();
          break;

        case 67:
          if (e.ctrlKey) {
            e.preventDefault();
            await this.onCopy();
          }

          break;
      }
    });

    _defineProperty(this, "onResizeDoubleClick", async e => {
      console.log('Grid.onResizeDoubleClick', e.target);
      const i = parseInt(e.target.dataset.i);
      const column = this.props.columns[i];
      if (this.state.columnWidth[column.name] === this.getMaxColumnWidth(column)) return;
      this.state.columnWidth[column.name] = this.getMaxColumnWidth(column);
      this.state.resized = Date.now();
      await this.rerender();
    });

    _defineProperty(this, "onCellViewCreate", c => {
      // console.log('Grid.onCellViewCreate', c.props.column.name);
      const columnName = c.props.column.name;
      if (this.columns[columnName] === undefined) this.columns[columnName] = [];
      this.columns[columnName].push(c);
    });

    _defineProperty(this, "onCellViewUnmount", c => {
      // console.log('Grid.onCellViewUnmount', c.props.column.name);
      const columnName = c.props.column.name;
      const i = this.columns[columnName].indexOf(c);
      if (i === -1) throw new Error('cannot find FieldView in Grid.columns');
      this.columns[columnName].splice(i, 1);
    });

    _defineProperty(this, "onBodyScroll", async e => {
      // console.log('Grid.onBodyScroll', e.target.scrollLeft);
      this.head.current.scrollLeft = e.target.scrollLeft;
    });

    _defineProperty(this, "onLinkClick", async e => {
      console.log('Grid.onLinkClick', e.ctrlKey);
      if (e.ctrlKey) return;
      e.preventDefault();
      /*if (!this.isLink()) return;
      const key = e.currentTarget.dataset.key;
      if (this.props.onLinkClick) {
          await this.props.onLinkClick(key);
      }*/
    });

    this.state = {
      key: this.props.selectedKey || null,
      column: this.props.selectedKey && this.props.columns && this.props.columns.length ? 0 : null,
      columnWidth: {},
      resized: Date.now()
    };
    this.columns = {}; // each column is the array of each cell view

    this.el = React.createRef();
    this.head = React.createRef();
  }

  getActiveColumn() {
    return this.state.column;
  }

  setActiveColumn(column) {
    this.state.column = column;
  }

  getActiveRowKey() {
    return this.state.key;
  }

  setActiveRowKey(key) {
    // console.log('Grid.setActiveRowKey', key);
    this.state.key = key;
  }

  isRowActive(i, key) {
    return this.getActiveRowKey() === key;
  }

  async onCopy() {
    console.log('Grid.onCopy');
    const row = this.findRow(this.getActiveRowKey());
    const column = this.props.columns[this.getActiveColumn()].name;
    const text = row[column];
    await Helper.copyTextToClipboard(text);
  }

  findRow(key) {
    return this.props.rows.find(row => this.getRowKey(row) === key);
  }

  async onLeft() {
    console.log('Grid.onLeft');
    const j = this.getActiveColumn();

    if (j - 1 >= 0) {
      this.setActiveColumn(j - 1);
      await this.rerender();
    }
  }

  async onUp() {
    console.log('Grid.onUp');
    const key = this.getActiveRowKey();
    const row = this.findRow(key);
    const i = this.props.rows.indexOf(row);

    if (i - 1 >= 0) {
      const pRow = this.props.rows[i - 1];
      const pKey = this.getRowKey(pRow);
      this.setActiveRowKey(pKey);
      await this.rerender();
    }
  }

  async onRight() {
    console.log('Grid.onRight');
    const j = this.getActiveColumn();

    if (j + 1 <= this.props.columns.length - 1) {
      this.setActiveColumn(j + 1);
      await this.rerender();
    }
  }

  async onDown() {
    console.log('Grid.onDown');
    const key = this.getActiveRowKey();
    const row = this.findRow(key);
    const i = this.props.rows.indexOf(row);

    if (i + 1 <= this.props.rows.length - 1) {
      const nRow = this.props.rows[i + 1];
      const nKey = this.getRowKey(nRow);
      this.setActiveRowKey(nKey);
      await this.rerender();
    }
  }

  async onEnter() {
    console.log('Grid.onEnter');
    const key = this.getActiveRowKey();
    const row = this.findRow(key); // console.log(row, key);

    if (this.props.onDoubleClick) {
      await this.props.onDoubleClick(row, key);
    }
  }

  async onDelete() {
    console.log('Grid.onDelete');
    const key = this.getActiveRowKey();
    const row = this.findRow(key); // console.log(row, key);

    if (this.props.onDeleteKeyDown) {
      await this.props.onDeleteKeyDown(row, key);
    }
  }

  async selectCell(key, j) {
    // console.log('Grid.selectCell', key, j);
    if (this.getActiveRowKey() === key && this.getActiveColumn() === j) return;
    this.setActiveRowKey(key);
    this.setActiveColumn(j);

    if (this.props.onSelectionChange) {
      await this.props.onSelectionChange(key);
    } else {
      await this.rerender();
    }
  }

  async selectRow(key) {
    // console.log('Grid.selectRow', key);
    if (this.getActiveRowKey() === key) return;
    this.setActiveRowKey(key);

    if (this.props.onSelectionChange) {
      await this.props.onSelectionChange(key);
    } else {
      await this.rerender();
    }
  }

  getMaxColumnWidth(column) {
    return Math.max(...this.columns[column.name].map(view => view.getSpanOffsetWidth())) + 10 + 2;
  }

  getColumnWidth(i) {
    const column = this.props.columns[i];

    if (this.state.columnWidth[column.name] !== undefined) {
      return this.state.columnWidth[column.name];
    }

    return column.width;
  }

  renderColumns() {
    return this.props.columns.map((column, i) => /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__th`,
      key: column.name,
      style: {
        width: this.getColumnWidth(i)
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: 'ellipsis'
    }, column.title || column.name), /*#__PURE__*/React.createElement("span", {
      className: 'Grid__resize',
      "data-i": i,
      onDoubleClick: this.onResizeDoubleClick
    })));
  }

  renderRows() {
    return this.props.rows.map((row, i) => {
      const key = this.getRowKey(row);
      return /*#__PURE__*/React.createElement(GridRow, {
        key: key,
        rowKey: key,
        grid: this,
        row: row,
        i: i,
        active: this.isRowActive(i, key),
        activeColumn: this.getActiveColumn(),
        updated: this.props.updated,
        resized: this.state.resized
      });
    });
  }

  getRowKey(row) {
    if (this.props.getRowKey) {
      return this.props.getRowKey(row);
    }

    return this.props.rows.indexOf(row).toString();
  }

  renderCell(row, column) {
    let view;

    if (this.props.renderGridCellView) {
      view = this.props.renderGridCellView(row, column, this.onCellViewCreate, this.onCellViewUnmount);
    }

    if (view) return view;
    return /*#__PURE__*/React.createElement(GridCell, {
      row: row,
      column: column,
      onCreate: this.onCellViewCreate,
      onUnmount: this.onCellViewUnmount
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('Grid.shouldComponentUpdate', this.props.name, nextProps.updated - this.props.updated);
    if (this.props.updated) {
      if (nextProps.updated - this.props.updated) return true;
      return false;
    }

    return true;
  }

  render() {
    // console.log('Grid.render', this.props.name);
    return /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssClassNames()} ${this.isDisabled() ? 'disabled' : ''}`,
      ref: this.el,
      tabIndex: 0,
      onKeyDown: this.onKeyDown
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__head`,
      ref: this.head
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__table`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__tr`
    }, this.props.columns && this.renderColumns(), !!this.props.extraColumn && /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__th`
    })))), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__body`,
      onScroll: this.onBodyScroll
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__table`
    }, this.props.rows && this.renderRows())));
  }

  isLink() {
    return !!this.props.createLinkCallback;
  }

}

window.QForms.Grid = Grid;
class GridCell extends ReactComponent {
  constructor(props) {
    super(props);
    this.span = React.createRef();
  }

  getSpanOffsetWidth() {
    if (!this.span.current) return 0;
    return this.span.current.offsetWidth;
  }

  renderCellValue(value) {
    if (typeof value === 'boolean') return value.toString();
    return value;
  }

  render() {
    const row = this.props.row;
    const column = this.props.column;
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement("span", {
      ref: this.span
    }, this.renderCellValue(row[column.name])));
  }

}

window.QForms.GridCell = GridCell;
class GridRow extends ReactComponent {
  isCellActive(j) {
    return this.props.active && this.props.activeColumn === j;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('GridRow.shouldComponentUpdate', nextProps.updated - this.props.updated, nextProps.resized - this.props.resized);
    if (this.props.updated) {
      if (nextProps.updated - this.props.updated) return true;
      if (nextProps.resized - this.props.resized) return true;
      if (this.props.active !== nextProps.active) return true;
      if (this.props.active && this.props.activeColumn !== nextProps.activeColumn) return true;
      return false;
    }

    return true;
  }

  render() {
    // console.log('GridRow.render', this.props.i);
    const grid = this.props.grid;
    const row = this.props.row;
    const i = this.props.i;
    const key = this.props.rowKey;
    const link = grid.props.createLinkCallback ? grid.props.createLinkCallback(key) : null;
    return /*#__PURE__*/React.createElement("a", {
      className: `${grid.getCssBlockName()}__tr ${this.props.active ? 'active' : ''}`,
      "data-key": key,
      href: link,
      onClick: grid.onLinkClick
    }, grid.props.columns.map((column, j) => /*#__PURE__*/React.createElement("div", {
      key: column.name,
      className: `${grid.getCssBlockName()}__td ${this.isCellActive(j) ? 'active' : ''}`,
      style: {
        width: grid.getColumnWidth(j)
      },
      "data-rc": `[${i},${j}]`,
      "data-row": key,
      onMouseDown: grid.onCellMouseDown,
      onDoubleClick: grid.onCellDoubleClick
    }, grid.renderCell(row, column))), !!grid.props.extraColumn && /*#__PURE__*/React.createElement("div", {
      className: `${grid.getCssBlockName()}__td`,
      "data-r": i,
      "data-row": key,
      onMouseDown: grid.onRowMouseDown,
      onDoubleClick: grid.onRowDoubleClick
    }));
  }

}

window.QForms.GridRow = GridRow;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Image extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onImgClick", async e => {
      console.log('Image.onImgClick');

      if (this.props.onClick) {
        return await this.props.onClick();
      }

      this.setState(prevState => {
        if (prevState.classList) {
          return {
            classList: null
          };
        } else {
          return {
            classList: ['Image_full']
          };
        }
      });
    });

    this.img = React.createRef();
    this.state = {
      classList: null
    };
  }

  getNaturalSize() {
    return [this.img.current.naturalWidth, this.img.current.naturalHeight];
  }

  render() {
    return /*#__PURE__*/React.createElement("img", {
      className: this.getCssClassNames(),
      ref: this.img,
      src: this.props.src,
      onClick: this.onImgClick
    });
  }
  /*componentDidMount() {
      console.log('Image.componentDidMount', this.getNaturalSize());
  }*/


}

window.QForms.Image = Image;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Menu extends ReactComponent {
  constructor(props) {
    // console.log('Menu.constructor', props);
    super(props);

    _defineProperty(this, "onMenuClick", async e => {
      // console.log('Menu.onMenuClick', e.currentTarget.dataset.menu);
      await this.toggleMenu(e.currentTarget.dataset.menu);
    });

    _defineProperty(this, "onBlur", async e => {
      // console.log('Menu.onBlur', e.currentTarget.dataset.menu);
      await this.closeMenu(e.currentTarget.dataset.menu);
    });

    _defineProperty(this, "onMouseDown", e => {
      // console.log('Menu.onMouseDown');
      e.preventDefault(); // e.stopPropagation();
      // return false;
    });

    _defineProperty(this, "onMenuItemClick", async e => {
      // console.log('Menu.onMenuItemClick', e.target.dataset.menu, e.target.dataset.item);
      e.persist();
      const {
        menu,
        type,
        name
      } = e.target.dataset;
      await this.closeMenu(menu);

      if (this.props.onClick) {
        this.props.onClick(menu, type, name);
      }
    });

    this.state = {};
  }

  toggleMenu(menu) {
    return new Promise(resolve => {
      this.setState(prevState => ({
        [menu]: !prevState[menu]
      }), resolve);
    });
  }

  closeMenu(menu) {
    return new Promise(resolve => this.setState({
      [menu]: false
    }, resolve));
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "Menu"
    }, this.props.items && this.props.items.map(menu => /*#__PURE__*/React.createElement("div", {
      key: menu.name,
      className: this.state[menu.name] ? 'active' : null
    }, /*#__PURE__*/React.createElement("button", {
      "data-menu": menu.name,
      onClick: this.onMenuClick,
      onBlur: this.onBlur
    }, menu.title), /*#__PURE__*/React.createElement("div", {
      onMouseDown: this.onMouseDown,
      onClick: this.onMenuItemClick
    }, menu.items.map(item => /*#__PURE__*/React.createElement("a", {
      key: item.name,
      "data-menu": menu.name,
      "data-type": item.type,
      "data-name": item.name
    }, item.title))))));
  }

}

window.QForms.Menu = Menu;
class Modal extends ReactComponent {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__container`
    }, this.props.children));
  }

}

window.QForms.Modal = Modal;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Password extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", e => {
      this._setValue(e.target.value);
    });

    _defineProperty(this, "onCloseClick", e => {
      this._setValue('');

      this.getInputElement().focus();
    });

    _defineProperty(this, "onIconClick", e => {
      this.setState(prevState => {
        return {
          type: prevState.type === 'password' ? 'text' : 'password'
        };
      });
      this.getInputElement().focus();
    });

    this.el = React.createRef();
    this.inputEl = React.createRef();
    this.state = {
      value: this.props.value || '',
      type: 'password'
    };
  }

  getInputElement() {
    return this.inputEl.current;
  }

  getValue() {
    return this.state.value;
  }

  _setValue(value) {
    this.state.value = value;
    this.forceUpdate();

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.state.value = nextProps.value;
    return true;
  }

  isCloseVisible() {
    return this.state.value !== '';
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      ref: this.el,
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement("input", {
      ref: this.inputEl,
      className: `${this.getCssBlockName()}__input`,
      type: this.state.type,
      id: this.props.id,
      name: this.props.name,
      readOnly: this.props.readOnly,
      disabled: this.props.disabled,
      placeholder: this.props.placeholder,
      autoFocus: this.props.autoFocus,
      spellCheck: this.props.spellCheck,
      autoComplete: this.props.autocomplete,
      value: this.state.value,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
      onChange: this.onChange
    }), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`,
      onClick: this.onCloseClick
    }, /*#__PURE__*/React.createElement(CloseIcon, null)), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__icon`,
      onClick: this.onIconClick
    }, this.state.type === 'password' ? /*#__PURE__*/React.createElement(VisibilityIcon, null) : /*#__PURE__*/React.createElement(VisibilityOffIcon, null)));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PhoneBox extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onKeyPress", e => {
      // console.log('PhoneBox.onKeyPress', e.key, e.target.value);
      // console.log('start/end', e.target.selectionStart, e.target.selectionEnd);
      if (!['+', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === '+' && e.target.value.length && Math.abs(e.target.selectionEnd - e.target.selectionStart) !== e.target.value.length) {
        e.preventDefault();
      }
    });

    _defineProperty(this, "onChange", e => {
      // console.log('PhoneBox.onChange', e.target.value);
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const len = e.target.value.length; // console.log('start/end/len:', start, end, len);
      // disable edition in middle

      if (start !== end || start !== len) {
        return;
      } // value pipeline


      let value = PhoneBox.clearValue(e.target.value);
      value = PhoneBox.ifNoCodeAddRussianCode(value); // state

      this.state.value = PhoneBox.formatPhoneNumber(value);
      this.setState({
        value: this.state.value
      }); // for render only
      // event

      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });

    this.el = React.createRef();
    this.state = {
      value: PhoneBox.formatPhoneNumber(this.props.value || '')
    };
  }

  getValue() {
    return PhoneBox.clearValue(this.state.value);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('TextBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
    this.state.value = PhoneBox.formatPhoneNumber(nextProps.value);
    return true;
  }

  render() {
    // console.log('TextBox.render');
    return /*#__PURE__*/React.createElement("input", {
      ref: this.el,
      className: this.getCssClassNames(),
      type: 'text',
      id: this.props.id,
      name: this.props.name,
      readOnly: this.props.readOnly,
      disabled: this.props.disabled,
      placeholder: this.props.placeholder,
      autoFocus: this.props.autoFocus,
      spellCheck: this.props.spellCheck,
      autoComplete: this.props.autocomplete,
      value: this.state.value,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    });
  }

  static clearValue(value) {
    return value.replace(/[^\+0-9]/g, '');
  }

  static ifNoCodeAddRussianCode(value) {
    if (value === '') {} else if (value.match(/^8/)) {
      return value.replace(/^8/, '+7');
    } else if (value[0] !== '+') {
      return `+7${value}`;
    }

    return value;
  }

  static formatPhoneNumber(value) {
    // russian country code
    const arr = /(^\+7)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/.exec(value); // console.log('arr:', arr);

    if (arr) {
      if (arr[5]) {
        return `${arr[1]} ${arr[2]} ${arr[3]}-${arr[4]}-${arr[5]}`;
      }

      if (arr[4]) {
        return `${arr[1]} ${arr[2]} ${arr[3]}-${arr[4]}`;
      }

      if (arr[3]) {
        return `${arr[1]} ${arr[2]} ${arr[3]}`;
      }

      if (arr[2]) {
        return `${arr[1]} ${arr[2]}`;
      }

      if (arr[1]) {
        return `${arr[1]}`;
      }
    }

    return value;
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Select extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onKeyDown", async e => {
      // console.log('Select.onKeyDown');
      if (this.state.visible) {
        this.setState({
          visible: false
        });
        e.stopPropagation();
      }
    });

    _defineProperty(this, "onInputMouseDown", async e => {
      if (this.props.readOnly) return;

      if (this.props.onMouseDown) {
        await this.props.onMouseDown(e);
      } else {
        if (!this.state.visible) {
          const [selected] = this.el.current.querySelectorAll('li.selected'); // console.log('selected:', selected);

          if (selected) {
            // console.log('selected.offsetTop:', selected.offsetTop);
            const scrollTop = selected.offsetTop - this.dropdown.current.getBoundingClientRect().height / 2 + selected.getBoundingClientRect().height / 2;
            console.log('scrollTop:', scrollTop);
            this.dropdown.current.scrollTop = scrollTop;
            console.log('this.dropdown.current.scrollTop', this.dropdown.current.scrollTop);
          }
        }

        this.setState(prevState => {
          return {
            visible: !prevState.visible
          };
        });
      }
    });

    _defineProperty(this, "onInputBlur", async e => {
      console.log('Select.onInputBlur', e.target);
      this.setState({
        visible: false
      });
    });

    _defineProperty(this, "onDropdownMouseDown", async e => {
      e.preventDefault();
    });

    _defineProperty(this, "onDropdownClick", async e => {
      console.log('Select.onDropdownClick', e.target.offsetTop);
      const value = JSON.parse(e.target.dataset.value); // console.log('value:', value);

      this.setState({
        value: value,
        visible: false
      }, async () => {
        if (this.props.onChange) {
          await this.props.onChange(value.toString());
        }
      });
    });

    _defineProperty(this, "onCloseClick", async e => {
      this.setState({
        value: ''
      });

      if (this.props.onChange) {
        await this.props.onChange('');
      }

      this.getElement();
    });

    this.el = React.createRef();
    this.dropdown = React.createRef();
    this.state = {
      value: this.getInitialValue(),
      visible: false
    };
  }

  getInitialValue() {
    // console.log('Select.getInitialValue', this.props.value);
    let value = null;

    if (this.props.value !== undefined && this.props.value !== null) {
      value = this.props.value;
      const item = this.getItems().find(item => item.value === this.props.value);

      if (!item) {
        if (this.isNullable() && value === '') {} else {
          console.error(`no item for value:`, this.props.value, typeof this.props.value);
          console.log('items:', this.getItems());
        }
      }
    } else {
      if (this.isNullable()) {
        value = '';
      } else {
        if (this.props.items.length) {
          value = this.props.items[0].value;
        } else {
          value = '';
        }
      }
    }

    if (value === null) throw new Error('null is wrong value for Select'); // console.log('select value:', value);

    return value;
  }

  getValue() {
    return this.state.value;
  }

  isNullable() {
    return this.props.nullable !== undefined ? this.props.nullable : true;
  }

  getVisibility() {
    return this.state.visible ? 'visible' : 'hidden';
  }

  getItems() {
    return this.props.items || [];
  }

  getValueTitle(value) {
    if (value === '') return '';
    const item = this.getItems().find(item => item.value === value);
    if (!item) throw new Error(`cannot find item by value: ${value}`); // console.log('item:', item);

    return item.title || item.value;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('Select.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
    this.state.value = nextProps.value;
    return true;
  }

  isCloseVisible() {
    if (this.props.readOnly) return false;
    return this.state.value !== '';
  }

  render() {
    // console.log('Select.render', this.state.value, this.getValueTitle(this.state.value));
    return /*#__PURE__*/React.createElement("div", {
      ref: this.el,
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement("input", {
      className: `${this.getCssBlockName()}__input`,
      readOnly: true,
      disabled: this.props.readOnly,
      placeholder: this.props.placeholder,
      onBlur: this.onInputBlur,
      value: this.getValueTitle(this.getValue()),
      onMouseDown: this.onInputMouseDown,
      onKeyDown: this.onKeyDown
    }), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`,
      onClick: this.onCloseClick
    }, /*#__PURE__*/React.createElement(CloseIcon, null)), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__icon ${this.state.visible ? 'Select__icon_up' : ''}`
    }, /*#__PURE__*/React.createElement(ArrowIcon, null)), /*#__PURE__*/React.createElement("ul", {
      ref: this.dropdown,
      className: `${this.getCssBlockName()}__dropdown`,
      style: {
        visibility: this.getVisibility()
      },
      onMouseDown: this.onDropdownMouseDown,
      onClick: this.onDropdownClick
    }, this.isNullable() && /*#__PURE__*/React.createElement("li", {
      className: `${this.getCssBlockName()}__item`,
      "data-value": '""'
    }, "\xA0"), this.getItems().map(item => {
      return /*#__PURE__*/React.createElement("li", {
        key: item.value,
        className: `${this.getCssBlockName()}__item ellipsis ${this.getValue() === item.value ? 'selected' : ''}`,
        "data-value": JSON.stringify(item.value)
      }, item.title || `#${item.value}`);
    })));
  }

}
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Slider extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onPrevClick", e => {
      // console.log('Slider.onPrevClick');
      this.setState(prevState => {
        let image = prevState.image - 1;

        if (image < 0) {
          image = this.props.images.length - 1;
        }

        return {
          image
        };
      });
    });

    _defineProperty(this, "onNextClick", e => {
      // console.log('Slider.onNextClick');
      this.setState(prevState => {
        let image = prevState.image + 1;

        if (image > this.props.images.length - 1) {
          image = 0;
        }

        return {
          image
        };
      });
    });

    _defineProperty(this, "onImageClick", e => {
      console.log('Slider.onImageClick');
      this.setState({
        classList: ['Slider_full']
      });
    });

    _defineProperty(this, "onCloseClick", e => {
      this.setState({
        classList: null
      });
    });

    if (!this.props.images) throw new Error('Slider: no images');
    this.state = {
      image: 0,
      classList: null
    };
  }

  render() {
    // console.log('Slider.render', this.props.images);
    const images = this.props.images || [];
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement("img", {
      className: 'Slider_image',
      src: images[this.state.image],
      onClick: this.onImageClick
    }), /*#__PURE__*/React.createElement("p", {
      className: 'Slider__label'
    }, images.length > 0 ? this.state.image + 1 : 0, "/", images.length), /*#__PURE__*/React.createElement("button", {
      className: 'Slider__prev',
      onClick: this.onPrevClick
    }, "prev"), /*#__PURE__*/React.createElement("button", {
      className: 'Slider__next',
      onClick: this.onNextClick
    }, "next"), /*#__PURE__*/React.createElement("button", {
      className: 'Slider__close',
      onClick: this.onCloseClick
    }, "close"));
  }

}

window.QForms.Slider = Slider;
class Statusbar extends ReactComponent {
  constructor(props) {
    // console.log('Statusbar.constructor', props);
    super(props);
    this.state = {};
  }

  setLastQueryTime(lastQueryTime) {
    this.setState({
      lastQueryTime
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "Statusbar"
    }, /*#__PURE__*/React.createElement("div", null, "Last query time: ", this.state.lastQueryTime ? `${this.state.lastQueryTime} ms` : '-'));
  }

}

window.QForms.Statusbar = Statusbar;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Tab extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onLiMouseDown", e => {
      // console.log('Tab.onLiMouseDown', e.target);
      if (e.target.classList.contains('close')) return;
      const i = parseInt(e.currentTarget.dataset.i);

      if (this.props.getActive) {
        if (this.props.onTabMouseDown) this.props.onTabMouseDown(i);
      } else {
        if (i !== this.getActive()) {
          this.selectTab(i);
        }
      }
    });

    _defineProperty(this, "onLiClick", e => {
      // console.log('Tab.onLiClick', e.target);
      if (e.target.classList.contains('close')) {
        const i = parseInt(e.currentTarget.dataset.i); // console.log('close tab:', i);

        if (this.props.onTabClose) this.props.onTabClose(i);
      }
    });

    this.state = {
      active: 0
    };
  }

  getActive() {
    if (this.props.getActive) return this.props.getActive();
    return this.state.active;
  }

  selectTab(i) {
    if (i === this.getActive()) return;
    const start = Date.now();
    this.setState({
      active: i
    }, () => console.log('selectTab time:', Date.now() - start));
  }

  renderTitles() {
    return this.props.tabs.map((tab, i) => /*#__PURE__*/React.createElement("li", {
      key: tab.name,
      className: i === this.getActive() ? 'active' : null,
      onMouseDown: this.onLiMouseDown,
      onClick: this.onLiClick,
      "data-i": i
    }, /*#__PURE__*/React.createElement("span", null, tab.title), this.props.canClose && /*#__PURE__*/React.createElement("span", {
      className: "close"
    }, "\xD7")));
  }

  renderContents() {
    return this.props.tabs.map((tab, i) => /*#__PURE__*/React.createElement("div", {
      key: tab.name,
      className: i === this.getActive() ? 'active' : null
    }, tab.content));
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement("ul", null, this.props.tabs && this.renderTitles()), /*#__PURE__*/React.createElement("div", null, this.props.tabs && this.renderContents()));
  }

}

window.QForms.Tab = Tab;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Tab2 extends ReactComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onLiMouseDown", e => {
      // console.log('Tab.onLiMouseDown', e.target);
      if (e.target.classList.contains('close')) return;
      const i = parseInt(e.currentTarget.dataset.i);

      if (this.props.getActive) {
        if (this.props.onTabMouseDown) this.props.onTabMouseDown(i);
      } else {
        if (i !== this.getActive()) {
          this.selectTab(i);
        }
      }
    });

    _defineProperty(this, "onLiClick", e => {
      // console.log('Tab.onLiClick', e.target);
      if (e.target.classList.contains('close')) {
        const i = parseInt(e.currentTarget.dataset.i); // console.log('close tab:', i);

        if (this.props.onTabClose) this.props.onTabClose(i);
      }
    });

    this.state = {
      active: 0
    };
  }

  getActive() {
    if (this.props.getActive) return this.props.getActive();
    return this.state.active;
  }

  selectTab(i) {
    if (i === this.getActive()) return;
    const start = Date.now();
    this.setState({
      active: i
    }, () => console.log('selectTab time:', Date.now() - start));
  }

  renderTitles() {
    return this.props.tabs.map((tab, i) => /*#__PURE__*/React.createElement("li", {
      key: tab.name,
      className: `${this.getCssBlockName()}__button ${i === this.getActive() ? 'active' : ''}`,
      onMouseDown: this.onLiMouseDown,
      onClick: this.onLiClick,
      "data-i": i
    }, /*#__PURE__*/React.createElement("span", null, tab.title), this.props.canClose && /*#__PURE__*/React.createElement("span", {
      className: "close"
    }, "\xD7")));
  }

  renderContents() {
    return this.props.tabs.map((tab, i) => /*#__PURE__*/React.createElement("div", {
      key: tab.name,
      className: `${this.getCssBlockName()}__page ${i === this.getActive() ? 'active' : ''}`
    }, tab.content));
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.getCssClassNames()
    }, /*#__PURE__*/React.createElement("ul", {
      className: `${this.getCssBlockName()}__buttons`
    }, this.props.tabs && this.renderTitles()), /*#__PURE__*/React.createElement("div", {
      className: `${this.getCssBlockName()}__pages`
    }, this.props.tabs && this.renderContents()));
  }

}

window.QForms.Tab = Tab;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TextArea extends ReactComponent {
  constructor(props) {
    // console.log('TextArea.constructor', props);
    super(props);

    _defineProperty(this, "onChange", e => {
      // console.log('TextArea.onChange', e.target.value);
      this.setState({
        value: e.target.value
      });

      if (this.props.onChange) {
        this.props.onChange(e.target.value);
      }
    });

    this.state = {
      value: this.props.value || ''
    };
  }

  getValue() {
    return this.state.value;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('TextArea.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
    this.state.value = nextProps.value;
    return true;
  }

  render() {
    // console.log('TextArea.render');
    return /*#__PURE__*/React.createElement("textarea", {
      className: this.getCssClassNames(),
      readOnly: this.props.readOnly,
      disabled: this.props.disabled,
      placeholder: this.props.placeholder,
      rows: this.props.rows,
      cols: this.props.cols,
      value: this.state.value,
      onChange: this.onChange,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur
    });
  }

}

window.QForms.TextArea = TextArea;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TextBox extends ReactComponent {
  constructor(props) {
    // console.log('TextBox.constructor', props);
    super(props);

    _defineProperty(this, "onChange", e => {
      // console.log('TextBox.onChange', e.target.value);
      this._setValue(e.target.value);
    });

    this.el = React.createRef();
    this.state = {
      value: this.props.value || ''
    };
  }

  getValue() {
    return this.state.value;
  }

  _setValue(value) {
    this.state.value = value; // this.setState({value: this.state.value});   // rerender

    this.forceUpdate();

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('TextBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
    this.state.value = nextProps.value;
    return true;
  }

  render() {
    // console.log('TextBox.render');
    return /*#__PURE__*/React.createElement("input", {
      ref: this.el,
      className: this.getCssClassNames(),
      type: this.props.type || 'text',
      id: this.props.id,
      name: this.props.name,
      readOnly: this.props.readOnly,
      disabled: this.props.disabled,
      placeholder: this.props.placeholder,
      autoFocus: this.props.autoFocus,
      spellCheck: this.props.spellCheck,
      autoComplete: this.props.autocomplete,
      required: this.props.required,
      value: this.state.value,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
      onChange: this.onChange
    });
  }

}

window.QForms.TextBox = TextBox;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TimeBox extends ReactComponent {
  constructor(props) {
    // console.log('TimeBox.constructor', props);
    super(props);

    _defineProperty(this, "onKeyPress", event => {
      // console.log('TimeBox.onKeyPress', event.key, event.target.value);
      if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
        console.log('cancel', event.key);
        event.preventDefault();
      }
    });

    _defineProperty(this, "onChange", e => {
      // console.log('TimeBox.onChange', e.target.value);
      const target = e.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      if (target.value.length > 5) {
        return;
      }

      const inEnd = start === end && start === target.value.length;
      const stringValue = this.formatValue(target.value); // console.log('before:', target.selectionStart, target.selectionEnd);

      this.setState({
        value: stringValue
      }, () => {
        // console.log('after:', target.selectionStart, target.selectionEnd);
        // console.log('inEnd:', inEnd);
        if (!inEnd) {
          target.selectionStart = start;
          target.selectionEnd = end;
        }

        if (this.props.onChange) {
          let nValue;

          try {
            nValue = this.getValue();
          } catch (err) {
            console.log(err.message);
            nValue = NaN;
          } // console.log('nValue:', nValue);


          this.props.onChange(nValue);
        }
      });
    });

    _defineProperty(this, "onBlur", e => {
      // console.log('TimeBox.onBlur');
      if (this.props.onBlur) {
        let nValue;

        try {
          nValue = this.getValue();
        } catch (err) {
          console.log(err.message);
          nValue = NaN;
        } // console.log('nValue:', nValue);


        this.props.onBlur(nValue);
      }
    });

    if (props.value && typeof props.value !== 'number') {
      throw new Error(`need number type, got ${typeof props.value}`);
    }

    this.state = {
      value: TimeBox.getStringValue(props.value)
    };
    this.el = React.createRef();
  }

  formatValue(value) {
    let min = '';
    let sec = '';
    const pure = value.replace(':', '');

    switch (pure.length) {
      case 0:
        break;

      case 1:
        min = pure;
        break;

      case 2:
        min = pure;
        break;

      case 3:
        min = pure.substr(0, 2);
        sec = pure.substr(2, 1);
        break;

      case 4:
        min = pure.substr(0, 2);
        sec = pure.substr(2, 2);
        break;
    }

    return [min, ...(sec ? [sec] : [])].join(':');
  }

  getValue() {
    return TimeBox.getIntegerValue(this.state.value);
  }

  setValue(value) {
    this.setState({
      value: TimeBox.getStringValue(value)
    });
  }

  /*onKeyDown = event => {
      console.log('TimeBox.onKeyDown', event.which, event.target.value.length, event.target.selectionStart, event.target.selectionEnd, event.key);
      const mask = '00:00';
      if ([8, 46, 37, 39, 36, 35].includes(event.which)) return;
      if (event.which < 96 || event.which > 105) {
          console.log('cancel');
          event.stopPropagation();
          event.preventDefault();
      }
       if (event.target.value.length + 1 > mask.length) {
          event.stopPropagation();
          event.preventDefault();
      }
  }*/

  /*onKeyUp = event => {
      console.log('TimeBox.onKeyUp', event.which, event.target.value.length, event.target.selectionStart, event.target.selectionEnd, event.target.value);
      event.stopPropagation();
      event.preventDefault();
  }*/
  static getStringValue(value) {
    // console.log('TimeBox.getStringValue', value);
    if (value === null) return '';

    if (value !== undefined) {
      let h = Math.floor(value / 60);
      let m = Math.floor(value - h * 60);
      if (h < 10) h = '0' + h;
      if (m < 10) m = '0' + m;
      return `${h}:${m}`;
    }

    return '';
  }

  static getIntegerValue(stringValue) {
    // console.log('TimeBox.getIntegerValue', stringValue);
    // try {
    if (stringValue === '') return null;
    const arr = stringValue.split(':');
    if (!arr[0]) throw new Error(`no hours: ${stringValue}`);
    if (!arr[1]) throw new Error(`no minutes: ${stringValue}`);
    if (arr[0].length !== 2) throw new Error(`hours incomplete: ${stringValue}`);
    if (arr[1].length !== 2) throw new Error(`minutes incomplete: ${stringValue}`);
    const hh = parseInt(arr[0]);
    const mm = parseInt(arr[1]);
    if (hh > 23) throw new Error(`hours out of range: ${mm}, ${stringValue}`);
    if (mm > 59) throw new Error(`minutes out of range: ${mm}, ${stringValue}`);
    return hh * 60 + mm; // } catch (err) {
    //     console.error(err.message);
    //     return NaN;
    // }
  }

  static splitTime(value) {
    const hours = Math.floor(value / 60);
    const minutes = value - hours * 60;
    return [hours, minutes];
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('TimeBox.shouldComponentUpdate', this.state, nextState);
    if (this.props.value !== nextProps.value) {
      this.state.value = TimeBox.getStringValue(nextProps.value);
      return true;
    }

    if (this.props.readOnly !== nextProps.readOnly) return true;
    if (this.props.placeholder !== nextProps.placeholder) return true;
    if (this.state.value !== nextState.value) return true;
    return false;
  }

  render() {
    // console.log('TimeBox.render', this.state.value);
    return /*#__PURE__*/React.createElement("input", {
      ref: this.el,
      className: this.getCssClassNames(),
      type: 'text',
      id: this.props.id,
      readOnly: this.props.readOnly,
      placeholder: this.props.placeholder,
      value: this.state.value,
      onChange: this.onChange // onKeyDown={this.onKeyDown}
      // onKeyUp={this.onKeyUp}
      ,
      onKeyPress: this.onKeyPress,
      onBlur: this.onBlur
    });
  }

}

window.QForms.TimeBox = TimeBox;
class Tooltip extends ReactComponent {
  // constructor(props) {
  //     console.log('Tooltip.constructor', props);
  //     super(props);
  // }
  render() {
    // console.log('Tooltip.render', this.state, this.props);
    return /*#__PURE__*/React.createElement("div", {
      className: `Tooltip ${this.props.type} ${this.props.hidden ? 'hidden' : ''}`
    }, this.props.type !== 'alert' && /*#__PURE__*/React.createElement("div", null, "tooltip"), /*#__PURE__*/React.createElement("span", {
      className: this.props.position
    }, this.props.tip || 'tip'));
  }

}

window.QForms.Tooltip = Tooltip;