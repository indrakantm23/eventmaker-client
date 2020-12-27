import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


import './Header.scss';


function Header(props){

    const [state, setState] = React.useState(false);
    
    const toggleDrawer = (open) => (event) => {
        setState(open)
    }

    const list = () => (
        <List>
            <ListItem onClick={() => { window.location.href="/" }}>Home</ListItem>
            <ListItem onClick={() => { window.location.href="/about" }}>About</ListItem>
            <ListItem onClick={() => { window.location.href="/contact" }}>Contact</ListItem>
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
                {list()}
            </Drawer>

            <h1 onClick={() => { window.location.href="/" }} style={{cursor: 'pointer'}}>Event Maker</h1>
            <Tooltip title={props.currentLocation.city.fullAddress} arrow>
                <Button color="primary"><RoomIcon/>{props.currentLocation.city.currentCity}</Button>
            </Tooltip>
            
            <div className="search-div">
                <Button color="primary" className="add-btn" onClick={() => { window.location.href="/create-an-event" }}>
                    Create Event
                </Button>
                <input type="text" placeholder="Search an Event, City or Organiser.." />
                <SearchIcon/>
            </div>
        </header>
    )
}

export default Header;