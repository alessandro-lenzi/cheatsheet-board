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
  ReactElement,
} from 'react';
import { BoardItem, BoardItemProps } from '../BoardItem';

type IProps = HTMLAttributes<HTMLDivElement> & {
  ref?: RefCallback<HTMLDivElement> | RefObject<HTMLDivElement>;
  children: ReactNode;
};

export const Board = ({ ref, children, className, ...props }: IProps) => {
  const [items, setItems] = useState<ReactElement<BoardItemProps>[]>([
    <BoardItem key="1" x={256} y={256} />,
  ]);

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

    const newItem = (
      <BoardItem
        key={items.length + 1}
        x={event.nativeEvent.layerX}
        y={event.nativeEvent.layerY}
      />
    );

    setItems([...items, newItem]);
  };

  return (
    <div
      ref={refCallback}
      {...props}
      className={`${className} ${clsx(
        'relative select-none bg-stone-100 shadow-2xl contain-paint print:p-0 print:pb-0 print:shadow-none'
      )}`}
      onDoubleClick={handleDoubleClick}
    >
      {children}
      {items}
    </div>
  );
};
Board.displayName = 'Board';
