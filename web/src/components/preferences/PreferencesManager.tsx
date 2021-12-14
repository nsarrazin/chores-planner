import * as React from 'react';
import type { Element, Preferences } from '../../types';

import { PreferenceWidget } from './PreferenceWidget';
import { Box } from '@mui/system';

export type PreferencesManagerProps = {
    users: string[];
    setUsers: (newUsers:string[]) => void;
    elements: Element[];
    order: Preferences[];
    setOrder: (newOrder:Preferences[]) => void;
}

export const PreferencesManager = (props:PreferencesManagerProps) => {
    function setUser(idx:number, user:string){
        let arr = props.users.slice();
        arr[idx] = user
        props.setUsers(arr)
    }

    function setPreferences(idx:number, preferences:Preferences){
        let arr = props.order.slice();
        arr[idx] = preferences
        props.setOrder(arr)
    }
    
    return (
        <Box display="flex">
            {props.users.map((user,idx)=>(
                <PreferenceWidget user={user}
                                  setUser={(newUser:string)=>(setUser(idx, newUser))}
                                  preferences={props.order[idx]}
                                  setPreferences={(newPreferences:Preferences)=>(setPreferences(idx, newPreferences))}
                                  key={idx}/>
            ))}
        </Box>
    )
}