import {inject, bindable, bindingMode, DOM} from 'aurelia-framework';

// Since we don't have typings (yet) we require mdl-checkbox manually.
const MDLCheckboxModule = require('mdl-checkbox');
const MDLCheckbox = MDLCheckboxModule.default;
// Use webpack's require function to load the css
const MDL_CHECKBOX_STYLES = require('mdl-checkbox-styles');
DOM.injectStyles(MDL_CHECKBOX_STYLES);

@inject(Element)
export class MdlCheckbox {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) isChecked = false;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) isIndeterminate = false;
    @bindable() isDisabled = false;
    mdlCheckbox;

    constructor(private element: Element) { }

    bind() {
        this.mdlCheckbox = new MDLCheckbox(this.element);
    }

    handleChange(e: Event) {
        // stop propagation so we're able to fire our own event when data-binding changes checked value
        e.stopPropagation();
    }

    isCheckedChanged(newValue) {
        this.isIndeterminate = false;
        const event = new CustomEvent('change', { bubbles: true, detail: { value: newValue }});
        this.element.dispatchEvent(event);
    }

    isDisabledChanged(newValue) {
        this.mdlCheckbox.disabled = !!newValue;
    }

    isIndeterminateChanged(newValue) {
        this.mdlCheckbox.indeterminate = !!newValue;
    }
}
