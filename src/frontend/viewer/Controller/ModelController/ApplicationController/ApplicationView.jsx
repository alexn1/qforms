class ApplicationView extends ModelView {
    renderActivePage() {
        const ctrl = this.props.ctrl;
        if (ctrl.activePage) {
            return this.renderView(ctrl.activePage);
        }
    }
    renderView(ctrl, props = {}) {
        return React.createElement(ctrl.getViewClass(), {
            parent  : this,
            ctrl    : ctrl,
            onCreate: ctrl.onViewCreate,
            ...props
        });
    }
    renderModals() {
        return this.props.ctrl.modals.map(ctrl => {
            if (ctrl instanceof PageController) {
                return <Modal key={ctrl.getId()}>
                    {this.renderView(ctrl)}
                </Modal>;
            }
            return this.renderView(ctrl, {key: ctrl.getId()});
        });
    }
    renderHeader() {
        return <header className={`${this.getCssBlockName()}__header`}>
            <Menu items={this.getCtrl().getMenuItemsProp()} onClick={this.getCtrl().onMenuItemClick}/>
        </header>;
    }
    renderMain() {
        return <main className={`${this.getCssBlockName()}__main`}>
            {this.renderActivePage()}
        </main>;
    }
    renderFooter() {
        return <footer className={`${this.getCssBlockName()}__footer`}>
            <Statusbar onCreate={this.getCtrl().onStatusbarCreate}/>
        </footer>;
    }
    render() {
        console.log(`${this.constructor.name}.render`, this.props.ctrl.model.getFullName());
        return <div className={`${this.getCssBlockName()}__container`} style={this.getStyle()}>
            {this.renderHeader()}
            {this.renderMain()}
            {this.renderFooter()}
            {this.renderModals()}
        </div>;
    }
}

window.QForms.ApplicationView = ApplicationView;
