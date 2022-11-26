const hrInput = document.getElementById('hr'); // Get the input element with id "hr"
const minInput = document.getElementById('min'); // Get the input element with id "min"
const secInput = document.getElementById('sec'); // Get the input element with id "sec"

let hr, min, sec, timer = 0; // Instantiate hour, minute, second and timer to 0
let gap; // Time interval

const updateTime = () => { // Update the time
    hrInput.value = hr; // Set the value of the input element with id "hr" to the value of the variable hr
    minInput.value = min; // Set the value of the input element with id "min" to the value of the variable min
    secInput.value = sec; // Set the value of the input element with id "sec" to the value of the variable sec
} // end updateTime

// Update hour when a user changes the minute input
// Hour input can be any int >= 0
Rx.Observable.fromEvent(hrInput, 'change').subscribe(() => {
    hr = parseInt(hrInput.value);
    updateTime();
}) 

// Update minute when a user changes the minute input
// 1 hour = 60 minutes
Rx.Observable.fromEvent(minInput, 'change').subscribe(() => {
    min = parseInt(minInput.value);
    if (min >= 60) { // If user enters an int bigger than 60 for minute
        hr = Math.floor(hr + min / 60); // Add the number of hours to the hour input
        min = min % 60; // Set the minute input to the remainder of the minutes
    } // end if
    updateTime();
})

// Update second when a user changes the second input
Rx.Observable.fromEvent(secInput, 'change').subscribe(() => {
    sec = parseInt(secInput.value);
    if (sec >= 60) { // If user enters an int bigger than 60 for second
        min = Math.floor(min + sec / 60); // Add the number of minutes to the minute input
        sec = sec % 60; // Set the second input to the remainder of the seconds
        
        if (min >= def) { // If user enters an int bigger than 60 for minute
            hr = Math.floor(hr + min / 60); // Add the number of hours to the hour input
            min = min % 60; // Set the minute input to the remainder of the minutes
        } // end inner if
    } // end if
    updateTime();
})

const setTime = () => {
    sec = timer % 60; // Remainder of seconds
    min = Math.floor(timer / 60); // Number of minutes
    hr = Math.floor(min / 60);
    min = min % 60; // Remainder of minutes
    updateTime();
} // end setTime

const resetTime = () => {
    hr, min, sec, timer = 0;
    
    if (gap) clearInterval(gap); // If gap is defined, clear the interval
    
    hrInput.removeAttribute('disabled');
    minInput.removeAttribute('disabled');
    secInput.removeAttribute('disabled');
    hrInput.value = "";
    minInput.value = "";
    secInput.value = "";
} // end resetTime

const startCount = () => {
    if (timer > 0) {
        gap = setInterval(() => {
            timer -= 1; // timer--;

            if (timer <= 0) {
                clearInterval(gap); // Stop the interval
                stopCount(); // Stop the count
            } // end inner if
            setTime(); // Update the time
        }, 1000);
    } else {
        stopCount(); // Stop the count
    } // end if else
} // end startCount

const stopCount = () => {
    setTimeout(() => {
        document.querySelector("h1").innerText = "Time's up!";
    }, 1000); // Display "Time's up!" after 1 second
    resetTime(); // Reset the time
} // end stopCount

const startTime = () => {
    timer = (hr * 3600) + (min * 60) + sec;

    hrInput.setAttribute('disabled', true);
    minInput.setAttribute('disabled', true);
    secInput.setAttribute('disabled', true);
    startCount();
} // end startTime

const stopTime = () => {
    clearInterval(gap);
} // end stopTime

