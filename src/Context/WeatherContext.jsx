import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const WeatherContext = createContext();
const WeatherConsumer = WeatherContext.Consumer; //exporting but not yet used


const WeatherProvider = (props) => {

  const [currentWeather, setWeather] = useState();
  const [forecast, setForecast] = useState();

  //fetch Vancouver weather
  useEffect(() => {
    const API_KEY = "24c4a9756532c3d6df0a376bc2cbe669";
    const ENDPOINT_CURRENT_WEATHER = "http://api.openweathermap.org/data/2.5/weather?";
    const ENDPOINT_FORECAST = "http://api.openweathermap.org/data/2.5/forecast?";

    (async () => {
      try {
        const currentRes = await axios.get(`${ENDPOINT_CURRENT_WEATHER}q=Vancouver&&units=metric&appid=${API_KEY}`);
        const currentData = await currentRes.data;
        setWeather(currentData);
      } catch (error) {
        console.error(`Error = ${error} : Failed to fetch weather forefast`);
        return error;
      }
    })();

    (async () => {
      try {
        const forecastRes = await axios.get(`${ENDPOINT_FORECAST}q=Vancouver&&units=metric&appid=${API_KEY}`);
        const forecastData = await forecastRes.data;
        setForecast(forecastData);
      } catch (error) {
        console.error(`Error = ${error} : Failed to fetch weather forefast`);
        return error;
      }
    })();

  }, []);

  return (
    <>
      <WeatherContext.Provider value={{
        currentWeather,
        setWeather,
        forecast,
        setForecast
      }}>
        {props.children}
      </WeatherContext.Provider>
    </>
  );
};

export { WeatherProvider as default, WeatherConsumer, WeatherContext };
