import { MoveIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  MouseEvent,
  useState,
  useRef,
} from 'react';

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
    left: x - InitialWidth / 2,
    top: y - InitialHeight / 2,
    width: InitialWidth,
    height: InitialHeight,
    title: 'title',
    content: 'content',
  });

  const [isHovering, setHovering] = useState(false);
  const [isDragging, setDragging] = useState(false);

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

  let startX = 0;
  let startY = 0;

  const startDragging: MouseEventHandler<HTMLDivElement> = (
    e: MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setDragging(true);

    startX = e.clientX;
    startY = e.clientY;

    document.onmouseup = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      setDragging(false);
    };

    document.onmousemove = (e) => {
      e.preventDefault();

      const posX = startX - e.clientX;
      const posY = startY - e.clientY;
      const truncX = e.shiftKey ? posX % 16 : 0;
      const truncY = e.shiftKey ? posY % 16 : 0;

      const newTop = ref.current!.offsetTop - posY;
      const newLeft = ref.current!.offsetLeft - posX;

      setData({
        ...data,
        top: newTop + truncY,
        left: newLeft + truncX,
      });

      startX = e.clientX + truncX;
      startY = e.clientY + truncY;
    };
  };

  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={clsx('absolute')}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      style={{
        left: `${data.left}px`,
        top: `${data.top}px`,
        width: `${data.width}px`,
        height: `${data.height}px`,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      <AnimatePresence initial={false}>
        {isHovering || isDragging ? (
          <motion.div
            initial={{ opacity: 0, top: 0 }}
            animate={{ opacity: 1, top: '-2rem' }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, top: 0 }}
            onDoubleClick={(e) => e.stopPropagation()}
            className="absolute top-[-2rem] left-0 w-[100%] h-[2rem] flex justify-center">
            <div className=" p-1 text-gray-300 hover:text-gray-800 shadow-md bg-white rounded-t-md">
              <div
                className={clsx(' transition-all rounded-md p-1 px-10', {
                  'bg-gray-100': isDragging,
                })}
                onMouseDown={startDragging}>
                <MoveIcon />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div
        className={clsx(
          'flex flex-col w-[100%] h-[100%] absolute  p-4 gap-2 bg-white resize shadow-lg'
        )}
        onDoubleClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          defaultValue={data.title}
          onChange={handleTitleChange}
          onDoubleClick={(e) => e.stopPropagation()}
          className={clsx(
            'text-slate-950 border-none ring-none outline-none text-[1.5rem] font-bold'
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
