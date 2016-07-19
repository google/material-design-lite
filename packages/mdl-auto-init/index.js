const registry = Object.create(null);

const CONSOLE_WARN = console.warn.bind(console);

/**
 * Auto-initializes all mdl components on a page.
 */
export default function mdlAutoInit(root = document, warn = CONSOLE_WARN) {
  const nodes = root.querySelectorAll('[data-mdl-auto-init]');
  for (let i = 0, node; (node = nodes[i]); i++) {
    const ctorName = node.dataset.mdlAutoInit;
    if (!ctorName) {
      throw new Error('(mdl-auto-init) Constructor name must be given.');
    }

    const Ctor = registry[ctorName];
    if (typeof Ctor !== 'function') {
      throw new Error(
        `(mdl-auto-init) Could not find constructor in registry for ${ctorName}`);
    }

    if (node[ctorName]) {
      warn(`(mdl-auto-init) Component already initialized for ${node}. Skipping...`);
      continue;
    }

    // TODO: Should we make an eslint rule for an attachTo() static method?
    const component = Ctor.attachTo(node);
    Object.defineProperty(node, ctorName, {
      value: component,
      writable: false,
      enumerable: false,
      configurable: true
    });
  }
}

mdlAutoInit.register = function(componentName, Ctor, warn = CONSOLE_WARN) {
  if (typeof Ctor !== 'function') {
    throw new Error(`(mdl-auto-init) Invalid Ctor value ${Ctor}. Expected function`);
  }
  if (registry[componentName]) {
    warn(
      `(mdl-auto-init) Overriding registration for ${componentName} with ${Ctor}. ` +
      `Was: ${registry[componentName]}`);
  }
  registry[componentName] = Ctor;
};

mdlAutoInit.deregister = function(componentName) {
  delete registry[componentName];
};

mdlAutoInit.deregisterAll = function() {
  Object.keys(registry).forEach(this.deregister, this);
};
