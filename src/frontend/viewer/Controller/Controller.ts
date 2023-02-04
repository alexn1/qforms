import React from 'react';
import { EventEmitter } from '../EventEmitter';

export abstract class Controller extends EventEmitter {
    view: any = null;
    /* constructor() {
        super();
    } */

    onViewCreate = view => {
        // console.log('Controller.onViewCreate');
        this.view = view;
    };

    async rerender() {
        if (this.view) {
            return await this.view.rerender();
        }
        console.error(`${this.constructor.name}.rerender no view`);
    }

    getView() {
        return this.view;
    }

    getViewClass() {
        throw new Error(`${this.constructor.name}.getViewClass not implemented`);
    }

    createElement() {
        // @ts-ignore
        return React.createElement(this.getViewClass(), {
            ctrl: this,
            onCreate: this.onViewCreate,
        });
    }
}
