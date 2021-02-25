class ActionList extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            item: null
        };
    }
    onActionClick = async e => {
        // console.log('ActionList.onActionClick', e.currentTarget.dataset.action);
        await this.props.ctrl.onActionClick(e.currentTarget.dataset.action);
    }
    renderActions(ctrl) {
        return ctrl.getActions().map(action => {
            if (action.caption === '-') {
                return <li className='divider'></li>;
            } else {
                return <li key={action.action} onClick={this.onActionClick} data-action={action.action}>
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
