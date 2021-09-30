// class MdiApplicationView extends ApplicationView {
//     getTabs() {
//         return this.props.ctrl.pages.map(pageCtrl => {
//             return {
//                 name   : pageCtrl.model.getId(),
//                 title  : pageCtrl.getTitle(),
//                 content: React.createElement(pageCtrl.getViewClass(), {
//                     ctrl    : pageCtrl,
//                     onCreate: pageCtrl.onViewCreate
//                 })
//             };
//         });
//     }
//     render() {
//         console.log('MdiApplicationView.render', this.props.ctrl.model.getFullName());
//         const ctrl = this.props.ctrl;
//         const model = ctrl.model;
//         return (
//             <div className={`MdiApplicationView ${model.getAttr('theme')}`}>
//                 <Menu items={ctrl.getMenuItemsProp()} onClick={ctrl.onMenuItemClick}/>
//                 <Tab
//                     tabs={this.getTabs()}
//                     canClose={true}
//                     onTabClose={ctrl.onTabClose}
//                     onCreate={ctrl.onTabCreate}
//                     getActive={ctrl.getActivePageIndex}
//                     onTabMouseDown={ctrl.onTabMouseDown}
//                 />
//                 <Statusbar onCreate={ctrl.onStatusbarCreate}/>
//                 {this.renderModalPages()}
//             </div>
//         );
//     }
// }
//
// window.QForms.MdiApplicationView = MdiApplicationView;
