/**
 * Create a sequential animation/transition from a list of class names.
 */
export class SequentialAnimation {
  constructor(ref, renderer, opt_isAnimation = false) {
    this.elementRef_ = ref;
    this.renderer_ = renderer;
    this.reject_;
    this.eventName_ = opt_isAnimation ? 'animationend' : 'transitionend';
    this.isAnimation_ = opt_isAnimation;
    this.onFinish;
  }


  /**
   * @param {!Array<string|!Array<string>>} sequence
   */
  start(...sequence) {
    let promise = sequence.reduce((acc, cur) => {
      let clsName;
      let useNamedFinish = Array.isArray(cur);
      if (useNamedFinish) {
        clsName = cur[0];
      } else {
        clsName = cur;
      }

      let listener;
      let rejecter;
      let promise = new Promise((resolve, reject) => {
        rejecter = reject;
        listener = (ev) => {
          if (!this.isAnimation_ && (!useNamedFinish || useNamedFinish && ev.propertyName == cur[1])
              || this.isAnimation_ && ev.animationName == cur[1]) {
            // Cleanup current animation and trigger next.
            this.renderer_.removeEventListener(this.elementRef_, this.eventName_, listener);
            this.renderer_.removeClass(this.elementRef_, clsName);
            resolve();
          }
        };
      }).catch(() => {
        // Animation chain was canceled - remove current class.
        this.renderer_.removeEventListener(this.elementRef_, this.eventName_, listener);
        this.renderer_.removeClass(this.elementRef_, clsName);
      });
      return acc.then(() => {
        this.reject_ = rejecter;
        this.renderer_.addEventListener(this.elementRef_, this.eventName_, listener);
        // Begin the next animation.
        this.renderer_.addClass(this.elementRef_, clsName);
        return promise;
      });
    }, Promise.resolve());

    promise.then(() => {
      if (this.onFinish) {
        this.onFinish();
      }
    });
  }


  stop() {
    if (this.reject_) {
      this.reject_();
      this.reject_ = null;
    }
  }
}

