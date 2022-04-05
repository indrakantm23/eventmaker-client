import React, { useState, useEffect } from "react";
import CommonService from "./commonService";
import EventCard from "./pages/EventCard";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Dashboard.scss";
import { Events } from "./Events";
import { Headings } from "./constants";

const Dashboard = (props) => {
  const [currentCity, setCurrentCity] = useState();
  const [eventData, setEventData] = useState(null);
  const [loader, setLoader] = useState(true);
  const eventProps = {
    heading: Headings.MOST_POPOLAR,
    data: eventData,
  };

  const city = CommonService.getCurrentCity();

  useEffect(() => {
    CommonService.getEvents().then((res) => {
      setEventData(res.events);
      setLoader(false);
    });
  }, []);

  useEffect(() => {
    console.log("Dashboard called");
    setCurrentCity(CommonService.getCurrentCity());
  }, [city]);

  const openEventByCategory = (target) => {
    props.history.push("looking-for-" + target);
  };

  return (
    <div>
      <div className="container">
        <div className="overlay"></div>
        <div className="heading-container">
          {currentCity && (
            <h1 className="events-heading">
              {`${Headings.EVENTS_HAPPENING} ${currentCity}`}
            </h1>
          )}
          <div className="button-group-container">
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="text primary button group"
            >
              <Button onClick={() => openEventByCategory("events")}>
                Events
              </Button>
              <Button onClick={() => openEventByCategory("parties")}>
                Parties
              </Button>
              <Button onClick={() => openEventByCategory("exhibitions")}>
                Exhibitions
              </Button>
              <Button onClick={() => openEventByCategory("seminars")}>
                Seminars
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      {/* DISPLAY EVENTS HAPPENING */}
      <Events {...eventProps} />

      {/* DISPLAY EVENTS IN MY CITY */}
      <h1 className="common-heading">Event in {currentCity}</h1>
      <div className="event-grid-div">
        {eventData &&
          eventData.map((data) => {
            return <EventCard data={data} key={data._id} {...props} />;
          })}
      </div>

      {/* CHOOSE BY CHOICE */}
      <h1 className="common-heading">Select by Cities</h1>
      <div className="event-grid-div"></div>

      <Backdrop open={loader}>
        <CircularProgress color="inherit" style={{ color: "#fff" }} />
      </Backdrop>
      {/* {loader && <div className="loader"></div>} */}
    </div>
  );
};

export default Dashboard;
