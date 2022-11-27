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

    addNewNote(text, addToLS, id, parentId) {
        const note = new Note(text, "white", id, parentId); // Create a new note
        note.div.classList.add("note");
        this.NoteList[id] = note; // Add the note to the list of notes
        console.log(note.id);

        note.div.innerHTML = `
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
                <button class="link"><i class="f"></i></button>
            </div>
            <div class="main hidden"></div>
            <textarea></textarea>
        `;

        const edit_button = note.div.querySelector(".edit");
        const del_button = note.div.querySelector(".delete");
        const main = note.div.querySelector(".main");
        const textArea = note.div.querySelector("textarea");
        const link = note.div.querySelector(".link");

        textArea.value = text;
        main.innerHTML = marked(text);

        Rx.Observable.fromEvent(edit_button, 'click').subscribe(() => {
            main.classList.toggle("hidden");
            textArea.classList.toggle("hidden");
        });

        // When the delete button is clicked, remove the note and update it to the local storage
        Rx.Observable.fromEvent(del_button, 'click').subscribe(() => {
            //note.div.remove();
            this.NoteList.forEach((n) => {
                if (note.id === n.parentId) {
                    n.div.remove();
                }
            });
            this.uploadToLS(); // Update the local storage
        });

        Rx.Observable.fromEvent(link, 'click').subscribe(() => {
            const childId = this.id + 1;
            const newNote = new Note(textArea.value, "white", childId, this.id);
            newNote.addChild();
            this.uploadToLS();
        });

        Rx.Observable.fromEvent(textArea, 'input')
            .map(() => textArea.value)
            .subscribe(() => {
                main.innerHTML = marked(textArea.value);
                this.uploadToLS();
        }); 

        document.body.appendChild(note.div);

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
        //this.div.appendChild(child);
        n.addNewNote(this.text, true, this.id, this.parentId);
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
