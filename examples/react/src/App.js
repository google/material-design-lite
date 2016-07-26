/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
