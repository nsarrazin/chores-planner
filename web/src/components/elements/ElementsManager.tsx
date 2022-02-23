import * as React from 'react';
import type { Task } from '../../types';

import { ElementPicker } from './ElementPicker';
import { Box, Typography, List, ListItem, Paper, Button } from '@mui/material';
import { socket } from '../../context/socket';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
    paper: {
        padding: "1rem",
        borderStyle: "solid",
        borderWidth: "1.5px",
        margin: "2.5vw",
        minWidth:"300px"
    },
});

export type ElementsManagerProps = {
    isAdmin: boolean;
    roomKey: string;
    tasks: Task[];
}

export const ElementsManager = ({ isAdmin, roomKey, tasks }: ElementsManagerProps) => {
    const classes = useStyles();
    const [tasksLocal, setTasksLocal] = React.useState(tasks)

    function setTask(task: Task) {
        socket.emit("updateTask", roomKey, task)
    }

    function addTask(){
        socket.emit("addTask", roomKey, {name:"Task " + (tasks.length+1).toString(), color:"#acb"})
    }

    function removeTask(id:number){
        console.log("Removing task with id" + id.toString())
        socket.emit("removeTask", roomKey, id)
    }

    React.useEffect(()=>{setTasksLocal(tasks)}, [tasks])

    return (
        <Box display="flex" flexDirection="column">
            <Paper elevation={isAdmin?5:0} className={classes.paper} sx={{borderColor:isAdmin?"primary.main":"secondary.main"}}>
                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                    <Typography variant="h4" padding={2} sx={{color:isAdmin?"text.primary":"text.secondary"}}>
                        Tasks
                    </Typography>
                    {isAdmin && <Button variant="contained" onClick={addTask}>Add Task</Button>}
                </Box>
                <div>
                    <List>
                    {tasksLocal.map((el, idx) => (
                        <ListItem key={idx}>
                            <ElementPicker task={el}
                                setTask={(newEl: Task) => { setTask(newEl) }}
                                remove={()=>{removeTask(el.id)}}
                                isAdmin={isAdmin}
                                />
                        </ListItem>
                    ))}
                    </List>
                </div>
            </Paper>
        </Box>
    )
}