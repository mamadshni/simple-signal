import {SignalGetter, WritableSignal} from "./models/signal.model.ts";
import {createSignal} from "./utils/signal.util.ts";

export function signal<T>(initialValue: T): WritableSignal<T> {
    const [get, set, update] = createSignal(initialValue);
    const signalFn = get as SignalGetter<T> & WritableSignal<T>;

    signalFn.set = set;
    signalFn.update = update;

    return signalFn as WritableSignal<T>;
}
