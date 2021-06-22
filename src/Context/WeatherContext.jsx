import React, { useState, useEffect, createContext } from "react";

const WeatherContext = createContext();

const WeatherProvider = (props) => {

  const [location, setLocation] = useState("Vancouver");
  const [unit, setUnit] = useState("metric");
  const [currentWeather, setCurrentWeather] = useState();
  const [oneCallWeatherInfo, setOneCallWeatherInfo] = useState();
  const [currentDate, setCurrentDate] = useState();

  const [error, setError] = useState("");
  const [message, setMsg] = useState("");
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
    // const API_KEY = "a11a837e1cf3fcb33bb6b696ba803ea9"; blocked
    const API_KEY = "429736441cf3572838aa10530929f7cd";
    const ENDPOINT_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather?";
    const ENDPOINT_ONECALL = "https://api.openweathermap.org/data/2.5/onecall?";

    (async () => {
      try {
        //fetch current data : location !== "" is to prevent fetch api being executed when the input field is cleared
        if (((IsLocationChanged) && (location !== "")) || (IsUnitChanged)) {
          const currentRes = await fetch(`${ENDPOINT_CURRENT_WEATHER}q=${location}&units=${unit}&appid=${API_KEY}`);

          if (!currentRes.ok) {
            if (currentRes.status === 404) {
              setError("❌ Location not found");
              setTimeout(() => { setError(""); }, 2000);
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
              //fetch all weather data (for forecast)
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
        currentDate,
        error,
        setError,
        location,
        setLocation,
        IsLocationChanged,
        setIsLocationChanged,
        unit,
        setUnit,
        IsUnitChanged,
        setIsUnitChanged,
        message,
        setMsg
      }}>
        {props.children}
      </WeatherContext.Provider>
    </>
  );
};

export { WeatherProvider as default, WeatherContext };
