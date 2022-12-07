import { ReactComponent } from '../../ReactComponent';

export class Modal extends ReactComponent {
    render() {
        return (
            <div className={this.getCssClassNames()}>
                <div className={`${this.getCssBlockName()}__container`}>{this.props.children}</div>
            </div>
        );
    }
}

// @ts-ignore
window.Modal = Modal;
