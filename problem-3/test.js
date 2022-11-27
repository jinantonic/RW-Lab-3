class NoteApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem("notes"));

        if (this.notes) {
            this.notes.forEach((note) => this.addNewNote(
                note, // text
                true // add to the local storage
            )); // end forEach
        } // end if

        // When the button is clicked, add a new note
        Rx.Observable.fromEvent(add_note, 'click')
        .subscribe(() => this.addNewNote("", true));
    } // end constructor

    addNewNote(text, addToLS) {
        const note = document.createElement("div");
        note.classList.add("note");

        note.innerHTML = `
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
                <button class="link"><i class="f"></i></button>
            </div>
            <div class="main hidden"></div>
            <textarea></textarea>
        `;

        const edit_button = note.querySelector(".edit");
        const del_button = note.querySelector(".delete");
        const main = note.querySelector(".main");
        const textArea = note.querySelector("textarea");
        const link = note.querySelector(".link");

        textArea.value = text;
        main.innerHTML = marked(text);

        Rx.Observable.fromEvent(edit_button, 'click').subscribe(() => {
            main.classList.toggle("hidden");
            textArea.classList.toggle("hidden");
        });

        // When the delete button is clicked, remove the note and update it to the local storage
        Rx.Observable.fromEvent(del_button, 'click').subscribe(() => {
            while (note.firstChild) {
                note.remove();
            }
            this.uploadToLS();
        });

        Rx.Observable.fromEvent(link, 'click').subscribe(() => {
            //note.addNewNote(textArea.value, true);
            this.uploadToLS();
        });

        Rx.Observable.fromEvent(textArea, 'input')
            .map(() => textArea.value)
            .subscribe(() => {
                main.innerHTML = marked(textArea.value);
                this.uploadToLS();
        }); 

        document.body.appendChild(note);

        if (addToLS) {
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
    } // end function uploadToLS()
} // end class NoteApp

class Note {
    constructor(text, colour) {
        this.text = text; // text of the note
        this.colour = colour; // colour of the note
    } // end constructor

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
