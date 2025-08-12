export function signal<T>(initialValue: T, elemRef: HTMLElement | null = null) {
    let host = elemRef;
    let value = initialValue;

    function setHost(elemRef: HTMLElement) {
        host = elemRef;
    }

    function get() {
        return value;
    }

    function set(newValue: T) {
        if (value !== newValue) {
            value = newValue;
            updateView();
        }
    }

    function update(fn: (currentVal: T) => T) {
        value = fn(value);
        updateView();
    }

    function updateView() {
        if (host) {
            host.textContent = `${value}`;
        }
    }

    updateView();

    return { get, set, update, setHost };
}