import { Color } from '../3d-math';

export function writeToColor(color: Color) {
  const r = Math.round(color.x * 255);
  const g = Math.round(color.y * 255);
  const b = Math.round(color.z * 255);

  return `${r} ${g} ${b}\n`;
}
