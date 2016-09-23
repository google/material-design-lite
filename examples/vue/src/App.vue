
<template>
<div>
  <div class="demo-toolbar mdl-theme--primary-bg mdl-theme--text-primary-on-primary mdl-typography--title mdl-elevation--z4">
    <button class="demo-menu material-icons" @click="$refs.drawer.open()">menu</button>
  </div>

  <temporary-drawer ref="drawer" style="z-index: 20;">
    <div slot="header" class="mdl-temporary-drawer__header-content mdl-theme--primary-bg mdl-them--text-primary-on-primary">
      Header here
    </div>

    <nav class="mdl-list-group">
      <div id="icon-with-text-demo" class="mdl-list">
        <a class="mdl-list-item mdl-temporary-drawer--selected" href="#">
          <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
        </a>
        <a class="mdl-list-item" href="#">
          <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">star</i>Star
        </a>
        <a class="mdl-list-item" href="#">
          <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">send</i>Sent Mail
        </a>
        <a class="mdl-list-item" href="#">
          <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">drafts</i>Drafts
        </a>
      </div>

      <hr class="mdl-list-divider">

      <div class="mdl-list">
        <a class="mdl-list-item" href="#">
          <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">email</i>All Mail
        </a>
        <a class="mdl-list-item" href="#">
          <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">delete</i>Trash
        </a>
        <a class="mdl-list-item" href="#">
          <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">report</i>Spam
        </a>
      </div>
    </nav>
  </temporary-drawer>

  <main>
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
  </main>
</div>
</template>

<script lang="babel">
import Ripple from './v-mdl-ripple/Ripple';
import Snackbar from './v-mdl-snackbar/Snackbar';
import Checkbox from './v-mdl-checkbox/Checkbox';
import IconToggle from './v-mdl-icon-toggle/IconToggle';
import CheckboxLabel from './v-mdl-checkbox/CheckboxLabel';
import CheckboxWrapper from './v-mdl-checkbox/CheckboxWrapper';
import TemporaryDrawer from './v-mdl-drawer/TemporaryDrawer';

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
  components: { Checkbox, CheckboxWrapper, CheckboxLabel, IconToggle, Snackbar, TemporaryDrawer },
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
@import 'mdl-list/mdl-list.scss';
@import 'mdl-theme/mdl-theme.scss';

.demo-toolbar {
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
}
@media (min-width: 600px) {
  .demo-toolbar {
    height: 64px;
  }
}

.demo-menu {
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0;
  color: #FFF;
  box-sizing: border-box;
}

.demo-surface {
  @include mdl-elevation(2);
  width: 150px;
  height: 150px;
}

main {
  padding: 12px;
}
</style>
