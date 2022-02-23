import * as React from 'react';
import type { Task } from '../../types';
import { Box, TextField, Button } from '@mui/material';
import { PopoverPicker } from '../widgets/PopoverPicker';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export type ElementPickerProps = {
    isAdmin:boolean;
    task: Task;
    setTask: (element: Task) => void;
    remove: () => void;
}

export const ElementPicker = ({ isAdmin, task, setTask, remove }: ElementPickerProps) => {
    const [nameLocal, setNameLocal] = React.useState<string>(task.name);

    function setColor(color: string) {
        setTask({ ...task, color: color });
    }

    function setName(name: string) {
        setTask({ ...task, name: name });
    }

    return (
        <Box display="flex" justifyContent="space-evenly">
            {isAdmin && <Button onClick={remove}>
                            <CancelOutlinedIcon/>
                        </Button>
            }  
            <TextField label="Task name"
                value={nameLocal} variant="outlined"
                onChange={(event)=> setNameLocal(event.target.value)}
                onBlur={(event) => (setName(nameLocal))} 
                disabled={!isAdmin} 
                />
            <PopoverPicker isAdmin={isAdmin} color={task.color} onChange={setColor} />
        </Box>
    )
}