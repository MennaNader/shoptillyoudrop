import consts from './consts'

export default class Cart {
  constructor (observer) {
    this.state = {
      items: [],
      total: 0.0
    }
    this.observer = observer
    this.observer.subscribe(consts.addItem, this.increment)
    this.observer.subscribe(consts.reduceItem, this.decrement)
  }

  addItem = item => {
    this.state.items = [
      ...this.state.items.filter(i => i.id !== item.id),
      { ...item, num: 1 }
    ]
    this.state.total = this.state.total + parseFloat(item.price)
    this.observer.publish(consts.cartChanged)
  }

  removeAll = () => {
    this.state.items = []
    this.state.total = 0.0

    this.observer.publish(consts.cartChanged)
  }

  getState = () => {
    return this.state
  }

  increment = item => {
    this.state.items = [
      ...this.state.items.filter(i => i.id !== item.id),
      { ...item, num: item.num + 1 }
    ]
    this.state.total = this.state.total + parseFloat(item.price)
    this.observer.publish(consts.cartChanged)
  }
  decrement = item => {
    item.num <= 1
      ? (this.state.items = [...this.state.items.filter(i => i.id !== item.id)])
      : (this.state.items = [
        ...this.state.items.filter(i => i.id !== item.id),
          { ...item, num: item.num - 1 }
      ])
    this.state.total = this.state.total - parseFloat(item.price)
    this.observer.publish(consts.cartChanged)
  }
}
