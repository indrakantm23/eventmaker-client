import React, { useState, useEffect } from 'react';
import './../components/common.scss';
import { storage } from './../components/firebase-store';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import BackupIcon from '@material-ui/icons/Backup';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Label } from './../components/pages/FormFields';
import CommonService from './../components/commonService';

export default function Signup(props) {

    function validateInput(e){
        let val = e.target.value;
        if(val == ''){
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

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstnameFocused, setFirstnameFocused] = useState(false);
    const [lastnameFocused, setLastNameFocused] = useState(false);
    const [avatar, setProfileImage] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [loader, setLoader] = useState(false);
    const [registered, setRegistered] = useState(false);


    // UPLOAD IMAGE TO FIREBASE
    function uploadFile (e){
        setLoader(true);
        if(e.target.files[0]){
            let file = e.target.files[0];
            
            const uploadTask = storage.ref(`bucket/${file.name}`).put(file);
            uploadTask.on("state_changed", snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage.ref("bucket")
                .child(file.name)
                .getDownloadURL()
                .then(url => {
                console.log(url)
                setProfileImage(url)
                setLoader(false);
                })
            }
            )
        }
        }
    

    function Register(e) {
        e.preventDefault()
        console.log(avatar)
        if(firstName !== '' && lastName !== '' && email !== '' && password !== ''){
            setLoader(true);
            CommonService.regiserUser({firstName, lastName, email, password, avatar}).then((res) => {
                console.log(res)
                setLoader(false);
                setRegistered(true);
                setTimeout(()=> {
                    window.location.href="/login"
                }, 2000)
            })
        }
        else{
            setShowErrorMessage(true);
        }
    }


    return (
        <div className="login-div">
            
        {!registered ? 
            <form style={{display: 'block', margin: '0 auto', width: '40%'}} onSubmit={(e)=> Register(e)}>
                {showErrorMessage && 
                    <Alert severity="error" color="warning">
                        All fields are mandatory
                    </Alert>
                }
                <h5 className="heading">Register for complete access </h5>
                <div className="form-input-container" style={{position: 'relative', width: 310}}>
                    <Label 
                        label="First Name" 
                        isRequired={true} 
                    />
                    <input 
                        type="text" 
                        placeholder="Enter your First name" 
                        className="input-field" 
                        style={{width: 300}} 
                        onBlur={validateInput, ()=>setFirstnameFocused(true)} 
                        onChange={(e)=> setFirstName(e.target.value)} 
                        value={firstName} 
                    />
                        {firstnameFocused && firstName === '' && 
                        <BootstrapTooltip title="First Name can not be empty">
                            <InfoIcon className="info-icon"  />
                        </BootstrapTooltip>
                        }

                </div>

                <div className="form-input-container" style={{position: 'relative', width: 310}}>
                    <Label 
                        label="Last Name" 
                        isRequired={true} 
                    />
                    <input 
                        type="text" 
                        placeholder="Enter your Last name" 
                        className="input-field" 
                        style={{width: 300}} 
                        onBlur={validateInput, ()=>setLastNameFocused(true)} 
                        onChange={(e)=> setLastName(e.target.value)} 
                        value={lastName} 
                    />
                        {lastnameFocused && lastName === '' && 
                        <BootstrapTooltip title="Last Name can not be empty">
                            <InfoIcon className="info-icon"  />
                        </BootstrapTooltip>
                        }

                </div>
                
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

                <div className="form-input-container" style={{position: 'relative', width: 310}}>
                    <Label 
                        label="Upload profile photo" 
                        isRequired={true} 
                    />
                    <input 
                        type="file" 
                        id="img" 
                        name="eventmaker" 
                        accept="video/*|image/*;capture=camera" 
                        style={{display: 'none'}}
                        onChange={(e)=> {uploadFile(e)}} 
                    />
                    {avatar ? 
                        <img src={avatar} className="selected-img" /> : 
                        <div className="upload-img-div" onClick={()=> document.getElementById('img').click()}>
                            <BackupIcon/>
                        </div>                    
                    }

                </div>
                <button type="submit" className="continue-btn">Register</button>
                <span className="not-a-member">Already a Member? <a onClick={()=> props.history.push("/login")} className="anchor">Sign in</a></span>
            </form>
            : 
            <Alert severity="success">You have registered Successfully.</Alert>
            }

            {/* <Backdrop open={loader}>

            </Backdrop> */}
            {loader &&
                <div className="backdrop">
                    <CircularProgress color="inherit" style={{'color': '#FFF'}}/>
                </div>
            }

        </div>
    )
}
