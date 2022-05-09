
import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import "./Home.css"
import Item from "./Item/Item"

function Home() {

    const [{ ipaddress, user, orders }, dispatch] = useStateValue();
    const [items, setItems] = useState([]);
    const [itemArrayofArray, setItemArrayofArray] = useState([]);

    useEffect(() =>{
        fetch(`${ipaddress}/Item/getRandomSuggestionsLists`)
          .then(res => res.json())
          .then(response => {
             setItems(response)
             console.log(response)
             console.log(response.map(array => array.filter(item => item !== null)))
             // this has to remove empty array elements because springboot makes all arays size of max aray
             setItemArrayofArray(response.map(array => array.filter(item => item !== null)))
          });
          window.scrollTo(0, 0)
    },[])

  return (
    <div className='home'>
        <div className='homecontainer'>
            <img src="/hero.jpg" alt="hero image" className="heroimage"/>

            <div>
                <div> {itemArrayofArray?.map((itemArray, arrayIndex) => (
                    <div className="itemrow" key={arrayIndex}>
                        {itemArray?.map((item, itemIndex) => (
                             <Item 
                             key={itemIndex}
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
                         ))}
                    </div>
                )

                )}</div>

            </div>


            {/* {items?.map((item, index) => (
                            <div>
                                <Item 
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

                        ))} */}




        
            {/* <div className='itemrow'>
               
                <Item 
                    key={1}
                    id={1}
                    stockCount={4}
                    name="the lion the witch and the wardrobe" 
                    price={22.99} 
                    image="https://blackwells.co.uk/jacket/l/9780007442485.jpg"
                    score={5}
                    releaseDate={"2021-05-04"}
                    description="It's a magic wardrobe. There's a wood inside it, and it's snowing! Come and see, begged Lucy.
                    Lucy has stumbled upon a marvellous land of fauns and centaurs, nymphs and talking animals. But soon she discovers that it is ruled by the cruel White Witch, and can only be freed by Aslan, the great Lion, and four children."
                />
                <Item
                    key={2}
                    id={2}
                    stockCount={4}
                    name="TP-Link Nano USB Bluetooth 4.0 Adapter for PC Laptop Desktop Computer, Bluetooth Dongle and Receiver for Windows 11/10/8.1/8/7/XP, Plug and Play(UB400)" 
                    price={15.99} 
                    image="https://m.media-amazon.com/images/I/51YC-cv2atL._AC_SY355_.jpg"
                    score={3}
                    releaseDate={"2001-01-02"}
                    description="*Maximum wireless signal rates are the physical rates derived from IEEE Standard 802.11 specifications. Actual wireless data throughput and wireless coverage are not guaranteed and will vary as a result of 1) environmental factors, 2) network conditions and 3) client limitations."

                />
                <Item
                    key={3}
                    id={3}
                    stockCount={4}
                    name="KIKKOMAN Tamari Gluten Free Soy Sauce 1000 ml" 
                    price={7.15} 
                    image="https://m.media-amazon.com/images/I/71JMPkpJJQL._AC_SY606_.jpg"
                    score={4}
                    releaseDate={"2005-11-05"}
                    description="Enjoy our special tamari soy sauce despite coeliac disease
                    The naturally brewed tamari gluten-free soy sauce
                    Our tamari gluten-free soy sauce is now being manufactured according to the new recipe and is no longer just gluten-free
                    It is also halal. people of muslim belief can use our sauce without hesitation."
                />
            </div>
            <div className='itemrow'>
             <Item
                key={4}
                id={4}
                stockCount={4}
                name="Crucial Ballistix BL2K16G32C16U4W 3200 MHz, DDR4, DRAM, Desktop Gaming Memory Kit, 32GB (16GB x2), CL16, White" 
                price={123.99} 
                image="https://m.media-amazon.com/images/I/51GzE4Ysf3L._AC_SX450_.jpg"
                score={5}
                releaseDate={"2006-06-06"}
                description="Legendary parts for legendary wins
                Get ready for the next evolution in Crucial gaming memory. The Crucial Ballistix and Crucial Ballistix MAX lines feature high-quality Micron die and dynamic heat spreaders for maximum performance.
                
                Crucial: What legends are made of."
                />
            </div>
            <div className='itemrow'>
            <Item
                key={5}
                id={5}
                stockCount={4}
                name="AMD Ryzen 5 5600X Processor (6C/12T, 35MB Cache, up to 4.6 GHz Max Boost)" 
                price={200.99} 
                image="https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_SX355_.jpg"
                score={5}
                releaseDate={"2006-06-06"}
                description="The fastest in the game
                Get the high-speed gaming performance of the world’s best desktop processor
                Testing by AMD performance labs as of 9/2/2020 based on the average FPS of 40 PC games at 1920x1080 with the High image quality preset using an AMD Ryzen 9 5900X processor vs. Core i9-10900K. Results may vary. R5K-002
                Made of Quality Material"
                />
                <Item
                key={6}
                id={6}
                stockCount={4}
                name="HP 304 2 Pack Tri-colour Black Original Ink Cartridge 3JB05AE" 
                price={18.15} 
                image="https://m.media-amazon.com/images/I/61SKSov8rHL._AC_SX466_.jpg"
                score={3}
                releaseDate={"2006-06-06"}
                description="Capturing your memories
                Original HP ink cartridges provide brilliant photo quality.
                
                So to capture your dearest moments in lifelike colours, simply go for Original HP Ink.
                
                Printing with a green heart
                Original HP ink cartridges help you reduce your environmental impact.² ³
                
                So to print with the planet in mind, simply go for Original HP Ink.
                
                Making a long-lasting impression
                At HP, we develop ink to protect your most precious memories.
                
                So to make a smile last generations, simply go for Original HP Ink.¹
                
                Forming one perfect unit
                Original HP ink cartridges and HP printers are made for each other.
                
                So to enjoy a smoothly running printing system, simply go for Original HP Ink."
            />
            </div> */}
        </div>
    </div>
  )
}

export default Home