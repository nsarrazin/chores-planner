import * as React from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import type { User, Task, LobbyParams, Room} from '../types';
import { socket } from '../context/socket';
import { ElementsManager } from './elements/ElementsManager';
import { PreferenceWidget } from './preferences/PreferenceWidget';
import { DisplayUser } from './DisplayUser';

export type SharedRoomProps = {
    roomKey: string
}

export const SharedRoom = ({ roomKey }: SharedRoomProps) => {
    const [users, setUsers] = React.useState<User[]>([])
    const [tasks, setTasks] = React.useState<Task[]>([])
    const [params, setParams] = React.useState<LobbyParams>()


    function handleUpdate(data:Room){
        console.log(data);
        setUsers(data.users)
        setTasks(data.tasks)
        setParams(data.params)
    }

    function getInitialData(){
        socket.emit("getData", roomKey, (rawJSON:string) => {
            let data:Room = JSON.parse(rawJSON);

            setUsers(data.users)
            setTasks(data.tasks)
            setParams(data.params)
        })
    }

    React.useEffect(getInitialData, [])

    React.useEffect(() => {
        socket.on("update", (data: string) => {
            handleUpdate(JSON.parse(data))
        })
    }, []);
    
    if (users === undefined || users.length === 0 ) {
        return <Typography> Page is loading </Typography>
    }

    let sid = socket.id;
    let isAdmin = users[0].sid === sid;

    let userSelf = users.filter((el)=>{return el.sid === sid})[0]

    return (
        <Box>
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" padding="2.5vh">
                <Typography variant="h2" sx={{padding:"1rem"}}>Chores Planner</Typography>
                <TextField variant="outlined" value={roomKey} label="Room ID" InputProps={{readOnly: true, sx:{fontWeight:"bolder"}}}/>
            </Box>
            <Box display="flex" flexDirection="row">
                <ElementsManager isAdmin={isAdmin} roomKey={roomKey} tasks={tasks}/>
                <Box display="flex" flexDirection="row" flexGrow={3}>
                    <PreferenceWidget user={userSelf} roomKey={roomKey}/>
                    {users.filter((el=>{return el.sid !== sid})).map((el, idx)=> {
                        return <DisplayUser user={el} key={idx}/>
                    })}
                </Box>
            </Box >
        </Box>
    );
    }