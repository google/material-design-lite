## Introduction

The Material Design Lite (MDL) **expansion** component provides a clean interface
to show collapsable content areas to users.

## Basic Usage

To use the expansion panel component browsers must support the [details element](https://www.w3.org/TR/2011/WD-html5-author-20110809/the-details-element.html). Currently only [IE and Edge](http://caniuse.com/#feat=details) do not provide support for this. For support there you'll need to include a polyfill for the `<details>` element. There are a few available which each have different pitfalls to test them to find the one that best suites your needs.

Once you have support for detail elements all you need to do is make them with a summary and content containers. Remember that the content element comes directly after the summary element and contains all the rest of the content for the block. If your content has a form or some kind of actions for the user to carry out, include an actions container with actions in the content container.

Keep in mind, the order is automatically reversed for actions.
Material Design requires that the primary (confirmation) action be displayed last.
So, the first action you create will appear last on the action bar.
This allows for more natural coding and tab ordering while following the specification.

Remember to add the event handlers for your action items.

## CSS Classes

### Blocks

| MDL Class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-expansion` | Defines the container of the expansion component. | Required on expansion container. |

### Elements


| MDL Class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-expansion__summary` | Defines the summary container for the expansion panel. | Required on summary container. |
| `mdl-expansion__header` | Defines the primary header for the summary. | Required on the header container within the summary. |
| `mdl-expansion__subheader` | Defines the subheading for the summary. | Optional on a node within the header container. |
| `mdl-expansion__secondary-header` | Defines auxiliary content for the summary. | Optional on a node within the summary container. |
| `mdl-expansion__content` | Defines the container node for the content that is toggled. | Required on container node after the summary. |
| `mdl-expansion__actions` | Defines the container node for the actions for any forms within the content. | Optional on container within the content |
| `mdl-expansion__action` | Defines an action trigger to provide the appropriate margin. | Optional on trigger within the actions. |

### Modifiers

There are no modifiers for the expansion panel.
