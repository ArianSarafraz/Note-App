export default class NotesView {
    constructor(root, handlers) {
        this.root = root;
        const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteSelect = onNoteSelect;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `  <div class="notes__sidebar">
        <div class="notes__logo">NOTE APP</div>
        <div class="notes__list"></div>
        <button class="notes__add">ADD NOTE</button>
      </div>

      <div class="notes__preview">
        <input type="text" class="notes__title" placeholder="Note title...">
        <textarea name="" class="notes__body">Take some notes...</textarea>
      </div>`;

        const addNoteBtn = this.root.querySelector(".notes__add");
        const inputTitle = this.root.querySelector(".notes__title");
        const inputBody = this.root.querySelector(".notes__body");

        addNoteBtn.addEventListener("click", () => {
            this.onNoteAdd();
        });
        [inputTitle, inputBody].forEach((inputField) => {
            inputField.addEventListener("blur", () => {
                const newBody = inputBody.value.trim();
                const newTitle = inputTitle.value.trim();
                this.onNoteEdit(newBody, newTitle);
            });
        });
        // update notes preview visibility 
        this.updateNotesPreviewVisibility(false);
    }
    //-----------------------------------------------------
    _createListItemHTML(id, title, body, updated) {
        const max_body_length = 50;
        return `<div class="notes__list-item" data-note-id ="${id}">
        <div class="list__item-header">
        <span class="list__item-trash" data-note-id="${id}"><i class="far fa-trash-alt"></i></span>
        <div class="notes__small-title">${title}</div>
        </div>
        <div class="notes__small-body">
        ${body.substring(0, max_body_length)}
        ${body.length > max_body_length ? "..." : ""}
        </div>
        <div class="notes__small-updated">
            ${new Date(updated).toLocaleString("en", {
            dateStyle: "full",
            timeStyle: "short",
        })} 
        </div>
      </div>`;
    }

    updateNoteList(notes) {
        const notesContainer = this.root.querySelector(".notes__list");

        //empty noteList
        notesContainer.innerHTML = "";
        let notesList = "";
        for (const note of notes) {
            const { id, title, body, updated } = note;
            const html = this._createListItemHTML(id, title, body, updated);
            notesList += html;
            notesContainer.innerHTML = notesList;
            notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
                noteItem.addEventListener("click", () => {
                    this.onNoteSelect(noteItem.dataset.noteId);
                });
            });
        }
        notesContainer.querySelectorAll(".list__item-trash").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.onNoteDelete(btn.dataset.noteId);
            });
        });
    }
    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        // add selected class 
        this.root.querySelectorAll(".notes__list-item").forEach((item) => {
            item.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }


    updateNotesPreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}