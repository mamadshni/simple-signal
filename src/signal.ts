export function signal<T>(initialValue: T) {
    let value = initialValue;
    let subscribers: ((currentVal: T) => unknown)[] = [];

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
        if (subscribers.length > 0) {
            subscribers.forEach(subscriber => subscriber(value));
        }
    }

    function subscribe(fn: (currentVal: T) => unknown) {
        subscribers.push(fn)
    }

    updateView();

    return { get, set, update, subscribe };
}