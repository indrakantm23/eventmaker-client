import React from 'react';
import './../common.scss';
import Calendar from './Calendar';
import DefaultImage from './../../assets/images/banner-two.jpg';

 function EventCard(props){
    return(
        <div className="event-card">
            <img src={props.data.eventBanner ? props.data.eventBanner : DefaultImage} className="event-banner" />
            <Calendar date={props.data.eventStartDate} />
            <h1 className="event-name">{props.data.eventName}</h1>
            
        </div>
    )
}

export default EventCard;