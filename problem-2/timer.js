const hrInput = document.getElementById('hr'); // Get the input element with id "hr"
const minInput = document.getElementById('min'); // Get the input element with id "min"
const secInput = document.getElementById('sec'); // Get the input element with id "sec"

let hr = 0; // Instantiate hour to 0
let min = 0; // Instantiate minute to 0
let sec = 0; // Instantiate second to 0
let timeGap; // Time interval

const updateTime = () => { // Update the time
    hrInput.value = hr; // Set the value of the input element with id "hr" to the value of the variable hr
    minInput.value = min; // Set the value of the input element with id "min" to the value of the variable min
    secInput.value = sec; // Set the value of the input element with id "sec" to the value of the variable sec
} // end updateTime

// Update hour when a user changes the minute input
Rx.Observable.fromEvent(hrInput, 'change').subscribe(() => { // Subscribe to the change event of the hour input
    hr = parseInt(hrInput.value); // Set the value of the variable hr to the value of the input element with id "hr"
    updateTime(); // Update the time
}) 

// Update minute when a user changes the minute input
Rx.Observable.fromEvent(minInput, 'change').subscribe(() => { // Subscribe to the change event of the minute input
    min = parseInt(minInput.value); // Set the value of the variable min to the value of the input element with id "min"
    if (min >= 60) { // If user enters an int bigger or equal to 60 for minute
        hr = Math.floor(hr + min / 60); // Add the number of hours to the hour input
        min = min % 60; // Set the minute input to the remainder of the minutes
    } // end if

    updateTime();
})

Rx.Observable.fromEvent(secInput, 'change').subscribe(() => { // Subscribe to the change event of the second input 
    sec = parseInt(secInput.value); // Set the value of the variable sec to the value of the input element with id "sec"
    if (sec >= 60) { // If user enters an int bigger than 60 for second
        min = Math.floor(min + sec / 60); // Add the number of minutes to the minute input
        sec = sec % 60; // Set the second input to the remainder of the seconds
        
        if (min > 60) { // If user enters an int bigger than 60 for minute
            hr = Math.floor(hr + min / 60); // Add the number of hours to the hour input
            min = min % 60; // Set the minute input to the remainder of the minutes
        } // end inner if
    } // end if

    updateTime();
})

const setTime = () => { 
    sec = timer % 60; // Remainder of seconds
    min = Math.floor(timer / 60); // Number of minutes
    hr = Math.floor(min / 60); // Number of hours
    min = min % 60; // Remainder of minutes

    updateTime();
} // end setTime

const startCount = () => { // Start counting time
    if (timer > 0) { // If timer is greater than 0
        timeGap = setInterval(() => { 
            timer -= 1; // timer--;

            if (timer <= 0) {
                clearInterval(timeGap); // Stop the interval
                stopCount(); // Stop the count
            } // end inner if
            setTime(); // Update the time
        }, 1000)
    } else {
        stopCount();
    } // end if else
} // end startCount

const stopCount = () => { // Stop counting time
    document.querySelector("h1").innerText = "!! Time is up !!"; // Change the text of the h1 element to "Time is up!" once counting is done

    setTimeout(() => { 
        document.querySelector("h1").innerText = "Jina's Timer App";
    }, 2000); // Change the text of the h1 element back to "Jina's Timer App" after 2 seconds

    resetTime(); 
} // end stopCount

const startTime = () => {
    timer = (hr * 3600) + (min * 60) + sec; // Set timer to the total number of seconds

    hrInput.setAttribute('disabled', true); // Disable the hour input
    minInput.setAttribute('disabled', true); // Disable the minute input
    secInput.setAttribute('disabled', true); // Disable the second input

    startCount();
} // end startTime

const stopTime = () => {
    clearInterval(timeGap); // Stop the interval
} // end stopTime

const resetTime = () => {
    hr = 0; // Set hour back to 0
    min = 0; // Set minute back to 0
    sec = 0; // Set second back to 0
    timer = 0; // Set timer back to 0

    if (timeGap) {
        clearInterval(timeGap); // If gap is defined, clear the interval
    } // end if

    hrInput.removeAttribute('disabled'); // Remove the disabled attribute from the hour input
    minInput.removeAttribute('disabled'); // Remove the disabled attribute from the minute input
    secInput.removeAttribute('disabled'); // Remove the disabled attribute from the second input
    
    hrInput.value = ""; // Set the value of the hour input to an empty string
    minInput.value = ""; // Set the value of the minute input to an empty string
    secInput.value = ""; // Set the value of the second input to an empty string
} // end resetTime