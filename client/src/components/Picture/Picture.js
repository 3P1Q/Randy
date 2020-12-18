import React from 'react';
import {Avatar} from '@material-ui/core';

const Picture = (props) => {
    return (
            <Avatar style={{height:"100%", width:"100%"}} src={props.src} alt={props.name}/>
    )
}

export default Picture;