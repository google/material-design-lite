module.exports =  {
  checkbox: function(document) {
    var label = document.createElement('label'),
    input = document.createElement('input'),
    labelText = document.createElement('span');
    label.for = 'testCheckbox';
    label.className = 'mdl-checkbox mdl-js-checkbox';
    input.type = 'checkbox';
    input.id = 'testCheckbox';
    input.className = 'mdl-checkbox__input';
    label.appendChild(input);
    labelText.className = 'mdl-checkbox__label';
    labelText.text = 'Test Checkbox';
    label.appendChild(labelText);
    return label;
  },
  iconToggle: function(document) {
    var label = document.createElement('label');
    var input = document.createElement('input');
    var icon = document.createElement('i');
    label.className = 'mdl-icon-toggle mdl-js-icon-toggle';
    label.for = 'testIconToggle';
    input.id = label.for;
    input.type = 'checkbox';
    input.className = 'mdl-icon-toggle__input';
    label.appendChild(input);
    icon.className = 'mdl-icon-toggle__label material-icons';
    icon.text = 'format_bold';
    label.appendChild(icon);
    return label;
  },
  layout: function(document) {
     var el = document.createElement('div');
     el.innerHTML = '' +
     '  <header class="mdl-layout__header">' +
     '    <div class="mdl-layout__tab-bar mdl-js-ripple-effect">' +
     '      <a id="tab1" href="#scroll-tab-1" class="mdl-layout__tab is-active">Tab 1</a>' +
     '      <a id="tab2" href="#scroll-tab-2" class="mdl-layout__tab">Tab 2</a>' +
     '      <a id="tab3" href="#scroll-tab-3" class="mdl-layout__tab">Tab 3</a>' +
     '    </div>' +
     '  </header>' +
     '  <main class="mdl-layout__content">' +
     '    <section class="mdl-layout__tab-panel is-active" id="scroll-tab-1">' +
     '      <div class="page-content"><!-- Your content goes here --></div>' +
     '    </section>' +
     '    <section class="mdl-layout__tab-panel" id="scroll-tab-2">' +
     '      <div class="page-content"><!-- Your content goes here --></div>' +
     '    </section>' +
     '    <section class="mdl-layout__tab-panel" id="scroll-tab-3">' +
     '      <div class="page-content"><!-- Your content goes here --></div>' +
     '    </section>' +
     '  </main>';

     var parent = document.createElement('div');
     parent.appendChild(el); // MaterialLayout.init() expects a parent

    return el;
  },
  menu: function(document) {
    var parent = document.createElement('div'); // parent must exist for MaterialMenu.init()
    var el = document.createElement('ul');
    parent.appendChild(el)

    return el;
  },
  radio: function(document, name, value) {
    name = name || 'flash';
    value = value || 'on';

    var label = document.createElement('label');
    var input = document.createElement('input');
    var labelText = document.createElement('span');
    label.for = 'testRadio';
    input.id = label.for;
    label.className = 'mdl-radio mdl-js-radio';
    input.className = 'mdl-radio__button';
    input.type = 'radio';
    input.name = name;
    input.value = value;
    label.appendChild(input);
    labelText.className = 'mdl-radio__label';
    labelText.text = 'Always on';
    label.appendChild(labelText);
    return label;
  },
  slider: function(document) {
    var el = document.createElement('input');
    el.type = 'range';

    var parent = document.createElement('div');
    parent.appendChild(el);

    return el;
  },
  switch: function(document) {
    var label = document.createElement('label');
    var input = document.createElement('input');
    var labelText = document.createElement('span');
    label.for = 'testSwitch';
    input.id = label.for;
    label.className = 'mdl-switch mdl-js-switch';
    input.type = 'checkbox';
    input.className = 'mdl-switch__input';
    label.appendChild(input);
    labelText.text = 'Sound off/on';
    labelText.className = 'mdl-switch__label';
    label.appendChild(labelText);
    return label;
  },
  textField: function(document) {
    var container = document.createElement('div');
    var input = document.createElement('input');
    var label = document.createElement('label');
    var errorMessage = document.createElement('span');
    container.className = 'mdl-textfield mdl-js-textfield';
    input.className = 'mdl-textfield__input';
    input.pattern = '[0-9]';
    input.id = 'testInput';
    label.for = input.id;
    label.className = 'mdl-textfield__label';
    label.text = 'Number';
    errorMessage.className = 'mdl-textfield__error';
    errorMessage.text = 'Positive number only.';
    container.appendChild(input);
    container.appendChild(label);
    container.appendChild(errorMessage);
    return container;
  },
}

