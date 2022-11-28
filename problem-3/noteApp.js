class NoteApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem("notes"));
        this.id = 0;
        this.NoteList = []; // List of the notes

        if (this.notes) {
            this.notes.forEach((note) => this.addNewNote(
                note, // text
                true // add to the local storage

            )); // end forEach
        } // end if

        // When the button is clicked, add a new note
        Rx.Observable.fromEvent(add_note, 'click')
        .subscribe(() => this.addNewNote("", true, this.id++, 0)); 
    } // end constructor

    addNewNote(text, colour, addToLS, id, parentId) {
        const note = new Note(text, colour, id, parentId); // Create a new note
        note.div.classList.add("note");
        this.NoteList[id] = note; // Add the note to the list of notes

        note.div.innerHTML = `
            <div class="notes">
                <div class="colour_menu">
                    <input type="color" id="newColour">
                    <button class="changeColour"><i class="fas fa-trash-alt"></i></button>
                    <button class="edit"><i class="fas fa-edit"></i></button>
                    <button class="delete"><i class="fas fa-trash-alt"></i></button>
                    <button class="link"><i class="fas fa-edit"></i></button>
                </div>
                <div class="main hidden"></div>
                <textarea></textarea>
            </div>
        `;

        const edit_button = note.div.querySelector(".edit");
        const del_button = note.div.querySelector(".delete");
        const main = note.div.querySelector(".main");
        const textArea = note.div.querySelector("textarea");
        const link = note.div.querySelector(".link");
        const colourSelector = note.div.querySelector("#newColour");

        textArea.value = text;
        main.innerHTML = marked(text);

        Rx.Observable.fromEvent(edit_button, 'click').subscribe(() => {
            main.classList.toggle("hidden");
            textArea.classList.toggle("hidden");
        });

        // When the delete button is clicked, remove the note and update it to the local storage
        Rx.Observable.fromEvent(del_button, 'click').subscribe(() => {
            this.NoteList.forEach((n) => {
                if (note.id === n.parentId) {
                    n.div.remove();
                }
            });
            note.div.remove(); // Delete all the children note including the parent note
            this.uploadToLS(); // Update the local storage
        });

        Rx.Observable.fromEvent(link, 'click').subscribe(() => {
            const newNote = new Note(textArea.value, note.colour, this.id++, note.id);
            newNote.addChild();
            this.uploadToLS();
        });

        Rx.Observable.fromEvent(colourSelector, 'change').subscribe(() => {
            textArea.style.backgroundColor = colourSelector.value;
            main.style.backgroundColor = colourSelector.value;
            note.colour = colourSelector.value;
        });

        
        Rx.Observable.fromEvent(textArea, 'input')
            .map(() => textArea.value)
            .subscribe(() => {
                main.innerHTML = marked(textArea.value);
                this.uploadToLS();
        }); 

        document.body.appendChild(note.div);

        if (addToLS) {
            textArea.style.backgroundColor = colour;
            main.style.backgroundColor = colour;
            this.uploadToLS();
        } // end if
    } // end function addNewNote()

    // Function which saves the notes to the Local Storage
    uploadToLS() {
        const notesText = document.querySelectorAll("textarea");
        const note_arr = [];

        notesText.forEach((note) => {
            note_arr.push(note.value);
        });

        // Convert the JavaScript value "notes" to a JSON string and save it to the local storage
        localStorage.setItem("notes", JSON.stringify(note_arr));
        localStorage.setItem("id", JSON.stringify(this.id));
    } // end function uploadToLS()
} // end class NoteApp

class Note {
    constructor(text, colour, id, parentId) {
        this.text = text; // text of the note
        this.colour = colour; // colour of the note
        this.div = document.createElement("div"); // div element of the note
        this.id = id; // id of the note
        this.parentId = parentId; // id of the parent note
    } // end constructor

    addChild() {
        n.addNewNote(this.text, this.colour, true, this.id, this.parentId);
        this.div.backgroundColor
    }

    // Function which returns the text of the note
    getText() {
        return this.text;
    } // end function getText()

    // Function which returns the colour of the note
    getColour() {
        return this.colour;
    } // end function getColour()
} // end class Note

n = new NoteApp(); // Create a new note app
