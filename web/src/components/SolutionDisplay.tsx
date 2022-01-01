import * as React from 'react';
import type { User, Solution } from '../types';

import { Box, Typography, Paper, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    paper: {
        borderRadius: "1rem",
        justifyContent: "flex-start",
        width: "100%",
        maxHeight: "4rem",
        height: "100%",
        minHeight: "3rem",
        alignItems: "center"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    itemBox: {
        alignItems: "center",
        display: "flex",
        width: "100%",
        margin: "0.5rem"
    }
});

export type SolutionDisplayProps = {
    solution: Solution;
    users: User[],
}
export const SolutionDisplay = ({ solution, users }: SolutionDisplayProps) => {
    const classes = useStyles();
    if (solution === undefined) {
        return <Box flexGrow="1" display="flex" alignItems="center" justifyContent="center">
            <Typography variant="button">No solution matches both criterias</Typography>
        </Box>
    }

    let maxScore = Math.max(...solution.score.scores)
    let minScore = Math.min(...solution.score.scores)

    return (
        <Box display="flex" flexDirection="column" flexGrow="1" justifyContent="center">
            <Box className={classes.row} >
                {users.map((el, idx) => (
                    <Box key={idx} display="flex" flexDirection="row">
                        <Typography variant="h5" width="100%" align="center">{el.name}</Typography>
                        <Chip label={solution.score.scores[idx].toString() + " points"} sx={{ marginLeft: "1rem" }}
                            color={solution.score.scores[idx] === maxScore ? "success" :
                                solution.score.scores[idx] === minScore ? "error" :
                                    "primary"} />
                    </Box>
                ))}
            </Box>
            {solution.planning.map((row, idxRow) => (
                <Box className={classes.row} key={idxRow}>
                    <Typography>{idxRow.toString()}</Typography>
                    {row.elements.map((el, idx) => (
                        <Box className={classes.itemBox}>
                            <Paper sx={{ backgroundColor: el.color }} className={classes.paper} key={idx} elevation={5}>
                                <Typography fontWeight={600} align="center" padding="0.5rem">{el.name}</Typography>
                            </Paper>
                        </Box>
                    ))
                    }
                </Box>
            ))}
            <Box>
            </Box>
            <Box>
                <Typography align="center" variant="subtitle1" marginTop="2rem">Total score is {solution.score.sum}, unfairness is {solution.score.fairness}</Typography>
            </Box>
        </Box>
    )
}