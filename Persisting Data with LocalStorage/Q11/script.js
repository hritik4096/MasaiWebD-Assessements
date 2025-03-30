const noteArea = document.getElementById("noteArea");
const saveNoteButton = document.getElementById("saveNote");
const loadNoteButton = document.getElementById("loadNote");
const clearNoteButton = document.getElementById("clearNote");

// Load saved notes on page load
window.addEventListener("load", () => {
    const savedNote = localStorage.getItem("userNote");
    if (savedNote) {
        noteArea.value = savedNote;
    }
});

// Save note to localStorage
saveNoteButton.addEventListener("click", () => {
    const noteText = noteArea.value.trim();
    if (noteText) {
        localStorage.setItem("userNote", noteText);
        alert("Note saved!");
    } else {
        alert("Cannot save an empty note!");
    }
});

// Load note from localStorage
loadNoteButton.addEventListener("click", () => {
    const savedNote = localStorage.getItem("userNote");
    if (savedNote) {
        noteArea.value = savedNote;
    } else {
        alert("No saved notes found!");
    }
});

// Clear notes from localStorage
clearNoteButton.addEventListener("click", () => {
    localStorage.removeItem("userNote");
    noteArea.value = "";
    alert("Notes cleared!");
});
