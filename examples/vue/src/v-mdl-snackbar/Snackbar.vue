
<template>
<div ref="root" class="mdl-snackbar" :class="classes" aria-live="assertive" aria-atomic="true" :aria-hidden="hidden">
  <div class="mdl-snackbar__text">{{message}}</div>
  <div class="mdl-snackbar__action-wrapper">
    <button type="button" @click="actionClicked" class="mdl-button mdl-snackbar__action-button" :aria-hidden="actionHidden">{{actionText}}</button>
</div>
</template>

<script lang="babel">
import { MDLSnackbarFoundation } from 'mdl-snackbar';

const { TRANS_END_EVENT_NAME } = MDLSnackbarFoundation.strings;

export default {
  props: {
    event: String,
    eventSource: {
      required: false,
      default () {
        return this.$root;
      }
    }
  },
  data () {
    return {
      classes: {},
      message: '',
      actionText: '',
      hidden: false,
      actionHidden: false,
      animHandlers: [],
      actionClickHandlers: [],
      foundation: null
    };
  },
  mounted () {
    let vm = this;
    this.foundation = new MDLSnackbarFoundation({
      addClass (className) {
        vm.$set(vm.classes, className, true);
      },
      removeClass (className) {
        vm.$delete(vm.classes, className);
      },
      setAriaHidden () {
        vm.hidden = true;
      },
      unsetAriaHidden () {
        vm.hidden = false;
      },
      setActionAriaHidden () {
        vm.actionHidden = true;
      },
      unsetActionAriaHidden () {
        vm.actionHidden = false;
      },
      setMessageText (message) {
        vm.message = message;
      },
      setActionText (actionText) {
        vm.actionText = actionText;
      },
      registerActionClickHandler (handler) {
        vm.actionClickHandlers.push(handler);
      },
      deregisterChangeHandler (handler) {
        let index = vm.actionClickHandlers.indexOf(handler);
        if (index >= 0) {
          vm.actionClickHandlers.splice(index, 1)
        }
      },
      registerTransitionEndHandler (handler) {
        vm.$refs.root.addEventListener(TRANS_END_EVENT_NAME, handler);
      },
      deregisterTransitionEndHandler (handler) {
        vm.$refs.root.removeEventListener(TRANS_END_EVENT_NAME, handler);
      }
    });
    this.foundation.init();

    this.eventSource.$on(this.event, (data) => {
      this.foundation.show(data)
    });
  },
  beforeUnmount () {
    this.foundation.destroy();
  },
  methods: {
    actionClicked (event) {
      this.actionClickHandlers.forEach((h) => h(event));
    }
  }
}

</script>

<style lang="scss">
@import 'mdl-button/mdl-button.scss';
@import 'mdl-snackbar/mdl-snackbar.scss';

</style>
