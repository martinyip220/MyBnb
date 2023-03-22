import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.css";

const BookingCard = ({ spot, reviews, avgRating }) => {
  const spotId = spot.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const rating = avgRating();
  const [errors, setErrors] = useState([]);
  const [today, setToday] = useState(
    new Date(
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000) -
        new Date().getTimezoneOffset()
    )
  );
  const [tomorrow, setTomorrow] = useState(
    new Date(new Date(today).getTime() + 24 * 60 * 60 * 1000)
  );
  const [startDate, setStartDate] = useState(format(today, "yyy-MM-dd"));
  const [endDate, setEndDate] = useState(
    format(new Date(today).getTime() + 120 * 60 * 60 * 1000, "yyy-MM-dd")
  );
  const [timeDifference, setTimeDifference] = useState(
    new Date(endDate).getTime() - new Date(startDate).getTime()
  );
  const [daysCount, setDaysCount] = useState(
    timeDifference / (1000 * 3600 * 24)
  );
  const [subTotal, setSubTotal] = useState(spot.price * daysCount);
  const [cleaningFee, setCleaningFee] = useState(Math.ceil(spot.price / 5));
  const [serviceFee, setServiceFee] = useState(Math.ceil(subTotal / 4));
  const [total, setTotal] = useState(subTotal - cleaningFee + serviceFee);

  const getDate = (today) => {
    let result;
    let month =
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1;
    let day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    result = `${today.getFullYear()}-${month}-${day}`;
    return result;
  };

  useEffect(() => {
    let updatedStart = new Date(startDate);
    let updatedEnd = new Date(endDate);
    if (updatedStart.getTime() >= updatedEnd.getTime()) {
      setEndDate(
        format(
          new Date(new Date(updatedStart).getTime() + 48 * 60 * 60 * 1000),
          "yyy-MM-dd"
        )
      );
      setTomorrow(
        new Date(new Date(updatedStart).getTime() + 48 * 60 * 60 * 1000)
      );
    } else {
      setTomorrow(
        new Date(new Date(updatedStart).getTime() + 48 * 60 * 60 * 1000)
      );
    }
    setErrors(errors);
  }, [startDate]);

  useEffect(() => {
    setTimeDifference(
      new Date(endDate).getTime() - new Date(startDate).getTime()
    );
    setDaysCount(timeDifference / (1000 * 3600 * 24));
    setSubTotal(spot.price * daysCount);
    setServiceFee(subTotal / 4);
    setTotal(subTotal + cleaningFee + serviceFee);
  }, [startDate, endDate, timeDifference, daysCount, subTotal, serviceFee]);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <>
      <form className="create-booking-form">
        <div className="booking-content-info">
          <div>
            <span className="booking-price">${spot.price}</span> night
          </div>
          <div>
            <i className="fa-solid fa-star"></i>
            {rating}
          </div>
          <div>{reviews.length} reviews</div>
        </div>

        <div className="booking-info-wrapper">
          <div className="checkin-wrapper">
            <div className="booking-label">CHECK-IN</div>
            <input
              type="date"
              id="start"
              name="trip-start"
              value={startDate}
              className="checkin"
              mindate={format(today, "yyyy-MM-dd")}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="checkout-wrapper">
            <div className="booking-label">CHECK-OUT</div>
            <input
              type="date"
              id="end"
              name="trip-start"
              value={endDate}
              className="checkout"
              mindate={format(tomorrow, "yyyy-MM-dd")}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {sessionUser ? (
          <button className="booking-btn">
            Reserve
          </button>
        ) : (
          <div className="booking-login">Login to Reserve</div>
        )}

        <p>You won't be charged yet</p>
        <div className="booking-fees">
          <div className="adjusted-pricing initial">
            <u>
              {formatter.format(spot.price)} x {daysCount}{" "}
              {daysCount === 1 ? "night" : "nights"}
            </u>
            <span>{formatter.format(subTotal)}</span>
          </div>
          <div className="adjusted-pricing">
            <u>Cleaning Fee</u>
            <span>{formatter.format(cleaningFee)}</span>
          </div>
          <div className="adjusted-pricing last">
            <u>Service fee</u>
            <span>{formatter.format(serviceFee)}</span>
          </div>
          <div className="adjusted-pricing total">
            <span>Total before taxes</span>
            <span>{formatter.format(total)}</span>
          </div>
        </div>
      </form>
    </>
  );
};

export default BookingCard;
