import React from 'react'

import './styles.css'

const Card = ({ item, action }) => (
  <div className='card' style={{ background: `url(${item.image})` }}>
    <section>
      <div className='card-price'>{item.price} {' '}EGP</div>
    </section>
    <footer>
      {item.title} <button onClick={() => action(item)}>ADD + </button>
    </footer>
  </div>
)

export default Card
