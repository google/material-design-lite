
<template>
<i class="mdl-icon-toggle material-icons" :class="classes" role="button" aria-pressed="false"
   :tabindex="tabIndex"
   :data-toggle-on='toggleOnData'
   :data-toggle-off='toggleOffData'>
  {{text}}
</i>
</template>

<script lang="babel">
import { MDLIconToggleFoundation } from 'mdl-icon-toggle';

export default {
  props: ['toggleOn', 'toggleOff', 'value'],
  data () {
    return {
      classes: {},
      tabIndex: 0,
      text: '',
      foundation: null
    };
  },
  mounted () {
    // TODO: add the ripple
    let vm = this;
    this.foundation = new MDLIconToggleFoundation({
      addClass (className) {
        vm.$set(vm.classes, className, true);
      },
      removeClass (className) {
        vm.$delete(vm.classes, className);
      },
      registerInteractionHandler (type, handler) {
        vm.$el.addEventListener(type, handler);
      },
      deregisterInteractionHandler (type, handler) {
        vm.$el.removeEventListener(type, handler);
      },
      setText (text) {
        vm.text = text;
      },
      getTabIndex () {
        return vm.tabIndex;
      },
      setTabIndex (tabIndex) {
        vm.tabIndex = tabIndex;
      },
      getAttr (name) {
        return vm.$el.getAttribute(name);
      },
      setAttr (name, value) {
        vm.$el.setAttribute(name, value);
      },
      rmAttr (name) {
        vm.$el.removeAttribute(name);
      },
      notifyChange (evtData) {
        const evtType = 'MDLIconToggle:change';
        let evt;
        /* global CustomEvent */
        if (typeof CustomEvent === 'function') {
          evt = new CustomEvent(evtType, {detail: evtData});
        } else {
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(evtType, false, false, evtData);
        }

        vm.$el.dispatchEvent(evt);
        vm.$emit('input', evtData.isOn);
      }
    });
    this.foundation.init();
    this.foundation.toggle(this.value);
  },
  beforeUnmount () {
    this.foundation.destroy();
  },
  watch: {
    'toggleOn': {
      handler () { this.foundation.refreshToggleData(); },
      deep: true
    },
    'toggleOff': {
      handler () { this.foundation.refreshToggleData(); },
      deep: true
    }
  },
  computed: {
    toggleOnData () {
      return JSON.stringify(this.toggleOn);
    },
    toggleOffData () {
      return JSON.stringify(this.toggleOff);
    }
  }
}

</script>

<style lang="scss">
@import 'mdl-icon-toggle/mdl-icon-toggle.scss';

</style>
