import React, { useState, useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import CommonService from "./commonService";
import EventCard from "./pages/EventCard";
import "./Dashboard.scss";
import "./Events.scss";

export const Events = (props) => {
  const [loader, setLoader] = useState(true);
  const [searchParam, setSearchParam] = useState("");
  const [eventData, setEventData] = useState(null);
  const { heading, data = [] } = props;

  useEffect(() => {
    // console.log(props);
    // const search = props?.match?.params?.target?.split("-")[1];
    // setSearchParam(search);
    // CommonService.findEventsWithCategory(search).then((res) => {
    //   setEventData(res?.events);
    // });
    // setLoader(false);
    console.log({ data });
  }, [data]);

  return (
    <>
      <h1 className="common-heading">{heading}</h1>
      <div className="event-grid-div">
        {data &&
          data.map((res) => {
            return <EventCard data={res} key={res._id} />;
          })}
      </div>
    </>
  );
};
