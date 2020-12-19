import React, { useContext, useState } from 'react';

import Picture from '../Picture/Picture';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import Vidcall from './Vidcall';

import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';
import CreateRoomIcon from '@material-ui/icons/Add';
import JoinRoomIcon from '@material-ui/icons/GroupAdd';
import LogOut from '@material-ui/icons/PowerSettingsNew';

import {logUserContext} from '../../App';

// import data from './data';

import './Profile.css';

const Profile = () => {
    const [logUser, setLogUser] = useContext(logUserContext);
    const [joinOpen, setJoinOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const data = logUser;

    function createRoomCard(room, index){
        return (
            <div key={index} className="room-card">
                <h2>{room.name}</h2>
                <h3>ID : {room.roomid}</h3>
                <h3 className="room-role">Role : {room.role}</h3>
            </div>
        )
    }
    return (
        <div className="profile-page">
            <div className="user-section">
                <div className="profile-page-user">
                    <div className="profile-page-user-img">
                        <Picture src={data.profilePic} name={data.name} />
                    </div>
                    <div className="profile-page-user-name">
                        {data.name}
                    </div>
                </div>
                <div className="profile-user-buttons">
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <ListItem button>
                            <ListItemIcon>
                                <CreateRoomIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create a new Room" onClick={()=>setCreateOpen(true)}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <JoinRoomIcon />
                            </ListItemIcon>
                            <ListItemText primary="Join a new Room" onClick={()=>setJoinOpen(true)}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <LogOut />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </div>
            </div>
            <div className="rooms-section">
                <h2 className="rooms-heading">Enter a Room</h2>
                <div className="rooms">
                    {typeof data.rooms !== 'undefined' && data.rooms.map(createRoomCard)}
                </div>
            </div>
            <JoinRoom joinOpen={joinOpen} setJoinOpen={setJoinOpen} setLogUser={setLogUser}/>
            <CreateRoom createOpen={createOpen} setCreateOpen={setCreateOpen} setLogUser={setLogUser}/>

            {/* <Vidcall /> */}
        </div>
    )
}

export default Profile;