import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import ScrollToTop from "../Router/ScrollToTop";
import Weather from "../Weather/Weather";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Forecast from "../Forecast/Forecast";
import Bookmark from "../Bookmark/Bookmark";
import WeatherProvider from "../../Context/WeatherContext";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <>
      <WeatherProvider>
        {/* React Router*/}
        <Router>
          {/* Scroll to Top */}
          <ScrollToTop>
            {/* Header */}
            <Header />
            {/* Router Switch */}
            <Switch>
              <Route exact path="/" component={Weather} />
              <Route exact path="/home" component={Weather} />
              <Route exact path="/forecast" component={Forecast} />
              <Route exact path="/bookmark" component={Bookmark} />
            </Switch>
            {/* Footer */}
            <Footer />
          </ScrollToTop>
        </Router>
      </WeatherProvider>
    </>
  );
};

export default App;
