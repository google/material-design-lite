---
layout: components
title: Components
bodyclass: components
include_prefix: ../
categories:
  - name: index 
    components:
      - name: index  
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
            - caption: Icon
              file: badge-on-icon-icon.html
          - snippet_group:
            - caption: Number
              file: badge-on-text-text.html
            - caption: Icon
              file: badge-on-text-icon.html
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
              file: raised-accent-ripple.html
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
      - name: footer
        caption: Footer
        class: mdl-mega-footer / mdl-mini-footer
      - name: grid
        caption: Grid
        class: mdl-grid
      - name: layout
        caption: Layout
        class: mdl-layout
      - name: tabs
        caption: Tabs
        class: mdl-tabs
  - name: loading
    title: Loading
    description: Indicate loading and progress states.
    components:
      - name: progress
        caption: Progress bar
        class: mdl-progress
      - name: spinner
        caption: Spinner
        class: mdl-spinner
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
            - caption: Lower right
              file: lower-right.html
              demo_file: lower-right-demo.html
          - snippet_group:
            - caption: Top left
              file: top-left.html
              demo_file: top-left-demo.html
            - caption: Top right
              file: top-right.html
              demo_file: top-right-demo.html
  - name: sliders
    title: Sliders
    description: Selecting a value out of a range.
    components:
      - name: slider
        class: mdl-slider
  - name: toggles
    title: Toggles
    description: Choose between states.
    components:
      - name: checkbox
        caption: Checkbox
        class: mdl-checkbox
      - name: icon-toggle
        caption: Icon toggle
        class: mdl-icon-toggle
      - name: radio
        caption: Radio button
        class: mdl-radio
      - name: switch
        caption: Switch
        class: mdl-switch
  - name: tables
    title: Tables
    description: Organize data.
    components:
      - name: data-table
        class: mdl-data-table
  - name: textfields
    title: Text Fields
    description: Textual input components.
    components:
      - name: textfield
        class: mdl-textfield
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
