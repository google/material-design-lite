
<template>
<div>
  <div class="demo-surface" v-ripple><p>{{label}}</p></div>
  <div>
    <checkbox-wrapper :align-end='alignEnd'>
      <checkbox v-model="checked" label="Test me" id="my-check" label-id="my-check-label"></checkbox>
      <checkbox-label id="my-check-label" for="my-check" :label="label"></checkbox-label>
    </checkbox-wrapper>
  </div>
  <div>
    <checkbox-wrapper>
      <checkbox v-model="alignEnd" label="Test me" id="my-check" label-id="my-check-label"></checkbox>
      <checkbox-label id="my-check-label" for="my-check" label="Align End?"></checkbox-label>
    </checkbox-wrapper>
    <input v-model="label"></input>
  </div>
  <div>
   <p>Change count: {{changeCount}}</p>
  </div>
</div>
</template>

<script lang="babel">
import Ripple from './v-mdl-ripple/Ripple';
import Checkbox from './v-mdl-checkbox/Checkbox';
import CheckboxLabel from './v-mdl-checkbox/CheckboxLabel';
import CheckboxWrapper from './v-mdl-checkbox/CheckboxWrapper';

export default {
  data () {
    return {
      label: 'Test Me',
      checked: true,
      alignEnd: false,
      changeCount: 0
    }
  },
  components: { Checkbox, CheckboxWrapper, CheckboxLabel },
  directives: { Ripple },
  watch: {
    checked () {
      this.changeCount++;
    }
  }
}
</script>

<style lang="scss">
@import 'mdl-ripple/mdl-ripple.scss';
@import 'mdl-elevation/mdl-elevation.scss';

.demo-surface {
  @include mdl-elevation(2);
  width: 150px;
  height: 150px;
}
</style>
