<template>
<div class="mdl-form-field" :class="{'mdl-form-field--align-end': alignEnd}">
  <slot></slot>
</div>
</template>

<script lang="babel">
export default {
  props: ['alignEnd']
}
</script>

<style lang="scss">
@import "mdl-form-field/mdl-form-field.scss";
</style>
