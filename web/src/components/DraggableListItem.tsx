import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import makeStyles from '@mui/styles/makeStyles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';

const useStyles = makeStyles({
  draggingListItem: {
    background: "#2B2A3C"
  }
});

export type DraggableListItemProps = {
  item: string;
  index: number;
  color: string;
};


const DraggableListItem = ({ item, index, color }: DraggableListItemProps) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={String(index)} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          sx={{backgroundColor:color, height:"72px"}}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem : ''}
        >
          <ListItemAvatar>
              <AdjustOutlinedIcon color="primary"/>
          </ListItemAvatar>
          <ListItemText primary={item} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
