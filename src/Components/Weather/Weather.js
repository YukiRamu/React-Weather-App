import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTint, FaRegCompass} from "react-icons/fa";
import {GiPaperWindmill} from "react-icons/gi";
import { WeatherContext } from "../../Context/WeatherContext";
import "./Weather.css";

const Weather = () => {

  const { currentWeather } = useContext(WeatherContext);
  const { forecast } = useContext(WeatherContext);

  console.log("current weather is ", currentWeather);
  console.log("forecast is ", forecast);

  // const useWeatherContext = () => useContext(WeatherContext);
  // const { weatherInfo } = useWeatherContext();

  return (
    <>
      {currentWeather ? (
        <>
          <Container>
            <Row className="city">
              <h2>{currentWeather.name}, {currentWeather.sys.country}</h2>
            </Row>
            <Row className="weather">
              <Col className="temperature">
                <p className="temp">{Math.round([currentWeather.main.temp])} °C</p>
                <div>
                  <p>H: {Math.round([currentWeather.main.temp_max])} °C</p>
                  <p>L: {Math.round([currentWeather.main.temp_max])} °C</p>
                </div>
                <p className="feelLike">Feels like: {Math.round([currentWeather.main.feels_like])}°C</p>
              </Col>
              <Col className="mainInfo">
                <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`} alt="icon"></img>
                {/* <p>{currentWeather.weather[0].main}</p> */}
              </Col>
              <Col className="subInfo">
                <p><FaTint></FaTint> {currentWeather.main.humidity} %</p>
                <p><FaRegCompass></FaRegCompass> {currentWeather.main.pressure} hPa</p>
                <p><GiPaperWindmill></GiPaperWindmill> {currentWeather.wind.speed} m/s</p>
              </Col>
            </Row>
          </Container>

        </>
      ) : (<h1 className="loading">Loading...Hang on a sec...</h1>)}

    </>
  );
};

export default Weather;
