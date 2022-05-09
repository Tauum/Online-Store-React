import React from 'react'
import "./Cart.css"
import Total from "./Total.js"
import Item from "./Item.js"
import { useStateValue } from '../StateProvider'

const Cart = () => {
  const [{cart}, dispatch] = useStateValue();

  return (
    <div className='cart'>    
        <div className='left'> 
          <div className='header'>
          </div>

            <div> <h2 className='title'>Your Cart</h2></div>

            <div className='items '>

              {cart.items.map((item, index) => (
                  <Item key={index} id={item.id} category={item.category}
                  name={item.name} description={item.description} 
                  image={item.image} price={item.price}
                  score={item.score} releaseDate={item.releaseDate} 
                  amount={item.amount} stockCount={item.stockCount} className="cartItem shadow"/>
                ))}

            </div>
        </div>
        <div className='right'>
            <h2>Total</h2>
            <Total/>
        </div>
    </div>
  )
}

export default Cart