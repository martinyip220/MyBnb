import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsPage from "./components/Spots";
import SpotDetail from "./components/SpotDetail";
import SpotForm from "./components/SpotForm";
import SpotEditForm from "./components/SpotEdit";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SpotsPage />
          </Route>
          <Route exact path="/spots/new">
            <SpotForm />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <SpotEditForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
