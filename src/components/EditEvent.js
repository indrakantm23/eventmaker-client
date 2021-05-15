import React, { useState, useEffect } from 'react';
import CommonService from './commonService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
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

    const setStateData = (e) => {
        console.log(e)
    }

    // FUNCTION CALLS
    useEffect(() => {
        const id = props?.history?.location?.state.eventId;
        CommonService.getAnEvent(id).then((res) => {
            setEventData(res.event);
            setLoader(false);
        });
        return () => {
            console.log('Edit event end')
        }
    }, [props]);

    return (
        <div>
            {eventData && 
            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading, 'expand-title'}>Event Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl className={classes.formControl}>
                            <TextField 
                                label="Event Name" 
                                type="text" 
                                variant="outlined" 
                                value={eventData?.eventName} 
                                InputLabelProps={{ shrink: true }}
                                onChange={(e)=> setStateData(e)}
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
                    <Typography className={classes.heading, 'expand-title'}>Location Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading, 'expand-title'}>Payment Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                </div>
                }
            <Backdrop open={loader}>
                    <CircularProgress color="inherit" style={{'color': '#fff'}}/>
            </Backdrop>
        </div>
    )
}


export default EditEvent;