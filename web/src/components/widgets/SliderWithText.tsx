import * as React from 'react';
import { Typography, Box, Slider } from '@mui/material';
import { callbackify } from 'util';

export type SliderWithTextProps = {
    min: number,
    max: number,
    value: number,
    callback: (val: number) => void;
    count: number,
    title: string
}

export const SliderWithText = (props: SliderWithTextProps) => {

    function onChange(ev: Event, newValue: number | number[]) {
        let value = 0;
        if (typeof newValue === "number") {
            value = newValue
        } else {
            value = newValue[0]
        }
        props.callback(value)
    }
    return (
        <Box display="flex" flexDirection="column" alignItems="flexStart" justifyContent="space-around">
            <Typography variant="h5">{props.title}</Typography>
            <Slider valueLabelDisplay="auto"
                value={props.value}
                min={props.min} max={props.max} step={1}
                onChange={onChange}
                disabled={props.min === props.max} />

            {props.min === props.max ? <Typography> All values are the same for those preferences.</Typography>
                : <Typography>There are {props.count} solutions which match this criteria.</Typography>}
        </Box>
    )
}