'use client';

interface IProps {
  size: number;
  color: string;
}

export function generateGrid({ size, color }: IProps) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.warn('Not possible to get 2d context');
    return '';
  }

  ctx.moveTo(0, 0);
  ctx.lineTo(0, size);

  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);

  ctx.strokeStyle = color;
  ctx.stroke();

  return canvas.toDataURL('image/png');
}
