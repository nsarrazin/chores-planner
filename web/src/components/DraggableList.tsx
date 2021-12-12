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
import chroma from "chroma-js";

type DraggableListMemoProps = {
  items: string[];
  onDragEnd: OnDragEndResponder;
};

export type DraggableListProps ={
    inputItems: string[];
    callback: (listItems:string[]) => void;
}

const useStyles = makeStyles({
    flexPaper: {
      flex: 1,
      backgroundColor: "#2B293D",
    }
  });

let scale = chroma.scale(['#4D404F', '#2B293D']).mode('lab'); // scale used for gradient

const DraggableListMemo = React.memo(({ items, onDragEnd }: DraggableListMemoProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index, arr) => (
              <DraggableListItem item={item} index={index} key={index} color={scale(index/arr.length).hex()}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

const DraggableList = ({inputItems, callback}:DraggableListProps) => {
    const classes = useStyles();
    const [items, setItems] = React.useState(inputItems);
  
    const onDragEnd = ({ destination, source }: DropResult) => {
      // dropped outside the list
      if (!destination) return;
  
      const newItems = reorder(items, source.index, destination.index);
      callback(newItems);
      setItems(newItems);
    };

    React.useEffect(()=>(setItems(inputItems)),[inputItems])
    React.useEffect(()=>(callback(items)), [items])

    return (
    <Paper className={classes.flexPaper}>
        <DraggableListMemo items={items} onDragEnd={onDragEnd} />
    </Paper>
    );
  };

export default DraggableList;
