import React from 'react'
import "./Item.css"
import { Button, Modal } from 'react-bootstrap'
import { useStateValue } from '../../StateProvider';
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

function Item({id, name, description, category, image, price, score, releaseDate, stockCount}) {

  const navigate = useNavigate();

  const[{cart, user, ipaddress}, dispatch] = useStateValue();

  const [amount, setAmount] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  function openMenu() { setShow(!show); }

  const [editButton, setEditButton] = useState(false);

  const increaseAmount = () => {if(amount < stockCount) {setAmount(amount + 1)}};
  const decreaseAmount = () => {if(amount > 1) {setAmount(amount - 1)}};

  //sends item to data layer
  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item:{
        id:id,
        name: name,
        category: category,
        description: description,
        image: image,
        price: price,
        score: score,
        releaseDate: releaseDate,
        amount: amount,
        stockCount: stockCount
      }
    })

//       console.log(user)
//       const url = `${ipaddress}/User/update`;
//       fetch(url, {
//         method: "PUT",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           id: user.id,
//           email: user.email,
//           password: user.password,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           role: user.role, 
//           address: {
//             number: user.address.number,
//             postCode: user.address.postCode,
//             line1: user.address.line1,
//             line2: user.address.line2,
//             line3: user.address.line3,
//           },
//           cart: user.cart,
//  // orders : user.orders,

//         })
//       })
//         .then(res => res.json())
//         .then(response => {
//           if (response.message === "Fail - Username incorrect" ||
//             response.message === "Fail - Password incorrect") {   //(contains a user){
//             console.log("error")
//           }
//           else {
//             console.log("logged in")
//             dispatch({
//               type: "LOGIN_RECIEVED",
//               user: response
//             });
//           }
//         });
//     }
  }

  const editItem = () => {
    dispatch({
    type: "SET_ITEM",
      item:{
        id:id,
        name: name,
        category: category,
        description: description,
        price: price,
        score: score,
        releaseDate: releaseDate,
        amount: amount,
        stockCount: stockCount,
        
        image: image,
      }
    })
    navigate(`/ItemEntry`);

  }


  return (
    <div className='item shadow'>
      <div className='information'>
        
        <p className='name'>{name}
        </p> 
        
        <p className='price'>
          <small> $ </small>
          <strong>{price}</strong>
        </p>
        <div className='score'>
          {Array(score).fill().map((_,i) => (<p key={i}>⭐</p>))}
        </div>
      </div>
      
      {/* wrap this in a link to product page */}
      <img className='image' src={image? image : "/Default_Image.png"} onClick={openMenu}/>
      <div className='itembuttons'>
        <Button variant="outline-success" className='cartbutton shadow outline-success'
        onClick={addToCart}>Add to Cart
        </Button>

        {user?.role === "ADMIN" ? 
              <Button variant="outline-info" className='cartbutton shadow outline-success'
              onClick={editItem}>Edit
            </Button>  
            : <div></div>
        }
      </div>



      <Modal className="register-modal text-center" show={show} onHide={handleClose}>
        <div className="card-header"></div>
          <div className="card-body">

          <div className='itemModal'>
          <div className='mainContent'>
                <div className='left'>
            <h4>{name} </h4>
            {category?.name !== "undefined" ? <p>Category -<strong> {category.name}</strong></p> : ""}
            <strong>{releaseDate}</strong>
            <p className='price'>
              <small> $ </small>
              <strong>{price}</strong>
            </p>
              <div className='score'>
                {Array(score).fill().map((_,i) => (<p key={i}>⭐</p>))}
              </div>
                  <img className='image' src={image ? image : "/Default_Image.png"}/>
                </div>
                <div className='right'>
                  <div className='stock'>

                    <div className="stockInput">
                    <Button variant='outline-danger' onClick={decreaseAmount}>-</Button>
                      {amount}/{stockCount}
                      <Button variant='outline-success' onClick={increaseAmount}>+</Button>
                      <Button variant="outline-success" className='cartbutton shadow' onClick={addToCart}>Add to Cart </Button><br/>
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