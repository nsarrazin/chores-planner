import * as React from 'react';
import { Fab, Modal, Box, TextField, Typography } from '@mui/material';
import { Solution, User } from '../types';
import { SolutionDisplay } from './SolutionDisplay';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SliderWithText } from './widgets/SliderWithText';

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
  callbackClose: () => void;
  initSols: Solution[];
  users: User[];
}

export const ModalResult = ({ open, callbackClose, initSols, users }: ModalResultProps) => {
  const [idx, setIdx] = React.useState(0);
  const [sols, setSols] = React.useState(initSols);

  const [minScore, setMinScore] = React.useState(0) // higher is better
  const [maxFair, setMaxFair] = React.useState(0) // lower is better


  function increment() {
    setIdx(idx + 1)
  }

  function decrement() {
    setIdx(idx - 1)
  }

  function handleTextInput(val: number) {
    if (val === undefined) {
      val = 1;
    }
    else if (val > sols.length) {
      val = sols.length
    }
    else if (val <= 0) {
      val = 1
    }
    setIdx(val - 1)
  }

  let minFairSlider: number = Math.min(...initSols.map((el) => (el.score.fairness)));
  let maxFairSlider: number = Math.max(...initSols.map((el) => (el.score.fairness)));

  let minScoreSlider: number = Math.min(...initSols.map((el) => (el.score.sum)));
  let maxScoreSlider: number = Math.max(...initSols.map((el) => (el.score.sum)));

  function updateParams() {
    setMinScore(minScoreSlider)
    setMaxFair(maxFairSlider)
    setIdx(0)
  }

  function updateSols() {
    let newSols = [...initSols]

    newSols = newSols.filter((el) => (el.score.fairness <= maxFair)).filter((el) => (el.score.sum >= minScore))

    setSols(newSols)
    setIdx(Math.min(newSols.length, idx)) // make sure index never goes over
  }

  React.useEffect(updateSols, [minScore, maxFair])
  React.useEffect(updateParams, [initSols])

  let countFair: number = initSols.filter((el) => (el.score.fairness <= maxFair)).length
  let countScore: number = initSols.filter((el) => (el.score.sum >= minScore)).length
  return (
    <div>
      <Modal
        open={open}
        onClose={callbackClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted={false}
      >
        <Box sx={style}>
          <Box sx={styleButtons}>
            <Fab color="primary" aria-label="add" disabled={idx === 0} onClick={decrement}>
              <ChevronLeftIcon />
            </Fab>
          </Box>
          <Box display="flex" flexDirection="column" flexGrow="1" justifyContent="center" alignItems="space-around">
            <SolutionDisplay solution={sols[idx]} users={users} />
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="flex-end" marginBottom="2rem">
              <Typography marginTop="5vh" align="center">
                Solution
              </Typography>
              <TextField value={idx + 1} type="number" onChange={(event) => (handleTextInput(parseInt(event.target.value)))}
                size="small" variant="outlined"
                sx={{ maxWidth: "5rem", marginLeft: "1rem", marginRight: "1rem" }} />
              <Typography marginTop="5vh" align="center">
                out of {sols.length}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="space-evenly" justifySelf="flex-end">
              <SliderWithText title="Score" value={minScore} callback={setMinScore} min={minScoreSlider} max={maxScoreSlider} count={countScore} />
              <SliderWithText title="Unfairness" value={maxFair} callback={setMaxFair} min={minFairSlider} max={maxFairSlider} count={countFair} />
            </Box>
          </Box>
          <Box sx={styleButtons}>
            <Fab color="primary" aria-label="add" onClick={increment} disabled={idx === sols.length - 1}>
              <ChevronRightIcon />
            </Fab>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}