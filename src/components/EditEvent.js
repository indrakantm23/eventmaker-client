import React, { useState, useEffect } from "react";
import CommonService from "./commonService";
import { TICKET_CATEGORIES } from "./common";
import { makeStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  CircularProgress,
  Table,
  Dialog,
  DialogActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Accordion,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  ButtonGroup,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ExpandMoreIcon,
} from "./imports/index";
// import { initAutocomplete } from './../location';

import "./EditEvents.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function EditEvent(props) {
  const classes = useStyles();

  // DEFINE STATES
  const [eventData, setEventData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedTicketCategory, setSelectedTicketCategory] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const setStateData = (event, key) => {
    setEventData((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  const updateTicketCategory = (event, key) => {
    setSelectedTicketCategory((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  const setLocationFromLocalStorage = () => {
    setEventData(
      JSON.parse(localStorage.getItem("eventdetails")).full_address,
      "full_address"
    );
  };

  const SaveUpdatedTicket = () => {
    let data = eventData;
    let arr = data.ticketCategory;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === selectedTicketCategory.id) {
        Object.assign(arr[i], selectedTicketCategory);
        console.log(data);
      }
    }
    setEventData(data);
    setOpen(false);
  };

  const saveAndUpdate = () => {
    CommonService.updateEvent(eventData?._id, eventData).then((res) => {
      setTimeout(res.result);
      CommonService.showToast(res.message);
      setTimeout(() => {
        props.history.goBack();
      }, 1000);
    });
  };

  // FUNCTION CALLS
  useEffect(() => {
    const id = props?.history?.location?.state.eventId;
    // initAutocomplete();
    CommonService.getAnEvent(id).then((res) => {
      setEventData(res.event);
      setLoader(false);
    });
    return () => {
      // console.log('Edit event end')
    };
  }, [props]);

  return (
    <div>
      <div className="sub-container">
        <h1>Edit Event</h1>
        {eventData && (
          <div className={classes.root}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={(classes.heading, "expand-title")}>
                  Event Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Event Name"
                    type="text"
                    variant="outlined"
                    value={eventData?.eventName}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setStateData(e, "eventName")}
                  />
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Event Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={(e) => setStateData(e, "eventCategory")}
                    label="Event Category"
                    defaultValue=""
                  >
                    {TICKET_CATEGORIES?.map((el, i) => {
                      return (
                        <MenuItem value={el.toLowerCase()} key={i}>
                          {el}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    value={eventData?.startDate}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setStateData(e, "startDate")}
                  />
                </FormControl>
              </AccordionDetails>
              <AccordionDetails>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="End Date"
                    type="date"
                    variant="outlined"
                    value={eventData?.endDate}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setStateData(e, "endDate")}
                  />
                </FormControl>
                <FormControl className={(classes.formControl, "time-inp")}>
                  <TextField
                    label="Start Time"
                    type="time"
                    variant="outlined"
                    value={eventData?.startTime}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setStateData(e, "startTime")}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="End Time"
                    type="time"
                    variant="outlined"
                    value={eventData?.endTime}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setStateData(e, "endTime")}
                  />
                </FormControl>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={(classes.heading, "expand-title")}>
                  Location Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl className={classes.formControl}>
                  <RadioGroup
                    aria-label="ticketing"
                    name="mode"
                    value={eventData.eventMode}
                    onChange={(e) => setStateData(e, "eventMode")}
                    className="radiogroup"
                  >
                    <FormControlLabel
                      value="Online"
                      control={<Radio color="default" />}
                      label="Online / Virtually"
                    />
                    <FormControlLabel
                      value="Venue"
                      control={<Radio color="default" />}
                      label="Venue"
                    />
                  </RadioGroup>
                </FormControl>
                {eventData?.eventMode === "Online" ? (
                  <FormControl className={classes.formControl}>
                    <TextField
                      label="Online URL"
                      type="text"
                      variant="outlined"
                      value={eventData?.onlineURL}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setStateData(e, "onlineURL")}
                    />
                  </FormControl>
                ) : (
                  <div>
                    <TextField
                      label="Event Location"
                      type="text"
                      variant="outlined"
                      value={eventData?.full_address}
                      InputLabelProps={{ shrink: true }}
                      onBlur={() => setLocationFromLocalStorage()}
                      id="pac-input"
                    />
                    <div id="map"></div>
                  </div>
                )}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={(classes.heading, "expand-title")}>
                  Payment Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={"column-flex"}>
                <FormControl className={classes.formControl}>
                  <RadioGroup
                    aria-label="ticketing"
                    name="entry"
                    value={eventData.entryMode}
                    onChange={(e) => setStateData(e, "entryMode")}
                    className="radiogroup"
                  >
                    <FormControlLabel
                      value="free"
                      control={<Radio color="default" />}
                      label="Free Entry"
                    />
                    <FormControlLabel
                      value="paid"
                      control={<Radio color="default" />}
                      label="Paid Entry"
                    />
                  </RadioGroup>
                </FormControl>
                {eventData.entryMode === "free" ? (
                  <FormControl className={classes.formControl}>
                    <TextField
                      label="Total seats available"
                      type="text"
                      variant="outlined"
                      value={eventData?.avlSeats}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setStateData(e, "avlSeats")}
                    />
                  </FormControl>
                ) : (
                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Category</TableCell>
                          <TableCell align="left">Amount</TableCell>
                          <TableCell align="left">Seats</TableCell>
                          <TableCell align="left">Description</TableCell>
                          <TableCell align="left">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {eventData?.ticketCategory?.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell align="left">{row.category}</TableCell>
                            <TableCell align="left">₹{row.amount}</TableCell>
                            <TableCell align="left">{row.seats}</TableCell>
                            <TableCell align="left">
                              {row.description}
                            </TableCell>
                            <TableCell align="left">
                              <ButtonGroup
                                disableElevation
                                variant="outlined"
                                color="primary"
                              >
                                <Button
                                  onClick={() => {
                                    setSelectedTicketCategory(row)
                                    setOpen(true)
                                  }}
                                >
                                  <span className="material-icons">edit</span>
                                </Button>
                                <Button>
                                  <span className="material-icons">delete</span>
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </AccordionDetails>
            </Accordion>

            <Dialog
              open={open}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogContent>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Ticket Category"
                    type="text"
                    variant="outlined"
                    value={selectedTicketCategory?.category}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => updateTicketCategory(e, "category")}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Ticket Amount"
                    type="text"
                    variant="outlined"
                    value={selectedTicketCategory?.amount}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => updateTicketCategory(e, "amount")}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Total seats available"
                    type="text"
                    variant="outlined"
                    value={selectedTicketCategory?.seats}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => updateTicketCategory(e, "seats")}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Description"
                    type="text"
                    variant="outlined"
                    value={selectedTicketCategory?.description}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => updateTicketCategory(e, "description")}
                  />
                </FormControl>
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
                  onClick={() => {
                    SaveUpdatedTicket();
                  }}
                  color="primary"
                  className="save-location"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>

            <div className="update-btn-div">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => saveAndUpdate()}
              >
                Save and Update
              </Button>
            </div>
          </div>
        )}
      </div>
      <Backdrop open={loader}>
        <CircularProgress color="inherit" style={{ color: "#fff" }} />
      </Backdrop>
    </div>
  );
}

export default EditEvent;
