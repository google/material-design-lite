# MDL Textfield

> Status:
>
> - [x] Single-line text fields
> - [ ] Full-width text fields
> - [ ] Character counter support
> - :no_entry_sign: Auto-complete (will be covered in #4500)
>
> See #4479

The MDL Textfield component provides a textual input field adhering to the [Material Design Specification](https://material.google.com/components/text-fields.html).
It is fully accessible, ships with RTL support, and includes a gracefully-degraded version that does
not require any javascript.

## Installation

> NOTE: Installation via npm will be available post-alpha.

## Usage

### Single-line - with Javascript

```html
<div class="mdl-textfield">
  <input type="text" id="my-textfield" class="mdl-textfield__input">
  <label class="mdl-textfield__label" for="my-textfield">Hint text</label>
</div>
```

It's also possible to wrap an input within a `<label>` to avoid dynamic id generation:

```html
<label class="mdl-textfield">
  <input type="text" class="mdl-textfield__input">
  <span class="mdl-textfield__label">Hint Text</span>
</label>
```

> _NOTE_: Only place an `mdl-textfield__label` inside of a text field _if you plan on using
> Javascript_. Otherwise, the label must go outside of the textfield, as shown below.

### Single-line - Gracefully degraded

```html
<label for="textfield-no-js">Textfield with no JS: </label>
<div class="mdl-textfield">
  <input type="text" id="textfield-no-js" class="mdl-textfield__input" placeholder="Hint text">
</div>
```

### Disabled Text Fields

```html
<div class="mdl-textfield mdl-textfield--disabled">
  <input type="text" id="disabled-textfield" class="mdl-textfield__input" disabled>
  <label class="mdl-textfield__label" for="disabled-textfield">Disabled text field</label>
</div>
```

### Pre-filled text fields

When dealing with JS-driven text fields that already have values, you'll want to ensure that you
render the text field label with the `mdl-textfield__label--float-above` modifier class. This will
ensure that the label moves out of the way of the text field's value and prevents a Flash Of
Un-styled Content (**FOUC**). You'll also want to add the `mdl-textfield--upgraded` modifier class
on the textfield root element. The JS component does for you automatically on initialization, but
since it won't be added until that JS runs, adding it manually will prevent an initial FOUC.

```html
<div class="mdl-textfield mdl-textfield--upgraded">
  <input type="text" id="pre-filled" class="mdl-textfield__input" value="Pre-filled value">
  <label class="mdl-textfield__label mdl-textfield__label--float-above" for="pre-filled">
    Label in correct place
  </label>
</div>
```

### Using help text

MDL Text Fields can include help text that is useful for providing supplemental
information to users, as well for validation messages (covered below).

```html
<div class="mdl-textfield">
  <input type="text" id="username" class="mdl-textfield__input" aria-controls="username-helptext">
  <label for="username" class="mdl-textfield__label">Username</label>
</div>
<p id="username-helptext" class="mdl-textfield-helptext" aria-hidden="true">
  This will be displayed on your public profile
</p>
```

Help text appears on input field focus and disappear on input field blur by default when using
the textfield JS component.

#### Persistent help text

If you'd like the help text to always be visible, add the
`mdl-textfield-helptext--persistent` modifier class to the element.

```html
<div class="mdl-textfield">
  <input type="email" id="email" class="mdl-textfield__input">
  <label for="email" class="mdl-textfield__label">Email address</label>
</div>
<p class="mdl-textfield-helptext mdl-textfield-helptext--persistent">
  We will <em>never</em> share your email address with third parties
</p>
```

#### Help text and accessibility

Note that in every example where the help text is dependent on the state of the input element, we
assign an id to the `mdl-textfield-helptext` element and set that id to the value of the
`aria-controls` attribute on the input element. We recommend doing this as well as it will help
indicate to assistive devices that the display of the help text is dependent on the interaction with
the input element.

When using our vanilla JS component, if it sees that the input element has an `aria-controls`
attribute, it will look for an element with the id specified and treat it as the text field's help
text element, taking care of adding/removing `aria-hidden` and other a11y attributes. This can also
be done programmatically, which is described below.

### Validation

MDL Textfield provides validity styling by using the `:invalid` and `:required` attributes provided
by HTML5's form validation API.

```html
<div class="mdl-textfield">
  <input type="password" id="pw" class="mdl-textfield__input" required minlength=8>
  <label for="pw" class="mdl-textfield__label">Password</label>
</div>
```

An input's validity is checked via `checkValidity()` on blur, and the styles are updated
accordingly. When using the `required` attribute, an asterisk will be automatically appended to the
label text, as per the spec.

Help text can be used to provide additional validation messages. Use
`mdl-textfield-helptext--validation-msg` to provide styles for using the help text as a validation
message. This can be easily combined with `mdl-textfield-helptext--persistent` to provide a robust
UX for client-side form field validation.

```html
<div class="mdl-textfield">
  <input required minlength=8 type="password" class="mdl-textfield__input" id="pw"
         aria-controls="pw-validation-msg">
  <label for="pw" class="mdl-textfield__label">Choose password</label>
</div>
<p class="mdl-textfield-helptext
          mdl-textfield-helptext--persistent
          mdl-textfield-helptext--validation-msg"
   id="pw-validation-msg">
  Must be at least 8 characters long
</p>
```

### Multi-line - With Javascript

```html
<div class="mdl-textfield mdl-textfield--multiline">
  <textarea id="multi-line" class="mdl-textfield__input" rows="8" cols="40"></textarea>
  <label for="multi-line" class="mdl-textfield__label">Multi-line Label</label>
</div>
```

### Multi-line - Gracefully Degraded

```html
<label for="css-only-multiline">Multi-line label: </label>
<div class="mdl-textfield mdl-textfield--multiline">
  <textarea class="mdl-textfield__input"
            id="css-only-multiline"
            rows="8" cols="40"
            placeholder="Tell the world something about yourself!"></textarea>
</div>
```

### Using the JS component

MDL Textfield ships with Component / Foundation classes which are used to provide a full-fidelity
Material Design text field component.

#### Including in code

##### ES2015

```javascript
import MDLTextfield, {MDLTextfieldFoundation} from 'mdl-textfield';
```

##### CommonJS

```javascript
const mdlTextfield = require('mdl-textfield');
const MDLTextfield = mdlTextfield.default;
const MDLTextfieldFoundation = mdlTextfield.MDLTextfieldFoundation;
```

##### AMD

```javascript
require(['path/to/mdl-textfield'], mdlTextfield => {
  const MDLTextfield = mdlTextfield.default;
  const MDLTextfieldFoundation = mdlTextfield.MDLTextfieldFoundation;
});
```

##### Global

```javascript
const MDLTextfield = mdl.Textfield;
const MDLTextfieldFoundation = mdl.Textfield.MDLTextfieldFoundation;
```

#### Automatic Instantiation

```javascript
mdl.Textfield.attachTo(document.querySelector('.mdl-textfield'));
```

#### Manual Instantiation

```javascript
import MDLTextfield from 'mdl-textfield';

const textfield = new MDLTextfield(document.querySelector('.mdl-textfield'));
```

#### MDLTextfield API

Similar to regular DOM elements, the `MDLTextfield` functionality is exposed through accessor
methods.

##### MDLTextfield.helptextElement

HTMLLabelElement. This is a normal property (non-accessor) that holds a reference to the element
being used as the text field's "help text". It defaults to `null`. If the text field's input element
contains an `aria-controls` attribute on instantiation of the component, it will look for an element
with the corresponding id within the document and automatically assign it to this property.

##### MDLTextfield.disabled

Boolean. Proxies to the foundation's `isDisabled/setDisabled` methods when retrieved/set
respectively.

### Using the foundation class

Because MDL Textfield is a feature-rich and relatively complex component, it's adapter is a bit more
complicated.

| Method Signature | Description |
| --- | --- |
| addClass(className: string) => void | Adds a class to the root element |
| removeClass(className: string) => void | Removes a class from the root element |
| addClassToLabel(className: string) => void | Adds a class to the label element. Note that we assume here that if the foundation is being used, the user has opted to put the label inside of the `mdl-textfield` element. We make this assumption in our vanilla component. You could accommodate an optional label by adding a check to make sure there is a label element |
| removeClassFromLabel(className: string) => void | Removes a class from the label element |
| addClassToHelptext(className: string) => void | Adds a class to the help text element. Note that in our code we check for whether or not we have a help text element and if we don't, we simply return. |
| removeClassFromHelptext(className: string) => void | Removes a class from the help text element. |
| helptextHasClass(className: string) => boolean | Returns whether or not the help text element contains the current class |
| setHelptextAttr(name: string, value: string) => void | Sets an attribute on the help text element |
| removeHelptextAttr(name: string) => void | Removes an attribute on the help text element |
| registerInputFocusHandler(handler: EventListener) => void | Registers an event listener on the native input element for a "focus" event |
| deregisterInputFocusHandler(handler: EventListener) => void | Un-registers an event listener on the native input element for a "focus" event |
| registerInputBlurHandler(handler: EventListener) => void | Registers an event listener on the native input element for a "blur" event |
| deregisterInputBlurHandler(handler: EventListener) => void | Un-registers an event listener on the native input element for a "blur" event |
| getNativeInput() => {value: string, disabled: boolean, checkValidity: () => boolean}? | Returns an object representing the native text input element, with a similar API shape. The object returned should include the `value` and `disabled` properties, as well as the `checkValidity()` function. We _never_ alter the value within our code, however we _do_ update the disabled property, so if you choose to duck-type the return value for this method in your implementation it's important to keep this in mind. Also note that this method can return null, which the foundation will handle gracefully. |

#### The full foundation API

##### MDLTextfieldFoundation.isDisabled() => boolean

Returns a boolean specifying whether or not the input is disabled.

##### MDLTextfieldFoundation.setDisabled(disabled: boolean)

Updates the input's disabled state.

### Theming

MDL Textfield components use the configured theme's primary color for its underline and label text
when the input is focused.

MDL Textfield components support dark themes.
