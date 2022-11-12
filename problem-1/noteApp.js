// Get the element with the specified id, "add_note"
const add_button = document.getElementById("add_note");

// Retrieve the data in the local storage, retrieving "notes" object here
// It finds the data somewhere and creates the JSON value to put into const variable
const notePads = JSON.parse(localStorage.getItem("notes")); 
const textIdentifier = "textId"; // The normal note 
const savedIdentifier = "savedId"; // For when the note is saved
var num = 0;

// Checks to see if this variable actually contains data
// If it does then it goes through a for loop where it will for every note and add it to whatever it's being added to
if (notePads) {
    notePads.forEach((note) => {
        addNote(note);
    }); 
} // end if

// When the add button is clicked then call the function addNote()
add_button.addEventListener("click", () => {
    addNote();
});

// Function which adds notes
function addNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");
    num++;
    let textId = textIdentifier.concat("", num);
    let savedId = savedIdentifier.concat("", num);

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

    textArea.value = text;
    main.innerHTML = marked(text);

    edit_button.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    // When the delete button is clicked then remove the note and update to local storage
    del_button.addEventListener("click", () => {
        note.remove();
        uploadToLS();
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        uploadToLS();
    });

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

    console.log("First line" + b.getItem);
    b.style.backgroundColor = colour;
    c.style.backgroundColor = colour;
} // end function changeColour()
