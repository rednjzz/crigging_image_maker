export default function drawWire(data, ctx) {
  data.map(points => {
    ctx.moveTo(points[0].x,points[0].y);
    ctx.lineTo(points[1].x,points[1].y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setTransform(1,0,0,1,0,0);
  })
}
