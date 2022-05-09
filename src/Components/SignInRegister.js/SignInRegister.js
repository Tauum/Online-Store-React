import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import "./SignInRegister.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useStateValue } from '../StateProvider';

function SignInRegister() {

  const [{ user, ipaddress }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [status, setStatus] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  function openRegister() { setShow(true); }

  const submitRegistration = (e) => {
    e.preventDefault();
    if (registerEmail.length > 0 && registerEmail.toLowerCase() === confirmEmail.toLowerCase()) {
      if (registerPassword.length >= 6 && confirmPassword === registerPassword) {
        if (firstName.length !== 0 && lastName.length !== 0) {

          // encrypt password here

          dispatch({ type: "LOGIN_REQUEST" });
          fetch(`${ipaddress}/User/add`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: registerEmail.toLowerCase(),
              password: registerPassword,
              firstName: firstName,
              lastName: lastName
            })
          })
            .then(res => res.json())
            .then(response => {
              if (response.message === "Fail - Username incorrect" ||
                response.message === "Fail - Password incorrect") {   //(contains a user){
                console.log("error")
              }
              else {
                console.log("registered")
                setStatus("Completed registration")
              }
              dispatch({ type: "LOGIN_RECIEVED", user: {} });
            });
        }
        else { setStatus("Status: Retry names") }
      }
      else { setStatus("Status: Retry password") }
    }
    else { setStatus("Status: Retry Email") }
  }

  const submitLogin = e => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      fetch(`${ipaddress}/User/Login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password: password })
      })
        .then(res => res.json())
        .then(response => {
          if (response.message === "Fail - Username incorrect" ||
            response.message === "Fail - Password incorrect") {   //(contains a user){
            console.log("error")
          }
          else {
            console.log("logged in")
            dispatch({
              type: "LOGIN_RECIEVED",
              user: response
            });

            fetch(`${ipaddress}/Cart/user/${response.id}`)
            .then(res => res.json())
            .then(response => {
               
               dispatch({
                  type: "UPDATE_USER_CART", cart: response 
               })
   
            })


            navigate('/')
          }
        });

    }
  }


  return (
    <div className='stuff'>
      <div className='all shadow'>
        <Link to="/"><img src="/sprout-tree.svg" alt="tree house" className="treehouse shadow" /></Link>
        <div className='title'><h1>Login</h1></div><br />
        <input className='email shadow input login' type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
        <input className='password shadow input login' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <Button variant="outline-info" className='btn shadow' onClick={openRegister}>Register</Button>
        <Button variant="outline-success" className='btn shadow' type="submit" onClick={submitLogin}>Sign In</Button>
        <br /><br />
        <small className='note'>
          By Registering / Signing in,<br />you agree to Tree House Garden centre's<br />Terms of service.
        </small>
      </div>

      <Modal className="register-modal text-center" show={show} onHide={handleClose}>
        <div className="card-header"></div>
        <div className="card-body registerContent">
          <h2>Account Registration</h2>
          <br />
          <input className='email shadow input' type="text" placeholder='Email' value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
          <input className='email shadow input' type="text" placeholder='Confirm Email' value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} /> <br /><br />
          <input className='password shadow input' type="password" placeholder='Password' value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
          <input className='password shadow input' type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br /><br />
          <input className='fname shadow input' type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input className='lname shadow input' type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />  <br /><br />
          <input className='status shadow input' type="disabled" disabled="disabled" placeholder='Status' value={status} /> <br /><br />
          <Button variant="outline-danger" onClick={handleClose}>Close</Button>
          <Button variant="outline-success" onClick={submitRegistration} type="submit" >Submit</Button>
        </div>
      </Modal>

    </div>
  )
}

export default SignInRegister