import * as React from 'react';
import DraggableListItem from './DraggableListItem';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  DropResult
} from 'react-beautiful-dnd';
import { reorder } from '../../../helper';
import type { Task } from '../../../types';

export type DraggableListProps ={
    prefs: Task[];
    setPrefs: (listItems:Task[]) => void;
}

export const DraggableList = ({prefs, setPrefs}:DraggableListProps) => {
    const onDragEnd = ({ destination, source }: DropResult) => {
      // dropped outside the list
      if (!destination) return;
  
      const newItems = reorder(prefs, source.index, destination.index);

      setPrefs(newItems);
    };

    return (
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {prefs.map((item, index) => (
              <DraggableListItem item={item} index={index} key={index}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    );
  };

