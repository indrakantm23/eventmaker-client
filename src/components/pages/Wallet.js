import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AuthService from '../../auth/AuthService';
import './Wallet.scss';

function Wallet(props) {
    let history = useHistory();
    useEffect(() => {   
        if(!AuthService.isLoggedIn()){
            history.push({ 
              pathname: "/login", 
              state: { url: history.location.pathname }
            })
          }
    }, []);
    return (
        <div className="wallet-container">
            <span className="material-icons icon">account_balance_wallet</span>
            <h1>₹0.00</h1>
            <button className="add-amt">Add amount</button>
        </div>
    )
}

export default Wallet;