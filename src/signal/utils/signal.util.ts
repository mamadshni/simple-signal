import {defaultEquals, ValueEqualityFn} from "../ensures/equality.ts";
import {
    Signal,
    SIGNAL,
    SignalGetter,
    SignalNode,
    SignalSetter,
    SignalUpdater,
    WritableSignal
} from "../models/signal.model.ts";
import {REACTIVE_NODE} from "../models/reactive.model.ts";

/**
 * Creates a `Signal` getter, setter, and updater function.
 */
export function createSignal<T>(
    initialValue: T,
    equal?: ValueEqualityFn<T>,
): [SignalGetter<T>, SignalSetter<T>, SignalUpdater<T>] {
    const node: SignalNode<T> = Object.create(SIGNAL_NODE);
    node.value = initialValue;

    if (equal !== undefined) {
        node.equal = equal;
    }

    const getter = (() => signalGetFn(node)) as SignalGetter<T>;
    (getter as any)[SIGNAL] = node;

    const set = (newValue: T) => signalSetFn(node, newValue);
    const update = (updateFn: (value: T) => T) => signalUpdateFn(node, updateFn);
    return [getter, set, update];
}


export function signalGetFn<T>(node: SignalNode<T>): T {
    return node.value;
}

export function signalSetFn<T>(node: SignalNode<T>, newValue: T) {
    if (!node.equal(node.value, newValue)) {
        node.value = newValue;
        signalValueChanged(node);
    }
}

export function signalUpdateFn<T>(node: SignalNode<T>, updater: (value: T) => T): void {
    signalSetFn(node, updater(node.value));
}

export const SIGNAL_NODE: SignalNode<unknown> = /* @__PURE__ */ (() => {
    return {
        ...REACTIVE_NODE,
        value: undefined,
        equal: defaultEquals,
    };
})();

function signalValueChanged<T>(node: SignalNode<T>): void {
    console.log(node.value);
}


export function isSignal(value: unknown): value is Signal<unknown> {
    return typeof value === 'function' && (value as Signal<unknown>)[SIGNAL] !== undefined;
}


export function isWritableSignal(value: unknown): value is WritableSignal<unknown> {
    return isSignal(value) && typeof (value as any).set === 'function';
}
