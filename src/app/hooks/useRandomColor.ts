'use client';

import chroma from 'chroma-js';

export const useRandomColor = () => {
  const generateColor = () => {
    // const hsl =
    //   'hsl(' +
    //   360 * Math.random() +
    //   ',' +
    //   (25 + 70 * Math.random()) +
    //   '%,' +
    //   (85 + 10 * Math.random()) +
    //   '%)';
    // return chroma(hsl).hex();
    // //const color = chroma().random().saturate(5).mix('white', 0.5);
    // //return color.hex();

    let color = chroma.random().mix('white');
    const whiteContrast = chroma.contrast(color, 'white');
    console.log(`whiteContrast = ${whiteContrast}`);
    if (whiteContrast < 4) color = color.darken(0.5);

    return color.hex();
  };

  return { generateColor };
};
