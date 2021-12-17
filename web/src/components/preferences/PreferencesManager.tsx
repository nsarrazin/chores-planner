import * as React from 'react';
import type { Element, User } from '../../types';

import { PreferenceWidget } from './PreferenceWidget';
import { Box } from '@mui/material';

export type PreferencesManagerProps = {
    users: User[];
    setUsers: (newUsers:User[]) => void;
    elements: Element[];
}

export const PreferencesManager = (props:PreferencesManagerProps) => {
    function setUser(idx:number, user:User){
        let arr = props.users.slice();
        arr[idx] = user;
        props.setUsers(arr)
    }
    
    return (
    <Box display="flex">
        {props.users.map((user,idx)=>(
            <PreferenceWidget user={user}
                                setUser={(newUser:User)=>(setUser(idx, newUser))}
                                key={idx}/>
        ))}
    </Box>
    )
}