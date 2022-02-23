import * as React from 'react';
import type { Task, User } from '../../types';
import { TextField, Box, Typography, Paper } from '@mui/material';
import { DraggableList } from '../widgets/draggableList/DraggableList';
import { socket } from '../../context/socket';
import { AvatarDisplay } from '../widgets/AvatarDisplay';

export type PreferenceWidgetProps = {
    roomKey: string;
    user: User;
}

export const PreferenceWidget = (props: PreferenceWidgetProps) => {
    const [prefs, setPrefs] = React.useState<Task[]>(props.user.preferences)

    function setPreferences(val: Task[]) {
        setPrefs(val)
        socket.emit("updatePrefs", props.roomKey, val.map((el)=>{return el.id}))
    }


    React.useEffect(()=>{setPrefs(props.user.preferences)},[props.user.preferences])

    return <Box display="flex" flexDirection="column" padding="1.5rem" paddingTop="1rem">
            <Paper sx={{padding:"1rem", borderRadius:"5%"}}>
                <Box display="flex" flexDirection="row" justifyContent="left" alignItems="center" paddingBottom={2}>
                    <AvatarDisplay avatarIdx={props.user.avatarIdx}/>
                    <Typography variant="h4" sx={{paddingLeft:"1rem", fontWeight:"bolder"}}>{props.user.name}</Typography>
                </Box>
                {props.user.preferences !== undefined && <DraggableList prefs={prefs} setPrefs={setPreferences} />}
            </Paper>
         </Box>
}