import * as React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { socket } from '../context/socket';
import { customAlphabet } from 'nanoid';
import { Box } from '@mui/system';
import { AvatarPicker } from './widgets/AvatarPicker';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8)

export type LobbyProps = {
    setRoom: (val: string|undefined) => void;
}

export const Lobby = ({ setRoom }: LobbyProps) => {
    const [name, setName] = React.useState<string>("Anne Onym");
    const [avatarIdx, setAvatarIdx] = React.useState<number>(17);
    const [inputRoom, setInputRoom] = React.useState<string>(nanoid());

    function onJoin() {
        let data = { name: name, avatarIdx: avatarIdx}

        socket.emit("joinLobby", inputRoom, data, (success: boolean) => {
            if (success) {
                setRoom(inputRoom)
            } else {
                alert("Couldn't join lobby.");
            }
        })
    }

    function onError(msg: string) {
        alert(msg);
    }

    React.useEffect(() => {
        socket.on("error", (data: string) => {
            onError(data)
        })
    }, []);

    return (
        <Box paddingTop="10vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box display="flex" alignItems="center">
                <AvatarPicker callback={setAvatarIdx} avatarIdx={avatarIdx} />
                <TextField sx={{ marginLeft: "2rem" }} value={name} label="Name" onChange={(ev) => (setName(ev.target.value))} />
            </Box>
            <Box alignItems="center" display="flex" marginTop="5vh">
                <TextField label="Room ID" InputProps={{ sx: { fontWeight: "bolder" } }} value={inputRoom} onChange={(ev) => (setInputRoom(ev.target.value))}></TextField>
                <Button size="large" onClick={() => { navigator.clipboard.writeText(inputRoom) }}>
                    <ContentCopyIcon fontSize="small" />
                </Button>
                <Button variant="contained" size='large' onClick={onJoin}>Join</Button>
            </Box>
        </Box >
    );

}