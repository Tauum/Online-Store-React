import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import "./CategoryEntry.css"
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from '../StateProvider';

function CategoryEntry() {

    const [{ ipaddress, category }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const [id, setID] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
      if (category.id != null) {
        setID(category.id)
        setName(category.name)
      }
    }, [])

    console.log(category)

    const handleDelete = (e) => {
      if (category.id != null) {
        fetch(`${ipaddress}/Category/delete/${id}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(response => {
            console.log(response)
          })
        navigate("/Admin")
  
      }
    }

    const handleSubmit = (e) => {
        // this means the category exists so update
        if (category.id != null) {

          fetch(`${ipaddress}/Category/update/`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: id,
              name: name
            })
          })
            .then(res => res.json())
            .then(response => {
              console.log(response)
            })
            navigate("/Admin")
        }
        // this means the category doesnt exist so insert 
        else{

            fetch(`${ipaddress}/Category/add`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: name
                })
              })
                .then(res => res.json())
                .then(response => {
                  console.log(response)
                })
                navigate("/Admin")
        }
    
}

  return (
    <div className="CategoryEntry">
    <div className="box">
      <div className="child shadow">
        <strong>Name</strong><br />
        <input className='input shadow' type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} /> <br />
        <Button variant="outline-danger" onClick={handleDelete}>Delete Category</Button>
        <Button variant="outline-success" onClick={handleSubmit}>Save Category</Button>
      </div>
    </div>
  </div>
  )
}

export default CategoryEntry