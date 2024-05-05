import Header from "./components/Header";
import "./scss/app.scss";
import React, { Suspense, useEffect, useState} from "react";
import Home from "./pages/Home";
import NotFoundBlock from "./NotFoundBlock";
import { Routes, Route } from "react-router-dom";

import FullPizza from "./pages/FullPizza/FullPizza";

import Loadable from "react-loadable";


function App() {

  const Cart = Loadable({
    loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart/Cart"),
    loading: () => <div>Загрузка...</div>,
  });
  const FullPizza = Loadable({
    loader: () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza/FullPizza"),
    loading: () => <div>Загрузка страницы...</div>,
  });
  const NotFoundBlock = Loadable({
    loader: () => import(/* webpackChunkName: "NotFoundBlock" */ "./pages/NotFound"),
    loading: () => <div>Загрузка...</div>,
  });
 

  return (
    <div className="App">

      <div className="layoutMain">
        <Header  />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/pizza/:id" element={<FullPizza/>} /> 
            <Route path="*" element={<NotFoundBlock/>}/>
          </Routes>
          
      </div>
</div>
  );
}

export default App;
