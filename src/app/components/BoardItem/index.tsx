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
  useId,
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

let prevX = 0;
let prevY = 0;
const getDraggingHandler: (
  updateCallback: (incrementX: number, incrementY: number) => void,
  onStart?: () => void,
  onStop?: () => void
) => MouseEventHandler<HTMLDivElement> = (updateCallback, onStart, onStop) => {
  return (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // setDrag(true);
    if (onStart) onStart();

    prevX = e.clientX;
    prevY = e.clientY;

    document.onmouseup = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      // setDrag(false);
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

export const BoardItem = ({ x, y }: BoardItemProps) => {
  const [data, setData] = useState<ItemData>({
    left: x - InitialWidth / 2,
    top: y - InitialHeight / 2,
    width: InitialWidth,
    height: InitialHeight,
    title: 'title',
    content: 'content',
  });

  const titleId = useId();

  const [isTransformEnabled, setTransform] = useState(false);
  const [isHovering, setHovering] = useState(false);

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

  // let previousX = 0;
  // let previousY = 0;

  // const startDragging: MouseEventHandler<HTMLDivElement> = (
  //   e: MouseEvent<HTMLDivElement>
  // ) => {
  //   // e.preventDefault();
  //   setDragging(true);

  //   previousX = e.clientX;
  //   previousY = e.clientY;

  //   document.onmouseup = () => {
  //     document.onmouseup = null;
  //     document.onmousemove = null;
  //     setDragging(false);
  //   };

  //   document.onmousemove = (e) => {
  //     e.preventDefault();

  //     const incrementX = previousX - e.clientX;
  //     const incrementY = previousY - e.clientY;
  //     const truncX = e.shiftKey ? incrementX % 16 : 0;
  //     const truncY = e.shiftKey ? incrementY % 16 : 0;

  //     const newLeft = ref.current!.offsetLeft - incrementX;
  //     const newTop = ref.current!.offsetTop - incrementY;

  //     setData({
  //       ...data,
  //       left: newLeft + truncX,
  //       top: newTop + truncY,
  //     });

  //     previousX = e.clientX + truncX;
  //     previousY = e.clientY + truncY;
  //   };
  // };
  // const unfocus = useCallback(() => {
  //   if (isTransformEnabled) setTransform(false);
  // }, [isTransformEnabled]);

  const disableTransform = () => {
    setTransform(false);
  };

  const enableTransform = () => {
    setTransform(true);
    document.onmousedown = () => {
      document.onmousedown = null;
      setTransform(false);
    };
  };

  const [mouseDownAt, setMouseDownAt] = useState(0);

  const startDragging = getDraggingHandler(
    (incrementX, incrementY) => {
      const newLeft = ref.current!.offsetLeft - incrementX;
      const newTop = ref.current!.offsetTop - incrementY;

      setData({
        ...data,
        left: newLeft,
        top: newTop,
      });
    },
    () => {
      // to detect a real click (small duration) or a long click that
      // is probably a dragging movement
      setMouseDownAt(new Date().getTime());
    }
  );

  const handleTopLeftResize = getDraggingHandler(
    (incrementX, incrementY) => {
      const newWidth = ref.current!.clientWidth + incrementX;
      const newHeight = ref.current!.clientHeight + incrementY;
      const newLeft = ref.current!.offsetLeft - incrementX;
      const newTop = ref.current!.offsetTop - incrementY;

      setData({
        ...data,
        width: newWidth,
        height: newHeight,
        left: newLeft,
        top: newTop,
      });
    },
    () => {},
    enableTransform
  );

  const handleTopRightResize = getDraggingHandler(
    (incrementX, incrementY) => {
      const newWidth = ref.current!.clientWidth - incrementX;
      const newHeight = ref.current!.clientHeight + incrementY;
      const newTop = ref.current!.offsetTop - incrementY;

      setData({
        ...data,
        width: newWidth,
        height: newHeight,
        top: newTop,
      });
    },
    () => {},
    enableTransform
  );

  const handleBottomLeftResize = getDraggingHandler(
    (incrementX, incrementY) => {
      const newWidth = ref.current!.clientWidth + incrementX;
      const newHeight = ref.current!.clientHeight - incrementY;
      const newLeft = ref.current!.offsetLeft - incrementX;

      setData({
        ...data,
        width: newWidth,
        height: newHeight,
        left: newLeft,
      });
    },
    () => {},
    enableTransform
  );

  const handleBottomRightResize = getDraggingHandler(
    (incrementX, incrementY) => {
      const newWidth = ref.current!.clientWidth - incrementX;
      const newHeight = ref.current!.clientHeight - incrementY;

      setData({
        ...data,
        width: newWidth,
        height: newHeight,
      });
    },
    () => {},
    enableTransform
  );

  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={clsx('group absolute focus-within:ring-1')}
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
      onMouseLeave={() => setHovering(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <AnimatePresence initial={false}>
        {isHovering ? (
          <motion.div
            initial={{ opacity: 0, top: 0 }}
            animate={{ opacity: 1, top: '-2rem' }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, top: 0 }}
            onDoubleClick={(e) => e.stopPropagation()}
            className="no-print absolute left-0 top-[-2rem] flex h-[2rem] w-[100%] justify-center"
          >
            <div className="rounded-t-md bg-white p-1 text-gray-300 shadow-md hover:text-gray-800">
              <div
                className={clsx('rounded-md p-1 px-10 transition-all', {
                  // 'bg-gray-100': isDragging,
                })}
                onMouseDown={startDragging}
              >
                <MoveIcon />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Focus clickable wrapper */}
      <div
        className={clsx(
          'no-print absolute inset-0 z-10 group-focus-within:hidden'
        )}
        onDoubleClick={(e) => {
          e.stopPropagation();
          document.getElementById(titleId)?.focus();
          disableTransform();
        }}
        onMouseDown={startDragging}
        onMouseUp={(e) => {
          e.stopPropagation();

          const now = new Date().getTime();
          if (now - mouseDownAt < 200) {
            enableTransform();
          }
        }}
      ></div>

      {/* Transform controls wrapper */}
      {isTransformEnabled ? (
        <div
          className={clsx(
            'no-print absolute inset-[-6px] border border-dashed border-slate-400'
          )}
        >
          {/* Top left */}
          <div
            onMouseDown={handleTopLeftResize}
            className={
              'absolute left-[-5px] top-[-5px] h-[10px] w-[10px] cursor-nw-resize rounded-sm border border-slate-400 bg-white'
            }
          ></div>

          {/* Top right */}
          <div
            onMouseDown={handleTopRightResize}
            className={
              'absolute right-[-5px] top-[-5px] h-[10px] w-[10px] cursor-ne-resize rounded-sm border border-slate-400 bg-white'
            }
          ></div>

          {/* Bottom left */}
          <div
            onMouseDown={handleBottomLeftResize}
            className={
              'absolute bottom-[-5px] left-[-5px] h-[10px] w-[10px] cursor-sw-resize rounded-sm border border-slate-400 bg-white'
            }
          ></div>

          {/* Bottom right */}
          <div
            onMouseDown={handleBottomRightResize}
            className={
              'absolute bottom-[-5px] right-[-5px] h-[10px] w-[10px] cursor-se-resize rounded-sm border border-slate-400 bg-white'
            }
          ></div>
        </div>
      ) : null}

      {/* )} */}
      <div
        className={clsx(
          'absolute flex h-[100%] w-[100%] resize flex-col gap-2 bg-white p-2 shadow-lg'
        )}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        <input
          id={titleId}
          type="text"
          defaultValue={data.title}
          onChange={handleTitleChange}
          onDoubleClick={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className={clsx(
            'ring-none border-none p-1 text-[1.5rem] font-bold text-slate-950 outline-none group-focus-within:bg-slate-100'
          )}
        />
        <textarea
          defaultValue={data.content}
          onChange={handleContentChange}
          onDoubleClick={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className={clsx(
            'ring-none flex-1 resize-none border-none p-1 text-[1.2rem] text-slate-950 outline-none group-focus-within:bg-slate-100'
          )}
        />
      </div>
    </motion.div>
  );
};
