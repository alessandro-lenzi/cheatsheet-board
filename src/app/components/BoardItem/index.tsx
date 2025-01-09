'use client';

import {
  ChangeEvent,
  ChangeEventHandler,
  useState,
  useRef,
  useId,
  MouseEvent,
} from 'react';

import clsx from 'clsx';
import { motion } from 'motion/react';

import { CodeEditor } from '../CodeEditor';
import { getDraggingHandler } from '@/util/dragHandler';
import { TransformControls } from './TransformControls';

export interface BoardItemProps {
  x: number;
  y: number;
}

interface ItemData {
  left: number;
  top: number;
  width: number;
  height: number;
  title?: string;
  content?: string;
  initialContent: string;
  color: string;
}

const InitialWidth = 200;
const InitialHeight = 200;

export const BoardItem = ({ x, y }: BoardItemProps) => {
  const [data, setData] = useState<ItemData>({
    left: x - InitialWidth / 2,
    top: y - InitialHeight / 2,
    width: InitialWidth,
    height: InitialHeight,
    initialContent: `const a = 123;

function sum(b: number) {
  return \`Sum: \$\{a + b}\`;
}
`,
    color: '#464f6f',
  });

  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const [isTransformEnabled, setTransform] = useState(false);
  const [isFocused, setFocused] = useState(false);

  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [mouseUpAt, setMouseUpAt] = useState(0);

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setData({ ...data, title: event.target.value });
  };

  const handleContentChange = (value: string) => {
    setData({ ...data, content: value });
  };

  const enableTransform = () => {
    setTransform(true);
    document.onmousedown = () => {
      document.onmousedown = null;
      setTransform(false);
      setFocused(false);
    };
  };

  const disableTransform = () => {
    setTransform(false);
  };

  // Box dragging
  const handleMouseDown = getDraggingHandler(
    (incrementX, incrementY) => {
      let newLeft = ref.current!.offsetLeft - incrementX;
      let newTop = ref.current!.offsetTop - incrementY;

      // To disable dragging beyond the page boundaries
      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;
      // TODO: Get board size to use here
      //if(newLeft + data.width > BOARD_WIDTH) newLeft = BOARD_WIDTH - data.width;
      //if(newTop + data.height > BOARD_HEIGHT) newTop = BOARD_HEIGHT - data.height;

      setData({
        ...data,
        left: newLeft,
        top: newTop,
      });
    },
    () => {
      // onStart event: Called when the mouseUp happens (aka mouseDown)
      // Sets the mouseDownAt variable to allow detection of click type
      setMouseDownAt(new Date().getTime());
    }
  );

  // Detects simple click (transform mode) or double click (edit mode)
  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const now = new Date().getTime();
    setMouseUpAt(now);
    if (now - mouseUpAt < 300) {
      // This means it's a double click
      document.getElementById(titleId)?.focus();
      setFocused(true);

      if (isTransformEnabled) disableTransform();
      return;
    }

    if (!isTransformEnabled && now - mouseDownAt < 200) {
      // This means it's a short click, so it's not a dragging action
      // but just a click action, and we can enable the transform controls
      setFocused(true);
      enableTransform();
    }
  };

  const onStartResizingCallback = () => {
    // onStart: does nothing
  };
  const onStopResizingCallback = () => {
    // onStop resizing: re-enables transform
    enableTransform();
  };

  const handleResize = getDraggingHandler(
    (incrementX, incrementY, corner) => {
      let newWidth = 0,
        newHeight = 0,
        newLeft = ref.current!.offsetLeft,
        newTop = ref.current!.offsetTop;

      if (corner === 'top-left') {
        newWidth = ref.current!.clientWidth + incrementX;
        newHeight = ref.current!.clientHeight + incrementY;
        newLeft = ref.current!.offsetLeft - incrementX;
        newTop = ref.current!.offsetTop - incrementY;
      } else if (corner === 'top-right') {
        newWidth = ref.current!.clientWidth - incrementX;
        newHeight = ref.current!.clientHeight + incrementY;
        newTop = ref.current!.offsetTop - incrementY;
      } else if (corner === 'bottom-left') {
        newWidth = ref.current!.clientWidth + incrementX;
        newHeight = ref.current!.clientHeight - incrementY;
        newLeft = ref.current!.offsetLeft - incrementX;
      } else if (corner === 'bottom-right') {
        newWidth = ref.current!.clientWidth - incrementX;
        newHeight = ref.current!.clientHeight - incrementY;
      }

      setData({
        ...data,
        width: newWidth,
        height: newHeight,
        left: newLeft,
        top: newTop,
      });
    },
    onStartResizingCallback,
    onStopResizingCallback
  );

  return (
    <motion.div
      ref={ref}
      className={clsx(
        'sheet-item group absolute rounded-md focus-within:ring-2',
        'shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_20px_-6px_rgba(0,0,0,0.3)]',
        {
          'z-30': isFocused,
        }
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      style={{
        left: `${data.left}px`,
        top: `${data.top}px`,
        width: `${data.width}px`,
        height: `${data.height}px`,
      }}
    >
      {/* <AnimatePresence initial={false}>
        {isHovering ? (
          <motion.div
            initial={{ opacity: 0, top: 0 }}
            animate={{ opacity: 1, top: '-2rem' }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, top: 0 }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              console.log('double click, stopping propagation');
            }}
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
      </AnimatePresence> */}

      {/* <div className="no-print border-gold absolute bottom-0 right-1 z-10 p-1 text-[0.7em] text-slate-500">
        W: {data.width} H: {data.height} X: {data.left} Y: {data.top}
      </div> */}

      {/* Focus clickable wrapper */}
      <div
        className={clsx(
          'no-print absolute inset-0 z-10 group-focus-within:hidden'
        )}
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      ></div>

      {/* Transform controls wrapper */}
      <TransformControls enabled={isTransformEnabled} onResize={handleResize} />

      <div
        className={clsx(
          `absolute z-0 flex h-[100%] w-[100%] resize flex-col gap-1 rounded-md border border-black/20 p-1`
        )}
        style={{ backgroundColor: 'white' }}
        // style={{ backgroundColor: data.color }}
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
      >
        <input
          id={titleId}
          type="text"
          defaultValue={data.title}
          placeholder="Title"
          onChange={handleTitleChange}
          onDoubleClick={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => e.stopPropagation()}
          // style={{ color: textColorForBg(data.color) }}
          style={{ color: 'black' }}
          className={clsx(
            'ring-none rounded-md border-none bg-transparent p-2 px-3 text-[1.5rem] font-bold outline-none placeholder:text-black/70'
          )}
        />

        <CodeEditor
          language="tsx"
          defaultValue={data.initialContent ?? ''}
          onChange={handleContentChange}
        />
      </div>
    </motion.div>
  );
};
