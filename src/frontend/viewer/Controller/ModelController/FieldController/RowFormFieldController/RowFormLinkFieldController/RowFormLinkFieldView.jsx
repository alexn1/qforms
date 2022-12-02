export class RowFormLinkFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getCssClassNames()}>
                <a href={ctrl.getValueForWidget()} onClick={ctrl.onClick} target={'_blank'}>
                    {ctrl.getValueForWidget()}
                </a>
            </div>
        );
    }
}
window.QForms.RowFormLinkFieldView = RowFormLinkFieldView;
