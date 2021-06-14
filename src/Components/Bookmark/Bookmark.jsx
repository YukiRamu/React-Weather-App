import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaTint, FaRegCompass } from "react-icons/fa";
import { GiPaperWindmill, GiRaining, GiSunrise, GiSunset, GiTargetArrows } from "react-icons/gi";
import { WeatherContext } from "../../Context/WeatherContext";
import { Link } from 'react-router-dom';
import "./Bookmark.css";
import Moment from 'react-moment';
import 'moment-timezone';

const Bookmark = () => {

  const { unit, setUnit } = useContext(WeatherContext);
  const [dataForBookmark, setDataForBookmark] = useState([]);

  useEffect(() => {
    const API_KEY = "24c4a9756532c3d6df0a376bc2cbe669";
    const ENDPOINT_CURRENT_WEATHER = "http://api.openweathermap.org/data/2.5/weather?";
    let locationArray = [];

    //get bookmark 
    let currentBookmark = JSON.parse(localStorage.getItem("bookmark"));

    //get current data for all location in bookmark list
    for (let i = 0; i < currentBookmark.length; i++) {
      (async () => {
        try {
          const currentRes = await fetch(`${ENDPOINT_CURRENT_WEATHER}q=${currentBookmark[i]}&units=${unit}&appid=${API_KEY}`);
          if (!currentRes.ok) {
            throw currentRes.statusText;
          } else {
            const currentData = await currentRes.json();
            locationArray.push(currentData);
            console.log(" !!!!!! data array is", locationArray);
          }
          setDataForBookmark(locationArray);
          console.log("bookmark state is ", dataForBookmark);
        } catch (error) {
          console.error(`Error = ${error} : Failed to fetch current weather`);
          return error;
        }
      })();
    }
  }, []);

  return (
    <>
      {dataForBookmark ? (
        <>
          <div className="bookmarkContainer">
            <h2>Your Location</h2>
            <Row>
              {dataForBookmark.map(((elem, index) => (
                <>
                  {(index % 2 !== 0) ?
                    <div className="odd locationPanel">
                      <h3>{elem.name}</h3>
                      <p>{Math.round([elem.main.temp])} °</p>
                      <img src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`} alt="icon"></img>
                    </div> :
                    <div className="even locationPanel">
                      <h3>{elem.name}</h3>
                      <p>{Math.round([elem.main.temp])} °</p>
                      <img src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`} alt="icon"></img>
                    </div>}
                </>
              )))}
            </Row>
          </div>
        </>
      ) : (<h1 className="loading">Loading...Hang on a sec...</h1>)}
    </>
  );
};

export default Bookmark;
