import * as React from 'react';
import Box from '@mui/material/Box';
import { Fab, Modal } from '@mui/material';
import { Solution, User} from '../types';
import { SolutionDisplay } from './SolutionDisplay';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "75vw",
    height: "75vh",
    bgcolor: '#2B293D',
    border: '1px solid #fff',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    display: 'flex'
  };

const styleButtons = {
  alignSelf: "center",
  padding: "2rem"
}

export type ModalResultProps = {
    open: boolean
    callbackClose : () => void;
    sols: Solution[];
    users: User[];
}

export const ModalResult = ({open, callbackClose, sols, users}: ModalResultProps) => {
    const [idx, setIdx] = React.useState(0);

    function increment(){
      setIdx(idx+1)
    }

    function decrement(){
      setIdx(idx-1)
    }

    return (
      <div>
        <Modal
          open={open}
          onClose={callbackClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={styleButtons}>
              <Fab color="primary" aria-label="add" disabled={idx===0} onClick={decrement}>
                <ChevronLeftIcon />
              </Fab>
            </Box>
            <SolutionDisplay solution={sols[idx]} users={users} />
            <Box sx={styleButtons}>
              <Fab color="primary" aria-label="add" onClick={increment} disabled={idx === sols.length-1}>
                <ChevronRightIcon />
              </Fab>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  }