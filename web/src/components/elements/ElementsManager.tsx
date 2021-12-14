import * as React from 'react';
import type { Element } from '../../types';
import { ElementPicker } from './ElementPicker';
import { Box, Typography, List, ListItem, Paper } from '@mui/material';

export type ElementsManagerProps = {
    elements: Element[];
    setElements: (elements:Element[]) => void;
}

export const ElementsManager = ({elements, setElements}: ElementsManagerProps) => {
    function setElement(idx:number, element:Element){
        let arr = [...elements];
        arr[idx] = element
        setElements(arr)
    }

    return (
        <Box display="flex" flexDirection="column">
            <Paper elevation={2} sx={{paddingBottom:"1rem"}}>
                <Typography variant="h4"padding={2} paddingBottom={0}>
                    Elements Picker
                </Typography>
                <div>
                    <List>
                    </List>
                    {elements.map((el, idx)=>(
                        <ListItem key={idx}>
                            <ElementPicker index={idx} element={el} 
                            setElement={(newEl:Element) => {setElement(idx, newEl)}}
                            />
                        </ListItem>
                    ))}
                </div>
            </Paper>
        </Box>
    )
}