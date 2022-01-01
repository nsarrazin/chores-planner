import * as React from 'react';
import type { Element } from '../../types';
import { ElementPicker } from './ElementPicker';
import { Box, Typography, List, ListItem, Paper } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
    paper: {
        paddingBottom: "1rem",
        borderColor: "#EADEAE",
        borderStyle: "solid",
        borderWidth: "1.5px",
        marginLeft: "2.5vw"
    },
});

export type ElementsManagerProps = {
    elements: Element[];
    setElements: (elements: Element[]) => void;
}

export const ElementsManager = ({ elements, setElements }: ElementsManagerProps) => {
    const classes = useStyles();

    function setElement(idx: number, element: Element) {
        let arr = [...elements];
        arr[idx] = element
        setElements(arr)
    }

    return (
        <Box display="flex" flexDirection="column">
            <Paper elevation={5} className={classes.paper} sx={{ backgroundColor: "#12111d" }}>
                <Typography variant="h4" padding={2} paddingBottom={0}>
                    Tasks
                </Typography>
                <div>
                    <List>
                    </List>
                    {elements.map((el, idx) => (
                        <ListItem key={idx}>
                            <ElementPicker element={el}
                                setElement={(newEl: Element) => { setElement(idx, newEl) }}
                            />
                        </ListItem>
                    ))}
                </div>
            </Paper>
        </Box>
    )
}