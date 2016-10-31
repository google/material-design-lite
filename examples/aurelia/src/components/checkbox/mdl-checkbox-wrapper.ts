import {inlineView, DOM} from 'aurelia-framework';

const MDL_CHECKBOX_STYLES = require('mdl-checkbox-styles');
DOM.injectStyles(MDL_CHECKBOX_STYLES);

@inlineView(`
<template class="mdl-checkbox-wrapper">
    <div class="mdl-checkbox-wrapper__layout">
        <slot></slot>
    </div>
</template>
`)
export class MdlCheckboxWrapper {
}
