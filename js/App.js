import NotesApi from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());
        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NotesApi.getAllNotes();

        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotesPreviewVisibility(notes.length > 0);
        // this.activeNote = notes[0];
        // this.view.updateActiveNote(notes[0]);
        if (notes.length > 0) {
            this.activeNote = notes[0];
            this.view.updateActiveNote(notes[0]);
        }
    }

    _handlers() {
        return {
            onNoteAdd: () => {
                const newNote = {
                    title: "New Note",
                    body: "Take Some Note",
                    updated: new Date().toISOString()
                }
                NotesApi.saveNote(newNote);
                this._refreshNotes();
            },

            onNoteEdit: (newBody, newTitle) => {
                NotesApi.saveNote({
                    id: this.activeNote.id,
                    title: newTitle,
                    body: newBody,
                });
                this._refreshNotes();
            },
            onNoteSelect: (noteId) => {
                const selectedNote = this.notes.find((n) => n.id == noteId);
                this.activeNote = selectedNote;
                this.view.updateActiveNote(selectedNote);
            },
            onNoteDelete: (noteId) => {
                NotesApi.deleteNote(noteId);
                this._refreshNotes();
            }
        }
    }
} 