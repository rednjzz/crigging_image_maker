export default class LineMarker {
  constructor(
    ctx,
    start={x:0,y:0},
    end = {x:0,y:0},
    value= '0',
    tipLength = 30,
    fontSize = 30) {
      this.ctx = ctx;
      this.start = start;
      this.end = end;
      this.value = value;
      this.tipLength = tipLength;
      this.fontSize = fontSize;
      this.lineData = {
      center: {x: 0, y: 0},
      lines: [
        {
          start: {x: 0, y: 0},
          end: {x: 0, y: 0},
        }, {
          start: {x: 0, y: 0},
          end: {x: 0, y: 0}
        }, {
          start: {x: 0, y: 0},
          end: {x: 0, y: 0}
        }, {
          start: {x: 0, y: 0},
          end: {x: 0, y: 0}
        }
      ],
    }
  }

  rotate(cx, cy, px, py, rad) {
    const rx = (px - cx) * Math.cos(rad) + (py - cy) * Math.sin(rad) + cx;
    const ry = -(px - cx) * Math.sin(rad) + (py - cy) * Math.cos(rad) + cy;
    return {x: rx, y: ry}
  }

  calculateGuidelinePosition() {
    const sx = this.start.x;
    const sy = this.start.y;
    const ex = this.end.x;
    const ey = this.end.y;
    const tipLength = this.tipLength;
    // 1. 각도 구하기 (sx, sy, ex, ey)
    const rotateAngle = Math.atan((sy - ey) / (ex - sx)); //return in radians of a number

    // 각도 만큼 팁 회전
    const nextS1 = this.rotate(sx, sy, sx, sy + tipLength, rotateAngle); //시작지점 팁1
    const nextS2 = this.rotate(sx, sy, sx, sy - tipLength, rotateAngle); //시작지점 팁2
    const nextE1 = this.rotate(ex, ey, ex, ey + tipLength, rotateAngle); //끝지점  팁1
    const nextE2 = this.rotate(ex, ey, ex, ey - tipLength, rotateAngle); //끝지점 팁2

    function getCenter(sx, sy, ex, ey) {
      return {
        x: ((ex - sx) / 2 + sx),
        y: ((ey - sy) / 2 + sy)
      }
    }

    const start = {x: sx, y: sy};
    const end = {x: ex, y: ey};
    const center = getCenter(sx, sy, ex, ey);
    const centerHalf1 = getCenter(sx, sy, center.x, center.y);
    const centerHalf2 = getCenter(center.x, center.y, ex, ey);

    this.lineData = {
      center,
      lines: [
        {
          start: nextS1,
          end: nextS2,
        }, {
          start: start,
          end: centerHalf1
        }, {
          start: nextE1,
          end: nextE2
        }, {
          start: end,
          end: centerHalf2
        }
      ],
    }
    return this;

  }

  applyOffset(offset, position) {
    const lineData = this.lineData;

    switch (position) {
      case 'up': {
        lineData.center.y -= offset;
        for (let i = 0; i < lineData.lines.length; i++) {
          lineData.lines[i].start.y -= offset;
          lineData.lines[i].end.y -= offset;
        }
        break;
      }
      case 'down': {
        lineData.center.y += offset;
        for (let i = 0; i < lineData.lines.length; i++) {
          lineData.lines[i].start.y += offset;
          lineData.lines[i].end.y += offset;
        }
        break;
      }
      case 'left': {
        lineData.center.x -= offset;
        for (let i = 0; i < lineData.lines.length; i++) {
          lineData.lines[i].start.x -= offset;
          lineData.lines[i].end.x -= offset;
        }
        break;
      }
      case 'right': {
        lineData.center.x += offset;
        for (let i = 0; i < lineData.lines.length; i++) {
          lineData.lines[i].start.x += offset;
          lineData.lines[i].end.x += offset;
        }
        break;
      }
      default : {
      }
    }
    return this;
  }

  draw(ctx = this.ctx) {
    const length = this.value;
    const lineData = this.lineData;
    const fontSize = this.fontSize;

    ctx.beginPath();
    ctx.font = `normal ${fontSize}pt Arial`;
    ctx.fillStyle = 'black';
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";

    ctx.fillText(`${length}[m]`, lineData.center.x, lineData.center.y);
    lineData.lines.forEach((line) => {
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
    })
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);     // 컨텍스트 초기화
  }
}