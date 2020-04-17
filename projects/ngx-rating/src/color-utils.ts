const hex = (x: number) => {
  const xStr = x.toString(16);
  return xStr.length === 1 ? '0' + xStr : String(xStr);
};

export function findColorBetween(startHexColor: string, endHexColor: string, ratio: number): string {
  const r = Math.ceil(
    parseInt(startHexColor.substring(1, 3), 16) * ratio + parseInt(endHexColor.substring(1, 3), 16) * (1 - ratio),
  );
  const g = Math.ceil(
    parseInt(startHexColor.substring(3, 5), 16) * ratio + parseInt(endHexColor.substring(3, 5), 16) * (1 - ratio),
  );
  const b = Math.ceil(
    parseInt(startHexColor.substring(5, 7), 16) * ratio + parseInt(endHexColor.substring(5, 7), 16) * (1 - ratio),
  );

  return `#${hex(r)}${hex(g)}${hex(b)}`;
}
