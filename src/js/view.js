import Handlebars from 'handlebars';
import Event from './event-emmiter';

export default class View extends Event {
  constructor() {
    super();
    this.create = document.querySelector('.search-form-btn');
    this.cancel = document.querySelector('.cancel');
    this.modal = document.querySelector('.modal');
    this.form = document.querySelector('.sub-form');
    this.input = document.querySelectorAll('input');
    this.select = document.querySelector('.priority');
    this.content = document.querySelector('#app');

    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    this.source = document.querySelector('#js-card-template').innerHTML.trim();

    this.create.addEventListener('click', () => this.removeStyle());
    this.cancel.addEventListener('click', () => this.addStyle());
    this.form.addEventListener('submit', e => {
      this.getValueFromForm(e);
      this.addStyle();
    });

    window.addEventListener('DOMContentLoaded', () => this.loadNotes());
  }

  loadNotes() {
    this.emit('loaded', this.notes);
  }

  removeStyle() {
    if (this.modal) {
      this.modal.classList.remove('modal-hidden');
    }
  }

  addStyle() {
    if (this.cancel) {
      this.modal.classList.add('modal-hidden');
    }
  }

  getValueFromForm(e) {
    e.preventDefault();
    const objforSaving = {};
    this.input.forEach(el => {
      if (el.name !== '' && el.value !== '') {
        objforSaving[el.name] = el.value;
      }
      el.value = '';
    });
    objforSaving[this.select.name] = this.select.value;
    this.emit('add', objforSaving);
  }

  createNoteItems(notes) {
    const template = Handlebars.compile(this.source);
    const markup = template(notes);
    this.content.insertAdjacentHTML('afterbegin', markup);
    this.delBtn = document.querySelector('.delete');
    this.selected = document.querySelector('.selected');
    this.selected.addEventListener('change', event => this.handleRemove(event));
  }

  handleRemove(event) {
    if (this.selected.value === 'delete') {
      const item = event.target.closest('.notes');
      this.emit('delete', item.dataset.id);
    } else {
      return;
    }
  }

  deleteItemFromUI(id) {
    const itemCard = document.querySelector(`[data-id="${id}"]`);
    if (itemCard) {
      itemCard.remove();
    }
  }
}
