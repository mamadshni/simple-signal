
import {ValueEqualityFn} from "../ensures/equality.ts";
import {ReactiveNode} from "./reactive.model.ts";

export const SIGNAL: unique symbol = /* @__PURE__ */ Symbol('SIGNAL');

export interface SignalNode<T> extends ReactiveNode {
    value: T;
    equal: ValueEqualityFn<T>;
}

export type SignalGetter<T> = (() => T) & {readonly [SIGNAL]: SignalNode<T>};
export type SignalSetter<T> = (newValue: T) => void;
export type SignalUpdater<T> = (updateFn: (value: T) => T) => void;


export type Signal<T> = (() => T) & {
    [SIGNAL]: unknown;
};


export const WRITABLE_SIGNAL: unique symbol = /* @__PURE__ */ Symbol('WRITABLE_SIGNAL');

export interface WritableSignal<T> extends Signal<T> {
    [WRITABLE_SIGNAL]: T;

    /**
     * Directly set the signal to a new value, and notify any dependents.
     */
    set(value: T): void;

    /**
     * Update the value of the signal based on its current value, and
     * notify any dependents.
     */
    update(updateFn: (value: T) => T): void;
}
