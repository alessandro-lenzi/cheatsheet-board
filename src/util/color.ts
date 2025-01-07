import chroma from 'chroma-js';

export function generateColor() {
  // const hsl =
  //   'hsl(' +
  //   360 * Math.random() +
  //   ',' +
  //   (25 + 70 * Math.random()) +
  //   '%,' +
  //   (85 + 10 * Math.random()) +
  //   '%)';
  // return chroma(hsl).hex();

  //const color = chroma.random().saturate(5).mix('white', 0.5);
  //return color.hex();
  let color = chroma.random().mix('white');
  const whiteContrast = chroma.contrast(color, 'white');
  console.log(`whiteContrast = ${whiteContrast}`);
  if (whiteContrast < 4) color = color.darken();

  return color.hex();
}

export function textColorForBg(bgColor: string) {
  const contrast = chroma.contrast(bgColor, 'white');
  if (contrast < 4.5) return 'black';
  return 'white';
}
