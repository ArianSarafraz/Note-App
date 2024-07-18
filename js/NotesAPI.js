const notes = [
    {
        id: 1,
        title: "first note",
        body: "some dummy text first",
        updated: '2023-09-13T08:02:30.382Z'

    },
    {
        id: 2,
        title: "second note",
        body: "some dummy text second",
        updated: '2023-09-13T08:06:30.382Z'

    },
    {
        id: 3,
        title: "third note",
        body: "some dummy text third",
        updated: '2023-09-13T08:15:40.077Z'
    }
];


export default class NotesApi {
    static getAllNotes() {
        const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
        return savedNotes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(noteToSave) {
        const notes = NotesApi.getAllNotes();
        const existedNote = notes.find((n) => n.id == noteToSave.id);
        if (existedNote) {
            existedNote.title = noteToSave.title;
            existedNote.body = noteToSave.body;
            existedNote.updated = new Date().toISOString();
        } else {
            noteToSave.id = new Date().getTime();
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }
        localStorage.setItem("notes-app", JSON.stringify(notes));
    }

    static deleteNote(id) {
        const notes = NotesApi.getAllNotes();
        const filteredNotes = notes.filter((n) => n.id != id);
        localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
    }
}