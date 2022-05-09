import React, { useEffect } from 'react'
import "./Item.css"
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react';
import { useStateValue } from '../StateProvider'

function Item({id, name, description, image,price, score, releaseDate, amount, stockCount}) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  function openMenu() { setShow(!show); }

    const [displayAmount, setDisplayAmount] = useState();

    const [{cart}, dispatch] = useStateValue();
    const removeItem = () => {
        dispatch({
            type: "REMOVE_FROM_CART",
            id: id,
        })
    }
    
    const increaseItemInCart = () => {
      if (amount < stockCount ){
        dispatch({
          type: "INCREASE_IN_CART",
          item:{
            id:id,
            name: name,
            description: description,
            image: image,
            price: price,
            score: score,
            releaseDate: releaseDate,
            amount: amount,
            stockCount: stockCount
          }
        })
      }
    }
    const reduceItemInCart = () => {
      if (amount > 1 ){
        dispatch({
          type: "REDUCE_IN_CART",
          item:{
            id:id,
            name: name,
            description: description,
            image: image,
            price: price,
            score: score,
            releaseDate: releaseDate,
            amount: amount,
            stockCount: stockCount
          }
        })
      }
    }


  return (
    <div className='cartitem shadow'>
        <img className='image' src={image? image : "/Default_Image.png"} onClick={openMenu}/>
        <div className='information'>
            <p className='name'>{name}</p><br/>
            <p className='date'> {releaseDate} </p>
                <div className='middle'>
                    <p className='price'><small>$</small><strong>{price}</strong></p>
                    <div className='stock'>
                    <div className="stockInput">
                      <Button variant='outline-danger' onClick={reduceItemInCart}>-</Button>
                      {amount}/{stockCount}
                      <Button variant='outline-success' onClick={increaseItemInCart}>+</Button>
                    </div>
                  </div>
                    <Button variant='outline-danger' className='shadow remove' onClick={removeItem}>
                        Remove
                    </Button>
               </div>
            <div className='score'>
                    {Array(score).fill().map((_,i) => (<p key={i}>⭐</p>))}
                </div>


        </div>






        <Modal className="register-modal text-center" show={show} onHide={handleClose}>
        <div className="card-header"></div>
          <div className="card-body">

          <div className='itemModal'>
          <div className='mainContent'>
                <div className='left'>
            <h4>{name}</h4>
            
            <p className='price'>
              <small> $ </small>
              <strong>{price}</strong>
            </p>
              <div className='score'>
                {Array(score).fill().map((_,i) => (<p key={i}>⭐</p>))}
              </div>
                  <img className='image' src={image? image : "/Default_Image.png"}/>
                </div>
                <div className='right'>
                  <div className='stock'>

                    {/* //  max={10} // link this max to the current stock level  */}
                    <div className="stockInput">
                    <Button variant='outline-danger' onClick={reduceItemInCart}>-</Button>
                      {amount}/{stockCount}
                      <Button variant='outline-success' onClick={increaseItemInCart}>+</Button>
                      <Button className='shadow 'variant="outline-danger" onClick={openMenu}>Close Menu</Button>
                    </div>
                  </div>
                  <br/>
                  
                  {description} <br/>
                </div>
              </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Item