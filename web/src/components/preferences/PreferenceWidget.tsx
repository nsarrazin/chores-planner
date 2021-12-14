import * as React from 'react';
import type { Preferences, User } from '../../types';
import { TextField,Box } from '@mui/material';
import { DraggableList } from '../widgets/draggableList/DraggableList';

export type PreferenceWidgetProps = {
    user: User;
    setUser: (newUser:User) => void;
    preferences: Preferences;
    setPreferences: (newPreferences:Preferences) => void;
}

export const PreferenceWidget = (props:PreferenceWidgetProps) => {
    function setString(val:string){
        let newUser:User = {...props.user, name: val}
        props.setUser(newUser)
    }
    return <Box display="flex" flexDirection="column" padding="2rem">
                <TextField variant="filled" label="Name"
                onChange={(event) => {setString(event.target.value)}}
                value={props.user.name} 
                style={{paddingBottom:"5px"}} inputProps={{style: {fontSize: "1.25rem"}}}/>

                {props.preferences !== undefined && <DraggableList prefs={props.preferences} setPrefs={props.setPreferences}/>}

    </Box>
}