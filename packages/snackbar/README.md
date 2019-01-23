# React Snackbar

A React version of an [MDC Snackbar](https://github.com/material-components/material-components-web/tree/master/packages/mdc-snackbar).

## Installation

```
npm install @material/react-snackbar
```

## Usage

### Styles

with Sass:
```js
import '@material/react-snackbar/index.scss';
```

with CSS:
```js
import '@material/react-snackbar/dist/snackbar.css';
```

### Javascript Instantiation
```js
import React from 'react';
import Snackbar from '@material/react-snackbar';

class MyApp extends React.Component {
  render() {
    return (
      <Snackbar message="Click Me!" actionText="dismiss" />
    );
  }
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
message | String | Message to show in the snackbar
className | String | Classes to be applied to the root element.
timeoutMs | Number | Timeout in milliseconds when to close snackbar.
closeOnEscape | Boolean | Closes popup on "Esc" button if true.
actionText | String | Text for action button
leading | Boolean | Shows snackbar on the left if true (or right for rtl languages)
stacked | Boolean | Shows buttons under text if true
onBeforeOpen | Function() => void | Callback for handling event, which happens before opening
onOpen | Function(evt: Event) => void | Callback for handling event, which happens after opening
onBeforeClose | Function() => void | Callback for handling event, which happens before closing
onClose | Function() => void | Callback for handling event, which happens after closing

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-snackbar/README.md#sass-mixins)

## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) when importing or using icon fonts.
