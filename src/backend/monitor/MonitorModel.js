class MonitorModel {
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    dump() {
        return {
            applications: Object.keys(this.hostApp.applications).map(route => {
                const app = this.hostApp.applications[route];
                return {
                    route: route,
                    pages: Object.keys(app.pages).map(name => {
                        return {
                            name: name
                        };
                    })
                };
            })
        };
    }
}
module.exports = MonitorModel;
