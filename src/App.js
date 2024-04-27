import Header from "./components/Header";
import "./scss/app.scss";
import React, { useEffect, useState} from "react";
import Home from "./pages/Home";
import NotFoundBlock from "./NotFoundBlock";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Card/Cart";


export const SearchContext = React.createContext()
function App() {
  const[searchValue, setSearchValue] = useState("")
  

  return (
    <div className="App">
      <SearchContext.Provider value= {{searchValue, setSearchValue}} >
      <div className="layoutMain">
        <Header  />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/cart" element={<Cart/>}/>
            
            <Route path="*" element={<NotFoundBlock/>}/>
          </Routes>
      </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
