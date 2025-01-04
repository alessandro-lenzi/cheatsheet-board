import clsx from 'clsx';
import { motion } from 'motion/react';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

export interface BoardItemProps {
  x: number;
  y: number;
}

interface ItemData {
  left: number;
  top: number;
  width: number;
  height: number;
  title: string;
  content: string;
}

const InitialWidth = 200;
const InitialHeight = 200;

export const BoardItem = ({ x, y }: BoardItemProps) => {
  const [data, setData] = useState<ItemData>({
    left: x,
    top: y,
    width: InitialWidth,
    height: InitialHeight,
    title: 'title',
    content: 'content',
  });

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setData({ ...data, title: event.target.value });
  };

  const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData({ ...data, content: event.target.value });
  };

  return (
    <motion.div
      className={clsx(
        'flex absolute border border-cyan-800/40 rounded-sm p-2 bg-white resize'
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: 'tween' },
      }}
      style={{
        left: `${data.left}px`,
        top: `${data.top}px`,
        width: `${data.width}px`,
        height: `${data.height}px`,
      }}>
      <div className={clsx('flex flex-col gap-2 w-[100%]')}>
        <input
          type="text"
          defaultValue={data.title}
          onChange={handleTitleChange}
          onDoubleClick={(e) => e.stopPropagation()}
          className={clsx(
            'text-slate-950 border-none ring-none outline-none text-[1.5rem]'
          )}
        />
        <textarea
          defaultValue={data.content}
          onChange={handleContentChange}
          onDoubleClick={(e) => e.stopPropagation()}
          className={clsx(
            'flex-1 resize-none border-none ring-none outline-none text-slate-950 text-[1.2rem]'
          )}
        />
      </div>
    </motion.div>
  );
};
