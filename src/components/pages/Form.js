import React, { useState, useEffect } from 'react';
import {initAutocomplete} from './../../location';
import { Input, Label } from './FormFields';
import { storage } from './../firebase-store';
import CommonService from './../commonService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import BackupIcon from '@material-ui/icons/Backup';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import './../common.scss';


 function EventForm(props){
    
    useEffect(()=> {
        initAutocomplete();
    }, [])

    const [eventName, setEventName] = useState('');
    const [startDate, setStartDate] = useState(getCurrentDate());
    const [endDate, setEndDate] = useState(getCurrentDate());
    const [startTime, setStartTime] = useState(getCurrentTime());
    const [endTime, setEndTime] = useState(getCurrentTime());
    const [location, setLocation] = useState('');
    // const [fullAddress, setFullAddress] = useState('');
    // const [description, setDescription] = useState(EditorState.createEmpty());
    const [description, setDescription] = useState('');
    const [banner, setBanner] = useState('');
    const [eventMode, setEventMode] = useState('');
    const [onlineURL, setOnlineURL] = useState('');
    const [loader, setLoader] = useState(false);
    // const [editorState, setEditorState] = useState(EditorState.createEmpty());


    const clickEventBtn = () => {
        const data = {
            eventName,
            eventMode,
            startDate,
            endDate,
            startTime,
            endTime,
            city: sessionStorage.getItem('city'),
            state: sessionStorage.getItem('state'),
            country: sessionStorage.getItem('country'),
            full_address: sessionStorage.getItem('full_address'),
            evtLat: sessionStorage.getItem('evtLat'),
            evtLng: sessionStorage.getItem('evtLng'),
            description,
            banner,
            posted_on: new Date().toISOString(),
            organiser: JSON.parse(localStorage.getItem('userData'))       
        }
        props.onclick(data)
    }
    
    const onEditorStateChange = (editorState) => {
            setDescription(editorState)
      };

    const PostEvent = (e) => {
        e.preventDefault();
        // setLoader(true);
        // // let location = document.getElementById('pac-input')?.value;
        // let data = {
        //     eventName,
        //     eventMode,
        //     startDate,
        //     endDate,
        //     startTime,
        //     endTime,
        //     city: sessionStorage.getItem('city'),
        //     state: sessionStorage.getItem('state'),
        //     country: sessionStorage.getItem('country'),
        //     full_address: sessionStorage.getItem('full_address'),
        //     evtLat: sessionStorage.getItem('evtLat'),
        //     evtLng: sessionStorage.getItem('evtLng'),
        //     description,
        //     banner       
        // }
        // CommonService.saveEvent(data).then((res) => {
        //     console.log(res);
        //     setLoader(false);
        // })
      }
      
    const uploadFile = (e) => {
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
                setBanner(url)
                setLoader(false);
                })
            }
            )
        }
    }

    

    return(
        <div style={{marginTop: 30, marginBottom: 30}}>
            <form onSubmit={(e)=> PostEvent(e)}>
            <div className="form-input-container">
                <Label 
                    label="Enter event name" 
                    isRequired={true} 
                />
                <input 
                    type="text" 
                    placeholder="Enter the name of your Event" 
                    style={{width: 400}} 
                    className="input-field" 
                    value={eventName}
                    onChange={(e)=> setEventName(e.target.value)} 
                />
            </div>

            <div className="form-input-container">
                <Label 
                    label="Select Start Time" 
                    isRequired={true} 
                />

                <input 
                    type="date" 
                    style={{width: 230, marginRight: 15}} 
                    className="input-field datepicker" 
                    value={startDate}
                    onChange={(e)=> setStartDate(e.target.value)} 
                />
                <input 
                    type="time" 
                    style={{width: 140, marginRight: 15}} 
                    className="input-field" 
                    value={startTime}
                    onChange={(e)=> setStartTime(e.target.value)} 
                />

                {/* <a className="anchor-non-hyper" onClick={()=>isHasEndDate(!hasEndDate)}>{hasEndDate ? 'Remove' : 'Add'} End Time</a> */}
            </div>

            {/* {endDate &&  */}
            <div className="form-input-container">
                <Label 
                    label="Select End Time" 
                    isRequired={true} 
                />
                <input 
                    type="date" 
                    style={{width: 230, marginRight: 15}} 
                    className="input-field" 
                    id="datepicker"
                    value={endDate}
                    onChange={(e)=> setEndDate(e.target.value)} 
                />
                <input 
                    type="time" 
                    style={{width: 140, marginRight: 15}} 
                    className="input-field" 
                    value={endTime}
                    onChange={(e)=> setEndTime(e.target.value)} 
                />
            </div>
            {/* } */}

            <div className="form-input-container">
                <Label 
                    label="Event Location" 
                    isRequired={true} 
                />
                <select className="input-field" onChange={(e)=> setEventMode(e.target.value)} style={{width: 414}}>
                    <option>Select</option>
                    <option value="Online">Online / Virtually</option>
                    <option value="Venue">Venue</option>
                </select>
            </div>

            {eventMode == 'Online' ?
                <div className="form-input-container">
                    <Label 
                        label="Enter online URL" 
                        isRequired={true} 
                    />
                    <input 
                        type="text" 
                        placeholder="Enter the URL to connect to event" 
                        style={{width: 400}} 
                        className="input-field" 
                        value={onlineURL}
                        id="online"
                        onChange={(e)=> setOnlineURL(e.target.value)} 
                    />
            </div>
            :
            <div className="form-input-container">
                <Label 
                    label="Location Name" 
                    isRequired={true} 
                />
                <input 
                    type="text" 
                    placeholder="Enter the place of Event" 
                    style={{width: 400}} 
                    className="input-field"
                    id="pac-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                    <div id="map"></div>
            </div>}
            
            <div className="form-input-container" style={{position: 'relative', width: 390}}>
                    <Label 
                        label="Upload Event Banner" 
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
                    {banner ? 
                        <img src={banner} className="selected-img" /> : 
                        <div className="upload-img-div" onClick={()=> document.getElementById('img').click()}>
                            <BackupIcon/>
                        </div>                    
                    }

                </div>

            <div className="form-input-container">
                <Label 
                    label="Description" 
                    isRequired={true} 
                />
                <textarea 
                    type="text" 
                    placeholder="Enter the Description" 
                    style={{width: 400, resize: 'none', height: 90}} 
                    className="input-field"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {/* <Editor
                    editorState={description}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                /> */}
            </div>

            <button type="button" className="continue-btn" onClick={()=> clickEventBtn()} >
                <span>Continue to Payment method setup</span>
                <ArrowForwardIcon/>
            </button>
            </form>

            <Backdrop open={loader}>
                    <CircularProgress color="inherit" style={{'color': '#fff'}}/>
            </Backdrop>
        </div>
    )
}

function getCurrentDate(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month < 10 ? '0'+month : month}-${day < 10 ? '0'+day : day}`;
}

function getCurrentTime(){
    let time = new Date().toLocaleTimeString();
    time = time.split(':');
    return( `${time[0] < 10 ? "0"+time[0] : time[0]}:${time[1]}`)
}

export default EventForm;
