import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import SpotCard from "../SpotCard";

const SpotsPage = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.entries);
    console.log("spots test", spots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    return (
        <div>
            {spots.map(spot => (
                <div key={spot.id}>
                    <SpotCard spot={spot} />
                </div>
            ))}
        </div>
    )
}


export default SpotsPage
