import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';
import querystring from 'querystring';
axios.defaults.withCredentials = true;

const JoinRoom = (props) => {

    const [addRoom, setAddRoom] = useState("");

    const newRoomAdded = async () => {
        const res = await axios.post("/api/joinroom", querystring.stringify({roomid: addRoom}));
        const data = res.data;
        console.log(data);
        props.setLogUser((prev) => ({
            ...prev,
            rooms : [...prev.rooms, {name: data.name, roomid: data.roomid, role:"member"}]
        }))
        setAddRoom('');
        props.setJoinOpen(false);
    }

    const handleClose = () => {
        props.setJoinOpen(false);
      };

    return (
        <div>
            <Dialog open={props.joinOpen} onClose={handleClose} aria-labelledby="join-room">
                <DialogTitle id="form-dialog-title">Join a New Room</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Enter the unique ID of the room you want to join.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Room ID"
                    type="text"
                    fullWidth
                    value={addRoom}
                    onChange={(e)=>setAddRoom(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={newRoomAdded} color="primary">
                    Join
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default JoinRoom