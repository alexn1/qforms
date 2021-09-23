class SdiApplicationView extends ApplicationView {
    render() {
        console.log('SdiApplicationView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        return (
            <div className={`SdiApplicationView__container`}>
                <header>
                    <Menu items={ctrl.getMenuItemsProp()} onClick={ctrl.onMenuItemClick}/>
                </header>
                <main className="SdiApplicationView__main">
                    {this.renderActivePage()}
                </main>
                <footer>
                    <Statusbar onCreate={ctrl.onStatusbarCreate}/>
                </footer>
                {this.renderModalPages()}
            </div>
        );
    }
}

window.QForms.SdiApplicationView = SdiApplicationView;
