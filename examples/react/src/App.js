/* eslint-disable */

import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Checkbox from './Checkbox';
import CheckboxLabel from './CheckboxLabel';
import CheckboxWrapper from './CheckboxWrapper';

export default class App extends Component {
  state = {
    checked: false,
    indeterminate: false,
    changeEventCount: 0
  }
  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

  render() {
    const {checked, indeterminate, status, changeEventCount} = this.state;
    return (
      <main>
        <h1>MDL Checkbox - React Example</h1>
        <CheckboxWrapper>
          <Checkbox indeterminate={indeterminate}
                    onChange={({target}) => this.setState({
                      changeEventCount: changeEventCount + 1,
                      checked: target.checked,
                      indeterminate: false
                    })}/>
          <CheckboxLabel>The checkbox is currently {this.status()}</CheckboxLabel>
        </CheckboxWrapper>
        <div style={{paddingTop: '12px'}}>
          <button onClick={() => this.setState({indeterminate: true})}>Make Indeterminate</button>
        </div>
        <p>{changeEventCount} change events so far</p>
      </main>
    );
  }

  status() {
    if (this.state.indeterminate) {
      return 'indeterminate';
    }
    return this.state.checked ? 'checked' : 'unchecked';
  }
}
