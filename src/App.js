import Nav from "./Components/Nav/Nav"
import Home from "./Components/Home/Home"
import Cart from "./Components/Cart/Cart"
import GenerateOrder from "./Components/GenerateOrder/GenerateOrder"
import Admin from "./Components/Admin/Admin"
import SignInRegister from "./Components/SignInRegister.js/SignInRegister";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import Orders from "./Components/Orders/Orders"
import PDFFile from "./Components/Orders/PDFFile"
import ItemEntry from "./Components/ItemEntry/ItemEntry"
import CategoryEntry from "./Components/CategoryEntry/CategoryEntry"
import Search from "./Components/Search/Search"
import Categories from "./Components/Categories/Categories"

const promise = loadStripe("pk_test_51KmjTwJRlIFHrl82Wz5jANACykrOOaZtv1gztsmRx0gcWEwrUf7mwvsEXwyJBOQPJbW6hRAKBVNWVXujxCQd0KSy00orRzUsOH");

function App() {

  return (
    <Router>
      <div className="App">
      
        <Routes key={Route.index}>

          {/* <Route path="/Cart" element={[<Nav/>, <Cart/>]}/> */}
          <Route path="/Search" element={[<Nav/>,<Search/>]}/>
          
          <Route path="/Categories" element={[<Nav/>,<Categories/>]}/>

          <Route path="/Cart" element={[<Nav/>,<Cart/>]}/>
 
          <Route  path="/GenerateOrder" element={ <> <Nav /> <Elements stripe={promise}> <GenerateOrder /> </Elements> </> } />
            
          <Route path="/" element={[<Nav/>,<Home/>]}/>

          <Route path="/Login" element={[<SignInRegister/>]}/>

          <Route path="/Orders" element={[<Nav/>,<Orders/>]}/>

          <Route path="/PDFFile" element={[<Nav/>,<PDFFile/>]}/>

          {/* {user?.role == "ADMIN" ? */}
           <Route path="/Admin" element={[<Nav/>,<Admin/>]}/>

           <Route path="/ItemEntry" element={[<Nav/>,<ItemEntry/>]}/>

           <Route path="/CategoryEntry" element={[<Nav/>,<CategoryEntry/>]}/>


           
            {/* :  */}
            {/* <Route> </Route> */}
          {/* } */}
          
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
