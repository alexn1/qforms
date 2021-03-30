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
    onMenuItemClick = async (menu, type, name) => {
        console.log('ApplicationController.onMenuItemClick', menu, type, name);
        try {
            if (type === 'page') {
                await this.openPage({name: name, modal: false});
            } else if (type === 'action') {
                await this.onActionClick(name);
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
}
