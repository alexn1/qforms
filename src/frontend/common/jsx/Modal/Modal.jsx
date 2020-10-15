class Modal extends ReactComponent {
    render() {
        return (
            <div className="Modal">
                <div>
                    <span className="close">&times;</span>
                    <div style={{backgroundColor: 'white'}}>content</div>
                </div>
            </div>
        );
    }
}
