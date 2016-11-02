export function configure(config) {
    const components = [
        './button/mdl-button',
        './checkbox/mdl-checkbox',
        './ripple/mdl-ripple'
    ];
    config.globalResources(components);
}
