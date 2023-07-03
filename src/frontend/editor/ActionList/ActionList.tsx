import { ReactComponent, DropdownButton } from '../../common';

export class ActionList extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
        };
    }

    onClick = async (li) => {
        console.debug('ActionList.onClick', li);
        await this.props.onClick(li.dataset.action);
    };

    render() {
        // console.debug('ActionList.render', this.state.item);
        return (
            <DropdownButton
                title={'Actions'}
                onClick={this.onClick}
                actions={
                    this.state.item
                        ? this.state.item.getActions().map((action) => {
                              return { name: action.action, title: action.caption };
                          })
                        : []
                }
            />
        );
    }
}
