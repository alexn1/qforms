class ActionList extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            item: null
        };
    }
    onActionClick = e => {
        console.log('ActionList.onActionClick');
        // const controller = this.ctrl instanceof PageLinkController ? this.ctrl.pageController : this.ctrl;
        // controller.doAction(this.miAction);
    }
    renderActions(ctrl) {
        return ctrl.getActions().map(action => {
            if (action.caption === '-') {
                return <li className='divider'></li>;
            } else {
                return <li onClick={this.onActionClick}>
                    <a style={{cursor: 'pointer'}}>{action.caption}</a>
                </li>;
            }
        });
    }
    render() {
        console.log('ActionList.render', this.state.item);
        return <ul id="actionList" className="dropdown-menu">
            {this.state.item
                ? this.renderActions(this.state.item)
                : <li className="disabled"><a>none1</a></li>
            }
        </ul>;
    }
}
