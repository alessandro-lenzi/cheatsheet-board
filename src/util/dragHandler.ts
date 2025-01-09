'use client';

import { MouseEvent, MouseEventHandler } from 'react';

let prevX = 0;
let prevY = 0;

export const getDraggingHandler: (
  updateCallback: (incrementX: number, incrementY: number) => void,
  onStart?: () => void,
  onStop?: () => void
) => MouseEventHandler<HTMLDivElement> = (updateCallback, onStart, onStop) => {
  return (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (onStart) onStart();

    prevX = event.clientX;
    prevY = event.clientY;

    document.onmouseup = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      if (onStop) onStop();
    };

    document.onmousemove = (moveEvent) => {
      moveEvent.preventDefault();

      const incrementX = prevX - moveEvent.clientX;
      const incrementY = prevY - moveEvent.clientY;
      const truncX = moveEvent.shiftKey ? incrementX % 16 : 0;
      const truncY = moveEvent.shiftKey ? incrementY % 16 : 0;

      updateCallback(incrementX - truncX, incrementY - truncY);

      prevX = moveEvent.clientX + truncX;
      prevY = moveEvent.clientY + truncY;
    };
  };
};
