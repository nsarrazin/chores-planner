import * as React from 'react';
import type { Element } from '../types';
import { TextField,Box } from '@mui/material';
import { DraggableList } from './DraggableList';

export type PreferenceWidgetProps = {
    user: string;
    setUser: (newUser:string) => void;
    preferences: Element[];
    setPreferences: (newPreferences:Element[]) => void;
}

export const PreferenceWidget = (props:PreferenceWidgetProps) => {
    return <Box display="flex" flexDirection="column" padding="2rem">
                <TextField variant="standard" label={""}
                onChange={(event) => {props.setUser(event.target.value)}}
                value={props.user} style={{paddingBottom:"5px"}}/>
                <DraggableList items={props.preferences} setItems={props.setPreferences}/>

    </Box>
}