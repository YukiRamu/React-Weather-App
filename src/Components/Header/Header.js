import React from 'react';
import "./Header.css";
import { Row } from 'react-bootstrap';
import Search from "../Search/Search";

const Header = () => {
  return (
    <>
      <Row className="header" >
        <h5 className="col-4 title">Weather Report</h5>
        <Search />
      </Row>
    </>
  );
};
export default Header;