import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'
import "./Categories.css"

function Categories() {

    const navigate = useNavigate();
    const [categories, setCategories] = useState();
    const [{ ipaddress, user, category }, dispatch] = useStateValue();

    useEffect(() => {
        fetch(`${ipaddress}/Category/`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                setCategories(response)
            });
    },[])

    const handleSearch = (category) => {
        console.log(category.name)
        fetch(`${ipaddress}/Item/getItemsByCategoryName/${category.name}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: "SET_SEARCH_ITEMS",
                    search: {
                        term: "",
                        items: response
                    },
                })
            });
            
    navigate(`/Search`);
    }

    const editCategory = (category) => {
        dispatch({
        type: "SET_CATEGORY",
          category:{
            id:category.id,
            name: category.name
          }
        })
        navigate(`/CategoryEntry`);
      }

return (
    <div className="search">
        <div className="box">
            <div className="categoriesList">
                {categories?.map((category, index) => (
                    <div className="categoryElement shadow" key={index}>

                        <strong>{category.name}</strong>
                        <Button variant="outline-success" className="shadow" onClick={(e) => handleSearch(category)}>Search by</Button>

                        
                        {user?.role === "ADMIN" ? 
                            <Button variant="outline-info" className='shadow'
                            onClick={(e) => {editCategory(category)}}>Edit
                            </Button>  
                            : <div></div>
                        }
                                    </div>
                                ))}

            </div>
        </div>
        {/* <Button className='shadow ' variant="outline-danger" onClick={handleClose}>Close Menu</Button> */}

    </div>
)
}

export default Categories