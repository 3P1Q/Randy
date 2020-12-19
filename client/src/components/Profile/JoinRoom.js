import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const JoinRoom = (props) => {

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
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Join
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default JoinRoom