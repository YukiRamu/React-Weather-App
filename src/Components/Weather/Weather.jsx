import React, { useContext, useEffect, useState } from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import { FaTint, FaRegCompass } from "react-icons/fa";
import { GiPaperWindmill, GiRaining, GiSunrise, GiSunset, GiTargetArrows } from "react-icons/gi";
import { WeatherContext } from "../../Context/WeatherContext";
import { Link } from 'react-router-dom';
import "./Weather.css";
import Moment from 'react-moment';
import 'moment-timezone';

const Weather = () => {
  const { currentWeather, oneCallWeatherInfo, currentDate } = useContext(WeatherContext);


  console.log("!!!! current weather is ", currentWeather);
  console.log("!!!! one call data is ", oneCallWeatherInfo);
  console.log(currentDate);

  //Fri Jun 11 2021 13:24:34 GMT-0700 (Pacific Daylight Time)

  // console.log("forecast is ", forecast); not used

  return (
    <>
      {(currentWeather && oneCallWeatherInfo && currentDate) ? (
        <>
          <div className="weatherContainer">
            <Row>
              {/* Weather Row Left */}
              <Col className="left col-8">
                {/* Current weather */}
                <Row className="currentRow">
                  <Col className="temperature">
                    <p className="temp">{Math.round([currentWeather.main.temp])} °</p>
                  </Col>
                  <Col className="city" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                    <h2>{currentWeather.name}, {currentWeather.sys.country}</h2>
                    <p>{currentDate}</p>
                    <div className="sun">
                      <p><GiSunrise></GiSunrise> <Moment unix format="LT">{currentWeather.sys.sunrise}</Moment></p>
                      <p><GiSunset></GiSunset> <Moment unix format="LT">{currentWeather.sys.sunset}</Moment></p>
                    </div>
                  </Col>
                  <Col className="icon">
                    <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="icon"></img>
                    <p>{currentWeather.weather[0].main}</p>
                  </Col>
                </Row>
                {/* Hourly */}
                <Row className="hourlyRow">
                  <Carousel
                    controls={false}
                    indicators={false}>
                    <Carousel.Item>
                      {oneCallWeatherInfo.hourly.map((elem, index) => (
                        <Col className="hourlyPanel" key={elem[index]}>
                          <Moment unix format="MMM DD" className="date">{elem.dt}</Moment>
                          <Moment unix format="LT">{elem.dt}</Moment>
                          <img src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}.png`} alt="icon" />
                          <p>{Math.round([elem.temp])} °</p>
                        </Col>
                      ))}
                    </Carousel.Item>
                  </Carousel>
                </Row>
              </Col>

              {/* Weather Detail Right */}
              <Col className="right col-4">
                <Row className="detailRow">
                  <h3>Weather Details</h3>
                  <div>
                    <p>H : {Math.round([currentWeather.main.temp_max])} ° |</p>
                    <p>L : {Math.round([currentWeather.main.temp_max])} ° |</p>
                    <p className="feelLike">Feels like: {Math.round([currentWeather.main.feels_like])}°</p>
                  </div>
                  <p><GiRaining></GiRaining> {currentWeather.main.humidity} %</p>
                  <p><FaTint></FaTint> {currentWeather.clouds.all} %</p>
                  <p><FaRegCompass></FaRegCompass> {currentWeather.main.pressure} hPa</p>
                  <p><GiPaperWindmill></GiPaperWindmill> {currentWeather.wind.speed} m/s</p>
                  <Link
                    to={{
                      pathname: "/forecast",
                      state: {
                        dailyForecast: oneCallWeatherInfo.daily
                      }
                    }}
                    className="forecastLink "><GiTargetArrows></GiTargetArrows> Daily Forecast</Link>
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
