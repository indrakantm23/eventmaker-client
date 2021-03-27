import React, { useState, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import MenuIcon from '@material-ui/icons/Menu';
import Logo1 from './../assets/images/event-maker-logo1.png';
import CommonService from './../components/commonService';
import AuthService from './../auth/AuthService';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import PaymentIcon from '@material-ui/icons/Payment';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import EventIcon from '@material-ui/icons/Event';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {DebounceInput} from 'react-debounce-input';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { CITIES } from './Cities';
import './Header.scss';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Header(props){

    const [state, setState] = useState(false);
    // const [isLoggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [open, setOpen] = useState(false);
    const [filteredCity, setFilteredCity] = useState([]);
    const [cityName, setCityName] = useState('');
    const [searchData, setSearchData] = useState([]);


    const handleClose = () => {
        setOpen(false);
    };
    const toggleDrawer = (open) => (event) => {
        setState(open)
    }
    useEffect(() => {
        // setLoggedIn(localStorage.getItem('isLoggedIn'));
        setUserData({...JSON.parse(localStorage.getItem('userData'))})
    }, [])

    const searchEvent = (e) => {
        let key = e.target.value;
        if(key){
            // setSearchData([]);
            CommonService.searchEvents(key).then((res) => {
                setSearchData(res.data);
            });
        }
        else{
            setSearchData([]);
        }
    }

    const getCityName = (e)=>{
        let str = e.target.value;
        setCityName(str);
        if(str.length > 2) {
            SearchCity(str)
        }else{
            setFilteredCity([]);
        }
    }
    const setCity = (city)=> {
        setFilteredCity([]);
        setCityName(city);
    }

    const setLocalCity = () => {
        CommonService.setCurrentCity(cityName);
        setOpen(false);
        setCityName('');
    }

    const SearchCity = (str) => {
        setFilteredCity(CITIES.filter(a => a.toLowerCase().includes(str.toLowerCase())).slice(0, 5))
    }

    const openEvent = (id) => {
        window.location.href='/event/'+id;
    }

    const list = () => (
        <List>
            <Button className="sidebar-btn" onClick={() => { window.location.href="/" }}><HomeIcon/>Home</Button>
            <Button className="sidebar-btn" onClick={() => { window.location.href="/about" }}><InfoIcon/>About</Button>
            <Button className="sidebar-btn" onClick={() => { window.location.href="/contact-us" }}><EmailIcon/>Contact</Button>
            <Button className="sidebar-btn" onClick={() => { window.location.href="/pricing" }}><PaymentIcon/>Pricing</Button>
            <Button className="sidebar-btn" onClick={() => { window.location.href="/contact" }}><HelpOutlineIcon/>How it works</Button>
            <Button className="sidebar-btn" onClick={() => { window.location.href="/wallet" }}><AccountBalanceWalletIcon/>Wallet</Button>
            <Button className="sidebar-btn" onClick={() => { window.location.href="/bookings" }}><ConfirmationNumberIcon/>My Bookings</Button>
            <Button className="sidebar-btn" onClick={() => { window.location.href="/contact" }}><EventIcon/>My Events</Button>
        </List>
    )

    return(
        <header>
            <MenuIcon onClick={toggleDrawer(true)} className="menu-icon" />
            <Drawer 
                anchor={'left'}
                open={state}
                onClose={toggleDrawer(false)}
            >

                {AuthService.isLoggedIn() ? 
                    <div style={{background: '#06101f', height: 100}}>
                        <Avatar alt={`${AuthService.getUserDetails()?.firstName} ${AuthService.getUserDetails()?.lastName}`} src={userData?.avatar}/>
                        <h4 className="profile-name">{AuthService.getUserDetails()?.firstName} {AuthService.getUserDetails()?.lastName}</h4>
                    </div>
                :
                <Button variant="outlined" color="primary" style={{color: '#000', textTransform: 'inherit', borderColor: 'dimgray', width: 100, margin: '0 auto', marginTop: 13}} onClick={()=> window.location.href="/login"}>
                    Sign in
                </Button>}

                {list()}
            </Drawer>

            <img src={Logo1} onClick={() => { window.location.href="/" }} style={{cursor: 'pointer', width: 160, float: 'left'}}/>

            {/* <Tooltip title={props.currentLocation.city.fullAddress} arrow> */}
            <Button style={{marginTop: 15}} color="primary" onClick={()=>setOpen(true)}><RoomIcon/>{CommonService.getCurrentCity()}</Button>
            {/* </Tooltip> */}

            {AuthService.isLoggedIn() ? 
                <Tooltip title={`Logged in as ${AuthService.getUserDetails()?.firstName} ${AuthService.getUserDetails()?.lastName}`} arrow>
                    <Avatar alt={AuthService.getUserDetails()?.firstName+' '+ AuthService.getUserDetails()?.lastName} src={AuthService.getUserDetails()?.avatar} style={{display: 'inline-flex', float: 'left', position: 'absolute', top: -5, marginLeft: 12}} />
                </Tooltip>
            :
            <Button variant="outlined" color="primary" style={{color: 'white', textTransform: 'inherit', marginLeft: 20, borderColor: 'dimgray', marginTop: 13}} onClick={()=> window.location.href="/login"}>
                Sign in
            </Button>}

            <div className="search-div">
                <Button color="primary" className="add-btn" onClick={() => { window.location.href="/create-an-event" }}>
                    Create Event
                </Button>
                {/* <input type="text" placeholder="Search an Event, City or Organiser.." /> */}
                <DebounceInput
                    minLength={1}
                    debounceTimeout={300}
                    placeholder="Search an Event, City or Organiser.."
                    onChange={event => searchEvent(event)} 
                />
                <div className="search-list">
                    {searchData?.map((data) =>{
                        return(
                            <div className="search-list-div" onClick={()=> openEvent(data.id)}>
                                <span className="list-name">{data.eventName}</span>
                                <span className="list-date">{CommonService.getDate(data.startDate)}</span>
                            </div>
                        )
                    })}
                </div>
                <SearchIcon/>
            </div>


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Not in {CommonService.getCurrentCity()}?</DialogTitle>
                <DialogContent>
                    {/* <span style={{marginBottom: 10, display: 'block', fontSize: 13}}>Change your location</span> */}
                    <TextField id="standard-basic" className="city-name" autoFocus label="Enter your city name" value={cityName} onChange={(e) => getCityName(e)} />
                    <div>
                        
                    </div>
                    {filteredCity.length>0 &&
                    <div>
                        {filteredCity.map((res) => {
                            return(
                                <li className="list" onClick={()=> setCity(res)}>{res}</li>
                            )
                        })}    
                    </div>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" className="cancel-location">
                        Cancel
                    </Button>
                    <Button onClick={setLocalCity} color="primary" className="save-location">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </header>
    )
}

export default Header;