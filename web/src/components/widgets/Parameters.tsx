import * as React from 'react';
import type { Params } from '../../types';
import { Box, TextField, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    paper: {
        padding: "3rem",
        paddingBottom: "1rem",
        borderColor: "#607196",
        borderStyle: "solid",
        borderWidth: "1.5px",
        width: "fit-content",
    },
});

export type ParametersProps = {
    params: Params;
    setParams: (value: Params) => void;
}

export const Parameters = ({ params, setParams }: ParametersProps) => {
    const classes = useStyles();

    function setLength(value: number) {
        setParams({ ...params, length: value })
    }

    function setFairness(value: number) {
        setParams({ ...params, fairness: value })

    }
    function setDepth(value: number) {
        setParams({ ...params, depth: value })

    }


    return (
        <Box>
            <Paper elevation={5} className={classes.paper} sx={{ backgroundColor: "#9EC1A3" }}>
                <TextField value={params.length} onChange={(event) => { setLength(parseInt(event.target.value)) }} label="Cycle length" helperText="How many rows in the cycle ? " type="number" />
                <TextField value={params.fairness} onChange={(event) => { setFairness(parseInt(event.target.value)) }} label="Minimum fairness" helperText="Maximum score difference between users" type="number" />
                <TextField value={params.depth} onChange={(event) => { setDepth(parseInt(event.target.value)) }} label="Iteration depth" helperText="How many of the top scenarios to check ?" type="number" />
            </Paper>
        </Box>
    )
}