import React, { useState, useEffect, createContext } from "react";

const WeatherContext = createContext();

const WeatherProvider = (props) => {

  const [location, setLocation] = useState("Vancouver");
  const [unit, setUnit] = useState("metric");
  const [currentWeather, setCurrentWeather] = useState();
  const [oneCallWeatherInfo, setOneCallWeatherInfo] = useState();
  const [currentDate, setCurrentDate] = useState();

  const [error, setError] = useState("");
  const [IsLocationChanged, setIsLocationChanged] = useState(true);
  const [IsUnitChanged, setIsUnitChanged] = useState(false);

  /* method to convert Unix timestamp to Date and Time */
  const calcDateNTime = (fetchedData) => {
    //get today's date
    let dateObj = new Date();
    let localTime = dateObj.getTime();
    let localOffset = dateObj.getTimezoneOffset() * 60000;
    let UTC = localTime + localOffset;
    let selectedCity = UTC + (fetchedData.timezone * 1000);
    let timeInSelectedCity = new Date(selectedCity);

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
        if (((IsLocationChanged) && (location !== "")) || (IsUnitChanged)) {
          const currentRes = await fetch(`${ENDPOINT_CURRENT_WEATHER}q=${location}&units=${unit}&appid=${API_KEY}`);

          if (!currentRes.ok) {
            if (currentRes.status === 404) {
              setError("Location not found");
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
              const oneCallRes = await fetch(`${ENDPOINT_ONECALL}lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&units=${unit}&appid=${API_KEY}`);
              if (!oneCallRes.ok) {
                throw oneCallRes.statusText;
              } else {
                const oneCallData = await oneCallRes.json();
                setOneCallWeatherInfo(oneCallData);

                //changet flags 
                setIsLocationChanged(false); //prevent re-rendering while inputting location
                setIsUnitChanged(false); //back to default
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
  }, [location, IsLocationChanged, unit, IsUnitChanged]);

  return (
    <>
      <WeatherContext.Provider value={{
        currentWeather,
        setCurrentWeather,
        oneCallWeatherInfo,
        setOneCallWeatherInfo,//not used
        currentDate,
        setCurrentDate,//not used
        error,
        setError,
        location,
        setLocation,
        IsLocationChanged,
        setIsLocationChanged,
        unit,
        setUnit,
        IsUnitChanged,
        setIsUnitChanged
      }}>
        {props.children}
      </WeatherContext.Provider>
    </>
  );
};

export { WeatherProvider as default, WeatherContext };
