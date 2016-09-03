export default {
  props: ['alignEnd'],
  functional: true,
  render (createElement, context) {
    return createElement(
      'div',
      {
        'class': {
          'mdl-checkbox-wrapper': true,
          'mdl-checkbox-wrapper--align-end': context.props.alignEnd
        }
      },
      [
        createElement(
          'div',
          {
            'class': { 'mdl-checkbox-wrapper__layout': true }
          },
          [
            context.children
          ]
        )
      ]
    );
  }
}
