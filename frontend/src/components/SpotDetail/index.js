import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSpots } from "../../store/spots";

const SpotDetail = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.entries);
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    return (
        <div className="spot-detail-page">

        </div>
    )
}



export default SpotDetail;
