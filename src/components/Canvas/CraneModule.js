/** 
 * rotation point 인 x1, y1으로 이동후
 * rotation 하고 
 * rotation 값에 의한 오차를 정정 wX wY로
*/

export default class CraneModule {
  constructor(x1,y1,wX,wY,offSetX, offSetY, angle, imgSrc, drawOrder, refs, ctx,joint) {
    this.x1 = x1; //시작점
    this.y1 = y1;
    this.wX = wX; // 전에 계산된 파츠의 다음 파츠 부착점, 현재 파츠의 시작점에 될 지점
    this.wY = wY;
    this.offSetX = offSetX;
    this.offSetY = offSetY;
    this.radianAngle = angle * (2 * Math.PI) / 360;
    this.imgSrc = imgSrc;
    this.ctx = ctx;
    this.joint = joint;
    this.next = [];
    this.refs = refs;
    this.drawOrder = drawOrder;
  }

  rotate(x1, y1, x2, y2, wX, wY, radianAngle) {
    // x1,y1: 파츠의 시작점(기준점,원점), x2,y2: 조인트 부분 , wX,wY: 현재 전파츠에서 계산된 현파츠의 기준 절대좌표
    const rotateX1 = (x1 * Math.cos(radianAngle) - y1 * Math.sin(radianAngle)); //이미지 회전시 x1의 좌표의 변화값
    const rotateY1 = (x1 * Math.sin(radianAngle) + y1 * Math.cos(radianAngle)); //y1의 각도 변환값
    const rotateX2 = (x2 * Math.cos(radianAngle) - y2 * Math.sin(radianAngle)); //x2의 각도 변환값
    const rotateY2 = (x2 * Math.sin(radianAngle) + y2 * Math.cos(radianAngle)); //y2의 각도 변환값
    const diffX = rotateX2 - rotateX1; // 다음 parts가 attach 되어야 하는 좌표로 이동할 값
    const diffY = rotateY2 - rotateY1;
    const nextX = diffX + wX;
    const nextY = diffY + wY;

    this.rotateX1 = rotateX1; // rotate값은 draw 할때 필요하다
    this.rotateY1 = rotateY1;
    return { x:nextX, y:nextY };
  }

  calculateCoordination() {
    // 아래 부분은 모아서 this.next로 통합 , joint가 여러개인 경우 고려하여 수정됨
    for(let i=0 ; i<this.joint.length; i++){
      const x = this.joint[i].x;
      const y = this.joint[i].y;
      this.next[i] = this.rotate(this.x1,this.y1, x, y, this.wX, this.wY, this.radianAngle);
    }
  }

  draw() {
    // calculate draw point
    // this.calculateCoordination();
    //Load Image
    const image = new Image();
    image.src = this.imgSrc;

    image.onload = () => {
      this.ctx.translate(this.x1 - this.rotateX1, this.y1 - this.rotateY1  )  // 회전 위치 보정
      this.ctx.translate(this.offSetX + this.wX - this.x1, this.offSetY + this.wY - this.y1);   // 변환 위치로 이동
      this.ctx.rotate(this.radianAngle); // 회전
      this.ctx.drawImage(image, 0, 0);        //이미지 그리기
      this.ctx.setTransform(1,0,0,1,0,0);     // 컨텍스트 초기화
    }
  }

  drawPoints() {
    this.calculateCoordination();
    // this.drawPoint(this.rotateX1,this.rotateY1  ,'green');
    //
    // this.drawPoint(this.x1,this.y1  ,'blue');
    // // this.drawPoint(this.rotateX2,this.rotateY2  ,'green');
    // // this.drawPoint(this.x2,this.y2  ,'green');
    // this.drawPoint(this.nextCoordX,this.nextCoordY  ,'blue');
    this.drawPoint(this.addCoordX,this.addCoordY  ,'red');
  }

  drawPoint(x, y, color) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#330000';
    this.ctx.stroke();
  }
}