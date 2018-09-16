import React, { Component } from 'react'
import axios from 'axios'

import logo from '../../assets/logo.svg'
import Card from '../Card'

import Cart from '../../utils/cart'
import Observer from '../../utils/observer'
import consts from '../../utils/consts'

import './styles.css'

let observer = new Observer()
let cart = new Cart(observer)

class App extends Component {
  state = {
    items: [],
    cart: cart.getState().items,
    showCart: false
  }

  componentDidMount () {
    axios
      .get('https://faker-api-yczfsfkfcd.now.sh/api/products')
      .then(response => {
        this.setState({ items: response.data.data })
      })
    observer.subscribe(consts.cartChanged, () => {
      this.setState({ cart: cart.getState().items })
    })
  }

  showCart = () => {
    this.setState({ showCart: !this.state.showCart })
  }

  addToCart = item => {
    cart.addItem(item)
  }

  clear = () => {
    cart.removeAll()
    this.showCart()
  }
  render () {
    let { cart, items, showCart } = this.state
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Shop</h1>
          <img
            src={logo}
            className='App-logo'
            alt='logo'
            onClick={this.showCart}
          />
        </header>
        <section className='App-body'>
          <div className='App-list'>
            {items.map(item => (
              <Card item={item} key={item.id} action={this.addToCart} />
            ))}
          </div>
          {showCart && cart
            ? <div className='cart'>
              <button onClick={this.clear}>Clear</button>
              {cart.map(item => <h2>{item.title}</h2>)}
            </div>
            : null}
        </section>
      </div>
    )
  }
}

export default App
