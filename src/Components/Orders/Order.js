import React from 'react'
import "./Order.css"
import Item from './Item'
import { Link, useNavigate } from 'react-router-dom'
import PDFFile from './PDFFile'

function Order({order}) {
  return (
    <div className="order">
        <h2>Order </h2>

        <div className="transactionInfo">
            <div className="child shadow">
              <h4>Tracking</h4>
              <div className='id'><strong>ID: {order.id? order.id : "no id" }</strong></div><br/>
              <div className='date'><strong>Date: {order.generatedDate? order.generatedDate : "no date"}</strong></div>

              <div className='download'><PDFFile order={order}/></div>


            </div>
            <div className="child shadow">
              <h4>Costings</h4>
              <div><strong>Items: {order.totalItemPice? "$" + order.totalItemPice : "no data" }</strong></div>
              <small>({order.items ? order.items.length : "no data" } items)</small><br />
              <div><strong>Discount: {order.discount? "- $" + order.discount : "no data" }</strong></div>
              <small>(10% off over $50)</small>
              <div><strong>Shipping: {order.shipping? "$" + order.shipping : "no data" }</strong></div>
              <small>($5 per item)</small><br />
            </div>

            <div className="child shadow">
                <h4>Address</h4>
                <small>Postcode: <strong>{order.address.postCode? order.address.postCode : "N/A"}</strong></small><br/>
                <small>Number: <strong>{order.address.number? order.address.number : "N/A"}</strong></small><br/>
                <small>Line 1: <strong>{order.address.line1? order.address.line1 : "N/A"}</strong></small><br/>
                <small>Line 2: <strong>{order.address.line2? order.address.line2 : "N/A"}</strong></small><br/>
                <small>Line 3: <strong>{order.address.line3? order.address.line3 : "N/A"}</strong></small>
            </div>
        </div>
        <div className="address">
       
        </div>

        {order.items?.map((item, index) => (
            <Item className="orderItem shadow" key={index} id={item.id} name={item.name} image={item.image} price={item.price} score={item.score} releaseDate={item.releaseDate}/>
        ))}
           
       
    </div>
  )
}

export default Order