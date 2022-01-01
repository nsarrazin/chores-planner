import * as React from 'react';
import type { Element } from '../../types';
import { Box, TextField } from '@mui/material';
import { PopoverPicker } from '../widgets/PopoverPicker';

export type ElementPickerProps = {
    element: Element;
    setElement: (element: Element) => void;
}

export const ElementPicker = ({ element, setElement }: ElementPickerProps) => {
    function setColor(color: string) {
        setElement({ ...element, color: color });
    }

    function setName(name: string) {
        setElement({ ...element, name: name });
    }

    return (
        <Box display="flex" justifyContent="space-evenly">
            <TextField label="Task name"
                value={element.name} variant="outlined"
                onChange={(event) => (setName(event.target.value))} />
            <PopoverPicker color={element.color} onChange={setColor} />
        </Box>
    )
}