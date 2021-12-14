import * as React from 'react';
import type { Preferences } from '../../types';
import { TextField,Box } from '@mui/material';
import { DraggableList } from '../widgets/draggableList/DraggableList';

export type PreferenceWidgetProps = {
    user: string;
    setUser: (newUser:string) => void;
    preferences: Preferences;
    setPreferences: (newPreferences:Preferences) => void;
}

export const PreferenceWidget = (props:PreferenceWidgetProps) => {
    return <Box display="flex" flexDirection="column" padding="2rem">
                <TextField variant="filled" label="Name"
                onChange={(event) => {props.setUser(event.target.value)}}
                value={props.user} 
                style={{paddingBottom:"5px"}} inputProps={{style: {fontSize: "1.25rem"}}}/>

                {props.preferences !== undefined && <DraggableList prefs={props.preferences} setPrefs={props.setPreferences}/>}

    </Box>
}