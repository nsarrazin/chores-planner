import { Typography } from '@mui/material';
import * as React from 'react';
import { Lobby } from './Lobby';
import { SharedRoom } from './SharedRoom';

export const MainPage = () => {
    const [room, setRoom] = React.useState<string|undefined>(undefined);
    return (
        <div>
            { room !== undefined ? <SharedRoom roomKey={room!} /> : <Lobby setRoom={setRoom} />}
        </div>
    );
}