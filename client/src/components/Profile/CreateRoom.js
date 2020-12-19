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

import {uuid} from 'uuidv4';

axios.defaults.withCredentials = true;

const CreateRoom = (props) => {

    const [newRoom, setNewRoom] = useState("");

    const newRoomCreated = async () => {
        const id = uuid();
        console.log(id);
        const res = await axios.post("http://localhost:5000/api/createroom", querystring.stringify({roomid: id, name: newRoom}));
        const data = res.data;
        props.setLogUser((prev) => ({
            ...prev,
            rooms : [...prev.rooms, {name: data.name, roomid: data.roomid, role:"admin"}]
        }))
        setNewRoom('');
        props.setCreateOpen(false);
    }

    const handleClose = () => {
        props.setCreateOpen(false);
      };

    return (
        <div>
            <Dialog open={props.createOpen} onClose={handleClose} aria-labelledby="join-room">
                <DialogTitle id="form-dialog-title">Create a New Room</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    After creating a new room, share the unique ID with others so that they can hop in.
                    The ID will be generated automatically.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Room Name"
                    type="text"
                    fullWidth
                    value={newRoom}
                    onChange={(e)=>setNewRoom(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={newRoomCreated} color="primary">
                    Join
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateRoom;