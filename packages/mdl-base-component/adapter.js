/**
 * A basic component adapter.
 */
export const MDLBaseAdapter = {
  getBoundingClientRect(id) {
    return this.elements_[id].getBoundingClientRect();
  },

  setStyles(id, styles) {
    Object.assign(this.elements_[id].style, styles);
  },

  forceLayout(id) {
    return this.elements_[id].offsetWidth;
  },

  addClass(id, cls) {
    this.elements_[id].classList.add(cls);
  },

  removeClass(id, cls) {
    this.elements_[id].classList.remove(cls);
  },

  get(...symbolPath) {
    return ref(...symbolPath);
  },

  getComputedValue(id, property) {
    return window.getComputedStyle(this.elements_[id]).getPropertyValue(property);
  },

  addEventListener(id, event, listener) {
    return this.elements_[id].addEventListener(event, listener);
  },

  removeEventListener(id, event, listener) {
    this.elements_[id].removeEventListener(event, listener);
  },

  setProperty(id, name, value) {
    this.elements_[id][name] = value;
  },

  getProperty(id, name) {
    return this.elements_[id][name];
  }
};

/**
 * Element refs are concatenated symbol paths of arbitrary length.
 * e.g.
 * get('md-ripple__foreground', 0) = `md-ripple__foreground|0`
 */
export function ref(...symbolPath) {
  return symbolPath.join('|');
}
