import React from 'react';
import "./Header.css";
import { Row } from 'react-bootstrap';
import Search from "../Search/Search";
import { TiWeatherSnow } from "react-icons/ti";
import { Link } from 'react-router-dom';

const Header = (props) => {
  console.log(props)
  return (
    <>
      <Row className="header" >
        <h5 className="col-8 title">
          <Link to="/home">
            <TiWeatherSnow></TiWeatherSnow> Weather Report
          </Link>
        </h5>
        <Search />
      </Row>
    </>
  );
};
export default Header;