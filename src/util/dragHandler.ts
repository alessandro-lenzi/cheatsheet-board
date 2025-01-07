'use client';

import { MouseEvent, MouseEventHandler } from 'react';

let prevX = 0;
let prevY = 0;

export const getDraggingHandler: (
  updateCallback: (incrementX: number, incrementY: number) => void,
  onStart?: () => void,
  onStop?: () => void
) => MouseEventHandler<HTMLDivElement> = (updateCallback, onStart, onStop) => {
  return (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onStart) onStart();

    prevX = e.clientX;
    prevY = e.clientY;

    document.onmouseup = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      if (onStop) onStop();
    };

    document.onmousemove = (e) => {
      e.preventDefault();

      const incrementX = prevX - e.clientX;
      const incrementY = prevY - e.clientY;
      const truncX = e.shiftKey ? incrementX % 16 : 0;
      const truncY = e.shiftKey ? incrementY % 16 : 0;

      updateCallback(incrementX - truncX, incrementY - truncY);

      prevX = e.clientX + truncX;
      prevY = e.clientY + truncY;
    };
  };
};
