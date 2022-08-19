import { useRef, useEffect } from 'preact/hooks';

export function useEventListener(
    eventName: string,
    eventHandler: (event?: any) => void,
    element = global,
    options: any = {}
): void {
    const cachedEventHandler = useRef(eventHandler);
    const { capture, passive, once } = options;

    // Keep track of event handler method changes
    useEffect(() => {
        cachedEventHandler.current = eventHandler;
    }, [eventHandler]);

    // Keep track of event name, element, and event option
    // changes
    useEffect(() => {
        if (!(element && element.addEventListener)) {
            return;
        }

        const eventListener = (event: Event): void =>
            cachedEventHandler.current(event);

        const options = { capture, passive, once };

        element.addEventListener(eventName, eventListener, options);

        return (): void =>
            element.removeEventListener(eventName, eventListener, options);
    }, [eventName, element, capture, passive, once]);
}
