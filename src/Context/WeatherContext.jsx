import React, { useState, useEffect, createContext } from "react";
// import axios from "axios";
import { FaLess } from "react-icons/fa";

const WeatherContext = createContext();

const WeatherProvider = (props) => {

  const [location, setLocation] = useState("Vancouver");
  const [currentWeather, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState();
  const [oneCallWeatherInfo, setOneCallWeatherInfo] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [hourlyDate, setHourlyDate] = useState([]);

  const [error, setError] = useState("");
  const [IsLocationChanged, setIsLocationChanged] = useState(true);


  /* method to convert Unix timestamp to Date and Time */
  const calcDateNTime = (fetchedData) => {
    //get today's date
    let dateObj = new Date();
    let localTime = dateObj.getTime();
    let localOffset = dateObj.getTimezoneOffset() * 60000;
    let UTC = localTime + localOffset;
    let selectedCity = UTC + (fetchedData.timezone * 1000);
    let timeInSelectedCity = new Date(selectedCity);

    // console.log(timeInSelectedCity);
    // console.log(timeInSelectedCity.toString().substr(0, 24));
    setCurrentDate(timeInSelectedCity.toString().substr(0, 15));
  };

  /* fetch Vancouver weather */
  useEffect(() => {
    const API_KEY = "24c4a9756532c3d6df0a376bc2cbe669";
    const ENDPOINT_CURRENT_WEATHER = "http://api.openweathermap.org/data/2.5/weather?";
    const ENDPOINT_FORECAST = "http://api.openweathermap.org/data/2.5/forecast?";
    const ENDPOINT_ONECALL = "http://api.openweathermap.org/data/2.5/onecall?";

    (async () => {
      try {
        //fetch current data : location !== "" is to prevent fetch api being executed when the input field is cleared
        if ((IsLocationChanged) && (location !== "")) {
          console.log("!!!!!! flag true weather context location is", location);
          const currentRes = await fetch(`${ENDPOINT_CURRENT_WEATHER}q=${location}&units=metric&appid=${API_KEY}`);
          if (!currentRes.ok) {
            if (currentRes.status === 404) {
              setError("Location not found : Location = ", location);
              //clear location and set flag false
              setLocation("");
              setIsLocationChanged(false);
            }
            throw currentRes.statusText;
          } else {
            const currentData = await currentRes.json();
            setCurrentWeather(currentData);

            //get current date and time
            calcDateNTime(currentData);

            try {
              //fetch all weather data
              const oneCallRes = await fetch(`${ENDPOINT_ONECALL}lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&units=metric&appid=${API_KEY}`);
              if (!oneCallRes.ok) {
                throw oneCallRes.statusText;
              } else {
                const oneCallData = await oneCallRes.json();
                setOneCallWeatherInfo(oneCallData);

                //clear location and set flag false
                setLocation("");
                setIsLocationChanged(false);
              }
            } catch (error) {
              console.error(`Error = ${error} : Failed to fetch forefast`);
              return error;
            }
          }
        }
      } catch (error) {
        console.error(`Error = ${error} : Failed to fetch current weather`);
        return error;
      }
    })();
  }, [location, IsLocationChanged]);

  return (
    <>
      <WeatherContext.Provider value={{
        currentWeather,
        setCurrentWeather,
        forecast, //not used,
        setForecast, //not used
        oneCallWeatherInfo,
        setOneCallWeatherInfo,//not used
        currentDate,
        setCurrentDate,//not used
        error,
        setError,
        location,
        setLocation,
        IsLocationChanged,
        setIsLocationChanged
      }}>
        {props.children}
      </WeatherContext.Provider>
    </>
  );
};

export { WeatherProvider as default, WeatherContext };
