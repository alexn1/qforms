import { BackHostApp } from '../../dist';

export class SampleBackHostApp extends BackHostApp {
    initCustomRoutes() {
        this.createCustomRoute(
            /^\/page\/Page1\/(\d+)-([a-z0-9\-]+)$/,
            ['viewer', 'sample', 'sample', 'local', 'localhost'],
            {
                page: 'Page1',
                id: '0', // id
                title: '1', // some words and numbers seprated by minus
            },
        );
    }
}
