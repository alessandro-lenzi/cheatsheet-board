'use client';

import clsx from 'clsx';
import { DragHandlerCallback } from '@/util/dragHandler';

interface IProps {
  enabled: boolean;
  onResize: DragHandlerCallback;
}

export const TransformControls = ({ enabled, onResize }: IProps) => {
  const handlerClassName =
    'absolute h-[14px] w-[14px] rounded-sm border-2 border-slate-400 bg-white';
  return enabled ? (
    <div
      className={clsx(
        'no-print absolute inset-[-6px] z-50 border-2 border-dashed border-slate-400'
      )}
    >
      {/* Top left */}
      <div
        onMouseDown={(e) => onResize(e, 'top-left')}
        className={clsx(
          handlerClassName,
          'left-[-10px] top-[-10px]',
          'cursor-nw-resize'
        )}
      ></div>

      {/* Top right */}
      <div
        onMouseDown={(e) => onResize(e, 'top-right')}
        className={clsx(
          handlerClassName,
          'right-[-10px] top-[-10px]',
          'cursor-ne-resize'
        )}
      ></div>

      {/* Bottom left */}
      <div
        onMouseDown={(e) => onResize(e, 'bottom-left')}
        className={clsx(
          handlerClassName,
          'bottom-[-10px] left-[-10px]',
          'cursor-sw-resize'
        )}
      ></div>

      {/* Bottom right */}
      <div
        onMouseDown={(e) => onResize(e, 'bottom-right')}
        className={clsx(
          handlerClassName,
          'bottom-[-10px] right-[-10px]',
          'cursor-se-resize'
        )}
      ></div>
    </div>
  ) : null;
};
