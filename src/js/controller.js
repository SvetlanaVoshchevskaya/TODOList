export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    view.on('add', notes => this.createItem(notes));
    view.on('delete', id => this.deleteItem(id));
    view.on('loaded', () => this.loadFromStorage());
  }

  loadFromStorage() {
    if (this.notes) {
      this.notes.forEach(note => {
        this.view.createNoteItems(note);
      });
    }
  }

  createItem(notes) {
    this.model.addItem(notes);
    this.view.createNoteItems(notes);
  }

  deleteItem(id) {
    this.model.deleteItem(id);
    this.view.deleteItemFromUI(id);
  }
}
