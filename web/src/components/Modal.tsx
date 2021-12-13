import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CircularProgress } from '@mui/material';
import {socket } from '../context/socket';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50vw",
    height: "50vh",
    bgcolor: '#2B293D',
    border: '1px solid #fff',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

export type ModalResultProps = {
    open: boolean
    callbackClose : () => void;
}

export const ModalResult = ({open, callbackClose}: ModalResultProps) => {
    const [progress, setProgress] = React.useState(5);
    const [msg, setMsg] = React.useState("");

    React.useEffect(() => { socket.on("update", (data) => {setProgress(data.percentage);setMsg(data.text);}) }, []);
    return (
      <div>
        <Modal
          open={open}
          onClose={callbackClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CircularProgress size="5vh" style={{padding: "10vh"}} variant="determinate" value={progress} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {msg}
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }