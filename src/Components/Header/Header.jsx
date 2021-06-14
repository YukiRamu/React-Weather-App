import { React, useContext } from 'react';
import "./Header.css";
import { Row, Nav } from 'react-bootstrap';
import Search from "../Search/Search";
import { TiWeatherSnow } from "react-icons/ti";
import { GiPineTree } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { WeatherContext } from '../../Context/WeatherContext';

const Header = () => {

  const { unit, setUnit, setIsUnitChanged } = useContext(WeatherContext);

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
    setUnit(e.target.value);
    setIsUnitChanged(true);

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
            <Link to="/bookmark" className="link">
              <FaHeart></FaHeart> Your Location
            </Link>
            <Link to="/home" className="link">
              <GiPineTree></GiPineTree> Current weather
            </Link>
            <Link to="/forecast" className="link">
              <GiPineTree></GiPineTree> 7 Day Forecast
            </Link>
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