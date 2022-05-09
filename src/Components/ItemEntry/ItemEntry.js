import React, { useEffect, useState } from 'react'
import "./ItemEntry.css"
import { Link, useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import { useStateValue } from '../StateProvider';

function ItemEntry() {

  const [{ ipaddress, item }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const fileInput = React.useRef();

  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState({id: null, name: ""});
  const [amount, setAmount] = useState(0);
  const [stockCount, setStockCount] = useState(0);
  const [score, setScore] = useState(0);

  const [loadCategories, setLoadCategories] = useState(false);
  const [categories, setCategories] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleCategory = (e) => {
    setCategory(e)
    handleClose();
  }

  useEffect(() => {
    if (item.id != null) {
      setID(item.id)
      setName(item.name)
      setDescription(item.description)
      setPrice(item.price)
      setReleaseDate(item.releaseDate)
      setImage(item.image)
      setCategory(item.category)
      setScore(item.score)
      // setImage(item.image ? item.image : null)
      // setCategory(item.category ? item.category : null)
    }
  }, [])

  // test this button
  const handleDelete = (e) => {
    if (item.id != null) {
      fetch(`${ipaddress}/Item/delete/${id}`, {
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
    if (name === "" || releaseDate === "" || description === ""){
      alert("Minimum fields are not met, request denied"); 
    }
    else{
      // this means the item exists so update
      if (item.id != null) {
        console.log("update")
        console.log("id")
        fetch(`${ipaddress}/Item/update`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: id,
            name: name,
            description: description,
            price: price,
            releaseDate: releaseDate,
            amount: amount,
            stockCount: stockCount,
            category: category,
            score: score
            // image: image // this throws an error because it cant be empty
          })
        })
          .then(res => res.json())
          .then(response => {
            console.log(response)
          })
        navigate("/Admin")
    }
    else{
      console.log("post")
      // this means the item doesnt exist so insert
      fetch(`${ipaddress}/Item/add`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
          releaseDate: releaseDate,
          amount: amount,
          stockCount: stockCount,
          category: category,
          score: score
          //, image: image // this throws an error because it cant be empty
        })
      })
        .then(res => res.json())
        .then(response => {
          console.log(response)
          //https://stackoverflow.com/questions/9081079/rest-http-post-multipart-with-json
          // fetch(`${ipaddress}/Item/addImage/${response.id}`, {
          //   method: "PUT",
          //   headers: { "Content-Type": "multipart/form-data" },
          //   body: JSON.stringify({
          //      image: image // this throws an error because it cant be empty
          //   })
          // })
          //   .then(res => res.json())
          //   .then(response => {
          //     console.log(response)
          //   })
          
        })
      navigate("/Admin")
      console.log(item)
    }
  }
}
  
  function openMenu() {
    setLoadCategories(true);
    setShow(!show);
  }

  useEffect(() => {
    if (loadCategories) {
      fetch(`${ipaddress}/Category/`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(response => {
          console.log(response)
          setCategories(response)
        });
    }
  }, [loadCategories])

  const handleImage = (e) => {

    var data = new FormData()
    console.log("file>",e.target.files[0]);
    data.append('file', e.target.files[0])
    console.log("data>",data)
    setImage(data)
    
    //https://www.geeksforgeeks.org/how-to-upload-image-and-preview-it-using-reactjs/
    // console.log(e.target.value);
    // console.log(e.target.files[0]);
    // setImage(URL.createObjectURL(e.target.files[0])); // this dispalys the image
    
    // setImage(e.target.files[0]) // this doesnt display the image
  }

  return (
    <div className="ItemEntry">
      <div className="box">
        <div className="child shadow">
          <strong>Name</strong><br />
          <input className='input shadow' type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} /> <br />
          <strong>Release Date</strong><br />
          <input className='input shadow' type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} /> <br />

          <div className="tripleInput">
            <div className="left">
              <strong>Price</strong><br />
              <input className='input shadow tripleInputChild' type="text" placeholder='price' min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="center">
            <strong>Score</strong><br />
              <input className='input shadow tripleInputChild' type="text" placeholder='score' value={score} min={0} onChange={(e) => setScore(e.target.value)} />
            </div>
            <div className="right">
              <strong>Stock</strong><br />
              <input className='input shadow tripleInputChild' type="number" placeholder='stock' min={0} value={stockCount} onChange={(e) => setStockCount(e.target.value)} /> 
            </div>
          </div>
          
          <strong>Description</strong><br />
          <textarea className='input shadow' placeholder="description" onChange={(e) => setDescription(e.target.value)} cols="40" rows="4" value={description} /> <br />
          <div className="dualInput">
            <div className="left">
              <strong>Category</strong><br/>
              <input className='input shadow dualInputChild' type="text" placeholder='undefined' value={category.name} disabled={true} /> <br/>
              <Button variant="outline-info" onClick={openMenu}>Set Category</Button>
            </div>
            <div className="right">
              <strong>Image</strong><br/>
              <input className='input shadow dualInputChild' type="text" placeholder='undefined' disabled={true}/>  <br/>
              <Button variant="outline-info" onClick={()=>fileInput.current.click()} onChange={handleImage}>Set Image</Button> 

              <input  ref={fileInput} type="file"  style={{ display: 'none' }}  />
            </div>
          </div>
          <Button variant="outline-danger" onClick={handleDelete}>Delete Item</Button>
          <Button variant="outline-success" onClick={handleSubmit}>Save Item</Button>
        </div>
      </div>

      <Modal className="category-modal text-center" show={show} onHide={handleClose}>
        <div className="card-header"></div>
        <div className="card-body">

          <div className='mainContent'>
            <h4>Category selector</h4>
            <div className="categories">

              {categories.map((category, index) => (

                <div className="category shadow" key={index}>

                  <strong>id > {category.id} -</strong>
                  <strong> Name > {category.name}</strong>
                  <Button variant="outline-success" onClick={ (e) => handleCategory(category)}>Set</Button>
                </div>
              ))}

            </div>
          </div>
          <Button className='shadow 'variant="outline-danger" onClick={handleClose}>Close Menu</Button>
        </div>
      </Modal>

      <br/><input type="file" placeholder='undefined' name="image" onChange={handleImage}/>TEST IMAGE INSERTING <br/>
      <img src={image} width="100" height="100"></img>
    </div>
  )
}

export default ItemEntry