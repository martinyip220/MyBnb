import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import SpotsPage from "./components/Spots";
import SpotDetail from "./components/SpotDetail";
import SpotForm from "./components/SpotForm";
import SpotEditForm from "./components/SpotEdit";
import ReviewForm from "./components/CreateReviewForm";
import PageNotFound from "./components/ErrorPage";

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
            <Footer />
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
          <Route exact path="/spots/:spotId/create-review">
            <ReviewForm />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
