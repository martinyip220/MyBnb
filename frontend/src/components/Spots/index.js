import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./SpotPage.css";

const SpotsPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.entries);
  console.log("spots test", spots);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div className="spot-block">
      {spots.map((spot) => (
        <div key={spot.id}>
          <SpotCard spot={spot} />
        </div>
      ))}
    </div>
  );
};

export default SpotsPage;
