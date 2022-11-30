class NoteApp { 
    constructor() {
        this.notes = JSON.parse(localStorage.getItem("notes")); // Get the notes from the local storage
        this.initialId = 0; // Initialise the id of the note as 0
        this.NoteList = []; // List of the notes

        if (this.notes) { // If there are notes in the local storage
            this.notes.forEach((note) => {
                this.addNewNote(note.valueOf().text, note.valueOf().colour, true, note.valueOf().parentId); // Add the note to the DOM
            }); // end forEach
        } // end if

        // Add a new note when the add note button is clicked
        Rx.Observable.fromEvent(add_note, 'click').subscribe(() => this.addNewNote("", "beige", true, 0)); 
    } // end constructor

    addNewNote(text, colour, addToLS, parentId) { // Function which adds a new note
        this.initialId++; // Increment the id of the note
        const note = new Note(text, colour, this.initialId, parentId); // Create a new note
        
        note.div.classList.add("note"); // Add the class "note" to the note
        this.NoteList[this.initialId] = note; // Add the note to the list of notes
        
        note.div.innerHTML = `
            <div class="notes">
                <div class="colour_menu">
                    <input type="color" id="newColour">
                    <button class="edit"><i class="fas fa-edit"></i></button>
                    <button class="delete"><i class="fas fa-trash-alt"></i></button>
                    <button class="link"><i class="fa-solid fa-child"></i></button>
                </div>
                <div class="main hidden"></div>
                <textarea></textarea>
            </div>
        `;

        const edit_button = note.div.querySelector(".edit"); // Get the edit button
        const del_button = note.div.querySelector(".delete"); // Get the delete button
        const main = note.div.querySelector(".main"); // Get the main div
        const textArea = note.div.querySelector("textarea"); // Get the textarea
        const link = note.div.querySelector(".link"); // Get the link button
        const colourSelector = note.div.querySelector("#newColour"); // Get the colour selector

        textArea.value = text; // Set the value of the textarea to the text of the note
        main.innerHTML = marked(note.text); // Set the value of the main div to the text of the note

        Rx.Observable.fromEvent(edit_button, 'click').subscribe(() => { // When the edit button is clicked
            main.classList.toggle("hidden"); // Toggle the class "hidden" of the main div
            textArea.classList.toggle("hidden"); // Toggle the class "hidden" of the textarea
            note.text = this.textArea; // Set the text of the note to the value of the textarea
        });

        Rx.Observable.fromEvent(del_button, 'click').subscribe(() => { // When the delete button is clicked
            this.NoteList.forEach((n) => { // For each note in the list of notes
                if (note.id == n.parentId) { // If the note is a child of the note to be deleted
                    n.div.remove(); // Remove the note from the DOM
                    this.NoteList.splice(n.id, 1); // Remove the note from the list of notes
                    this.uploadToLS(); // Upload the notes to the local storage
                } // end if
            }); // end forEach

            this.NoteList.splice(note.id, 1); // Remove the note from the list of notes
            note.div.remove(); // Delete all the children note including the parent note
            this.uploadToLS(); // Update the local storage
        });

        Rx.Observable.fromEvent(link, 'click').subscribe(() => { // When the link button is clicked
            const newNote = new Note(textArea.value, note.colour, this.initialId, note.id); // Create a new note
            newNote.addChild(); // Add the new note as a child of the parent note
            this.uploadToLS(); // Update the local storage
        });

        Rx.Observable.fromEvent(colourSelector, 'change').subscribe(() => { // When the colour selector is changed
            textArea.style.backgroundColor = colourSelector.value; // Change the background colour of the textarea
            main.style.backgroundColor = colourSelector.value; // Change the background colour of the main div
            note.colour = colourSelector.value; // Change the colour of the note
            this.uploadToLS(); // Update the local storage
        });

        Rx.Observable.fromEvent(textArea, 'input') // When the textarea is changed
            .map(() => textArea.value) // Get the value of the textarea
            .subscribe(() => { // Subscribe to the event
                main.innerHTML = marked(textArea.value); // Set the value of the main div to the text of the note
                note.text = textArea.value; // Set the text of the note to the value of the textarea
                this.uploadToLS(); // Update the local storage
            }); 

        document.body.appendChild(note.div); // Add the note to the DOM

        if (addToLS) { // If the note is to be added to the local storage
            textArea.style.backgroundColor = colour; // Change the background colour of the textarea
            main.style.backgroundColor = colour; // Change the background colour of the main div
            this.uploadToLS(); // Update the local storage
        } // end if
    } // end function addNewNote()

    // Function which saves the notes to the Local Storage
    uploadToLS() {
        //var noteText = ""; // Get all the textareas
        const note_arr = []; // Array of the notes
        //const list = []; // List of the notes

        if (this.NoteList) { // If there are notes in the list of notes
            this.NoteList.forEach((note) => { // For each note in the list of notes
                console.log(note.colour);
                note_arr.push(note); // Add the text of the note to the array of the notes
            }); // end forEach
        }
        // notesText.forEach((note) => { // For each textarea
        //     note_arr.push(note.value); // Add the value of the textarea to the array of the notes
        // }); // end forEach

        localStorage.setItem("notes", JSON.stringify(note_arr)); // Convert the JavaScript value "notes" to a JSON string and save it to the local storage
        // localStorage.setItem("id", JSON.stringify(note_id)); 
        // localStorage.setItem("id", JSON.stringify(note_pd)); // Convert the JavaScript value "pid" to a JSON string and save it to the local storage
        // localStorage.setItem("colour", JSON.stringify(note_c)); // Convert the JavaScript value "colour" to a JSON string and save it to the local storage
    } // end function uploadToLS()
} // end class NoteApp

class Note {    
    constructor(text, colour, id, parentId) {
        this.colour = colour; // colour of the note
        this.div = document.createElement("div"); // div element of the note
        this.id = id; // id of the note
        this.parentId = parentId; // id of the parent note

        if (text == null) { // If the text of the note is null
            this.text = ""; // Set the text of the note to an empty string
        } else {
            this.text = text; // Set the text of the note to the text of the note
        } // end if else
    } // end constructor

    addChild() { // Function which adds a child note
        n.addNewNote(this.text, this.colour, true, this.parentId); 
    } // end function addChild()

    getText() { // Function which returns the text of the note
        return this.text;
    } // end function getText()

    getId() { // Function which returns the id of the note
        return this.id;
    } // end function getId()

    getColour() { 
        return this.colour;
    } // end function getColour()
} // end class Note

n = new NoteApp(); // Create a new note app