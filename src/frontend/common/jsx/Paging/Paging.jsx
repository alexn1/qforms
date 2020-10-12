class Paging extends ReactComponent {
    render() {
        const model = this.props.ctrl.model;
        return (
            <div className="Paging">
                <div className="countBlock">
                    <span>{model.getApp().getText().form.count}</span>
                    <span className="count"/>
                </div>
                <button className="previous">{model.getApp().getText().form.previous}</button>
                <select className="goto"/>
                <button className="next">{model.getApp().getText().form.next}</button>
            </div>
        );
    }
}