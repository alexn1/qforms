import React from 'react';
import { EventEmitter } from '../EventEmitter';
import { View } from './View';

export abstract class Controller extends EventEmitter {
    view: View | null = null;

    /* constructor() {
        super();
    } */

    onViewCreate = (view: View) => {
        // console.debug('Controller.onViewCreate');
        this.view = view;
    };

    async rerender() {
        if (this.view) {
            return await this.view.rerender();
        }
        console.error(`${this.constructor.name}.rerender no view`);
    }

    getView() {
        if (!this.view) throw new Error('no view');
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
