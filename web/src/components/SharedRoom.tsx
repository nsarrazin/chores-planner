import * as React from 'react';
import { Button, Box } from '@mui/material';


export type SharedRoomProps = {
    roomKey: string
}

export const SharedRoom = ({ roomKey }: SharedRoomProps) => {
    const [users, setUsers] = React.useState([])
    return (
        <Box >
        </Box >);
}