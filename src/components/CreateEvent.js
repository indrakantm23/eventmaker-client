import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EventForm from './pages/Form';
import PaymentForm from './pages/PaymentForm';
import AlertMessage from './../shared/Alert';
import './common.scss';
import CommonService from './commonService';

class CreateEvent extends Component{
    constructor(props){
        super(props);
        this.state = {
            loader: false,
            activeStep: 0,
            eventBanner: null
        }
    }




      
      setActiveStep = (step) => {
          this.activeStep = step;
      }

      // handleNext = () => {
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // };

      // handleBack = () => {
      //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
      // };

      // handleReset = () => {
      //   setActiveStep(0);
      // };


      GetComponent(){
        switch(this.state.activeStep) {
          case 0:
            return <EventForm onclick={this.changeHandle} />
          case 1:
            return <PaymentForm onclick={this.handlePaymentSetup} />
            
        }
      }

      changeHandle = (e) => {
        console.log(e)
        localStorage.setItem('eventdetails', JSON.stringify(e))
        this.setState({ activeStep: this.state.activeStep+1 });
        window.scrollTo(0,0);
      }

      handlePaymentSetup = (e)=> {
        
        localStorage.setItem('paymentdetails', JSON.stringify(e))
        this.setState({ activeStep: this.state.activeStep+1 });
        let eventData = JSON.parse(localStorage.getItem('eventdetails'));
        let paymentData = JSON.parse(localStorage.getItem('paymentdetails'));
        const obj = Object.assign(eventData, paymentData)
        
        console.log(obj)
        
        CommonService.saveEvent(obj).then((res) => {
          <AlertMessage label='Your event has been published'/>
          console.log(res);
            localStorage.removeItem('eventdetails')
            localStorage.removeItem('paymentdetails')
            localStorage.removeItem('full_address')
            localStorage.removeItem('evtLat')
            localStorage.removeItem('state')
            localStorage.removeItem('city')
            localStorage.removeItem('country')
            localStorage.removeItem('evtLng')
        })
      }

    render(){
      // const classes = useStyles();
      const steps = getSteps();
        return(
            <div className="create-event-div">
                <h1>Create an Event</h1>
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                </Stepper>

                  {this.GetComponent()}

                <Backdrop open={this.state.loader}>
                    <CircularProgress color="inherit" style={{'color': '#fff'}}/>
                </Backdrop>
            </div>
        )
    }
}

function getSteps() {
  return ['Add Event Venue and Details', 'Setup Payment & Ticketing Method', 'Publish Your Event'];
}

// function getStepContent(stepIndex) {
//   switch (stepIndex) {
//     case 0:
//       return 'Select campaign settings...';
//     case 1:
//       return 'What is an ad group anyways?';
//     case 2:
//       return 'This is the bit I really care about!';
//     default:
//       return 'Unknown stepIndex';
//   }
// }

export default CreateEvent;
