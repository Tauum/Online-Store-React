import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import Item from "../Home/Item/Item"
import "./Search.css"

function Search() {

    const [{ user, ipaddress, search }, dispatch] = useStateValue();

    return (
        <div className="search">
            <div className="box">
                    <div className="itemsList">
                        {search.items?.map((item, index) => (
                            <div>
                                <Item className="itemElement shadow"
                                key={index}
                                id={item.id}
                                name={item.name}
                                descripton={item.description}
                                price={item.price} 
                                stockCount={item.stockCount}
                                score={item.score}
                                image={item?.image}
                                releaseDate={item.releaseDate}
                                description={item.description}
                                category={item.category}
                                />
                            </div>

                        ))}

                    </div>
                </div>
                {/* <Button className='shadow ' variant="outline-danger" onClick={handleClose}>Close Menu</Button> */}

    </div>
  )
}

export default Search