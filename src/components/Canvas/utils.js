export function abbreviatePartName(partName) {
  if (/^T/g.test(partName)) return 'T'
  if(/^F/g.test(partName)) return 'F'
  if(/head$/g.test(partName)) return 'H'
  return partName;
}

export const getPoint = (point, ppm) => (distance) => {
  const distancePx = ppm * distance;
    return {
      x: point.x + distancePx,
      y: point.y
    }
  }
export function drawPoints(points, ctx) {
  points.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.fill();
    // ctx.lineWidth = 20;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  })
}

export function getJibMod(craneCode) {
  if (/T$/g.test(craneCode)) return 'T'
  if (/F$/g.test(craneCode)) return 'F'
  if (/K$/g.test(craneCode)) return 'K'
  return ''
}
