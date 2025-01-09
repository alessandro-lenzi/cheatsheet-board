'use client';

import { MouseEvent } from 'react';

export type BoxCorner =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
export type DragHandlerCallback = (
  event: MouseEvent<HTMLDivElement>,
  corner?: BoxCorner
) => void;

let prevX = 0;
let prevY = 0;

export const getDraggingHandler: (
  updateCallback: (
    incrementX: number,
    incrementY: number,
    corner?: BoxCorner
  ) => void,
  onStart?: () => void,
  onStop?: () => void
) => DragHandlerCallback = (updateCallback, onStart, onStop) => {
  return (event: MouseEvent<HTMLDivElement>, corner?: BoxCorner) => {
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

      updateCallback(incrementX - truncX, incrementY - truncY, corner);

      prevX = moveEvent.clientX + truncX;
      prevY = moveEvent.clientY + truncY;
    };
  };
};
