'use client';

import { MouseEventHandler } from 'react';
import clsx from 'clsx';

interface IProps {
  enabled: boolean;
  onResizeTopLeft: MouseEventHandler<HTMLDivElement>;
  onResizeTopRight: MouseEventHandler<HTMLDivElement>;
  onResizeBottomLeft: MouseEventHandler<HTMLDivElement>;
  onResizeBottomRight: MouseEventHandler<HTMLDivElement>;
}

export const TransformControls = ({
  enabled,
  onResizeTopLeft,
  onResizeTopRight,
  onResizeBottomLeft,
  onResizeBottomRight,
}: IProps) => {
  return enabled ? (
    <div
      className={clsx(
        'no-print absolute inset-[-6px] z-20 border border-dashed border-slate-400'
      )}
    >
      {/* Top left */}
      <div
        onMouseDown={onResizeTopLeft}
        className={
          'absolute left-[-5px] top-[-5px] h-[10px] w-[10px] cursor-nw-resize rounded-sm border border-slate-400 bg-white'
        }
      ></div>

      {/* Top right */}
      <div
        onMouseDown={onResizeTopRight}
        className={
          'absolute right-[-5px] top-[-5px] h-[10px] w-[10px] cursor-ne-resize rounded-sm border border-slate-400 bg-white'
        }
      ></div>

      {/* Bottom left */}
      <div
        onMouseDown={onResizeBottomLeft}
        className={
          'absolute bottom-[-5px] left-[-5px] h-[10px] w-[10px] cursor-sw-resize rounded-sm border border-slate-400 bg-white'
        }
      ></div>

      {/* Bottom right */}
      <div
        onMouseDown={onResizeBottomRight}
        className={
          'absolute bottom-[-5px] right-[-5px] h-[10px] w-[10px] cursor-se-resize rounded-sm border border-slate-400 bg-white'
        }
      ></div>
    </div>
  ) : null;
};
