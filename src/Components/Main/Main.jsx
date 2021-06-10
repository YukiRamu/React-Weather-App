import React, { useState, useEffect, useContext } from "react";
import "./Main.css";
import Weather from "../Weather/Weather";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Main = (value) => {

  console.log(value);

  return (
    <>
      <Header />

      <Weather />

      <Footer />
    </>
  );
};

export default Main;