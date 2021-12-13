import * as React from 'react';
import type { Element } from '../../types';
import { ElementPicker } from './ElementPicker';
import { Box, Typography, List, ListItem } from '@mui/material';

export type ElementsManagerProps = {
    elements: Element[];
    setElements: (elements:Element[]) => void;
}

export const ElementsManager = ({elements, setElements}: ElementsManagerProps) => {
    function setElement(idx:number, element:Element){
        let arr = [...elements];
        element.index = idx;
        arr[idx] = element
        setElements(arr)
    }

    return (
        <Box display="flex" flexDirection="column">
            <Typography variant="h4"paddingLeft={2}>
                Elements Picker
            </Typography>
            <div>
                <List>
                </List>
                {elements.map((el, idx)=>(
                    <ListItem key={idx}>
                        <ElementPicker element={el} 
                        setElement={(newEl:Element) => {setElement(idx, newEl)}}
                        />
                    </ListItem>
                ))}
            </div>
        </Box>
    )
}