import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from "../../Context/WeatherContext";
import { useHistory } from 'react-router-dom';
import { Row, Button } from 'react-bootstrap';
import "./Bookmark.css";

const Bookmark = (props) => {

  const { unit, setLocation, setIsLocationChanged, message, setMsg } = useContext(WeatherContext);
  let history = useHistory();

  //private state hook
  const [dataForBookmark, setDataForBookmark] = useState([]);
  const [bookmarkMsg, setBookmarkMsg] = useState("");

  //Button click handler
  const handleClick = (elem) => {
    setLocation(elem.name);
    setIsLocationChanged(true);
    history.push("/home"); //redirect
  };

  const deleteLocation = (e) => {
    let bookmark = JSON.parse(localStorage.getItem("bookmark"));
    let filtered = bookmark.filter(elem => elem !== e.target.nextElementSibling.childNodes[0].innerText);
    localStorage.setItem("bookmark", JSON.stringify(filtered));
    setMsg(`✔️  ${e.target.nextElementSibling.childNodes[0].innerText} is successfully deleted from your location list`);
    setTimeout(() => { setMsg(""); }, 2500);
    //force reload to render the component
    if (window.name != "any") {
      window.location.reload();
      window.name = "any";
    } else {
      window.name = "";
    }
  };

  useEffect(() => {
    const API_KEY = "429736441cf3572838aa10530929f7cd";
    const ENDPOINT_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather?";
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
                  <div key={elem} className="col" >
                    <button className="delBtn" onClick={(e) => { deleteLocation(e); }}>x</button>
                    <Button className="locationPanel col" onClick={() => { handleClick(elem); }}>
                      <div className="cityName">
                        <h3>{elem.name}</h3>
                      </div>
                      <div className="detail">
                        <p className="temp">{Math.round([elem.main.temp])} °</p>
                        <img src={`https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`} alt="icon"></img>
                        <div>
                          <p className="feelLike">Feels like: {Math.round([elem.main.feels_like])}°</p>
                          <p>H : {Math.round([elem.main.temp_max])} ° | L : {Math.round([elem.main.temp_max])} °</p>
                        </div>
                      </div>
                    </Button>
                  </div>
                </>
              )))}
            </Row>
          </div>
        </>
      ) : (<h1 className="loading">Loading...Hang on a sec...</h1>)}
      {bookmarkMsg ? (
        <h1 className="loading">{bookmarkMsg}</h1>
      ) : ""}
      {/* Message for bookmark feature */}
      {(message !== "") ? (
        <>
          <p className="message">{message}</p>
        </>
      ) : ""}
    </>
  );
};

export default Bookmark;
