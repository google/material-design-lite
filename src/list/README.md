## Introduction
Lists present multiple line items vertically as a single continuous element.


### To include the MDL **list** component:
&nbsp;1. Code a `<ul>` element with the class `mdl-list`; this is the "outer" container, intended to hold all of the list's content.
```html
<ul class='mdl-list'>
</ul>
```
&nbsp;2. Code as many `<li>` elements as required with the class `mdl-list__item`; this is the individual item that a list is comprises off.
```html
<ul class='mdl-list'>
<li class="mdl-list__item"></li>
<li class="mdl-list__item"></li>
<li class="mdl-list__item"></li>
</ul>
NOTE : Stop here if you a simple single line list

```
&nbsp;3. Append the class `mdl-list__item-two-line` or`mdl-list__item-three-line`, if you require a Two Line List or Three Line List.
```html
<ul class='mdl-list'>
<li class="mdl-list__item mdl-list__item-two-line"></li>
<li class="mdl-list__item mdl-list__item-two-line"></li>
<li class="mdl-list__item mdl-list__item-two-line"></li>
</ul>
```

&nbsp;4. Add the appropriate classes to style your content, ( Avatar, Icon, Primary and secondary content)
```html
<ul class='mdl-list'>

<li class="mdl-list__item mdl-list__item-two-line">
<span class="mdl-list__item-primary-content">
<i class="material-icons  mdl-list__item-icon">person</i>
<span class=mdl-list__item-text>Bryan Carson</span>
<span class="mdl-list__item-sub-title">62 Episodes</span>
</span>
</li>

<li class="mdl-list__item mdl-list__item-two-line">
<span class="mdl-list__item-primary-content">
<i class="material-icons  mdl-list__item-icon">person</i>
<span class=mdl-list__item-text>Aaron Paul</span>
<span class="mdl-list__item-sub-title">62 Episodes</span>
</span>
</li>

<li class="mdl-list__item mdl-list__item-two-line">
<span class="mdl-list__item-primary-content">
<i class="material-icons  mdl-list__item-icon">person</i>
<span class=mdl-list__item-text>Bob Odenkirk</span>
<span class="mdl-list__item-sub-title">62 Episodes</span>
</span>
</li>

</ul>
```



## Configuration options

The MDL CSS classes apply various predefined visual enhancements to the list. The table below lists the available classes and their effects.

MDL class

| MDL Class        | Effect           | Remark  |
| ------------- |:-------------:| -----:|
| .mdl-list      | Defines list as an MDL component| - |
| .mdl-list__item      | Defines a the single list item  | - |
| .mdl-list__item-primary-content | Defines the primary content area      |    $1 |
| .mdl-list__item-avatar | Defines the avatar in a List Item      |    $1 |
| .mdl-list__item-two-line | Defines the List Item as Two Line      |    $1 |
| .mdl-list__item-three-line | Defines the List Item  as a Three Line      |    $1 |
| .mdl-list__item-secondary-content | Defines the secondary content area      | Only on Three and Two Line |
| .mdl-list__item-secondary-info | Defines the Info area of secondary content      | Only on Three and Two Line |
| .mdl-list__item-secondary-action | Defines the Action area  of secondary content      | Only on Three and Two Line |
| .mdl-list__item-title-body | Defines the Title area  of Two or Three Line List      | Only on Three and Two Line |
| .mdl-list__item-text-body | Defines the Text Body area  of Two or Three Line List      | Only on Three Line |


NOTE : Restrictions as per https://www.google.com/design/spec/components/lists.html.
