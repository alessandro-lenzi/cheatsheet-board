'use client';

import { useEffect } from 'react';

interface GenerateProps {
  size: number;
  primaryColor: string;
  secondaryColor: string;
  dotColor: string;
  stops: number;
}

function generateGrid({
  size,
  stops,
  primaryColor,
  secondaryColor,
  dotColor,
}: GenerateProps) {
  const canvas = document.createElement('canvas');

  const totalSize = size * (stops + 1);
  canvas.width = totalSize;
  canvas.height = totalSize;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.warn('Not possible to get 2d context for grid background.');
    return '';
  }

  // Primary lines
  ctx.beginPath();
  ctx.strokeStyle = primaryColor;
  ctx.lineWidth = 1;
  // - Vertical
  ctx.moveTo(totalSize, 0);
  ctx.lineTo(totalSize, totalSize);
  // - Horizontal
  ctx.moveTo(0, totalSize);
  ctx.lineTo(totalSize, totalSize);

  ctx.stroke();

  // Secondary lines
  if (stops >= 1) {
    // const blockSize = size;
    for (let i = 1; i <= stops; i++) {
      const pos = size * i;

      ctx.beginPath();

      // - Vertical
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, totalSize);

      // - Horizontal
      ctx.moveTo(0, pos);
      ctx.lineTo(totalSize, pos);

      ctx.strokeStyle = secondaryColor;
      ctx.stroke();
    }
  }

  ctx.fillStyle = dotColor;
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, 360);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, totalSize - 1, 1, 0, 360);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(totalSize - 1, 0, 1, 0, 360);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(totalSize - 1, totalSize - 1, 1, 0, 360);
  ctx.fill();

  return canvas.toDataURL('image/png');
}

interface IProps {
  elementId: string;
  size: number;
  stops: number;
  primaryColor: string;
  secondaryColor: string;
  dotColor: string;
}

export const GridBackground = ({ elementId, ...props }: IProps) => {
  useEffect(() => {
    const grid = generateGrid(props);

    const element = document.getElementById(elementId);
    if (element) {
      element.style.backgroundImage = `url(${grid})`;
    } else {
      console.warn('Element not found for grid background.');
    }
  }, []);

  return null;
};
