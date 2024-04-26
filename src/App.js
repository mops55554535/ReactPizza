import Header from "./components/Header";
import "./scss/app.scss";
import React, { useEffect, useState} from "react";
import Home from "./pages/Home";
import NotFoundBlock from "./NotFoundBlock";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Card/Cart";

function App() {
  


  return (
    <div className="App">
      <div className="layoutMain">
        <Header />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
            
            <Route path="*" element={<NotFoundBlock/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;
