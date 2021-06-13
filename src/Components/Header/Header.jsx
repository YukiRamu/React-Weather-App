import { React, useContext, useState } from 'react';
import "./Header.css";
import { Row, Nav } from 'react-bootstrap';
import Search from "../Search/Search";
import { TiWeatherSnow } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { WeatherContext } from '../../Context/WeatherContext';

const Header = () => {

  const { unit, setUnit, setIsUnitChanged } = useContext(WeatherContext);
  // const [style, setCheckedStyle] = useState({
  //   "backgroundColor": " #d66c05",
  //   "backgroundColor": "transparent",
  //   "color": "#0e2532"
  // });

  const defaultStyleMetric = {
    "border": "0.1rem solid #d66c05",
    "backgroundColor": "#d66c05"
  };

  const defaultStyleFahrenheit = {
    "border": "0.1rem solid white",
    "backgroundColor": "transparent"
  };

  const checkedStyle = "background-color: #d66c05; border: 0.1rem solid #d66c05";

  const uncheckedStyle = "background-color: transparent; border: 0.1rem solid white";

  const handleChange = (e) => {
    console.log(e);
    setUnit(e.target.value);
    setIsUnitChanged(true);
    // e.target.checked
    if (e.target.checked === true) {
      e.target.parentElement.attributes[1].value = checkedStyle;
      if (e.target.value === "imperial") {
        e.target.parentElement.previousSibling.attributes[1].value = uncheckedStyle;
      } else {
        e.target.parentElement.nextSibling.attributes[1].value = uncheckedStyle;
      }
    }
  };



  return (
    <>
      {unit ? (
        <Row className="header" >
          <Nav className="col-8 title">
            <Link to="/home">
              <TiWeatherSnow></TiWeatherSnow> Weather Report
            </Link>
            <div className="unit">
              <label className="unitBtn celcius" style={defaultStyleMetric}>
                <input
                  type="radio"
                  value="metric"
                  onChange={handleChange}
                  checked={unit === "metric"} />
                Celcius
              </label>

              <label className="unitBtn metric" style={defaultStyleFahrenheit}>
                <input
                  type="radio"
                  value="imperial"
                  onChange={handleChange}
                  checked={unit === "imperial"} />
                Fahrenheit
              </label>
            </div>
          </Nav>
          <Search />
        </Row>
      ) : (
        <h1 className="loading">Loading...Hang on a sec...</h1>
      )}

    </>
  );
};
export default Header;