import {signal} from "./signal/signal.ts";

const testSignal = signal(0);

setInterval(() => {
    testSignal.update(val => val + 1);
}, 1000)


