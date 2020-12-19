import React, { useContext } from 'react';

import Picture from '../Picture/Picture';

import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';
import CreateRoom from '@material-ui/icons/Add';
import JoinRoom from '@material-ui/icons/GroupAdd';
import LogOut from '@material-ui/icons/PowerSettingsNew';

import {logUserContext} from '../../App';

// import data from './data';

import './Profile.css';

const Profile = () => {
    const [logUser] = useContext(logUserContext);
    const data = logUser

    function createRoomCard(room, index){
        return (
            <div key={index} className="room-card">
                <h2>{room.name}</h2>
                <h3>ID : {room.id}</h3>
                <h3 className="room-role">Role : {room.role}</h3>
            </div>
        )
    }
    console.log(logUser);
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
                                <CreateRoom />
                            </ListItemIcon>
                            <ListItemText primary="Create a new Room" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <JoinRoom />
                            </ListItemIcon>
                            <ListItemText primary="Join a new Room" />
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
                    {data.rooms.map(createRoomCard)}
                </div>
            </div>
        </div>
    )
}

export default Profile;