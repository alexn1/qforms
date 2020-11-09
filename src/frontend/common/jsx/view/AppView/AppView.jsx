class AppView extends ReactComponent {
    render() {
        console.log('AppView.render', this.props.data);
        return (
            <div className="AppView">AppView</div>
        );
    }
}
