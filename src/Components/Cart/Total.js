import React from 'react'
import "./Total.css"
import { Button } from 'react-bootstrap'
import { useStateValue } from '../StateProvider'
import { useNavigate } from 'react-router-dom'
import { getCartTotal } from '../Reducer'

function Total() {

  const navigate = useNavigate();
  const [{cart}, dispatch] = useStateValue();

  return (
    <div className='total shadow'>
        <>
          <p>
            ({cart?.length} items) : 
            <strong>${cart? getCartTotal(cart) : "0" }</strong>
            {/* <strong>${cart?.reduce((acc, cur) => acc+cur.price,0).toFixed(2)}</strong> */}
          </p>
          <small className='desc'>
            This is your current cart total. Click proceed to checkout to finish this order
          </small>
        </>

    <Button variant="outline-success" className='shadow btnCheckout' onClick={ e => navigate('/GenerateOrder') }>Proceed to Complete</Button>
    </div>
 )
}

export default Total