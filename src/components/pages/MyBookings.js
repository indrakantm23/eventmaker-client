import React, { useState, useEffect } from "react";
import CommonService from "../commonService";
import AuthService from "../../auth/AuthService";
import PlaceholderImage from "../../assets/images/placeholderimage.png";
import "./Bookings.scss";

function MyBookings(props) {
  const [bookingData, setBookingData] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!AuthService.isLoggedIn()) {
      props.history.push({
        pathname: "/login",
        state: { url: props.location.pathname },
      });
    } else {
      setUserData(AuthService.getUserDetails());
      getBookingData(AuthService.getUserDetails().id);
    }
  }, []);

  const sortBookingData = (data) => {
    return data.sort((a, b) => {
      return new Date(b.eventData.startDate) - new Date(a.eventData.startDate);
    });
  };

  const openEvent = (str, id) => {
    str = str?.toLowerCase()?.split(" ")?.join("-");
    props.history.push({
        pathname: `/event/${str}`,
        state: { eventId: id },
    });
  }

  const getBookingData = (id) => {
    CommonService.getMyBookings(id).then((res) => {
      // console.log(res);
      setBookingData(sortBookingData(res.bookings));
    });
  };

  return (
    <div className="booking-div">
      <h1>My Bookings</h1>
      <div className="bookings-div">
        {bookingData?.map((data) => {
          return (
            <div style={{position: 'relative'}}>
              <span className="event-date-position">
                {CommonService.getDate(data.eventData.startDate)}
              </span>
              <div className="bookings-container">
                <div>
                  <img
                    src={data.eventData.banner || PlaceholderImage}
                    alt={data.eventData.eventName}
                    className="booking-image"
                  />
                </div>
                <div className="event-name-div">
                  <h4>{data.eventData.eventName}</h4>
                  {/* <span className="booked-event-date">On {CommonService.getDate(data.eventData.startDate)}</span> */}
                  <span className="booked-event-date">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      className="location-icon"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {/* {data.eventData.full_address} */}
                    {data.eventData.eventMode === "Online"
                        ? CommonService.getOnlineName(data.eventData.onlineURL || '')
                        : CommonService.trimString(data.eventData.full_address, 63)}
                  </span>
                </div>
                {data.eventData.entryMode === "free" ? (
                  <div>
                    <span className="total-seats">
                      Total seats booked: {data.bookingDetails}
                    </span>
                    <h2 className="bottom">Free</h2>
                  </div>
                ) : (
                  <div>
                    <span className="total-seats">
                      Total seats booked:{" "}
                      {Number(
                        data.bookingDetails
                          .map((a) => a.ticket_count)
                          .reduce((a, b) => a + b)
                      )}
                    </span>
                    <h2 className="bottom">
                      ₹
                      {Number(
                        data.bookingDetails
                          .map((a) => a.amount)
                          .reduce((a, b) => Number(a) + Number(b))
                      )}
                    </h2>
                  </div>
                )}

                <div>
                  {/* <h4 className="booked-on">Booked on {CommonService.getDate(data.bookedOn)}</h4> */}
                  <button onClick={()=> openEvent(data.eventData.eventName, data.eventData._id)} className="view-ticket">View Event</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyBookings;
