'use client';

import {useDragEnd} from '../hook';
import type {Dispatch, ReactNode, SetStateAction} from 'react';
import type {Card} from '@/entities/card';
import type {DraggableProvidedDragHandleProps} from '@hello-pangea/dnd';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';

interface Props {
  cardList: Card[];
  setCardList: Dispatch<SetStateAction<Card[]>>;
  setTargetCard: Dispatch<SetStateAction<Card | null>>;
  onReorderCard: (
    cardList: Card[],
    startIndex: number,
    endIndex: number,
  ) => Card[];
  onChangeIndex: (sourceIndex: number, destinationIndex: number) => void;
  renderDragItem: (
    item: Card,
    dragHandleProps: DraggableProvidedDragHandleProps | null,
  ) => ReactNode;
}

const CardDragDrop = ({
  cardList,
  setCardList,
  setTargetCard,
  onReorderCard,
  onChangeIndex,
  renderDragItem,
}: Props) => {
  const onDragEnd = useDragEnd(
    cardList,
    setCardList,
    setTargetCard,
    onReorderCard,
    onChangeIndex,
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId='droppable'>
          {provided => (
            <ul
              ref={provided.innerRef}
              className='mb-2 flex flex-1 flex-col bg-[#F2F4F6]'
              {...provided.droppableProps}
            >
              {cardList.map((card, idx) => (
                <DragItem
                  key={idx}
                  renderDragItem={renderDragItem}
                  card={card}
                  index={idx}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export {CardDragDrop};

interface DragItemProps {
  card: Card;
  index: number;
  renderDragItem: (
    item: Card,
    dragHandleProps: DraggableProvidedDragHandleProps | null,
  ) => ReactNode;
}

const DragItem = ({card, index, renderDragItem}: DragItemProps) => {
  return (
    <Draggable draggableId={String(index)} index={index} key={Number(index)}>
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          return (
            <li
              ref={provided.innerRef}
              className='z-10 mb-1 flex bg-blue-50'
              style={{
                ...provided.draggableProps.style,
              }}
              {...provided.draggableProps}
            >
              {renderDragItem(card, provided.dragHandleProps)}
            </li>
          );
        }
        return (
          <li
            ref={provided.innerRef}
            className='mb-1 flex bg-white'
            {...provided.draggableProps}
          >
            {renderDragItem(card, provided.dragHandleProps)}
          </li>
        );
      }}
    </Draggable>
  );
};
