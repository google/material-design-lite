# MDL RTL

MDL RTL provides sass mixins to assist with RTL / bi-directional layouts within MDL components.
Because we would like to achieve a standard approach to RTL throughout MDL, we highly recommend
that any MDL component that needs RTL support leverage this package.

## Installation

> Installation via npm will be available post-alpha

## Usage

Simply `@import "mdl-rtl/mixins";` and start using the mixins. Each mixin is described below.

### mdl-rtl

```scss
@mixin mdl-rtl($root-selector: null)
```

Creates a rule that will be applied when an MDL component is within the context of an RTL layout.

Usage Example:

```scss
.mdl-foo {
  position: absolute;
  left: 0;

  @include mdl-rtl {
    left: auto;
    right: 0;
  }

  &__bar {
    margin-left: 4px;
    @include mdl-rtl(".mdl-foo") {
      margin-left: auto;
      margin-right: 4px;
    }
  }
}

.mdl-foo--mod {
  padding-left: 4px;

  @include mdl-rtl {
    padding-left: auto;
    padding-right: 4px;
  }
}
```

will emit the following css:

```css
.mdl-foo {
  position: absolute;
  left: 0;
}
[dir="rtl"] .mdl-foo, .mdl-foo[dir="rtl"] {
  left: auto;
  right: 0;
}
.mdl-foo__bar {
  margin-left: 4px;
}
[dir="rtl"] .mdl-foo .mdl-foo__bar, .mdl-foo[dir="rtl"] .mdl-foo__bar {
  margin-left: auto;
  margin-right: 4px;
}

.mdl-foo--mod {
  padding-left: 4px;
}
[dir="rtl"] .mdl-foo--mod, .mdl-foo--mod[dir="rtl"] {
  padding-left: auto;
  padding-right: 4px;
}
```
*N.B.**: checking for `[dir="rtl"]` on an ancestor element works in most cases, it will sometimes
lead to false negatives for more complex layouts, e.g.

```html
<html dir="rtl">
  <!-- ... -->
  <div dir="ltr">
    <div class="mdl-foo">Styled incorrectly as RTL!</div>
  </div>
</html>
```

Unfortunately, we've found that this is the best we can do for now. In the future, selectors such
as [:dir](http://mdn.io/:dir) will help us mitigate this.

### mdl-rtl-reflexive-box

```scss
@mixin mdl-rtl-reflexive-box($base-property, $default-direction, $value, $root-selector: null)
```

Takes a base box-model property - e.g. margin / border / padding - along with a default
direction and value, and emits rules which apply the value to the
`#{$base-property}-#{$default-direction}` property by default, but flips the direction
when within an RTL context.

For example:

```scss
.mdl-foo {
  @include mdl-rtl-reflexive-box(margin, left, 8px);
}
```
is equivalent to:

```scss
.mdl-foo {
  margin-left: 8px;

  @include mdl-rtl {
    margin-right: 8px;
    margin-left: 0;
  }
}
```

Whereas:

```scss
.mdl-foo {
  @include mdl-rtl-reflexive-box(margin, right, 8px);
}
```
is equivalent to:

```scss
.mdl-foo {
  margin-right: 8px;

  @include mdl-rtl {
    margin-right: 0;
    margin-left: 8px;
  }
}
```

You can also pass a 4th optional $root-selector argument which will be forwarded to `mdl-rtl`,
e.g. `@include mdl-rtl-reflexive-box-property(margin, left, 8px, ".mdl-component")`.

Note that this function will always zero out the original value in an RTL context. If you're
trying to flip the values, use `mdl-rtl-reflexive-property`.

### mdl-rtl-reflexive-property

```scss
@mixin mdl-rtl-reflexive-property($base-property, $left-value, $right-value, $root-selector: null)
```

Takes a base property and emits rules that assign <base-property>-left to <left-value> and
<base-property>-right to <right-value> in a LTR context, and vice versa in a RTL context.

For example:

```scss
.mdl-foo {
  @include mdl-rtl-reflexive-property(margin, auto, 12px);
}
```
is equivalent to:

```scss
.mdl-foo {
  margin-left: auto;
  margin-right: 12px;

  @include mdl-rtl {
    margin-left: 12px;
    margin-right: auto;
  }
}
```

A 4th optional $root-selector argument can be given, which will be passed to `mdl-rtl`.

### mdl-rtl-reflexive-position

```scss
@mixin mdl-rtl-reflexive-position($pos, $value, $root-selector: null)
```

Takes an argument specifying a horizontal position property (either "left" or "right") as well
as a value, and applies that value to the specified position in a LTR context, and flips it in a
RTL context.

For example:

```scss
.mdl-foo {
  @include mdl-rtl-reflexive-position(left, 0);
  position: absolute;
}
```
is equivalent to:

```scss
 .mdl-foo {
   position: absolute;
   left: 0;
   right: initial;

   @include mdl-rtl {
     right: 0;
     left: initial;
   }
 }
```

An optional third $root-selector argument may also be given, which is passed to `mdl-rtl`.
