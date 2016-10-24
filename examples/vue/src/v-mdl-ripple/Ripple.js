import {MDLRipple} from 'mdl-ripple';

export default {
  bind (el, context) {
    if (!context.modifiers.custom) {
      el.classList.add('mdl-ripple-surface');
    }
    el.mdl_ripple_ = MDLRipple.attachTo(el, { isUnbounded: context.modifiers.unbounded });
  },
  unbind (el, context) {
    if (!el.mdl_ripple_) {
      return;
    }
    el.mdl_ripple_.destroy();
    delete el.mdl_ripple_;
  }
}
