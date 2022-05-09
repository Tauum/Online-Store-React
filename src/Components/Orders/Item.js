import React from 'react'
import "./Item.css"
import { Button } from 'react-bootstrap'
import { useStateValue } from '../StateProvider'

function Item({id, image, name, price, score, releaseDate}) {

    const [{cart}, dispatch] = useStateValue();

    const removeItem = () => {
        dispatch({
            type: "REMOVE_FROM_CART",
            id: id,

        })

        
    }

  return (
    <div className='orderitem shadow'>
        <img src={image} className="image"/>

        <div className='information'>
            
            <p className='name'>{name}</p>
            <br/>
            <p className='date'> {releaseDate} </p>

                <div className='middle'>
                    <p className='price'><small>$</small><strong>{price}</strong></p>
               </div>
                

            <div className='score'>
                    {Array(score).fill().map((_,i) => (<p key={i}>⭐</p>))}
                </div>


        </div>
    </div>
  )
}

export default Item