import React, { useState, useEffect } from 'react';
import CommonService from '../commonService';
import AuthService from '../../auth/AuthService';
import PlaceholderImage from '../../assets/images/placeholderimage.png';
import './Bookings.scss';


function MyBookings() {

    const [bookingData, setBookingData] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setUserData(AuthService.getUserDetails())
        getBookingData(AuthService.getUserDetails().id);
    }, []);

    const getBookingData = (id) => {
        CommonService.getMyBookings(id).then((res) => {
            // console.log(res);
            setBookingData(res.bookings)
        })
    }

    return (
        <div className="booking-div">
            <h1>My Bookings</h1>
            <div>
                {bookingData?.map((data) => {
                    return(
                        <div className="bookings-container">
                            {/* <div> */}
                                <img src={data.eventData.banner || PlaceholderImage } alt={data.eventData.eventName} className="booking-image"/>
                            {/* </div> */}
                            <div className="name-container">
                                <h4>{data.eventData.eventName}</h4>
                                <span className="booked-event-date">{CommonService.getDate(data.eventData.startDate)}</span>
                                <span className="booked-event-date" style={{marginTop: 15}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="location-icon" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                    {data.eventData.full_address}
                                </span>
                            </div>
                            <div className="name-container1">
                                <h4 style={{fontSize: 12, color: '#555'}}>Booked on {CommonService.getDate(data.bookedOn)}</h4>
                                <button>View Ticket</button>
                            </div>
                            <div className="name-container2">
                                <h4 style={{fontSize: 12, color: '#555'}}>Booked on {CommonService.getDate(data.bookedOn)}</h4>
                                <button>View Ticket</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyBookings;