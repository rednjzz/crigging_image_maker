/**
 * @constructor
 * @param part
 *  this param is passed from sesia's component that
 *  compose of crane parts data
 * @param prevPartnextCoord
 *
 * rotation 값에 의한 오차를 정정 wX wY로
*/

import {abbreviatePartName} from "./utils";

export default class CraneModule {

  constructor(part,prevPartNextCoord, offSetX, offSetY, ctx, dummyData) {
    this.x1 = part.origin.x; //시작점
    this.y1 = part.origin.y;
    this.x2 = part.joint[0].x;
    this.y2 = part.joint[0].y;
    this.wX = prevPartNextCoord.x; // 전에 계산된 파츠의 다음 파츠 부착점, 현재 파츠의 시작점에 될 지점
    this.wY = prevPartNextCoord.y;
    this.offSetX = offSetX;
    this.offSetY = offSetY;
    this.angle = part.angle;
    this.mainAngle = part.mainAngle;
    this.flyFixLuffingAngle = part.flyFixLuffingAngle
;
    this.radianAngle = this.angle * (2 * Math.PI) / 360;
    this.mainRadianAngle = this.mainAngle * (2 * Math.PI) / 360;
    this.fixLuffingRadianAngle = this.flyFixLuffingAngle
 * (2 * Math.PI) / 360;
    this.imgSrc = part.imgSrc;
    this.ctx = ctx;
    this.joint = part.joint;
    this.wire = part.wire;
    this.next = [];
    this.transWire = [];
    // this.refs = part.reference;
    this.marker = part.marker; //마커가 있는지 true false
    this.length = part.length; //parts length (boom or fix)
    this.part = part;
    this.pointInfo = {
    };
    this.radius = 100; // 호의 반지름 (각도표시)
    if(part.flyFixLuffingAngle
) {
      this.radius = 250;
    }
    // this.dummyData = dummyData;
    this.tipLength = 30;
    this.tipOffset = 150;
  }

  rotate(x1, y1, x2, y2, wX, wY, radianAngle) {

    // x1,y1: 파츠의 시작점(기준점,원점), x2,y2: 조인트 부분 , wX,wY: 현재 전파츠에서 계산된 현파츠의 기준 절대좌표
    const rotateX1 = x1 * Math.cos(radianAngle) + y1 * Math.sin(radianAngle); //이미지 회전시 x1의 좌표의 변화값
    const rotateY1 = -1 *x1 * Math.sin(radianAngle) + y1 * Math.cos(radianAngle); //y1의 각도 변환값
    const rotateX2 = x2 * Math.cos(radianAngle) + y2 * Math.sin(radianAngle); //x2의 각도 변환값
    const rotateY2 = -1 *x2 * Math.sin(radianAngle) + y2 * Math.cos(radianAngle); //y2의 각도 변환값
    const diffX = rotateX2 - rotateX1; // 다음 parts가 attach 되어야 하는 좌표로 이동할 값
    const diffY = rotateY2 - rotateY1;
    const nextX = diffX + wX;
    const nextY = diffY + wY;

    this.rotateX1 = rotateX1; // rotate값은 draw 할때 필요하다
    this.rotateY1 = rotateY1;
    return { x:nextX, y:nextY };
  }
  markerRotate(cx,cy,px,py,rad){
    const rx = (px-cx)*Math.cos(rad) + (py-cy)*Math.sin(rad) + cx ;
    const ry = -(px-cx)*Math.sin(rad) + (py-cy)*Math.cos(rad) + cy;
    return {x: rx , y:ry }
  }

  calculateMarker(x1, y1, x2, y2, marker, wX, wY, radianAngle, offSetX, offSetY) {
    if(marker) {
      const offset = this.tipOffset;
      const tipLength = this.tipLength; //마커의 길이 값
      // const next = this.rotate(x1, y1, marker.end.x, marker.end.y, wX, wY, radianAngle);
      const nextEnd = this.rotate(x1, y1, x2, y2 - offset, wX, wY, radianAngle);
      const nextStart = this.rotate(x1, y1, x1, y1 - offset, wX, wY, radianAngle);

      const sx = nextStart.x + offSetX; //시작점의 x좌표 / 이건 값이 변경 된어야 할것 같다 (marker start의 x 좌표로 변경필요)
      const sy = nextStart.y + offSetY;

      const ex = nextEnd.x + offSetX ; // 끝점의 x좌표 / 이좌표도 값이 변경 필요 (guideLine end의 x 좌표로 변경필요)
      const ey = nextEnd.y + offSetY ;

      return this.calculateGuidelinePosition(sx, sy, ex, ey, tipLength, radianAngle);
    }
  }
  calculateAdditionalGuideLine(craneDetail) {
    // if ( this.partname = 'T')
    // d1 (this.wX, this.wY, this.
    /*
    const start = this.rotate(x1, y1, x1, y1, wX, wY, radianAngle);
    const end   = this.rotate(x1, y1, marker.end.x, marker.end.y, wX, wY, radianAngle);
    const d1 = { start: { x: start.x , y: offsetD1 }, end: { x: end.x, y: offsetD1 }}
    const d2 = { start: { x: end.x, y: offsetD1 }, end: { x:
     */
  }

