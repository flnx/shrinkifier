'use client';

import { DroppableCardMemoized } from './DroppableCard';
import { useDragAndDropHandlers } from './useDragAndDropHandlers';

export const DragAndDrop = () => {
  const { handleDrop, handleOnSelectChange } = useDragAndDropHandlers();

  return (
    <div>
      <DroppableCardMemoized
        handleOnSelectChange={handleOnSelectChange}
        handleDrop={handleDrop}
      />
    </div>
  );
};
