
<template>
<label class="mdl-checkbox-label" :for="labelFor" :id="id">{{label}}</label>
</template>

<script lang="babel">
export default {
  props: ['id', 'label', 'for'],
  computed: {
    labelFor () {
      return this['for'];
    }
  }
}
</script>

<style lang="scss">
@import 'mdl-checkbox/mdl-checkbox.scss';

</style>
