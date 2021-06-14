import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaTint, FaRegCompass, FaThermometerHalf } from "react-icons/fa";
import { GiPaperWindmill, GiRaining, GiSunrise, GiSunset } from "react-icons/gi";
import { WeatherContext } from "../../Context/WeatherContext";
import "./Forecast.css";
import Moment from 'react-moment';
import 'moment-timezone';
import AddBookmark from "../Bookmark/AddBookmark";

const Forecast = () => {
  const { currentWeather, oneCallWeatherInfo } = useContext(WeatherContext);

  return (
    <>
      {(currentWeather && oneCallWeatherInfo) ? (
        <>
          <div className="forecastContainer">
            <h2>{currentWeather.name}, {currentWeather.sys.country}</h2>
            <Row>
              {oneCallWeatherInfo.daily.map((elem, index) => (
                <Col key={elem[index]}>
                  <h3><Moment unix format="MMM DD">{elem.dt}</Moment></h3>
                  <h4><Moment unix format="ddd">{elem.dt}</Moment></h4>
                  <img src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`} alt="icon"></img>
                  <p className="feelLike"><FaThermometerHalf></FaThermometerHalf> {Math.round([elem.feels_like.day])}°</p>
                  <div className="temperature">
                    <p className="max">H : {Math.round([elem.temp.max])} °</p>
                    <p className="min"> L : {Math.round([elem.temp.min])} °</p>
                  </div>
                  <div className="sun">
                    <p><GiSunrise></GiSunrise> <Moment unix format="LT">{elem.sunrise}</Moment></p>
                    <p><GiSunset></GiSunset> <Moment unix format="LT">{elem.sunset}</Moment></p>
                  </div>
                  <div className="humidity">
                    <p><GiRaining></GiRaining> {elem.humidity} %</p>
                    <p><FaTint></FaTint> {elem.clouds} %</p>
                  </div>
                  <div className="pressure">
                    <p><FaRegCompass></FaRegCompass> {elem.pressure} hPa</p>
                    <p><GiPaperWindmill></GiPaperWindmill> {elem.wind_speed} m/s</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          {/* Bookmark Button */}
          <AddBookmark className="msg"></AddBookmark>
        </>
      ) : (<h1 className="loading">Loading...Hang on a sec...</h1>)}
    </>
  );
};

export default Forecast;
