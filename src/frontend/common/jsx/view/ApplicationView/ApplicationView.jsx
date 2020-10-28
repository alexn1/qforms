class ApplicationView extends ReactComponent {
    getTabs() {
        return this.props.ctrl.pages.map(pageCtrl => {
            return {
                name   : pageCtrl.model.id,
                title  : pageCtrl.model.getCaption(),
                content: React.createElement(pageCtrl.getViewClass(), {
                    ctrl    : pageCtrl,
                    onCreate: pageCtrl.onViewCreate
                })
            };
        });
    }
    renderModal() {
        return this.props.ctrl.modalPages.map(pageCtrl =>
            <Modal
                key={pageCtrl.model.id}
                content={
                    <PageView
                        ctrl={pageCtrl}
                        onCreate={pageCtrl.onViewCreate}
                    />
                }
            />);
    }
    render() {
        console.log('ApplicationView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`ApplicationView ${model.data.theme}`}>
                <Menu items={ctrl.getMenuItemsProp()} onClick={ctrl.onMenuItemClick}/>
                <Tab
                    tabs={this.getTabs()}
                    canClose={true}
                    onTabClose={ctrl.onPageClose}
                    onCreate={ctrl.onTabCreate}
                    getActive={ctrl.getActivePageIndex}
                    onTabMouseDown={ctrl.onTabMouseDown}
                />
                <Statusbar onCreate={ctrl.onStatusbarCreate}/>
                {this.renderModal()}
            </div>
        );
    }
}
