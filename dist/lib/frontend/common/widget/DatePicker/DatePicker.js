"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
const Helper_1 = require("../../Helper");
const LeftIcon_1 = require("../../icon/LeftIcon");
const RightIcon_1 = require("../../icon/RightIcon");
require("./DatePicker.less");
// props
//  visible boolean true
//  selectedDate array [2021, 0, 1]
//  minDate array [2021, 0, 1]
//  onMouseDown function
//  onDateSelected function
//  getDateStyle function
//  selectToday boolean false
//  highlightedDate array [2021, 0, 1]
class DatePicker extends ReactComponent_1.ReactComponent {
    constructor(props) {
        // console.log('DatePicker.constructor', props);
        super(props);
        this.onClick = (e) => {
            console.log('DatePicker.onClick', e.target);
            if (e.target.nodeName === 'TD' && e.target.classList.contains('selectable')) {
                return this.onDateClick(e.target);
            }
        };
        this.onMouseDown = (e) => {
            // console.log('DatePicker.onMouseDown');
            if (this.props.onMouseDown) {
                return this.props.onMouseDown(e);
            }
        };
        this.onNextClick = (e) => {
            // console.log('DatePicker.next');
            this.setState((prevState) => {
                const next = new Date(prevState.selectedMonth[0], prevState.selectedMonth[1]);
                next.setMonth(next.getMonth() + 1);
                return {
                    selectedMonth: [next.getFullYear(), next.getMonth()],
                };
            });
        };
        this.onPrevClick = (e) => {
            // console.log('DatePicker.prev');
            this.setState((prevState) => {
                const prev = new Date(prevState.selectedMonth[0], prevState.selectedMonth[1]);
                prev.setMonth(prev.getMonth() - 1);
                return {
                    selectedMonth: [prev.getFullYear(), prev.getMonth()],
                };
            });
        };
        if (this.props.minDate && !(this.props.minDate instanceof Array))
            throw new Error('minDate must be array');
        this.state = { selectedMonth: this.calcSelectedMonth() };
        this.MONTH = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ];
    }
    static createDateFromArr(arr) {
        return new Date(arr[0], arr[1], arr[2]);
    }
    isVisible() {
        if (this.props.visible === false)
            return false;
        return true;
    }
    calcSelectedMonth() {
        // console.log('DatePicker.calcSelectedMonth', this.props.selectedDate);
        if (this.props.selectedDate) {
            return [this.props.selectedDate[0], this.props.selectedDate[1]];
        }
        else if (this.props.highlightedDate) {
            return [this.props.highlightedDate[0], this.props.highlightedDate[1]];
        }
        else {
            const dates = [Helper_1.Helper.today().getTime()];
            if (this.props.minDate)
                dates.push(DatePicker.createDateFromArr(this.props.minDate).getTime());
            // if (this.props.selectedDate) dates.push(DatePicker.createDateFromArr(this.props.selectedDate).getTime());
            // if (this.props.selectedMonth) dates.push(new Date(this.props.selectedMonth[0], this.props.selectedMonth[1], 1).getTime());
            const date = new Date(Math.min(...dates));
            // console.log('date:', date);
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
        if (day === -1)
            day = 6;
        if (day === 0)
            day = 7;
        return day;
    }
    createSelectedDate() {
        if (!this.isDateSelected())
            throw new Error('date not selected');
        // @ts-ignore
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
        if (!this.props.minDate)
            throw new Error('no min date');
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
        const today = Helper_1.Helper.today();
        const minDate = this.isMinDate() ? this.createMinDate() : null;
        const selectedDate = this.isDateSelected() ? this.createSelectedDate() : null;
        // @ts-ignore
        const highlightedDate = this.props.highlightedDate
            ? // @ts-ignore
                new Date(...this.props.highlightedDate)
            : null;
        return ((0, jsx_runtime_1.jsxs)("table", Object.assign({ className: `${this.getCssClassNames()} ${this.isVisible() ? 'visible' : ''}`, onClick: this.onClick, onMouseDown: this.onMouseDown }, { children: [(0, jsx_runtime_1.jsx)("caption", Object.assign({ className: `${this.getCssBlockName()}__caption` }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__caption-content` }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__caption-link ${this.isPrevAllowed() ? 'enabled' : ''}`, onClick: this.onPrevClick }, { children: (0, jsx_runtime_1.jsx)(LeftIcon_1.LeftIcon, { size: 18 }) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: `${this.getCssBlockName()}__caption-title` }, { children: `${this.MONTH[this.state.selectedMonth[1]]}, ${this.state.selectedMonth[0]}` })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__caption-link enabled`, onClick: this.onNextClick }, { children: (0, jsx_runtime_1.jsx)(RightIcon_1.RightIcon, { size: 18 }) }))] })) })), (0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th` }, { children: "\u041F\u043D" })), (0, jsx_runtime_1.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th` }, { children: "\u0412\u0442" })), (0, jsx_runtime_1.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th` }, { children: "\u0421\u0440" })), (0, jsx_runtime_1.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th` }, { children: "\u0427\u0442" })), (0, jsx_runtime_1.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th` }, { children: "\u041F\u0442" })), (0, jsx_runtime_1.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th weekend` }, { children: "\u0421\u0431" })), (0, jsx_runtime_1.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th weekend` }, { children: "\u0412\u0441" }))] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: Array.from(Array(6).keys()).map((i) => ((0, jsx_runtime_1.jsx)("tr", { children: Array.from(Array(7).keys()).map((j) => {
                            const classList = [];
                            if (j === 5 || j === 6)
                                classList.push('weekend');
                            if (this.isSelectToday() && date.getTime() === today.getTime())
                                classList.push('today');
                            if (date.getMonth() !== this.state.selectedMonth[1])
                                classList.push('out');
                            if (!minDate)
                                classList.push('selectable');
                            else if (date.getTime() >= minDate.getTime())
                                classList.push('selectable');
                            if (selectedDate && date.getTime() === selectedDate.getTime())
                                classList.push('selected');
                            if (highlightedDate && highlightedDate.getTime() === date.getTime())
                                classList.push('highlight');
                            const text = date.getDate().toString();
                            const dataDate = JSON.stringify(DatePicker.dateToArray(date));
                            const style = this.props.getDateStyle
                                ? this.props.getDateStyle(date)
                                : null;
                            date.setDate(date.getDate() + 1);
                            return ((0, jsx_runtime_1.jsx)("td", Object.assign({ className: `${this.getCssBlockName()}__td  ${classList.join(' ')}`, style: style, "data-date": dataDate }, { children: text }), text));
                        }) }, i))) })] })));
    }
    isSelectToday() {
        if (this.props.selectToday === false)
            return false;
        return true;
    }
}
exports.DatePicker = DatePicker;
// @ts-ignore
window.DatePicker = DatePicker;
