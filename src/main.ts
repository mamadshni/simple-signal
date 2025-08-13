import {signal} from "./signal.ts";

export * from './signal.js';


const testSignal = signal(0);
testSignal.subscribe((val) => {
    const elem = document.querySelector<HTMLElement>('[data-signal]');
    if(elem) {
        elem.innerHTML = `${val}`;
    }
});

testSignal.subscribe((val) => console.log(val));


setInterval(() => {
    testSignal.update(val => val + 1);
}, 1000)