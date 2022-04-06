import React, { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import RoomIcon from "@material-ui/icons/Room";
import MenuIcon from "@material-ui/icons/Menu";
import Logo1 from "./../assets/images/event-maker-logo1.png";
import CommonService from "./../components/commonService";
import AuthService from "./../auth/AuthService";
import { useHistory } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";

import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import EmailIcon from "@material-ui/icons/Email";
import PaymentIcon from "@material-ui/icons/Payment";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import EventIcon from "@material-ui/icons/Event";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { DebounceInput } from "react-debounce-input";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import store from "../redux/store";
import { UPDATE_CURRENT_CITY } from "../redux/actionsTypes";
// import { configureStore } from "@reduxjs/toolkit";
import "./Header.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Header(props) {
  let history = useHistory();

  const [state, setState] = useState(false);
  // const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [filteredCity, setFilteredCity] = useState([]);
  const [cityName, setCityName] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [currentCity, setCurrentCity] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const toggleDrawer = (open) => () => {
    setState(open);
  };
  useEffect(() => {
    setCurrentCity(store.getState().city);
    store.subscribe(() => {
      setCurrentCity(store.getState().city);
    });
  }, []);

  const dispatchCity = (city) => {
    store.dispatch({
      type: UPDATE_CURRENT_CITY,
      payload: {
        city,
      },
    });
  };

  const searchEvent = (e) => {
    let key = e.target.value;
    if (key) {
      CommonService.searchEvents(key).then((res) => {
        setSearchData(res.data);
      });
    } else {
      setSearchData([]);
    }
  };

  const getCityName = (e) => {
    let key = e.target.value;
    setCityName(key);
    if (key && key.length > 0) {
      CommonService.getPlaces(key).then((res) => {
        setFilteredCity(res.locations);
      });
    } else {
      setFilteredCity([]);
    }
  };
  const setCity = (city) => {
    setFilteredCity([]);
    setCityName(city.city_name);
  };

  const setLocalCity = () => {
    dispatchCity(cityName);
    setOpen(false);
    setCityName("");
  };

  const formatCityName = (data) => {
    const { city_name, state_name, country_name } = data;
    const fullAddress = `${city_name}${state_name && ", " + state_name}${
      country_name && ", " + country_name
    }`;
    localStorage.setItem("fullAddress", fullAddress);
    return fullAddress;
  };

  const openRoute = (path) => {
    history.push({
      pathname: path,
      state: history?.location?.pathname,
    });
    setState(false);
  };

  const openEvent = (data) => {
    let str = data?.eventName?.toLowerCase()?.split(" ")?.join("-");
    history.push({
      pathname: `/event/${str}`,
      state: { eventId: data.id },
    });
    setSearchData([]);
  };

  const isOn = (path) => {
    return window.location.pathname === path;
  };

  const list = () => (
    <List>
      <Button
        className={`sidebar-btn ${isOn("/") ? "active-tab" : "default-tab"}`}
        onClick={() => {
          openRoute("/");
        }}
      >
        <HomeIcon />
        Home
      </Button>
      <Button
        className={`sidebar-btn ${
          isOn("/bookings") ? "active-tab" : "default-tab"
        }`}
        onClick={() => {
          !isOn("/bookings") && openRoute("/bookings");
        }}
      >
        <ConfirmationNumberIcon />
        My Bookings
      </Button>
      <Button
        className={`sidebar-btn ${
          isOn("/my-events") ? "active-tab" : "default-tab"
        }`}
        onClick={() => {
          !isOn("/my-events") && openRoute("/my-events");
        }}
      >
        <EventIcon />
        My Events
      </Button>
      <Button
        className={`sidebar-btn ${
          isOn("/wallet") ? "active-tab" : "default-tab"
        }`}
        onClick={() => {
          !isOn("/wallet") && openRoute("/wallet");
        }}
      >
        <AccountBalanceWalletIcon />
        Wallet
      </Button>
      <Button
        className={`sidebar-btn ${
          isOn("/pricing") ? "active-tab" : "default-tab"
        }`}
        onClick={() => {
          !isOn("/pricing") && openRoute("/pricing");
        }}
      >
        <PaymentIcon />
        Pricing
      </Button>
      <Button
        className={`sidebar-btn ${
          isOn("/how-it-works") ? "active-tab" : "default-tab"
        }`}
        onClick={() => {
          !isOn("/how-it-works") && openRoute("/how-it-works");
        }}
      >
        <HelpOutlineIcon />
        How it works
      </Button>
      <Button
        className={`sidebar-btn ${
          isOn("/about") ? "active-tab" : "default-tab"
        }`}
        onClick={() => {
          !isOn("/about") && openRoute("/about");
        }}
      >
        <InfoIcon />
        About
      </Button>
      <Button
        className={`sidebar-btn ${
          isOn("/contact-us") ? "active-tab" : "default-tab"
        }`}
        onClick={() => {
          !isOn("/contact-us") && openRoute("/contact-us");
        }}
      >
        <EmailIcon />
        Contact
      </Button>
      {AuthService.isLoggedIn() && (
        <Button
          className="sidebar-btn logout-btn"
          onClick={() => {
            !isOn("/logout") && openRoute("/logout");
          }}
        >
          <span className="material-icons">logout</span>
          Logout
        </Button>
      )}
    </List>
  );

  return (
    <header>
      <MenuIcon onClick={toggleDrawer(true)} className="menu-icon" />
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>

      <img
        src={Logo1}
        alt="Event Maker"
        onClick={() => {
          window.location.href = "/";
        }}
        style={{ cursor: "pointer", width: 160, float: "left" }}
      />

      <Tooltip title={"Hello"} arrow>
        <Button
          style={{ marginTop: 15 }}
          color="primary"
          onClick={() => setOpen(true)}
        >
          <RoomIcon />
          {currentCity}
        </Button>
      </Tooltip>

      {AuthService.isLoggedIn() ? (
        <>
          <Tooltip
            title={`Logged in as ${AuthService.getUserDetails()?.firstName} ${
              AuthService.getUserDetails()?.lastName
            }`}
            arrow
          >
            <Avatar
              alt={
                AuthService.getUserDetails()?.firstName +
                " " +
                AuthService.getUserDetails()?.lastName
              }
              src={AuthService.getUserDetails()?.avatar}
              onClick={() => setShowLogoutModal(!showLogoutModal)}
              style={{
                display: "inline-flex",
                float: "left",
                position: "absolute",
                top: -5,
                marginLeft: 12,
              }}
            />
          </Tooltip>
        </>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          style={{
            color: "white",
            textTransform: "inherit",
            marginLeft: 20,
            borderColor: "dimgray",
            marginTop: 13,
          }}
          onClick={() => (window.location.href = "/login")}
        >
          Sign in
        </Button>
      )}

      <div className="search-div">
        <Button
          color="primary"
          className="add-btn"
          onClick={() => {
            window.location.href = "/create-an-event";
          }}
        >
          Create Event
        </Button>
        {/* <input type="text" placeholder="Search an Event, City or Organiser.." /> */}
        <DebounceInput
          minLength={1}
          debounceTimeout={300}
          placeholder="Search an Event, City or Organiser.."
          onChange={(event) => searchEvent(event)}
        />
        <div className="search-list">
          {searchData?.map((data, i) => {
            return (
              <div
                className="search-list-div"
                key={i}
                onClick={() => openEvent(data)}
              >
                <span className="list-name">{data.eventName}</span>
                <span className="list-date">
                  {CommonService.getDate(data.startDate)}
                </span>
              </div>
            );
          })}
        </div>
        <SearchIcon />
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Not in {currentCity}?
        </DialogTitle>
        <DialogContent>
          {/* <span style={{marginBottom: 10, display: 'block', fontSize: 13}}>Change your location</span> */}
          <TextField
            id="standard-basic"
            className="city-name"
            autoFocus
            label="Enter your city name"
            value={cityName}
            onChange={(e) => getCityName(e)}
          />
          {filteredCity.length > 0 && (
            <div>
              {filteredCity.map((res, i) => {
                return (
                  <li className="list" key={i} onClick={() => setCity(res)}>
                    {formatCityName(res)}
                  </li>
                );
              })}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            className="cancel-location"
          >
            Cancel
          </Button>
          <Button
            onClick={setLocalCity}
            color="primary"
            className="save-location"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
}

export default Header;
