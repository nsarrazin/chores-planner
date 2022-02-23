import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Paper, Typography, Box } from '@mui/material';

import type { Task } from '../../../types';

const useStyles = makeStyles({
    paper: {
      borderRadius: "1rem",
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
      width:"100%",
      height:"3rem",
      display:"flex",
      flexDirection:"row",
      justifyContent:"flex-start",
      alignItems:"center"
    },
    
  });
  
  export type BaseListItemProps = {
      item: Task
      editable: boolean
  }

  export const BaseListItem = ({item, editable}:BaseListItemProps) => {
    const classes = useStyles();

    if (editable){
      return (
        <Paper className={classes.paper} sx={{backgroundColor:item.color}} elevation={4}>
          <Box paddingRight={"2rem"} paddingLeft={"1rem"}>
              <DragIndicatorIcon color="primary"/>
          </Box>
          <Typography sx={{color:"text.primary"}}>{item.name} </Typography>
      </Paper>
      )
    } else {
    return (
      <Paper className={classes.paper} sx={{justifyContent:"center", backgroundColor:item.color, borderStyle:"solid", borderWidth:"1.5px", borderColor:"secondary.main"}}  elevation={editable ? 5 : 0}>
            <Typography sx={{color:"text.secondary"}}>{item.name} </Typography>
      </Paper>
      );
    }
}
