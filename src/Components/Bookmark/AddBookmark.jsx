import React, { useContext } from 'react';
import { WeatherContext } from "../../Context/WeatherContext";
import { FaHeart } from "react-icons/fa";
import "./AddBookmark.css";

const AddBookmark = () => {
  const { currentWeather, message, setMsg } = useContext(WeatherContext);

  const addBookmark = () => {
    
    //check if there is already bookmark
    if (!localStorage.hasOwnProperty("bookmark")) {
      //first time adding bookmark
      localStorage.setItem("bookmark", JSON.stringify([currentWeather.name]));
      setMsg(`✔️  ${currentWeather.name} is added to your location list`);
      setTimeout(() => { setMsg(""); }, 2500);
    } else {
      //already there - check duplicate
      let bookmark = JSON.parse(localStorage.getItem("bookmark"));
      if (bookmark.some(elem => elem === currentWeather.name)) {
        setMsg(`❌ ${currentWeather.name} is already in your location list`);
        setTimeout(() => { setMsg(""); }, 2500);
      } else {
        bookmark.push(currentWeather.name);
        localStorage.setItem("bookmark", JSON.stringify(bookmark));
        setMsg(`✔️  ${currentWeather.name} is added to your location list`);
        setTimeout(() => { setMsg(""); }, 2500);
      }
    }
  };

  return (
    <>
      <button className="bookmarkBtn" onClick={addBookmark}><FaHeart></FaHeart> Add to your location</button>
      {/* Message for bookmark feature */}
      {(message !== "") ? (
        <>
          <p className="message">{message}</p>
        </>
      ) : ""}
    </>
  );
};

export default AddBookmark;