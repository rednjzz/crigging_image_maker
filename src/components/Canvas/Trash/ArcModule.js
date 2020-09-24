export default class ArcModule {
  constructor(point, radius, angle, offSetX, offSetY, ctx){
    this.offSetX = 0;
    this.offSetY = 0;
    this.ctx = ctx;
    this.angle = angle;
    this.point = point;
    this.radius = radius;
    this.arcRadAngle =  (angle * (2 * Math.PI) / 360);
  }

  calculateAngle(arcRadAngle) {
    const THIRD = arcRadAngle / 3;
    const start1 = 2 * Math.PI - arcRadAngle;
    const end1 = start1 + THIRD;
    const start2 = end1 + THIRD;
    const end2 = 0;
    return [start1,end1,start2,end2];
  }
  calculateGuideLine(x,y,radius) {
    // x = x + this.offSetX;
    // y = y + this.offSetY;
    const tmp = (x+radius*(5/3));
    const {x:rx, y: ry}= this.rotate(x,y,tmp,y, this.arcRadAngle);
    const {x:valueX, y: valueY } = this.rotate(x,y, x+radius, y, this.arcRadAngle/2);
    return {
      line1:{
        start: {x,y},
        end: {x:tmp, y}
      },
      line2: {
        start: {x,y},
        end: {x:rx, y:ry}
      },
      value: {
        x: valueX,
        y: valueY
      }
    }
  }
  draw() {
    const angles= this.calculateAngle(this.arcRadAngle);
    const guide = this.calculateGuideLine(this.point.x,this.point.y, this.radius);
    this.drawArc(this.ctx, this.point.x, this.point.y, this.radius, angles);
    this.drawGuideLine(this.ctx, guide.line1, guide.line2, guide.value, this.angle);
  }
  drawArc(ctx, x, y, radius, angles) {
    ctx.strokeStyle = 'black'
    ctx.beginPath();
    ctx.arc(x+ this.offSetX,y + this.offSetY,radius, angles[0], angles[1]);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x+ this.offSetX,y + this.offSetY,radius, angles[2], angles[3]);
    ctx.stroke();
    ctx.setTransform(1,0,0,1,0,0);     // 컨텍스트 초기화
  }
  drawGuideLine(ctx, line1, line2, value, angle) {
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(line1.start.x,line1.start.y);
    ctx.lineTo(line1.end.x,line1.end.y);
    ctx.moveTo(line2.start.x,line2.start.y);
    ctx.lineTo(line2.end.x,line2.end.y);
    this.ctx.font = `normal 30pt Arial`;
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`${angle}°`, value.x, value.y);
    ctx.stroke();
    ctx.setTransform(1,0,0,1,0,0);     // 컨텍스트 초기화
    // console.log(line2);
  }
  rotate(cx,cy,px,py,rad){
    const x = (px-cx)*Math.cos(rad) + (py-cy)*Math.sin(rad) + cx ;
    const y = -(px-cx)*Math.sin(rad) + (py-cy)*Math.cos(rad) + cy;
    return {x, y}
  }
}