'use client';

import clsx from 'clsx';
import { DragHandlerCallback } from '@/util/dragHandler';

interface IProps {
  enabled: boolean;
  onResize: DragHandlerCallback;
}

export const TransformControls = ({ enabled, onResize }: IProps) => {
  return enabled ? (
    <div
      className={clsx(
        'no-print absolute inset-[-6px] z-20 border border-dashed border-slate-400'
      )}
    >
      {/* Top left */}
      <div
        onMouseDown={(e) => onResize(e, 'top-left')}
        className={
          'absolute left-[-5px] top-[-5px] h-[10px] w-[10px] cursor-nw-resize rounded-sm border border-slate-400 bg-white'
        }
      ></div>

      {/* Top right */}
      <div
        onMouseDown={(e) => onResize(e, 'top-right')}
        className={
          'absolute right-[-5px] top-[-5px] h-[10px] w-[10px] cursor-ne-resize rounded-sm border border-slate-400 bg-white'
        }
      ></div>

      {/* Bottom left */}
      <div
        onMouseDown={(e) => onResize(e, 'bottom-left')}
        className={
          'absolute bottom-[-5px] left-[-5px] h-[10px] w-[10px] cursor-sw-resize rounded-sm border border-slate-400 bg-white'
        }
      ></div>

      {/* Bottom right */}
      <div
        onMouseDown={(e) => onResize(e, 'bottom-right')}
        className={
          'absolute bottom-[-5px] right-[-5px] h-[10px] w-[10px] cursor-se-resize rounded-sm border border-slate-400 bg-white'
        }
      ></div>
    </div>
  ) : null;
};
