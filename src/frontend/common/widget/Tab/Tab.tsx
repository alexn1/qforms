import { ReactComponent } from '../../ReactComponent';
import './Tab.less';

export class Tab extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
        };
    }

    getActive() {
        if (this.props.getActive) return this.props.getActive();
        return this.state.active;
    }

    onLiMouseDown = (e) => {
        // console.debug('Tab.onLiMouseDown', e.target);
        if (e.target.classList.contains('close')) return;
        const i = parseInt(e.currentTarget.dataset.i);
        if (this.props.getActive) {
            if (this.props.onTabMouseDown) this.props.onTabMouseDown(i);
        } else {
            if (i !== this.getActive()) {
                this.selectTab(i);
            }
        }
    };

    onLiClick = (e) => {
        // console.debug('Tab.onLiClick', e.target);
        if (e.target.classList.contains('close')) {
            const i = parseInt(e.currentTarget.dataset.i);
            // console.debug('close tab:', i);
            if (this.props.onTabClose) this.props.onTabClose(i);
        }
    };

    selectTab(i) {
        if (i === this.getActive()) return;
        const start = Date.now();
        this.setState({ active: i }, () => console.debug('selectTab time:', Date.now() - start));
    }

    renderTitles() {
        return this.props.tabs.map((tab, i) => (
            <li
                key={tab.name}
                className={i === this.getActive() ? 'active' : undefined}
                onMouseDown={this.onLiMouseDown}
                onClick={this.onLiClick}
                data-i={i}>
                <span>{tab.title}</span>
                {this.props.canClose && <span className="close">&times;</span>}
            </li>
        ));
    }

    renderContents() {
        return this.props.tabs.map((tab, i) => (
            <div key={tab.name} className={i === this.getActive() ? 'active' : undefined}>
                {tab.content}
            </div>
        ));
    }

    render() {
        return (
            <div className={this.getCssClassNames()}>
                <ul>{this.props.tabs && this.renderTitles()}</ul>
                <div>{this.props.tabs && this.renderContents()}</div>
            </div>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.Tab = Tab;
}
