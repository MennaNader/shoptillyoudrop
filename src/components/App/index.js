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
    cart: cart.getState(),
    showCart: false
  }

  componentDidMount () {
    axios
      .get('https://faker-api-yczfsfkfcd.now.sh/api/products')
      .then(response => {
        this.setState({ items: response.data.data })
      })
    observer.subscribe(consts.cartChanged, () => {
      this.setState({ cart: cart.getState() })
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
  updateItem = (action, item) => {
    observer.publish(action, item)
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
          {showCart
            ? <div className='cart'>
              {cart.items.length > 0 &&
              <button onClick={this.clear}>Clear</button>}
              {cart.items &&
                  cart.items.map(item => (
                    <div className='cart-item' key={`${item.id}cart`}>
                      <h2>{item.title}</h2>
                      <p>{item.num} items</p>
                      <p>{item.num * item.price} EGP</p>

                      <button
                        onClick={() => {
                          this.updateItem(consts.addItem, item)
                        }}
                      >
                        +
                      </button><button
                        onClick={() => {
                          this.updateItem(consts.reduceItem, item)
                        }}
                      >
                        -
                      </button>
                    </div>
                  ))}
              {cart.items.length === 0 && <p>Add things to cart </p>}
              {cart.items.length > 0 &&
              <button
                onClick={() => {
                  alert('Paid')
                  this.clear()
                }}
                  >
                    Pay {cart.total} EGP
                  </button>}
            </div>
            : null}
        </section>
      </div>
    )
  }
}

export default App
