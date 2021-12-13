import * as React from 'react';
import DraggableListItem from './DraggableListItem';
import makeStyles from '@mui/styles/makeStyles';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  DropResult
} from 'react-beautiful-dnd';
import { reorder } from '../helper';
import Paper from '@mui/material/Paper';
import type { Element } from '../types';

type DraggableListMemoProps = {
  items: Element[];
  onDragEnd: OnDragEndResponder;
};

export type DraggableListProps ={
    items: Element[];
    setItems: (listItems:Element[]) => void;
}

const useStyles = makeStyles({
    flexPaper: {
      flex: 1,
      backgroundColor: "#2B293D",
    }
  });

const DraggableListMemo = ({ items, onDragEnd }: DraggableListMemoProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index, arr) => (
              <DraggableListItem item={item} index={index} key={index}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
  }

export const DraggableList = ({items, setItems}:DraggableListProps) => {
    const classes = useStyles();
  
    const onDragEnd = ({ destination, source }: DropResult) => {
      // dropped outside the list
      if (!destination) return;
  
      const newItems = reorder(items, source.index, destination.index);
      setItems(newItems);
    };

    return (
    <Paper className={classes.flexPaper}>
        <DraggableListMemo items={items} onDragEnd={onDragEnd} />
    </Paper>
    );
  };

