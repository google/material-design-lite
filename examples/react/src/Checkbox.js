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

/**
 * @fileoverview This file shows how you can easily integrate MDL components into React, using
 * checkbox as an example. Within the constructor, a foundation is initialized and given an adapter that
 * allows it to perform UI operations in a way idiomatic to React.
 */

import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Set as ImmutableSet} from 'immutable';
// Temporarily using relative reference until we publish on npm.
import {MDLCheckboxFoundation} from '../../../packages/mdl-checkbox';
import '../../../packages/mdl-checkbox/mdl-checkbox.scss';

const {ANIM_END_EVENT_NAME} = MDLCheckboxFoundation.strings;

export default class Checkbox extends Component {
  static propTypes = {
    id: PropTypes.string,
    labelId: PropTypes.string,
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    checked: false,
    indeterminate: false,
    onChange: () => {}
  }

  state = {
    classes: new ImmutableSet(),
    checkedInternal: false,
    indeterminateInternal: false
  }
  classesToAdd = new ImmutableSet();
  classesToRemove = new ImmutableSet();
  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

  // Here we initialize a foundation class, passing it an adapter which tells it how to
  // work with the React component in an idiomatic way.
  foundation = new MDLCheckboxFoundation({
    addClass: className => this.setState(prevState => ({
      classes: prevState.classes.add(className)
    })),
    removeClass: className => this.setState(prevState => ({
      classes: prevState.classes.remove(className)
    })),
    registerAnimationEndHandler: handler => {
      if (this.refs.root) {
        this.refs.root.addEventListener(ANIM_END_EVENT_NAME, handler);
      }
    },
    deregisterAnimationEndHandler: handler => {
      if (this.refs.root) {
        this.refs.root.removeEventListener(ANIM_END_EVENT_NAME, handler);
      }
    },
    registerChangeHandler: handler => {
      // Note that this could also be handled outside of using the native DOM API.
      // For example, onChange within render could delegate to a function which calls
      // the handler passed here, as well as performs the other business logic. The point
      // being our foundations are designed to be adaptable enough to fit the needs of the host
      // platform.
      if (this.refs.nativeCb) {
        this.refs.nativeCb.addEventListener('change', handler);
      }
    },
    deregisterChangeHandler: handler => {
      if (this.refs.nativeCb) {
        this.refs.nativeCb.removeEventListener('change', handler);
      }
    },
    getNativeControl: () => {
      if (!this.refs.nativeCb) {
        throw new Error('Invalid state for operation');
      }
      return this.refs.nativeCb;
    },
    forceLayout: () => {
      if (this.refs.nativeCb) {
        this.refs.nativeCb.offsetWidth;
      }
    },
    isAttachedToDOM: () => Boolean(this.refs.nativeCb)
  });

  render() {
    // Within render, we generate the html needed to render a proper MDL checkbox.
    return (
      <div ref="root" className={`mdl-checkbox ${this.state.classes.toJS().join(' ')}`}>
        <input ref="nativeCb"
               id={this.props.controlId}
               type="checkbox"
               className="mdl-checkbox__native-control"
               aria-labelledby={this.props.labelId}
               checked={this.state.checkedInternal}
               onChange={evt => {
                 this.setState({
                   checkedInternal: this.refs.nativeCb.checked,
                   indeterminateInternal: false
                 });
                 this.props.onChange(evt);
               }}/>
        <div className="mdl-checkbox__background">
          <svg version="1.1"
               className="mdl-checkbox__checkmark"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <path className="mdl-checkbox__checkmark__path"
                  fill="none"
                  stroke="white"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div className="mdl-checkbox__mixedmark"></div>
        </div>
      </div>
    );
  }

  // Within the two component lifecycle methods below, we invoke the foundation's lifecycle hooks
  // so that proper work can be performed.
  componentDidMount() {
    this.foundation.init();
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }

  // Here we synchronize the internal state of the UI component based on what the user has specified.
  componentWillReceiveProps(props) {
    if (props.checked !== this.props.checked) {
      this.setState({checkedInternal: props.checked, indeterminateInternal: false});
    }
    if (props.indeterminate !== this.props.indeterminate) {
      this.setState({indeterminateInternal: props.indeterminate});
    }
  }

  // Since we cannot set an indeterminate attribute on a native checkbox, we use componentDidUpdate to update
  // the indeterminate value of the native checkbox whenever a change occurs (as opposed to doing so within
  // render()).
  componentDidUpdate() {
    if (this.refs.nativeCb) {
      this.refs.nativeCb.indeterminate = this.state.indeterminateInternal;
    }
  }
}
