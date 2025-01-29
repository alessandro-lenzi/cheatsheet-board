'use client';

import clsx from 'clsx';
import {
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  RefCallback,
  RefObject,
  MouseEvent,
  useEffect,
} from 'react';
import { BoardItem } from '../BoardItem';
// import { boxes } from '@/app/testSheets/redux';
import { useCheatSheetContext } from '@/app/contexts/cheatsheets';

type IProps = HTMLAttributes<HTMLDivElement> & {
  ref?: RefCallback<HTMLDivElement> | RefObject<HTMLDivElement>;
  children: ReactNode;
};

const InitialWidth = 200;
const InitialHeight = 200;

export const Board = ({ ref, children, className, ...props }: IProps) => {
  // const [items, setItems] = useState<BoardItemProps[]>(boxes);
  const { items, createItem } = useCheatSheetContext();

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
      top: event.nativeEvent.layerY - InitialWidth / 2,
      left: event.nativeEvent.layerX - InitialHeight / 2,
      width: InitialWidth,
      height: InitialHeight,
    };

    // setItems([...items, newItem]);
    createItem(newItem);
  };

  useEffect(() => {
    console.log(`context items changed`, items);
  }, [items]);

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
      {items.map((itemProps) => (
        <BoardItem key={itemProps.id} {...itemProps} />
      ))}
    </div>
  );
};
Board.displayName = 'Board';