  calculateGuidelinePosition(sx, sy, ex, ey, tipLength, rotateAngle) {

    const nextS1 = this.markerRotate(sx, sy, sx, sy + tipLength, rotateAngle);
    const nextS2 = this.markerRotate(sx, sy, sx, sy - tipLength, rotateAngle);
    const nextE1 = this.markerRotate(ex, ey, ex, ey + tipLength, rotateAngle);
    const nextE2 = this.markerRotate(ex, ey, ex, ey - tipLength, rotateAngle);

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

    return {
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

  }
  calculateAngleLine(x,y, offSetX, offSetY, radius, radianAngle, partName ) {
    let THIRD = radianAngle / 3; // 호의 1/3만 표시하기위해
    let start1 = 2 * Math.PI - radianAngle; //첫번째 호의 시작
    let end1 = start1 + THIRD; //첫번째 호의 끝
    let start2 = end1 + THIRD; //두번째 호의 시작
    let end2 = 0; //두번째 호의 끝

    let tmp = (x+radius*(5/3));

    let {x:rotateLine1X, y: rotateLine1Y}= this.markerRotate(x,y,tmp,y, 0);
    let {x:rotateLine2X, y: rotateLine2Y}= this.markerRotate(x,y,tmp,y, radianAngle);
    let {x:valueX, y: valueY } = this.markerRotate(x,y, x+radius, y, radianAngle/2);

    let rx1 = rotateLine1X;
    let ry1 = rotateLine1Y;
    let rx2 = rotateLine2X;
    let ry2 = rotateLine2Y;

    if (partName === 'F') {

      THIRD = this.fixLuffingRadianAngle / 3;
      start1 = 2 * Math.PI - this.mainRadianAngle;
      end1 = start1 + THIRD;
      start2 = end1 + THIRD; //두번째 호의 시작
      end2 = start2 + THIRD;
      rx1 = this.markerRotate(x,y,rotateLine1X,rotateLine1Y, this.mainRadianAngle).x;
      ry1 = this.markerRotate(x,y,rotateLine1X,rotateLine1Y, this.mainRadianAngle).y;
      rx2 = this.markerRotate(x,y,rotateLine1X,rotateLine1Y, this.radianAngle).x;
      ry2 = this.markerRotate(x,y,rotateLine1X,rotateLine1Y, this.radianAngle).y;

      valueX = this.markerRotate(x,y, x+radius, y, this.radianAngle + this.fixLuffingRadianAngle/2).x;
      valueY = this.markerRotate(x,y, x+radius, y, this.radianAngle + this.fixLuffingRadianAngle/2).y;
    }

    return {
      arc1: {
        start: start1,
        end: end1
      },
      arc2: {
        start: start2,
        end: end2
      },
      line1:{
        start: {x,y},
        end: {x:rx1, y:ry1}
      },
      line2: {
        start: {x,y},
        end: {x:rx2, y:ry2}
      },
      value: {
        x: valueX,
        y: valueY
      }
    }
  }
  
  calculateCoordination() {
    // 아래 부분은 모아서 this.next로 통합 , joint가 여러개인 경우 고려하여 수정됨
    for(let i=0 ; i<this.joint.length; i++){
      const x = this.joint[i].x;
      const y = this.joint[i].y;
      this.next[i] = this.rotate(this.x1,this.y1, x, y, this.wX, this.wY, this.radianAngle);
    }
    // wire 좌표 변환 데이터
    if(this.wire){
      for(let j=0 ; j<this.wire.length; j++) {
        const x = this.wire[j].x;
        const y = this.wire[j].y;
        const result = this.rotate(this.x1, this.y1, x, y, this.wX, this.wY, this.radianAngle);
        this.transWire[j] = {x: result.x + this.offSetX, y: result.y + this.offSetY};
      }
    }


    // 특정 point 계산

    this.partName = abbreviatePartName(this.part.name);
    // this.pointInfo.isMarkerExist = true;
    this.pointInfo.start = {x: this.wX + this.offSetX, y: this.wY + this.offSetY}; //붐의 중심점 좌표
    this.pointInfo.end = { x: this.next[0].x + this.offSetX, y: this.next[0].y + this.offSetY }; // 다음 접합점좌표
    this.pointInfo.angle = this.angle;
    this.pointInfo.mainAngle = this.mainAngle;
    this.pointInfo.flyFixLuffingAngle = this.flyFixLuffingAngle
;

    // const name = abbreviatePartName(this.part.name);
    // this.partName = name;
    // switch(name){
    //   case 'T' : {
    //     this.pointInfo.isMarkerExist = true;
    //     this.pointInfo.start = {x: this.wX + this.offSetX, y: this.wY + this.offSetY}; //붐의 중심점 좌표
    //     this.pointInfo.end = { x: this.next[0].x + this.offSetX, y: this.next[0].y + this.offSetY }; // 다음 접합점좌표
    //     break;
    //   }
    //   case 'F' : {
    //     this.pointInfo.isMarkerExist = true;
    //     this.pointInfo.start = {x: this.wX + this.offSetX, y: this.wY + this.offSetY}; //픽스 시작점좌표
    //     this.pointInfo.end = { x: this.next[0].x + this.offSetX, y: this.next[0].y + this.offSetY }; // 다음 접합점좌표
    //     break;
    //   }
    //   case 'H' : {
    //     this.pointInfo.isMarkerExist = true;
    //     this.pointInfo.end = { x: this.next[0].x + this.offSetX, y: this.next[0].y + this.offSetY }; // 다음 접합점좌표
    //     break;
    //   }
    //   default : {
    //     this.pointInfo.isMarkerExist = false;
    //   }
    // }
  }

  draw() {
    // calculate draw point
    this.calculateCoordination();
    //Load Image
    const image = new Image();
    image.src = this.imgSrc;

    image.onload = () => {
      this.ctx.translate(this.x1 - this.rotateX1, this.y1 - this.rotateY1  )  // 회전 위치 보정
      this.ctx.translate(this.offSetX + this.wX - this.x1, this.offSetY + this.wY - this.y1);   // 변환 위치로 이동
      this.ctx.rotate(-1 * this.radianAngle); // 회전
      this.ctx.drawImage(image, 0, 0);        //이미지 그리기
      this.ctx.setTransform(1,0,0,1,0,0);     // 컨텍스트 초기화
      this.drawMarker();

      // if (this.partName === 'T' || this.partName === 'F'){
      //   this.drawAngleLine(this.ctx, this.wX, this.wY, this.offSetX, this.offSetY, this.radius, this.angle, this.radianAngle)
      //   // console.log(this.ctx, this.wX, this.wY, this.offSetX, this.offSetY, this.radius, this.angle, this.radianAngle)
      // }
    }
  }

  drawMarker() {
    const marker = this.calculateMarker(this.x1, this.y1, this.x2, this.y2, this.marker, this.wX, this.wY, this.radianAngle, this.offSetX, this.offSetY);
    if(marker){
      this.ctx.beginPath();
      this.ctx.font = `normal ${30}pt Arial`;
      this.ctx.fillStyle = 'black';
      this.ctx.textAlign = "center";
      this.ctx.fillText(`${this.length}m`, marker.center.x,marker.center.y);

      marker.lines.forEach((line) => {
        this.ctx.moveTo(line.start.x,line.start.y);
        this.ctx.lineTo(line.end.x,line.end.y);
      })
      this.ctx.strokeStyle = 'black';
      this.ctx.stroke();
      this.ctx.setTransform(1,0,0,1,0,0);     // 컨텍스트 초기화
    }
  }

  drawAngleLine(ctx, wX, wY , offSetX, offSetY, radius, angle, radianAngle) {
    const x = wX + this.offSetX;
    const y = wY + this.offSetY;
    const { arc1,arc2,line1,line2,value }= this.calculateAngleLine(x,y, offSetX, offSetY, radius, radianAngle,this.partName)
    ctx.strokeStyle = 'black'

    ctx.beginPath();
    ctx.arc(x, y, radius, arc1.start, arc1.end);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, radius, arc2.start, arc2.end);
    ctx.stroke();

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
  }

  drawPoints() {
    this.calculateCoordination();
    this.drawPoint(this.addCoordX,this.addCoordY  ,'red');
  }

  drawPoint(x, y, color) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    // this.ctx.lineWidth = 20;
    this.ctx.strokeStyle = '#330000';
    this.ctx.stroke();
  }
}