import React, { useState } from 'react';
import './../components/common.scss';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import CommonService from './../components/commonService';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Label } from './../components/pages/FormFields';

export default function Login(props) {

    function validateInput(e){
        let val = e.target.value;
        if(val === ''){
            e.target.style.border='1px solid red !important'
        }
    }


    const useStylesBootstrap = makeStyles((theme) => ({
        arrow: {
          color: '#c76358',
        },
        tooltip: {
          backgroundColor: '#c76358',
        },
      }));
    function BootstrapTooltip(props) {
        const classes = useStylesBootstrap();
      
        return <Tooltip arrow classes={classes} {...props} />;
      }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [message, setErrorMessage] = useState('');


    function Login(e) {
        e.preventDefault()
        if(email !== '' && password !== ''){
            CommonService.loginUser({email, password}).then((res) => {
                if(res.user){
                    localStorage.setItem("user", JSON.stringify(res.user));
                    localStorage.setItem('loggedIn', true)
                    props.history.push({
                        pathname: props.location.state && props.location.state.url ? props.location.state.url : '/',
                        state: { url: props.location.pathname },
                    });
                    window.location.reload()
                }
                else {
                    setShowErrorMessage(true);
                    setErrorMessage(res.info.message);
                }
            })
        }
        else{
            setShowErrorMessage(true);
            setErrorMessage('Email and Password can not be empty');
        }
    }


    return (
        <div className="login-div">
            

            <form style={{display: 'block', margin: '0 auto', width: '40%'}} onSubmit={(e)=> Login(e)}>
                {showErrorMessage && 
                    <Alert severity="error" color="warning">
                        {message}
                    </Alert>
                }
                <h5 className="heading">Login to continue </h5>
                <div className="form-input-container" style={{position: 'relative', width: 310}}>
                    <Label 
                        label="Email" 
                        isRequired={true} 
                    />
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="input-field" 
                        style={{width: 300}} 
                        onBlur={validateInput, ()=>setEmailFocused(true)} 
                        onChange={(e)=> setEmail(e.target.value)} 
                        value={email} 
                    />
                        {emailFocused && email === '' && 
                        <BootstrapTooltip title="Email can not be empty">
                            <InfoIcon className="info-icon"  />
                        </BootstrapTooltip>
                        }

                </div>

                <div className="form-input-container" style={{position: 'relative', width: 310}}>
                    <Label 
                        label="Password" 
                        isRequired={true} 
                    />
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="input-field" 
                        style={{width: 300}} 
                        onBlur={validateInput, ()=>setPasswordFocused(true)} 
                        onChange={(e)=> setPassword(e.target.value)} 
                        value={password} 
                    />
                    {passwordFocused && password === '' && 
                        <BootstrapTooltip title="Password can not be empty">
                            <InfoIcon className="info-icon"  />
                        </BootstrapTooltip>
                    }
                </div>
                <button type="submit" className="continue-btn">Login</button>
                <span className="not-a-member">Not yet a Member? <a onClick={()=> props.history.push("/signup")} className="anchor">Sign up</a></span>
            </form>
        </div>
    )
}
