/* eslint-disable */

import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Set as ImmutableSet} from 'immutable';
// lol super hack
import MDLCheckbox from '../../../packages/mdl-checkbox';
import '../../../packages/mdl-checkbox/mdl-checkbox.scss';

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func,
    labelId: PropTypes.string
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

  render() {
    return (
      <div ref="root" className={`md-checkbox ${this.state.classes.toJS().join(' ')}`}>
        <input ref="nativeCb"
               type="checkbox"
               className="md-checkbox__native-control"
               ariaLabelledBy={this.props.labelId}
               checked={this.state.checkedInternal}
               onChange={evt => {
                 this.setState({
                   checkedInternal: this.refs.nativeCb.checked,
                   indeterminateInternal: false
                 });
                 this.props.onChange(evt);
               }}/>
        <div className="md-checkbox__frame"></div>
        <div className="md-checkbox__background">
          <svg version="1.1"
               className="md-checkbox__checkmark"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <path className="md-checkbox__checkmark__path"
                  fill="none"
                  stroke="white"
                  d="M4.1,12.7 9,17.6 20.3,6.3"/>
          </svg>
          <div className="md-checkbox__mixedmark"></div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.initMdlCheckbox_();
  }

  componentWillUnmount() {
    // From MDLCheckboxMixin
    this.removeEventListeners();
  }

  componentWillReceiveProps(props) {
    if (props.checked !== this.props.checked) {
      this.setState({checkedInternal: props.checked, indeterminateInternal: false});
    }
    if (props.indeterminate !== this.props.indeterminate) {
      this.setState({indeterminateInternal: props.indeterminate});
    }
  }

  componentDidUpdate() {
    if (this.refs.nativeCb) {
      this.refs.nativeCb.indeterminate = this.state.indeterminateInternal;
    }
  }
}
MDLCheckbox.mixInto(Checkbox, {
  addClass(className) {
    this.setState(prevState => ({
      classes: prevState.classes.add(className)
    }));
  },
  removeClass(className) {
    this.setState(prevState => ({
      classes: prevState.classes.remove(className)
    }));
  },
  addEventListener(type, listener) {
    if (this.refs.root) {
      this.refs.root.addEventListener(type, listener);
    }
  },
  removeEventListener(type, listener) {
    if (this.refs.root) {
      this.refs.root.removeEventListener(type, listener);
    }
  },
  addNativeCheckboxListener(type, listener) {
    if (this.refs.nativeCb) {
      this.refs.nativeCb.addEventListener(type, listener);
    }
  },
  removeNativeCheckboxListener(type, listener) {
    if (this.refs.nativeCb) {
      this.refs.nativeCb.removeEventListener(type, listener);
    }
  },
  getNativeCheckbox() {
    if (!this.refs.nativeCb) {
      throw new Error('Invalid state for operation');
    }
    return this.refs.nativeCb;
  },
  forceLayout() {
    if (this.refs.nativeCb) {
      this.refs.nativeCb.offsetWidth;
    }
  },
  isAttachedToDOM() {
    // Return true??
    return Boolean(this.refs.nativeCb);
  }
});
