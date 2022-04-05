import React from 'react';
import Logo1 from './../assets/images/event-maker-logo1.png';
import './Footer.scss';


function Footer() {
    return (
        <footer>
            <img alt="Event Maker" src={Logo1} style={{width: 160, float: 'left'}}/>
        </footer>
    )
}

export default Footer;