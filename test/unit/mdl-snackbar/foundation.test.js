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

import test from 'tape';
import lolex from 'lolex';
import td from 'testdouble';
import MDLSnackbarFoundation from '../../../packages/mdl-snackbar/foundation';
import {cssClasses, strings, numbers} from '../../../packages/mdl-snackbar/constants';

function setupTest() {
  const mockAdapter = td.object(MDLSnackbarFoundation.defaultAdapter);

  const foundation = new MDLSnackbarFoundation(mockAdapter);
  return {foundation, mockAdapter};
}

test('exports strings', t => {
  t.deepEqual(MDLSnackbarFoundation.strings, strings);
  t.end();
});

test('exports cssClasses', t => {
  t.deepEqual(MDLSnackbarFoundation.cssClasses, cssClasses);
  t.end();
});

test('defaultAdapter returns a complete adapter implementation', t => {
  const {defaultAdapter} = MDLSnackbarFoundation;
  const methods = Object.keys(defaultAdapter).filter(k => typeof defaultAdapter[k] === 'function');

  t.equal(methods.length, Object.keys(defaultAdapter).length, 'Every adapter key must be a function');
  t.deepEqual(methods, [
    'addClass', 'removeClass', 'setAriaHidden', 'unsetAriaHidden', 'setMessageText',
    'setActionText', 'setActionAriaHidden', 'unsetActionAriaHidden',
    'registerActionClickHandler', 'deregisterActionClickHandler',
    'registerTransitionEndHandler', 'deregisterTransitionEndHandler'
  ]);
  // Test default methods
  methods.forEach(m => t.doesNotThrow(defaultAdapter[m]));

  t.end();
});

test('#init calls adapter.registerActionClickHandler() with a action click handler function', t => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.init();
  t.doesNotThrow(() => td.verify(mockAdapter.registerActionClickHandler(isA(Function))));
  t.end();
});

test('#destroy calls adapter.deregisterActionClickHandler() with a registerActionClickHandler function', t => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  let changeHandler;
  td.when(mockAdapter.registerActionClickHandler(isA(Function))).thenDo(function(handler) {
    changeHandler = handler;
  });
  foundation.init();

  foundation.destroy();
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterActionClickHandler(changeHandler)));

  t.end();
});

test('#init calls adapter.setAriaHidden to ensure snackbar starts hidden', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.init();
  t.doesNotThrow(() => td.verify(mockAdapter.setAriaHidden()));
  t.end();
});

test('#init calls adapter.setActionAriaHidden to ensure snackbar action starts hidden', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.init();
  t.doesNotThrow(() => td.verify(mockAdapter.setActionAriaHidden()));
  t.end();
});

test('#show without a data object throws an error', t => {
  const {foundation} = setupTest();

  foundation.init();
  t.throws(() => foundation.show(), Error);
  t.end();
});

test('#show without a message throws an error', t => {
  const {foundation} = setupTest();

  foundation.init();
  t.throws(() => foundation.show({}), Error);
  t.end();
});

test('#show with an actionHandler but no actionText throws an error', t => {
  const {foundation} = setupTest();

  foundation.init();
  const data = {
    message: 'Message Deleted',
    actionHandler: () => {}
  };
  t.throws(() => foundation.show(data), Error);
  t.end();
});

test('#show should add the active class', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.init();
  foundation.show({message: 'Message Deleted'});
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(cssClasses.ACTIVE)));
  t.end();
});

test('#show should call foundation#unsetAriaHidden() to show the snackbar', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.init();
  foundation.show({message: 'Message Deleted'});
  t.doesNotThrow(() => td.verify(mockAdapter.unsetAriaHidden()));
  t.end();
});

test('#show should set the message text', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.init();
  foundation.show({message: 'Message Deleted'});
  t.doesNotThrow(() => td.verify(mockAdapter.setMessageText('Message Deleted')));
  t.end();
});

test('#show should make the foundation active', t => {
  const {foundation} = setupTest();

  foundation.init();
  foundation.show({message: 'Message Deleted'});
  t.equals(foundation.active, true);
  t.end();
});

