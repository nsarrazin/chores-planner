import { Typography } from '@mui/material';
import * as React from 'react';
import { Box, Paper, ListItem } from '@mui/material';
import { AvatarDisplay } from './widgets/AvatarDisplay';

import type { User } from '../types';
import { BaseListItem } from './widgets/draggableList/BaseListItem';

export type DisplayUserProps = {
    user: User
}

export const DisplayUser = ({user}: DisplayUserProps) => {
    return (
        <Box display="flex" flexDirection="column" padding="1.5rem" paddingTop="1rem">
            <Paper sx={{padding:"1rem", borderRadius:"5%"}}>
                <Box display="flex" flexDirection="row" justifyContent="left" alignItems="center" paddingBottom={2}>
                    <AvatarDisplay avatarIdx={user.avatarIdx}/>
                    <Typography variant="h4" sx={{paddingLeft:"1rem", color:"text.secondary"}}>{user.name}</Typography>
                </Box>
                {user.preferences !== undefined && user.preferences.map((el, idx)=> {
                    return <ListItem sx={{padding:0}} key={idx}>
                            <BaseListItem item = {el} editable={false}/>
                        </ListItem>
                })}
            </Paper>
        </Box>
);
}