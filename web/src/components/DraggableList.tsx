import * as React from 'react';
import DraggableListItem from './DraggableListItem';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  DropResult
} from 'react-beautiful-dnd';
import { reorder } from '../helper';
import type { Element } from '../types';

type DraggableListMemoProps = {
  items: Element[];
  onDragEnd: OnDragEndResponder;
};

export type DraggableListProps ={
    items: Element[];
    setItems: (listItems:Element[]) => void;
}

const DraggableListMemo = ({ items, onDragEnd }: DraggableListMemoProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
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
    const onDragEnd = ({ destination, source }: DropResult) => {
      // dropped outside the list
      if (!destination) return;
  
      const newItems = reorder(items, source.index, destination.index);
      setItems(newItems);
    };

    return (
      <DraggableListMemo items={items} onDragEnd={onDragEnd} />
    );
  };

