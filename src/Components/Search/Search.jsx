import React, { useContext, useState, useLocation } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { GiHelp } from "react-icons/gi";
import { Link, Redirect } from 'react-router-dom';
import { WeatherContext } from "../../Context/WeatherContext";
import "./Search.css";

const Search = () => {
  const { error, setError, location, setLocation, IsLocationChanged, setIsLocationChanged } = useContext(WeatherContext);



  const SearchCity = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target.action);
    console.log(location);
    console.log(IsLocationChanged);

    if ((location === "") || (!isNaN(location))) {
      setError("Please enter valid location");
    }
    else {
      setLocation(location);
      setIsLocationChanged(true);
    }
    // console.log(e.target[0].value);
  };

  return (
    <>
      {/* Form for current weather */}
      <Form className="col-4 searchForm" onSubmit={SearchCity}>
        <Form.Group controlId="formGroupEmail">
          <Form.Control type="text" placeholder="Enter location"
            onChange={e => setLocation(e.target.value)}
            value={location}
            onFocus={() => setError("")} />
        </Form.Group>
        <Button type="submit" className="searchBtn">
          <FaSearch></FaSearch>
        </Button>
      </Form>
      {(error !== "") ? (
        <>
          <p className="errorMsg">{error}</p>
        </>
      ) : ""}
      <a href="https://www.nationsonline.org/oneworld/country_code_list.htm" target="_black" className="helpLink"><GiHelp></GiHelp> Location Search Help</a>
    </>
  );
};

export default Search;
