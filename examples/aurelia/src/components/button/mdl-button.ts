import {bindable, customAttribute, inject, DOM} from 'aurelia-framework';

// Use webpack's require function to load the css
const MDL_BUTTON_STYLES = require('mdl-button-styles');
DOM.injectStyles(MDL_BUTTON_STYLES);

@customAttribute('mdl-button')
@inject(Element)
export class MdlButton {
    @bindable() accent = false;
    @bindable() raised = false;

    constructor(private element: Element) { }

    attached() {
        this.element.classList.add('mdl-button');
    }

    detached() {
        const classes = [
            'mdl-button',
            'mdl-button--accent',
            'mdl-button--raised'
        ];
        this.element.classList.remove(...classes);
    }

    accentChanged(newValue) {
        if (newValue) {
            this.element.classList.add('mdl-button--accent');
        } else {
            this.element.classList.remove('mdl-button--accent');
        }
    }

    raisedChanged(newValue) {
        if (newValue) {
            this.element.classList.add('mdl-button--raised');
        } else {
            this.element.classList.remove('mdl-button--raised');
        }
    }
}
