import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { WeatherContext } from "../../Context/WeatherContext";
import "./Bookmark.css";

const Bookmark = (props) => {

  const { unit, setUnit } = useContext(WeatherContext);
  const [dataForBookmark, setDataForBookmark] = useState([]);
  const [bookmarkMsg, setBookmarkMsg] = useState("");

  useEffect(() => {
    const API_KEY = "429736441cf3572838aa10530929f7cd";
    const ENDPOINT_CURRENT_WEATHER = "http://api.openweathermap.org/data/2.5/weather?";
    let locationArray = [];

    //get bookmark when location is already added
    if (localStorage.hasOwnProperty("bookmark")) {
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
              locationArray.unshift(currentData);
            }
            setDataForBookmark(locationArray);
          } catch (error) {
            console.error(`Error = ${error} : Failed to fetch current weather`);
            return error;
          }
        })();
      }
      //force reload to render the component
      if (window.name != "any") {
        window.location.reload();
        window.name = "any";
      } else {
        window.name = "";
      }
    } else {
      console.log("no bookmark added yet");
      setBookmarkMsg("No location added yet");
    }
  }, []);

  return (
    <>
      {dataForBookmark ? (
        <>
          <div className="bookmarkContainer">
            <h2>Your Location</h2>
            <Row className="row-cols-lg-4">
              {dataForBookmark.map(((elem, index) => (
                <>
                  <Col className="locationPanel">
                    <h3>{elem.name}</h3>
                    <div className="detail">
                      <p className="temp">{Math.round([elem.main.temp])} °</p>
                      <img src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`} alt="icon"></img>
                      <div>
                        <p className="feelLike">Feels like: {Math.round([elem.main.feels_like])}°</p>
                        <p>H : {Math.round([elem.main.temp_max])} ° | L : {Math.round([elem.main.temp_max])} °</p>
                      </div>
                    </div>
                  </Col>
                </>
              )))}
            </Row>
          </div>
        </>
      ) : (<h1 className="loading">Loading...Hang on a sec...</h1>)}
      {bookmarkMsg ? (
        <h1 className="loading">{bookmarkMsg}</h1>
      ) : ""}
    </>
  );
};

export default Bookmark;
