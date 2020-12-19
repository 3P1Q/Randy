import React, { useContext, useEffect, useState } from 'react';
import {Button} from '@material-ui/core';

import Vidcall from '../Profile/Vidcall';

import {logUserContext} from '../../App';

import axios from 'axios';
import querystring from 'querystring';


import './Room.css';


axios.defaults.withCredentials = true;

const Room = (props) => {
    const [logUser] = useContext(logUserContext);
    const [roomname, setRoomName] = useState("");
    const [callTo, setCallTo] = useState("");

    const roomid = props.routerProps.match.params.roomid;
    // var roomname = "";
    const rooms = logUser.rooms;
    console.log(rooms);
    useEffect(()=>{
    if(typeof logUser.rooms !== 'undefined'){
        console.log("entered");
        for(let room of logUser.rooms){
            if(room.roomid === roomid){
                setRoomName(room.name);
            }
        }
    }
    },[logUser, roomid])

    async function connectRequested(){
        // const res = await axios.post("/api/connectuser", querystring.stringify({roomid: roomid}));
        // console.log(res.data);
        setCallTo("hello")
    }
    
    console.log(roomid);
    return(
        <div className="room">
            <div className="room-details">
                <h1>{roomname}</h1>
                <h3>ID: {roomid}</h3>
            </div>
            <div className='call-screen'>
                <Vidcall callTo={callTo}/>
            </div>
            <div className="connect-option">
                <h1>When you are ready to connect, click below :)</h1>
                <Button variant="contained" color="secondary" onClick={connectRequested}>
                    CONNECT
                </Button>
                <Button variant="contained" color="primary">
                    CANCEL
                </Button>
            </div>
        </div>
    )
}

export default Room