test('#show with action text and handler should set the action text', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.init();
  foundation.show({
    message: 'Message Deleted',
    actionText: 'Undo',
    actionHandler: () => {}
  });

  t.doesNotThrow(() => td.verify(mockAdapter.setActionText('Undo')));
  t.end();
});

test('#show with action text and handler should unset action aria-hidden', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.init();
  foundation.show({
    message: 'Message Deleted',
    actionText: 'Undo',
    actionHandler: () => {}
  });

  t.doesNotThrow(() => td.verify(mockAdapter.unsetActionAriaHidden()));
  t.end();
});

test('#show({ mutliline: true }) should add multiline modifier', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.init();
  foundation.show({message: 'Message Deleted', multiline: true});
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(cssClasses.MULTILINE)));
  t.end();
});

test('#show({ mutliline: true, actionOnBottom: true }) should add action-on-bottom modifier', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.init();
  foundation.show({
    message: 'Message Deleted',
    multiline: true,
    actionOnBottom: true
  });

  t.doesNotThrow(() => td.verify(mockAdapter.addClass(cssClasses.ACTION_ON_BOTTOM)));
  t.end();
});

test('#show({ mutliline: false, actionOnBottom: true }) does not add action-on-bottom modifier', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.init();
  foundation.show({
    message: 'Message Deleted',
    actionOnBottom: true
  });

  t.doesNotThrow(() => td.verify(mockAdapter.addClass(cssClasses.ACTION_ON_BOTTOM), {times: 0}));
  t.end();
});

test('#show while snackbar is already showing will queue the data object.', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.init();
  foundation.show({
    message: 'Message Deleted'
  });

  foundation.show({
    message: 'Message Archived'
  });

  t.doesNotThrow(() => td.verify(mockAdapter.setMessageText('Message Archived'), {times: 0}));
  t.end();
});

test('#show while snackbar is already showing will show after the timeout and transition end', t => {
  const clock = lolex.install();
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.init();

  let transEndHandler;
  td.when(mockAdapter.registerTransitionEndHandler(isA(Function)))
    .thenDo(handler => {
      transEndHandler = handler;
    });

  foundation.show({
    message: 'Message Deleted'
  });

  foundation.show({
    message: 'Message Archived'
  });

  clock.tick(numbers.MESSAGE_TIMEOUT);
  transEndHandler();

  t.doesNotThrow(() => td.verify(mockAdapter.setMessageText('Message Archived')));
  clock.uninstall();
  t.end();
});

test('#show will remove active class after the timeout', t => {
  const clock = lolex.install();
  const {foundation, mockAdapter} = setupTest();

  foundation.init();

  foundation.show({
    message: 'Message Deleted'
  });

  clock.tick(numbers.MESSAGE_TIMEOUT);

  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(cssClasses.ACTIVE)));
  clock.uninstall();
  t.end();
});

test('#show will add an transition end handler after the timeout', t => {
  const clock = lolex.install();
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.init();

  foundation.show({
    message: 'Message Deleted'
  });

  clock.tick(numbers.MESSAGE_TIMEOUT);

  t.doesNotThrow(() => td.verify(mockAdapter.registerTransitionEndHandler(isA(Function))));
  clock.uninstall();
  t.end();
});

test('#show will clean up snackbar after the timeout and transition end', t => {
  const clock = lolex.install();
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.init();

  let transEndHandler;
  td.when(mockAdapter.registerTransitionEndHandler(isA(Function)))
    .thenDo(handler => {
      transEndHandler = handler;
    });

  foundation.show({
    message: 'Message Deleted',
    actionText: 'Undo',
    multiline: true,
    actionOnBottom: true,
    actionHandler: () => {}
  });

  clock.tick(numbers.MESSAGE_TIMEOUT);
  transEndHandler();

  t.doesNotThrow(() => td.verify(mockAdapter.setMessageText(null)));
  t.doesNotThrow(() => td.verify(mockAdapter.setActionText(null)));
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(cssClasses.MULTILINE)));
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(cssClasses.ACTION_ON_BOTTOM)));
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterTransitionEndHandler(transEndHandler)));

  clock.uninstall();
  t.end();
});
