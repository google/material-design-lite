// Before we create our component, let's leverage Typescript's awesome type system to create a
// first-class interface for our foundation. Note that we will have type definitions by the time
// we reach an RC.
interface MDLFoudationAdapter {
  addClass: (string) => void
  removeClass: (string) => void
  registerAnimationEndHandler: (EventListener) => void
  deregisterAnimationEndHandler: (EventListener) => void
  registerChangeHandler: (EventListener) => void
  deregisterChangeHandler: (EventListener) => void
  getNativeControl: () => {checked: boolean, indeterminate: boolean}
  forceLayout: () => void
  isAttachedToDOM: () => boolean
}
