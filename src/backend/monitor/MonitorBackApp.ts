class MonitorBackApp {
    hostApp: any;
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    fill() {
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
export = MonitorBackApp;
