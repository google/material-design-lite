import {bindable, customAttribute, inject, DOM} from 'aurelia-framework';

// Since we don't have typings (yet) we require mdl-ripple manually.
const MDLRippleModule = require('mdl-ripple');
const MDLRipple = MDLRippleModule.default;
// Use webpack's require function to load the css
const MDL_RIPPLE_STYLES = require('mdl-ripple-styles');
DOM.injectStyles(MDL_RIPPLE_STYLES);

@customAttribute('mdl-ripple')
@inject(Element)
export class MdlRipple {
    @bindable() unbounded = false;
    mdlRipple;

    constructor(private element: Element) { }

    bind() {
        this.mdlRipple = new MDLRipple(this.element);
    }

    attached() {
        this.element.classList.add('mdl-ripple-surface');
    }

    detached() {
        this.mdlRipple.destroy();
    }

    unboundedChanged(newValue) {
        this.mdlRipple.unbounded = (newValue === true || newValue === 'true');
    }
}
