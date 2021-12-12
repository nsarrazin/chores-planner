import * as React from 'react';
import DraggableListItem from './DraggableListItem';
import makeStyles from '@mui/styles/makeStyles';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  DropResult
} from 'react-beautiful-dnd';
import { getItems, reorder } from '../helper';
import Paper from '@mui/material/Paper';

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
    }
  });


const DraggableListMemo = React.memo(({ items, onDragEnd }: DraggableListMemoProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <DraggableListItem item={item} index={index} key={index} />
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
