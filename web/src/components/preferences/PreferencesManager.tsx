import * as React from 'react';
import type { Element, Preferences, User } from '../../types';

import { PreferenceWidget } from './PreferenceWidget';
import { Box } from '@mui/material';

export type PreferencesManagerProps = {
    users: User[];
    setUsers: (newUsers:User[]) => void;
    elements: Element[];
    order: Preferences[];
    setOrder: (newOrder:Preferences[]) => void;
}

export const PreferencesManager = (props:PreferencesManagerProps) => {
    function setUser(idx:number, user:User){
        let arr = props.users.slice();
        arr[idx] = user;
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
                                setUser={(newUser:User)=>(setUser(idx, newUser))}
                                preferences={props.order[idx]}
                                setPreferences={(newPreferences:Preferences)=>(setPreferences(idx, newPreferences))}
                                key={idx}/>
        ))}
    </Box>
    )
}