export default class EventEmmiter {
    constructor() {
      this.event = {};
    }
  
    on(type, callback) {
      this.event[type] = this.event[type] || [];
      this.event[type].push(callback);
    }
    emit(type, ...args) {
      if (this.event[type]) {
        this.event[type].forEach(callback => callback(...args));
      }
    }
  }
  