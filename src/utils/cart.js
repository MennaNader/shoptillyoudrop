import consts from './consts'

export default class Cart {
  constructor (observer) {
    this.state = {
      items: []
    }
    this.observer = observer
  }
  addItem = item => {
    this.state.items = [...this.state.items.filter(i => i.id !== item.id), item]
    this.observer.publish(consts.cartChanged)
  }

  removeAll = () => {
    this.state.items = []
    this.observer.publish(consts.cartChanged)
  }

  getState = () => {
    return this.state
  }
}
