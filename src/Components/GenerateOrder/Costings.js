import React from 'react'
import { getCartTotal, getShippingTotal, getCartDiscount, getAbsoluteTotal } from '../Reducer';

function Costings() {
  return (
    <div>
        <div className='other'>
            <div className="itemCost shadow">
              <h4>Items</h4>
              <div className='price'><strong>Total: ${cart ? getCartTotal(cart) : "0"}</strong></div>
              <small>({cart?.length} items)</small><br /><br />
            </div>
            <div className="discountCost shadow">
              <h4>Discount</h4>
              <div className='price'><strong>Total: ${cart ? getCartDiscount(cart) : "0"}</strong></div>
              <small>(10% off orders over $50)</small><br /><br />
            </div>
            <div className="shippingCost shadow">
              <h4>Shipping</h4>
              <div className='price'><strong>Total: ${cart ? getShippingTotal(cart) : "0"}</strong></div>
              <small>($5 per item)</small><br /><br />
            </div>
          </div>
    </div>
  )
}

export default Costings