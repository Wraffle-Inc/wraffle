'use client';

import {useCallback} from 'react';
import type {Dispatch, ReactNode, SetStateAction} from 'react';
import type {DropResult} from '@hello-pangea/dnd';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import {cn} from '@wraffle/ui';

interface Props<T extends object> {
  itemList: T[];
  listClassName?: string;
  itemClassName?: string;
  setItemList: Dispatch<SetStateAction<T[]>>;
  renderDragItem: (item: T) => ReactNode;
}

const DragAndDrop = <T extends object>({
  itemList,
  listClassName,
  itemClassName,
  setItemList,
  renderDragItem,
}: Props<T>) => {
  const onDragEnd = useDragEnd(itemList, setItemList);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId='droppable'>
            {provided => (
              <ul
                ref={provided.innerRef}
                className={cn('flex flex-1 flex-col', listClassName)}
                {...provided.droppableProps}
              >
                {itemList.map((item, idx) => (
                  <DragItem
                    key={idx}
                    renderDragItem={renderDragItem}
                    item={item}
                    index={idx}
                    itemClassName={itemClassName}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

export default DragAndDrop;

interface DragItemProps<T extends object> {
  item: T;
  index: number;
  renderDragItem: (item: T) => ReactNode;
  itemClassName?: string;
}

const DragItem = <T extends object>({
  item,
  index,
  renderDragItem,
  itemClassName,
}: DragItemProps<T>) => {
  return (
    <Draggable draggableId={String(index)} index={index} key={Number(index)}>
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          return (
            <li
              ref={provided.innerRef}
              className={cn('z-10 flex bg-blue-50', itemClassName)}
              style={{
                ...provided.draggableProps.style,
              }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {renderDragItem(item)}
            </li>
          );
        }
        return (
          <li
            ref={provided.innerRef}
            className={cn('flex', itemClassName)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {renderDragItem(item)}
          </li>
        );
      }}
    </Draggable>
  );
};

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function useDragEnd<T>(
  data: T[],
  setData: React.Dispatch<React.SetStateAction<T[]>>,
) {
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const {destination, source} = result;
      if (!destination) return;
      if (source.index === destination.index) return;
      const newQuotes = reorder(data, source.index, destination.index);
      setData(newQuotes);
    },
    [data, setData],
  );
  return onDragEnd;
}
