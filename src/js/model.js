import v4 from 'uuid/v4';

export default class Model {
  constructor(items) {
    this.items = items;
    this.itemsfromStorage = JSON.parse(localStorage.getItem('notes')) || [];
  }

  addItem({ title, description, priority }) {
    const notes = {
      id: v4(),
      title,
      description,
      priority,
      active: true
    };
    this.itemsfromStorage.push(notes);
    localStorage.setItem('notes', JSON.stringify(this.itemsfromStorage));
  }

  deleteItem(id) {
    this.itemsfromStorage = this.itemsfromStorage.filter(
      item => item.id !== id
    );
    localStorage.setItem('notes', JSON.stringify(this.itemsfromStorage));
  }
}
