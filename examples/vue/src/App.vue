
<template>
<div>
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
import Checkbox from './Checkbox';
import CheckboxLabel from './CheckboxLabel';
import CheckboxWrapper from './CheckboxWrapper';

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
  watch: {
    checked () {
      this.changeCount++;
    }
  }
}
</script>
