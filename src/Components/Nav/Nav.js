import React, { useState } from 'react'
import "./nav.css"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from '../StateProvider';

function Nav() {

    const [{cart, user, search, ipaddress}, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [term, setTerm] = useState("");

    const handleSearch = (e) => { 
        e.preventDefault();
        if(term != null && term != "" ){
            fetch(`${ipaddress}/Item/getItemsByName/${term}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
              })
              .then(res => res.json())
              .then(response => {
                  dispatch({
                      type: "SET_SEARCH_ITEMS",
                      search: {
                          term: term,
                          items:response
                      },
                  })
              });
            }
            else{
                fetch(`${ipaddress}/Item/`, {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json' },
                  })
                .then(res => res.json())
                .then(response => {
                    dispatch({
                        type: "SET_SEARCH_ITEMS",
                        search: {
                            term: term,
                            items:response
                        },
                    })
                });
            }
        navigate(`/Search`);
    }

    const handleCategory = () => {
        navigate(`/Categories`);
    }


   
    const logout = () => {

        dispatch({
            type: "LOGOUT_RECIEVED",
            user: {},
        });
        window.location.reload();
    }

  return (
    <div className='nav shadow'>
        <Link to="/" className="imageandstuff" >
            {/* <img src="/tree-house.svg" alt="tree house" className="treehouse" href=""/> */}
            <img src="/sprout-tree.svg" alt="tree house" className="treehouse" href="/"/>
            
            <div className='title'>
                <h2 className='title1'>Tree house</h2>
                <h4 className='title2'>Garden centre</h4>
            </div>
        </Link>
        
        <div className='navsearch'>
            <input className='searchinput' type="text" placeholder='Type here....' value={term} onChange={(e) => setTerm(e.target.value)}/>
            <SearchIcon className='searchicon' onClick={handleSearch} />
            <ManageSearchIcon className='searchicon' onClick={handleCategory}/>
            
        </div>

        <div className='navother'>
            
        {user.id? 
            <a className="option" onClick={logout}>
                <span className='line1'> Hello  {user?.firstName} </span> 
                <span className='line2'> Logout  </span>
            </a>
        : 
            <Link to={"/Login"} className="option">
                <span className='line1'> Hello Guest </span>
                <span className='line2'> Sign in  </span>
            </Link>
        }

            <Link to="/Orders" className='option'>
                <span className='line1'> Account </span>
                <span className='line2'>  & orders  </span>
            </Link>

            <Link to="/Cart" className='optionbasket'>
                <ShoppingBasketIcon className='shoppingbasket'/>
                <span className='line2 basketcount'>{cart?.items?.length}</span>
            </Link>
        </div>
    </div>
  )
}

export default Nav