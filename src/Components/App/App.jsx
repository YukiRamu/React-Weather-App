import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import ScrollToTop from "../Router/ScrollToTop";
import Main from "../Main/Main";
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
            {/* Router Switch */}
            <Switch>
              <Route exact path="/" component={Main} />
            </Switch>
          </ScrollToTop>
        </Router>
      </WeatherProvider>
    </>
  );
};

export default App;
