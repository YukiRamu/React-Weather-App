import { React, useContext } from 'react';
import "./Header.css";
import { Row, Nav } from 'react-bootstrap';
import Search from "../Search/Search";
import { TiWeatherSnow } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { WeatherContext } from '../../Context/WeatherContext';

const Header = () => {

  const { unit, setUnit, setIsUnitChanged } = useContext(WeatherContext);

  return (
    <>
      {unit ? (
        <Row className="header" >
          <Nav className="col-8 title">
            <Link to="/home">
              <TiWeatherSnow></TiWeatherSnow> Weather Report
            </Link>
            <div className="unit">
              <label className="unitBtn">
                <input
                  type="radio"
                  value="metric"
                  onChange={e => { setUnit(e.target.value); setIsUnitChanged(true); }}
                  checked={unit === "metric"} />
                Celcius
              </label>

              <label className="unitBtn">
                <input
                  type="radio"
                  value="imperial"
                  onChange={e => { setUnit(e.target.value); setIsUnitChanged(true); }}
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