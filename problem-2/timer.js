const hrInput = document.getElementById('hr');
const minInput = document.getElementById('min');
const secInput = document.getElementById('sec');

// Instantiate hour, minute, and second to 0
let hr = 0;
let min = 0;
let sec = 0;

// Instantiate timer to 0
let timer = 0;

const updateTime = () => {
    hrInput.value = hr;
    minInput.value = min;
    secInput.value = sec;
}

Rx.Observable.fromEvent(hrInput, 'change').subscribe(() => {
    hr = parseInt(hrInput.value);
    updateTime();
})

Rx.Observable.fromEvent(minInput, 'change').subscribe(() => {
    min = parseInt(minInput.value);
    updateTime();
})

Rx.Observable.fromEvent(secInput, 'change').subscribe(() => {
    sec = parseInt(secInput.value);
    updateTime();
})



// const count = 10;
// Rx.Observable
//     .timer(100, 100)
//     .map(i => count - i)
//     .take(count + 1)
//     .subscribe(i => console.log(i));
