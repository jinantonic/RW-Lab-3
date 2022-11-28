const add_button = document.getElementById('add_note'); // Get the element with the specified id, "add_note"

// Retrieve the data in the local storage, retrieving "notes" object here
// It finds the data somewhere and creates the JSON value to put into const variable
const notePads = JSON.parse(localStorage.getItem("notes")); 
const textIdentifier = "textId"; // The normal note 
const savedIdentifier = "savedId"; // For when the note is saved
var num = 0;

// Checks to see if this variable actually contains data
if (notePads) { // If it does then 
    notePads.forEach((note) => { // go through a for loop where it will for every note 
        addNote(note); // Add it to whatever it's being added to
    }); // end forEach()
} // end if

// When the add button is clicked, add a new note
Rx.Observable.fromEvent(add_button, 'click').subscribe(() => { 
    addNote(); 
}); 

// Function which adds notes
function addNote(text = "") {
    const note = document.createElement("div"); // Create a div element
    note.classList.add("note"); // Add the class "note" to the div element
    num++; // Increment the number of notes
    let textId = textIdentifier.concat("", num); // Create a unique id for the text area
    let savedId = savedIdentifier.concat("", num); // Create a unique id for the saved button

    note.innerHTML = `
        <div class="notes">
            <div class="colour_menu">
                <select name="colours" onchange = "changeColour(this, '` + textId + `', '` + savedId + `')">
                    <option selected="">Choose colour</option>
                    <option id="red" value="#F7BBB5">Red</option>
                    <option value="#F7DAB5">Orange</option>
                    <option value="#F7F7B5">Yellow</option>
                    <option value="#C8F7B5">Green</option>
                    <option value="#B5E7F7">Blue</option>
                    <option value="#E2B5F7">Purple</option>
                </select>
                
                <button class = "edit"><i class="fa-sharp fa-solid fa-pen"></i></button>
                <button class = "delete"><i class="fa-sharp fa-solid fa-trash"></i></button>
            </div>

            <div id = '` + savedId + `' class = "main ${text ? "" : "hidden"}"></div>
            <textarea id = '` + textId + `' class = "${text ? "hidden" : ""}"></textarea>
        </div>
    `;

    const edit_button = note.querySelector(".edit"); // Get the first element with class "edit"
    const del_button = note.querySelector(".delete");  // Get the first element with class "delete"
    const main = note.querySelector(".main"); // Get the first element with class "main"
    const textArea = note.querySelector("textarea"); // Get the first element with class "textarea"

    textArea.value = text; // Set the value of the text area to the text
    main.innerHTML = marked(text); // Set the value of the main to the text

    Rx.Observable.fromEvent(edit_button, 'click').subscribe(() => { // When the edit button is clicked
        main.classList.toggle("hidden"); // Toggle the class "hidden" for the main
        textArea.classList.toggle("hidden"); // Toggle the class "hidden" for the text area
    });

    Rx.Observable.fromEvent(del_button, 'click').subscribe(() => { // When the delete button is clicked
        note.remove(); // Remove the note
        uploadToLS(); // Upload the notes to the local storage
    });

    Rx.Observable.fromEvent(textArea, 'input') // When the text area is changed
        .map(() => textArea.value) // Map the value of the text area
        .subscribe(() => { // Subscribe to the value
            main.innerHTML = marked(textArea.value); // Set the value of the main to the text area
            this.uploadToLS(); // Upload the notes to the local storage
        });

    document.body.appendChild(note); // Append the note to the body
} // end function addNote()

// Function which saves the notes to the Local Storage
function uploadToLS() {
    const notesText = document.querySelectorAll("textarea"); // Get all the elements with class "textarea"
    const note_arr = []; // Create an empty array

    notesText.forEach((note) => { // For every note
        note_arr.push(note.value); // Push the value of the note to the array
    });

    // Convert the JavaScript value "notes" to a JSON string and save it to the local storage
    localStorage.setItem("notes", JSON.stringify(note_arr));
} // end function uploadToLS()

// Function which lets the users to choose the background colour for the notes
function changeColour(event, textId, savedId) {
    var colour = event.value; // Get the value of the colour
    const b = document.getElementById(textId); // Get the element with the specified id, "textId"
    const c = document.getElementById(savedId); // Get the element with the specified id, "savedId"

    b.style.backgroundColor = colour; // Set the background colour of the text area to the colour
    c.style.backgroundColor = colour; // Set the background colour of the main to the colour
} // end function changeColour()