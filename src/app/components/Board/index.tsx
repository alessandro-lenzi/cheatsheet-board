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
    <BoardItem key="1" x={250} y={250} />,
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
    console.log(event);

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
        'relative select-none bg-stone-100 shadow-2xl print:p-0 print:pb-0 print:shadow-none print:border'
      )}`}
      onDoubleClick={handleDoubleClick}>
      {children}
      {items}
    </div>
  );
};
Board.displayName = 'Board';
