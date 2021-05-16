import React, { useState, useEffect } from 'react';
import CommonService from './commonService';
import { initAutocomplete } from './../location';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './EditEvents.scss';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
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


    const setStateData = (event, key) => {
        setEventData((prevState) => ({
           ...prevState,
           [key]: event.target.value
        }));
    }

    const setLocationFromLocalStorage = () => {
        setEventData(JSON.parse(localStorage.getItem('eventdetails')).full_address, 'full_address')
    }

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
        }
    }, [props]);

    return (
        <div>
            <div className="sub-container">
                <h1>Edit Event</h1>
                {eventData && 
                <div className={classes.root}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading, 'expand-title'}>
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
                                    onChange={(e)=> setStateData(e, 'eventName')}
                                />
                            </FormControl>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Event Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={(e)=> setStateData(e, 'eventCategory')}
                                    label="Age"
                                >
                                    {CommonService.categoryOptions().map((el, i) => {
                                        return(
                                            <MenuItem value={el} key={el} selected>{el}</MenuItem>    
                                        )
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
                                    onChange={(e)=> setStateData(e, 'startDate')}
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
                                    onChange={(e)=> setStateData(e, 'endDate')}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl, 'time-inp'}>
                                <TextField 
                                    label="Start Time" 
                                    type="time" 
                                    variant="outlined" 
                                    value={eventData?.startTime} 
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e)=> setStateData(e, 'startTime')}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField 
                                    label="End Time" 
                                    type="time" 
                                    variant="outlined" 
                                    value={eventData?.endTime} 
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e)=> setStateData(e, 'endTime')}
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
                            <Typography className={classes.heading, 'expand-title'}>
                                Location Details
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl className={classes.formControl}>
                                    <RadioGroup aria-label="ticketing" name="mode" value={eventData.eventMode} onChange={(e)=> setStateData(e, 'eventMode')} className="radiogroup">
                                        <FormControlLabel value="Online" control={<Radio color="default"/>} label="Online / Virtually" />
                                        <FormControlLabel value="Venue" control={<Radio color="default"/>} label="Venue" />
                                    </RadioGroup>
                                </FormControl>
                                {eventData?.eventMode == 'Online' ?
                                <FormControl className={classes.formControl}>
                                    <TextField 
                                        label="Online URL" 
                                        type="text" 
                                        variant="outlined" 
                                        value={eventData?.onlineURL} 
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e)=> setStateData(e, 'onlineURL')}
                                    />
                                </FormControl>
                                :
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
                                    }
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading, 'expand-title'}>
                                Payment Details
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={'column-flex'}>
                            <FormControl className={classes.formControl}>
                                <RadioGroup aria-label="ticketing" name="entry" value={eventData.entryMode} onChange={(e)=> setStateData(e, 'entryMode')} className="radiogroup">
                                    <FormControlLabel value="free" control={<Radio color="default"/>} label="Free Entry" />
                                    <FormControlLabel value="paid" control={<Radio color="default"/>} label="Paid Entry" />
                                </RadioGroup>
                            </FormControl>
                            {eventData.entryMode === 'free' ? 
                                <FormControl className={classes.formControl}>
                                    <TextField 
                                        label="Total seats available" 
                                        type="text" 
                                        variant="outlined" 
                                        value={eventData?.avlSeats} 
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e)=> setStateData(e, 'avlSeats')}
                                    />
                                </FormControl>
                            :
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
                                        <TableCell align="left">{row.description}</TableCell>
                                        <TableCell align="left">
                                        <ButtonGroup disableElevation variant="outlined" color="primary">
                                            <Button>
                                                <span class="material-icons">edit</span>
                                            </Button>
                                            <Button>
                                                <span class="material-icons">delete</span>
                                            </Button>
                                        </ButtonGroup>
                                        </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            }
                        </AccordionDetails>
                    </Accordion>

                        <div className="update-btn-div">
                            <Button variant="outlined" color="secondary">
                                Save and Update
                            </Button>
                        </div>


                    </div>
                    }
            </div>
            <Backdrop open={loader}>
                    <CircularProgress color="inherit" style={{'color': '#fff'}}/>
            </Backdrop>
        </div>
    )
}


export default EditEvent;