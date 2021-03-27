import React from 'react';
import './../common.scss';
import Calendar from './Calendar';
import DefaultImage from './../../assets/images/banner-two.jpg';

 function EventCard(props){
    return(
        // <a href={props.hyperlink}>
            <div className="event-card" onClick={props.onclick} key={props.data._id}>
                <img src={props.data.banner ? props.data.banner : DefaultImage} className="event-banner" alt={props.data.eventName} />
                <Calendar startDate={props.data.startDate} endDate={props.data.endDate} />
                <h1 className="event-name">{props.data.eventName}</h1>
                <span className="event-full-address">{props.data.city}{props.data.state && ', '+props.data.state}{props.data.country && ', '+props.data.country}</span>
            </div>
        // </a>
    )
}

export default EventCard;