import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import makeStyles from '@mui/styles/makeStyles';
import ListItem from '@mui/material/ListItem';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';

import { Paper, Typography, Box } from '@mui/material';
import type { Element } from '../types';

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

export type DraggableListItemProps = {
  item:Element;
  index: number;
};


const DraggableListItem = ({ item, index }: DraggableListItemProps) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={String(index)} index={index}>
    {(provided, snapshot) => (
      <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{padding:0}}
          >
          <Paper className={classes.paper} sx={{backgroundColor:item.color}}  elevation={5}>
            <Box paddingRight={"2rem"} paddingLeft={"1rem"}>
              <AdjustOutlinedIcon color="primary"/>
            </Box>
              <Typography>{item.name} </Typography>
          </Paper>
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
