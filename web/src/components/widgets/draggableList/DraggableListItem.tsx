import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import ListItem from '@mui/material/ListItem';
import type { Task } from '../../../types';
import { BaseListItem } from './BaseListItem';

export type DraggableListItemProps = {
  item:Task;
  index: number;
};


const DraggableListItem = ({item, index }: DraggableListItemProps) => {
  return (
    <Draggable draggableId={index.toString()} index={index}>
    {(provided, snapshot) => (
      <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{padding:0}}
          >
          <BaseListItem item={item} editable/>
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
