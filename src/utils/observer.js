export default class Observer {
  constructor () {
    this.events = {}
  }
  subscribe = function (action, cb) {
    let index = 0
    if (this.events[action]) {
      this.events[action].push(cb)
      index = this.events[action].length
    } else {
      this.events = { ...this.events, [action]: [cb] }
    }
    return () => {
      this.events[action].splice(index, 1)
    }
  }

  publish = function (action) {
    if (this.events[action]) {
      this.events[action].forEach(fn => fn())
    } else {
      return new Error('This Event is not recognized')
    }
  }
}
