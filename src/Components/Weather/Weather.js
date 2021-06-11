import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTint, FaRegCompass } from "react-icons/fa";
import { GiPaperWindmill, GiHelp } from "react-icons/gi";
import { WeatherContext } from "../../Context/WeatherContext";
import "./Weather.css";

const Weather = () => {

  const { currentWeather } = useContext(WeatherContext);
  const { forecast } = useContext(WeatherContext);

  console.log("current weather is ", currentWeather);
  console.log("forecast is ", forecast);

  return (
    <>
      {currentWeather ? (
        <>
          <div className="weatherContainer">
            <Row>
              <Col className="left col-8">
                <Row className="currentRow">
                  <Col className="temperature">
                    <p className="temp">{Math.round([currentWeather.main.temp])} °</p>
                  </Col>
                  <Col className="city" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                    <h2>{currentWeather.name}, {currentWeather.sys.country}</h2>
                  </Col>
                  <Col className="icon">
                    <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="icon"></img>
                    <p>{currentWeather.weather[0].main}</p>
                  </Col>
                </Row>
                <Row className="forecastRow">
                  <p>5 days forecast here</p>
                </Row>
              </Col>

              <Col className="right col-4">
                <Row className="searchRow">
                  <a href="https://www.nationsonline.org/oneworld/country_code_list.htm"  target="_black"><GiHelp></GiHelp> City Search Help</a>
                </Row>
                <Row className="detailRow">
                  <h3>Weather Details</h3>
                  <div>
                    <p>H: {Math.round([currentWeather.main.temp_max])} °</p>
                    <p>L: {Math.round([currentWeather.main.temp_max])} °</p>
                  </div>
                  <p className="feelLike">Feels like: {Math.round([currentWeather.main.feels_like])}°C</p>
                  <p><FaTint></FaTint> {currentWeather.main.humidity} %</p>
                  <p><FaRegCompass></FaRegCompass> {currentWeather.main.pressure} hPa</p>
                  <p><GiPaperWindmill></GiPaperWindmill> {currentWeather.wind.speed} m/s</p>
                </Row>
              </Col>
            </Row>


          </div>

        </>
      ) : (<h1 className="loading">Loading...Hang on a sec...</h1>)}

    </>
  );
};

export default Weather;
