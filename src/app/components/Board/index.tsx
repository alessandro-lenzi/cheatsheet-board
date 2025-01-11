'use client';

import clsx from 'clsx';
import {
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  RefCallback,
  RefObject,
  MouseEvent,
  useState,
} from 'react';
import { BoardItem, BoardItemProps } from '../BoardItem';
import { nextBoxes } from '@/app/testSheets/nextjsSheet';

type IProps = HTMLAttributes<HTMLDivElement> & {
  ref?: RefCallback<HTMLDivElement> | RefObject<HTMLDivElement>;
  children: ReactNode;
};

const InitialWidth = 200;
const InitialHeight = 200;

export const Board = ({ ref, children, className, ...props }: IProps) => {
  const [items, setItems] = useState<BoardItemProps[]>(nextBoxes);

  function refCallback(element: HTMLDivElement | null) {
    if (!element) return;

    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  }

  const handleDoubleClick: MouseEventHandler<HTMLDivElement> = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    console.log(
      `Creating new board item at X=${event.nativeEvent.layerX} Y=${event.nativeEvent.layerY}`
    );

    const newItem = {
      top: event.nativeEvent.layerX - InitialWidth / 2,
      left: event.nativeEvent.layerY - InitialHeight / 2,
      width: InitialWidth,
      height: InitialHeight,
    };

    setItems([...items, newItem]);
  };

  return (
    <div
      ref={refCallback}
      {...props}
      className={`sheet-board ${className} ${clsx(
        'relative select-none bg-white shadow-2xl contain-paint print:p-0 print:pb-0 print:shadow-none'
      )}`}
      onDoubleClick={handleDoubleClick}
    >
      {children}
      {items.map((itemProps, index) => (
        <BoardItem key={index} {...itemProps} />
      ))}
    </div>
  );
};
Board.displayName = 'Board';
