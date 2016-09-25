
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

  <button type="button" @click="showSnackbar">Show Snackbar</button>
  <snackbar event='mailSent'></snackbar>

  <icon-toggle v-model="favorited"
               :toggle-on="{'label': favoritedLabel, 'content': 'favorite'}"
               :toggle-off="{'label': 'Add to favorites', 'content': 'favorite_border'}">
  </icon-toggle>
  <div>
   <div>
     <label for="favorited-label">Favorited Label</label>
     <input id="favorited-label" v-model="favoritedLabel"></input>
   </div>
   <p>Favorited?: {{favorited}}</p>
  </div>
</div>
</template>

<script lang="babel">
import Ripple from './v-mdl-ripple/Ripple';
import Snackbar from './v-mdl-snackbar/Snackbar';
import Checkbox from './v-mdl-checkbox/Checkbox';
import IconToggle from './v-mdl-icon-toggle/IconToggle';
import CheckboxLabel from './v-mdl-checkbox/CheckboxLabel';
import CheckboxWrapper from './v-mdl-checkbox/CheckboxWrapper';

export default {
  data () {
    return {
      label: 'Test Me',
      checked: true,
      alignEnd: false,
      changeCount: 0,
      favorited: true,
      favoritedLabel: 'Remove from favorites'
    }
  },
  components: { Checkbox, CheckboxWrapper, CheckboxLabel, IconToggle, Snackbar },
  directives: { Ripple },
  watch: {
    checked () {
      this.changeCount++;
    }
  },
  methods: {
    showSnackbar () {
      this.$root.$emit('mailSent', {
        message: 'Mail Sent',
        actionText: 'Undo',
        actionHandler: () => console.log('Undo it')
      });
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
