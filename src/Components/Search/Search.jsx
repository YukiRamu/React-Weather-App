import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { GiHelp } from "react-icons/gi";
import { WeatherContext } from "../../Context/WeatherContext";
import "./Search.css";

const Search = () => {

  const { error, setError, location, setLocation, setIsLocationChanged } = useContext(WeatherContext);
  let history = useHistory();

  const SearchCity = (e) => {
    e.preventDefault();
    console.log(e);

    //if searched on bookmark page --> redirect to homepage
    if (e.target.action.indexOf("bookmark")) {
      console.log("I am on bookmark page");
      history.push("/home");
    }

    // validation check
    if ((location === "") || (!isNaN(location))) {
      setError("❌ Please enter valid location");
      setTimeout(() => { setError(""); }, 2500);
    }
    else {
      setLocation(location);
      setIsLocationChanged(true);
    }
  };

  return (
    <>
      {/* Form for current weather */}
      <Form className="col-4 searchForm" onSubmit={SearchCity}>
        <Form.Group>
          <Form.Control type="text" placeholder="Enter location"
            onChange={e => setLocation(e.target.value)}
            value={location}
            onFocus={() => { setLocation(""); }} />
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
