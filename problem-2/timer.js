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

// Update hour when a user changes the minute input
// Hour input can be any int >= 0
Rx.Observable.fromEvent(hrInput, 'change').subscribe(() => {
    hr = parseInt(hrInput.value);
    updateTime();
})

// Update minute when a user changes the minute input
// 1 hour = 60 minutes
let def = 60;

Rx.Observable.fromEvent(minInput, 'change').subscribe(() => {
    min = parseInt(minInput.value);
    if (min >= def) { // If user enters an int bigger than 60 for minute
        hr = Math.floor(hr + min / def); // Add the number of hours to the hour input
        min = min % def; // Set the minute input to the remainder of the minutes
    } // end if
    updateTime();
})

// Update second when a user changes the second input
Rx.Observable.fromEvent(secInput, 'change').subscribe(() => {
    sec = parseInt(secInput.value);
    if (sec >= def) { // If user enters an int bigger than 60 for second
        min = Math.floor(min + sec / def); // Add the number of minutes to the minute input
        sec = sec % def; // Set the second input to the remainder of the seconds
        
        if (min >= def) { // If user enters an int bigger than 60 for minute
            hr = Math.floor(hr + min / def); // Add the number of hours to the hour input
            min = min % def; // Set the minute input to the remainder of the minutes
        } // end inner if
    } // end if
    updateTime();
})

const resetTime = () => {
    hr = 0;
    min = 0;
    sec = 0;
    timer = 0;
    
    hrInput.removeAttribute('disabled');
    minInput.removeAttribute('disabled');
    secInput.removeAttribute('disabled');
    hrInput.value = "";
    minInput.value = "";
    secInput.value = "";
}   


