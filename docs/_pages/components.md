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
  - name: cards
    title: Cards
    description: Self-contained pieces of paper with data.
    components:
      - name: card
        class: mdl-card
        snippets:
          - snippet_group:
            - caption: Card with shadow
              file: shadow--2dp.html
          - snippet_group:
            - caption: Card with shadow and menu
              file: shadow--4dp-menu.html
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
---
