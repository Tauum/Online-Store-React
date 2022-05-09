import { Button, Modal } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import "./GenerateOrder.css"
import { useStateValue } from '../StateProvider';
import Item from '../Cart/Item';
import { useElements, CardElement, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js"
import { Link, useNavigate } from 'react-router-dom'
import { getCartTotal, getShippingTotal, getCartDiscount, getAbsoluteTotal } from '../Reducer';

function GenerateOrder() {

  const navigate = useNavigate();

  const [{ user, cart, ipaddress }, dispatch] = useStateValue();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const stripe = useStripe()
  const promise = loadStripe("pk_test_51KmjTwJRlIFHrl82Wz5jANACykrOOaZtv1gztsmRx0gcWEwrUf7mwvsEXwyJBOQPJbW6hRAKBVNWVXujxCQd0KSy00orRzUsOH")
  const elements = useElements()
  const [clientSecret, setClientSecret] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(null)

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [postCode, setPostCode] = useState("");
  const [status, setStatus] = useState("");

  let currentDate = new Date();
  let todayDate = currentDate.getDate();
  if (todayDate < 10){
    todayDate = "0" + todayDate;
  }
  let todayMonth = currentDate.getMonth() + 1;
  if (todayMonth < 10){
    todayMonth = "0" + todayMonth;
  }
  let todayYear = currentDate.getUTCFullYear();
  let minDate = todayYear + "-" + todayMonth + "-" + todayDate;

  useEffect(() => {
    if (user !== null) {
      setFirstName(user.firstName ? user.firstName : null)
      setLastName(user.lastName ? user.lastName : null)
      setNumber(user.address ? user.address.number : null)
      setLine1(user.address ? user.address.line1 : null)
      setLine2(user.address ? user.address.line2 : null)
      setLine3(user.address ? user.address.line3 : null)
      setPostCode(user.address ? user.address.postCode : null)
    }
  }, [])

  const saveDetails = e => {
    e.preventDefault()
    if (firstName === null || firstName.length === 0) { setStatus("Status: First Name Invalid") }
    else if (lastName === null || lastName.length === 0) { setStatus("Status: Last Name Invalid") }
    else if (line2 === null || line2.length === 0) { setStatus("Status: Line 2 Invalid") }
    else if (line3 === null || line3.length === 0) { setStatus("Status: Line 3 Invalid") }
    else if (postCode === null || postCode.length !== 6) { setStatus("Status: Post Code Invalid") }
    else {
      setStatus("Status: Confirmed")
      setShow(false)
    }
  }

  const handleChange = e => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    console.log(user)

    let checkedItems = false;
    let notEnoughStock = false;
    if (cart.items.length === 0) { alert("No Items in Cart") }
    else {
      if (!checkedItems) {
        cart.items.forEach(item => {
          if (item.amount > item.stockCount || !item.amount >= 1) {
            notEnoughStock = true;
            setProcessing(false);
            alert(`Unable to complete transaction: \n ${item.name} currently has > ${item.stockCount} and you wish to purchase > ${item.amount}. \n Please remove this item and re-attempt completing the purchase`)
            
          }
        });
      }
      if (!notEnoughStock) {
        if (firstName === null || firstName.length === 0) { 
          setProcessing(false); 
          alert("First Name Invalid"); 
        }
        else if (lastName === null || lastName.length === 0) {
          setProcessing(false); 
          alert("Last Name Invalid") 
          }
        else if (line2 === null || line2.length === 0) {
          setProcessing(false); 
          alert("Line 2 Invalid") 
          }
        else if (line3 === null || line3.length === 0) { 
          setProcessing(false); 
          alert("Line 3 Invalid") 
        }
        else if (postCode === null || postCode.length !== 6) { 
          setProcessing(false); 
          alert("Post Code Invalid") 
        }
        else {
          // stripe payment service gets inserted here because its too much fucking effort to get working properly
          dispatch({ type: "GENERATING_ORDER" });

          var dateString = new Date().toISOString().substring(0,10);

          fetch(`${ipaddress}/Order/add`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              concurrantTotal: getAbsoluteTotal(cart),
              totalItemPice: getCartTotal(cart),
              shipping: getShippingTotal(cart),
              discount: getCartDiscount(cart),
              firstName: firstName,
              lastName: lastName,
              address: {
                number: number,
                line1: line1,
                line2: line2,
                line3: line3,
                postCode: postCode,
              },
              items: cart.items,
              userID: user?.id,
              generatedDate: dateString
            })
          })
            .then(res => res.json())
            .then(response => {
              console.log(response)

              dispatch({
                type: "CREATE_ORDER", order: {
                  id: response.id,
                  concurrantTotal: response.concurrantTotal,
                  totalItemPice: response.totalItemPice,
                  shipping: response.shipping,
                  discount: response.discount,
                  address: {
                    number: response.address.number,
                    line1: response.address.line1,
                    line2: response.address.line2,
                    line3: response.address.line3,
                    postCode: response.address.postCode,
                  },
                  firstName: response.firstName,
                  lastName: response.lastName,
                  items: response.items,
                  userid: user?.id,
                  generatedDate: response.generatedDate 
                }
              })

              dispatch({ type: "EMPTY_CART" })

              console.log("end cart>",cart)

              // empty cart in backend here
            });

          setCompleted(true)
          setError(null)
          setProcessing(false)
          navigate("/Orders")
        }
      }
    }
  }

  return (
    <div className='generateOrder'>
      <h1>Complete your order</h1>
      <div className="main ">
        <div className='left'>
          <h2>Postage</h2>
          <div className='address shadow'>
            <p>First Name : {firstName ? <>{firstName}</> : <>n/a - required</>}</p>
            <p>Last Name : {lastName ? <>{lastName}</> : <>n/a - required</>}</p>
            <br />
            <p>Post Code : {postCode ? <>{postCode}</> : <>n/a - required</>}</p>
            <p>Number : {number ? <>{number}</> : <>n/a - unrequired</>}</p>
            <p>Line 1 : {line1 ? <>{line1}</> : <>n/a - unrequired</>}</p>
            <p>Line 2 : {line2 ? <>{line2}</> : <>n/a - required</>}</p>
            <p>Line 2 : {line3 ? <>{line3}</> : <>n/a - required</>}</p>

            <Button className="shadow" variant="outline-info" onClick={e => { setStatus("status"); setShow(true) }}>Edit</Button>
          </div>
        </div>

        <div className='right'>
          <h2>Payment Method</h2>
          <div className='payment shadow'>
            <form>
              <CardElement onChange={handleChange} />
              <div className='price'><strong>Total: ${cart ? getAbsoluteTotal(cart) : "0"}</strong></div>

            </form>
            <Button className='shadow' variant="outline-success" onClick={handleSubmit} disabled={processing || disabled || completed}>
              {processing === true ? "processing" : "Complete purchase"}
            </Button>
            {error && <>{error}</>}
          </div>

          <div className='other'>
            <div className="itemCost shadow">
              <h4>Items</h4>
              <div className='price'><strong>Total: ${cart.items ? getCartTotal(cart) : "0"}</strong></div>
              <small>({cart?.items?.length} items)</small><br /><br />
            </div>
            <div className="discountCost shadow">
              <h4>Discount</h4>
              <div className='price'><strong>Total: ${cart.items ? getCartDiscount(cart) : "0"}</strong></div>
              <small>(10% off orders over $50)</small><br /><br />
            </div>
            <div className="shippingCost shadow">
              <h4>Shipping</h4>
              <div className='price'><strong>Total: ${cart.items ? getShippingTotal(cart) : "0"}</strong></div>
              <small>($5 per item)</small><br /><br />
            </div>
          </div>
        </div>
      </div>

      <div className='items'>
        <h2>Cart (<Link to="/Cart">{cart.items.length} items</Link>)</h2>
        {cart.items.map((item, index) => (
          // <Item key={index} id={item.id} name={item.name}  image={item.image} price={item.price} score={item.score} releaseDate={item.releaseDate} className="shadow" />
          <Item className="cartItem shadow" key={index} id={item.id}
            name={item.name} description={item.description}
            image={item.image} price={item.price} category={item.category}
            score={item.score} releaseDate={item.releaseDate}
            amount={item.amount} stockCount={item.stockCount} />

        ))}
      </div>

      <Modal className="register-modal text-center" show={show} onHide={handleClose}>
        <div className="card-header"></div>
        <div className="card-body registerContent">
          <h2>Postage details</h2>
          <br />
          <div className='names'>
            <input className='name shadow input' type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input className='name shadow input' type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} /> <br /><br />
          </div>
        
          <input className='address shadow input' type="text" placeholder='Post Code' value={postCode} onChange={(e) => setPostCode(e.target.value)} /><br /><br />
          <input className='address shadow input' type="text" placeholder='Address Number' value={number} onChange={(e) => setNumber(e.target.value)} /><br /><br />
          <input className='address shadow input' type="text" placeholder='Line 1' value={line1} onChange={(e) => setLine1(e.target.value)} /><br /><br />
          <input className='address shadow input' type="text" placeholder='Line 2' value={line2} onChange={(e) => setLine2(e.target.value)} /><br /><br />
          <input className='address shadow input' type="text" placeholder='Line 3' value={line3} onChange={(e) => setLine3(e.target.value)} /> <br /> <br />
          <input className='status shadow input' type="disabled" disabled="disabled" placeholder='Status' value={status} /> <br />
          <Button variant="outline-success" onClick={saveDetails} type="submimt">Save</Button>
        </div>
      </Modal>

    </div>
  )
}

export default GenerateOrder