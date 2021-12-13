import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import makeStyles from '@mui/styles/makeStyles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';

import type { Element } from '../types';

const useStyles = makeStyles({
  draggingListItem: {
    background: "#2B2A3C"
  }
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
          sx={{backgroundColor:item.color, height:"72px"}}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem : ''}
        >
          <ListItemAvatar>
              <AdjustOutlinedIcon color="primary"/>
          </ListItemAvatar>
          <ListItemText primary={item.index} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
