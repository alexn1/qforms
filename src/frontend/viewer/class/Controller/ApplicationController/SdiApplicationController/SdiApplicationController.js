class SdiApplicationController extends ApplicationController {
    getViewClass() {
        return SdiApplicationView;
    }
    getMenuItemsProp() {
        return Object.keys(this.model.data.menu).map(key => ({
            name : key,
            title: key,
            items: this.model.data.menu[key].map(item => ({
                type : item.type,
                name : item.page || item.action,
                title: item.caption
            }))
        }));
    }
    onStatusbarCreate = statusbar => {
        this.statusbar = statusbar;
    }
    onMenuItemClick = async (menu, item, type) => {
        console.log('ApplicationController.onMenuItemClick', menu, item, type);
        try {
            if (type === 'page') {
                await this.openPage({name: item, modal: false});
            } else if (type === 'action') {

            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
}
