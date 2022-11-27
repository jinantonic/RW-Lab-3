// import { Observable } from 'rxjs'; 
// import { fromEvent } from 'rxjs'; // Import the fromEvent operator

const add_button = document.getElementById('add_note'); // Get the element with the specified id, "add_note"
//const btnObservable = fromEvent(add_button, 'click'); // Create an observable of button clicks 

// Retrieve the data in the local storage, retrieving "notes" object here
// It finds the data somewhere and creates the JSON value to put into const variable
const notePads = JSON.parse(localStorage.getItem("notes")); 
const textIdentifier = "textId"; // The normal note 
const savedIdentifier = "savedId"; // For when the note is saved
var num = 0;

// Checks to see if this variable actually contains data
// If it does then it goes through a for loop where it will for every note and add it to whatever it's being added to
if (notePads) { // If the notePads variable contains data
    notePads.forEach((note) => { // For every note in the notePads variable
        addNote(note); // Add the note to the notePads variable
    });
} // end if

// When the add button is clicked then call the function addNote()
Rx.Observable.fromEvent(add_button, 'click').subscribe(() => { 
    addNote(); 
}); 

// Function which adds notes
function addNote(text = "") { // If the text is empty then set it to an empty string
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
    // If the text is empty then add the class "hidden" to the div element
    // If the text is not empty then add the class "hidden" to the textarea element

    const edit_button = note.querySelector(".edit"); // Get the first element with class "edit"
    const del_button = note.querySelector(".delete");  // Get the first element with class "delete"
    const main = note.querySelector(".main"); // Get the first element with class "main"
    const textArea = note.querySelector("textarea"); // Get the first element with class "textarea"
    //const parentNote = document.getElementById('savedId1'); // Get the element with the specified id, "add_note"
    //const value = null;
    
    // const eh = document.getElementsByClassName(".notes");
    // console.log(eh);

    textArea.value = text;
    main.innerHTML = marked(text);

    Rx.Observable.fromEvent(edit_button, 'click').subscribe(() => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    // When the delete button is clicked, remove the note and update it to the local storage
    Rx.Observable.fromEvent(del_button, 'click').subscribe(() => {
        // note.remove(); // Remove the note
        // uploadToLS(); // Update the local storage
        // console.log("Delete button clicked");
        // if (parentNote) {

        const parentNote = document.getElementById('textId1');
        console.log(parentNote);
        
        // for (let i = 2; i < num + 1; i++) {
        //     const childNote = document.getElementById('textId' + i);
        //     console.log(childNote);

        //     // if () {
        //     //     console.log("Parent clicked");

        //     // }
        // }

      
        
        //uploadToLS();   

        
        

        // if (parentNote != null) {
        //     console.log("Parent clicked");
        // }

        // Rx.Observable.fromEvent(parentNote, 'click').subscribe(() => {
        //     console.log("Parent clicked");
        // });

        // for (let i = 2; i < num + 1; i++) {
        //     const childNote = document.getElementById('savedId' + i);
        //     //console.log(childNote);
                    
        //     if (parentNote.contains(childNote)) {
        //         console.log("Parent clicked");
        //     }   
        //     //note.remove(childNote);
        //     //childNote.remove();
        //     // if (childNote) {
        //     //     console.log("child clicked");
        //     // }

        //     uploadToLS();
        // }




        // parentNote.removeChild(childNote);
        // if (parentNote) {
        //     parentNote.remove();
        //     uploadToLS();
        // } // end if
        // Rx.Observable.fromEvent(parentNote, 'click').subscribe(() => {
        //     parentNote.remove(childNote);
        //     uploadToLS();
        // });

        


    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        uploadToLS();
    });
    // Rx.Observable.fromEvent(textArea, 'input')
    //     .map(e => e.target)
    //     .scan((value, target) => target, null)
    //     .subscribe(() => {
    //         main.innerHTML = marked(value);
    //         uploadToLS();
    //     });

    document.body.appendChild(note);


} // end function addNote()

// Function which saves the notes to the Local Storage
function uploadToLS() {
    const notesText = document.querySelectorAll("textarea");
    const note_arr = [];

    notesText.forEach((note) => {
        note_arr.push(note.value);
    });

    // Convert the JavaScript value "notes" to a JSON string and save it to the local storage
    localStorage.setItem("notes", JSON.stringify(note_arr));
} // end function uploadToLS()

// Function which lets the users to choose the background colour for the notes
function changeColour(event, textId, savedId) {
    var colour = event.value;
    const b = document.getElementById(textId);
    const c = document.getElementById(savedId);

    //console.log("First line" + b.getItem);
    b.style.backgroundColor = colour;
    c.style.backgroundColor = colour;
} // end function changeColour()

