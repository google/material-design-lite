const ROOT = 'md-checkbox';
const ANIM = `${ROOT}--anim`;

export const cssClasses = {
  ROOT,
  CHECKED: `${ROOT}--checked`,
  INDETERMINATE: `${ROOT}--indeterminate`,
  FOCUSED: `${ROOT}--focused`,
  ANIM_UNCHECKED_CHECKED: `${ANIM}-unchecked-checked`,
  ANIM_UNCHECKED_INDETERMINATE: `${ANIM}-unchecked-indeterminate`,
  ANIM_CHECKED_UNCHECKED: `${ANIM}-checked-unchecked`,
  ANIM_CHECKED_INDETERMINATE: `${ANIM}-checked-indeterminate`,
  ANIM_INDETERMINATE_CHECKED: `${ANIM}-indeterminate-checked`,
  ANIM_INDETERMINATE_UNCHECKED: `${ANIM}-indeterminate-unchecked`
};

export const strings = {
  ANIM_END_EVENT_NAME: (() => {
    const el = document.createElement('div');
    // NOTE: We can immediately assume that the prefix is 'webkit' in browsers that don't
    // support unprefixed animations since the only browsers up to two major versions back that
    // don't support unprefixed names are mobile Safari and Android native browser, both of
    // which use the 'webkit' prefix.
    return 'animation' in el.style ? 'animationend' : 'webkitAnimationEnd';
  })(),
  NATIVE_CONTROL_SELECTOR: '.md-checkbox__native-control',
  TRANSITION_STATE_INIT: 'init',
  TRANSITION_STATE_CHECKED: 'checked',
  TRANSITION_STATE_UNCHECKED: 'unchecked',
  TRANSITION_STATE_INDETERMINATE: 'indeterminate'
};

export const numbers = {
  ANIM_END_LATCH_MS: 100
};
