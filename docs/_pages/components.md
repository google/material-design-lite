---
layout: components
title: Components
bodyclass: components
include_prefix: ../
categories:
  - name: badges
    title: Badges
    description: Small status descriptors for UI elements.
    components:
      - name: badge
        class: mdl-badge
        snippets:
          - snippet_group:
            - caption: Number
              file: badge-on-icon-text.html
              demo_file: badge-on-icon-text-demo.html
            - caption: Icon
              file: badge-on-icon-icon.html
              demo_file: badge-on-icon-icon-demo.html
          - snippet_group:
            - caption: Number
              file: badge-on-text-text.html
              demo_file: badge-on-text-text-demo.html
            - caption: Icon
              file: badge-on-text-icon.html
              demo_file: badge-on-text-icon-demo.html
  - name: buttons
    title: Buttons
    description: Variations on Material Design buttons.
    components:
      - name: button
        class: mdl-button
        snippets:
          - snippet_group:
            - caption: Colored FAB
              file: fab-colored.html
            - caption: With ripple
              file: fab-colored-ripple.html
          - snippet_group:
            - caption: Plain FAB
              file: fab.html
            - caption: With ripple
              file: fab-ripple.html
            - caption: Disabled
              file: fab-disabled.html
          - snippet_group:
            - caption: Raised Button
              file: raised.html
            - caption: With ripple
              file: raised-ripple.html
            - caption: Disabled
              file: raised-disabled.html
          - snippet_group:
            - caption: Colored button
              file: raised-colored.html
            - caption: Accent colored
              file: raised-accent.html
            - caption: With Ripples
              file: raised-ripple-accent.html
          - snippet_group:
            - caption: Flat button
              file: flat.html
            - caption: With ripple
              file: flat-ripple.html
            - caption: Disabled
              file: flat-disabled.html
          - snippet_group:
            - caption: Primary colored flat
              file: flat-primary.html
            - caption: Accent colored flat
              file: flat-accent.html
          - snippet_group:
            - caption: Icon button
              file: icon.html
            - caption: Colored
              file: icon-colored.html
          - snippet_group:
            - caption: Mini FAB
              file: fab-mini.html
            - caption: Colored
              file: fab-mini-colored.html
  - name: cards
    title: Cards
    description: Self-contained pieces of paper with data.
    components:
      - name: card
        class: mdl-card
        snippets:
          - snippet_group:
            - caption: Wide
              file: wide.html
          - snippet_group:
            - caption: Square
              file: square.html
          - snippet_group:
            - caption: Image
              file: image.html
            - caption: Event
              file: event.html
  - name: layout
    title: Layout
    description: Building blocks for constructing a page layout.
    components:
      - name: layout
        caption: Navigation layouts
        class: mdl-layout
        snippets:
          - snippet_group:
            - caption: Transparent header
              file: transparent.html
              demo_file: transparent-demo.html
              full_width: true
          - snippet_group:
            - caption: Fixed drawer, no header
              file: fixed-drawer.html
              demo_file: fixed-drawer-demo.html
              full_width: true
          - snippet_group:
            - caption: Fixed header
              file: fixed-header.html
              demo_file: fixed-header-demo.html
              full_width: true
          - snippet_group:
            - caption: Fixed header and drawer
              file: fixed-header-drawer.html
              demo_file: fixed-header-drawer-demo.html
              full_width: true
          - snippet_group:
            - caption: Scrolling header
              file: scrolling-header.html
              demo_file: scrolling-header-demo.html
              full_width: true
          - snippet_group:
            - caption: Waterfall header
              file: waterfall-header.html
              demo_file: waterfall-header-demo.html
              full_width: true
          - snippet_group:
            - caption: Scrollable tabs
              file: scrollable-tabs.html
              demo_file: scrollable-tabs-demo.html
              full_width: true
          - snippet_group:
            - caption: Fixed tabs
              file: fixed-tabs.html
              demo_file: fixed-tabs-demo.html
              full_width: true
      - name: grid
        caption: Grid
        class: mdl-grid
        snippets:
        - snippet_group:
          - caption: Responsive grid
            file: grid.html
            demo_file: grid-demo.html
            full_width: true
      - name: tabs
        caption: Tabs
        class: mdl-tabs
        snippets:
          - snippet_group:
            - caption: Content tabs
              file: tabs.html
      - name: footer
        caption: Footer
        class: mdl-mega-footer / mdl-mini-footer
        snippets:
          - snippet_group:
            - caption: Mega footer
              file: mega-footer.html
              full_width: true
          - snippet_group:
            - caption: Mini footer
              file: mini-footer.html
              full_width: true
  - name: loading
    title: Loading
    description: Indicate loading and progress states.
    components:
      - name: progress
        caption: Progress bar
        class: mdl-progress
        snippets:
          - snippet_group:
            - caption: Default
              file: progress-default.html
              demo_file: progress-default-demo.html
          - snippet_group:
            - caption: Indeterminate
              file: progress-indeterminate.html
              demo_file: progress-indeterminate-demo.html
          - snippet_group:
            - caption: Buffering
              file: progress-buffering.html
              demo_file: progress-buffering-demo.html
      - name: spinner
        caption: Spinner
        class: mdl-spinner
        snippets:
          - snippet_group:
            - caption: Default
              file: spinner-default.html
            - caption: Single color
              file: spinner-single-color.html
  - name: menus
    title: Menus
    description: Lists of clickable actions.
    components:
      - name: menu
        class: mdl-menu
        snippets:
          - snippet_group:
            - caption: Lower left
              file: lower-left.html
              demo_file: lower-left-demo.html
              extra_codepen_css: codepen-lower-buttons.css
            - caption: Lower right
              file: lower-right.html
              demo_file: lower-right-demo.html
          - snippet_group:
            - caption: Top left
              file: top-left.html
              demo_file: top-left-demo.html
              extra_codepen_css: codepen-top-buttons.css
            - caption: Top right
              file: top-right.html
              demo_file: top-right-demo.html
  - name: sliders
    title: Sliders
    description: Selecting a value out of a range.
    components:
      - name: slider
        class: mdl-slider
        snippets:
          - snippet_group:
            - caption: Default slider
              file: slider-default.html
              demo_file: slider-default-demo.html
            - caption: Starting value
              file: slider-starting-value.html
              demo_file: slider-starting-value-demo.html
  - name: toggles
    title: Toggles
    description: Choose between states.
    components:
      - name: checkbox
        caption: Checkbox
        class: mdl-checkbox
        snippets:
          - snippet_group:
            - caption: Check on
              file: check-on.html
            - caption: Check off
              file: check-off.html
      - name: radio
        caption: Radio button
        class: mdl-radio
        snippets:
          - snippet_group:
            - caption: Radio on
              file: radio-on.html
            - caption: Radio off
              file: radio-off.html
      - name: icon-toggle
        caption: Icon toggle
        class: mdl-icon-toggle
        snippets:
          - snippet_group:
            - caption: Icon on
              file: icon-on.html
            - caption: Icon off
              file: icon-off.html
      - name: switch
        caption: Switch
        class: mdl-switch
        snippets:
          - snippet_group:
            - caption: Switch on
              file: switch-on.html
            - caption: Switch off
              file: switch-off.html
  - name: tables
    title: Tables
    description: Organize data.
    components:
      - name: data-table
        class: mdl-data-table
        snippets:
          - snippet_group:
            - caption: Data table
              file: data-table.html
  - name: textfields
    title: Text Fields
    description: Textual input components.
    components:
      - name: textfield
        class: mdl-textfield
        snippets:
          - snippet_group:
            - caption: Text
              file: textfield-text.html
              demo_file: textfield-text-demo.html
            - caption: Numeric
              file: textfield-numeric.html
              demo_file: textfield-numeric-demo.html
          - snippet_group:
            - caption: Text with floating label
              file: textfield-floating-text.html
              demo_file: textfield-floating-text-demo.html
            - caption: Numeric with floating label
              file: textfield-floating-numeric.html
              demo_file: textfield-floating-numeric-demo.html
          - snippet_group:
            - caption: Multiple line
              file: textfield-multi-line.html
              demo_file: textfield-multi-line-demo.html
            - caption: Expanding
              file: textfield-expanding.html
              demo_file: textfield-expanding-demo.html
  - name: tooltips
    title: Tooltips
    description: Useful information on hover.
    components:
      - name: tooltip
        class: mdl-tooltip
        snippets:
          - snippet_group:
            - caption: Simple
              file: tooltip-simple.html
            - caption: Large
              file: tooltip-large.html
          - snippet_group:
            - caption: Rich
              file: tooltip-rich.html
            - caption: Multiple lines
              file: tooltip-multiline.html
---
