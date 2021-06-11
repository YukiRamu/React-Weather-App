import React, { useContext } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { WeatherContext } from "../../Context/WeatherContext";
import "./Search.css";

const Search = () => {
  return (
    <>
      <Form className="col-8 searchForm">
        <Form.Group controlId="formGroupEmail">
          <Form.Control type="text" placeholder="Enter location" />
        </Form.Group>
        <Button type="submit" className="searchBtn"><FaSearch></FaSearch></Button>
      </Form>
    </>
  );
};

export default Search;
