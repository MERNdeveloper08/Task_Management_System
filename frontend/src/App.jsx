import React from "react";
import { Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";
// import TaskForm from "./components copy/TaskForm";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/home/Home";
import Graph from "./pages/graph/graph";
import "./App.css";

import axios from "axios";

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/graph" element={<Graph />} />
        {/* <Route path="/" element={<Home />} /> */}

        <Route path="*" element={<Home />} />
      </Routes>

      {/* <h1>Active card :{activeCard}</h1> */}
    </>
  );
};
export default App;
