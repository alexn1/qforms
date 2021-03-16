class SdiApplicationController extends ApplicationController {
    getViewClass() {
        return SdiApplicationView;
    }
    getMenuItemsProp() {
        return Object.keys(this.model.data.menu).map(key => ({
            name : key,
            title: key,
            items: this.model.data.menu[key].map(item => ({
                name : item.page,
                title: item.caption
            }))
        }));
    }
    onStatusbarCreate = statusbar => {
        this.statusbar = statusbar;
    }
    onMenuItemClick = async (menu, item) => {
        // console.log('ApplicationController.onMenuItemClick', menu, item);
        try {
            await this.openPage({name: item, modal: false});
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
}
