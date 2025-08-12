import {signal} from "./signal.ts";

export * from './signal.js';


const testSignal = signal(
    0,
    document.querySelector<HTMLElement>('[data-signal]')
)


setInterval(() => {
    testSignal.update(val => val + 1);
}, 1000)