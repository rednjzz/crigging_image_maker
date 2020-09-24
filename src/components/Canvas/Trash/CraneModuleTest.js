/**
 * rotation point 인 x1, y1으로 이동후
 * rotation 하고
 * rotation 값에 의한 오차를 정정 wX wY로
 */

export default class CraneModule {
  nextCoordX = this.nextCoordX;
  nextCoordY = this.nextCoordY;
  addCoordX = this.addCoordX;
  addCoordY = this.addCoordY;
  constructor(x1,y1,joint,wX,wY,offSetX, offSetY, angle, imgSrc, drawOrder, refs, ctx, additional,additionalX,additionalY) {
    this.drawOrder = drawOrder;
    this.refs = refs;
    this.x1 = x1;
    this.y1 = y1;
    for (let i=0 ; i<joint.length ; i++){
      this.joint[i].x =  joint[i].x;
      this.joint[i].y =  joint[i].y;
    }
    this.wX = wX;
    this.wY = wY;
    this.offSetX = offSetX;
    this.offSetY = offSetY;
    this.radianAngle = angle * (2 * Math.PI) / 360;
    this.imgSrc = imgSrc;
    this.ctx = ctx;
    this.imageWidth = 400;
    this.imageHeight = 400;
    this.nextCoordX = 0;
    this.nextCoordY = 0;
    this.addCoordX = 0;
    this.addCoordY = 0;
    this.x3 = additionalX;
    this.y3 = additionalY;
    this.additional = additional;
  }

  rotate(x1, y1, x2, y2, wX, wY, radianAngle) {
    const rotateX1 = (x1 * Math.cos(radianAngle) - y1 * Math.sin(radianAngle)); //이미지 회전시 x1의 좌표의 변화값
    const rotateY1 = (x1 * Math.sin(radianAngle) + y1 * Math.cos(radianAngle)); //y1의 각도 변환값
    const rotateX2 = (x2 * Math.cos(radianAngle) - y2 * Math.sin(radianAngle)); //x2의 각도 변환값
    const rotateY2 = (x2 * Math.sin(radianAngle) + y2 * Math.cos(radianAngle)); //y2의 각도 변환값
    const diffX = rotateX2 - rotateX1; // 다음 parts가 attach 되어야 하는 좌표로 이동할 값
    const diffY = rotateY2 - rotateY1;
    const nextX = diffX + wX;
    const nextY = diffY + wY;
    return { nextX, nextY };
  }
  // {x2,y2}값 즉 joint 부부이 여러개 일때를 고려해서 수정해야한다.
  calculateCoordination() {
    this.rotateX1 = (this.x1 * Math.cos(this.radianAngle) - this.y1 * Math.sin(this.radianAngle)); //이미지 회전시 x1의 좌표의 변화값
    this.rotateY1 = (this.x1 * Math.sin(this.radianAngle) + this.y1 * Math.cos(this.radianAngle)); //y1의 각도 변환값

    const { nextX, nextY } = this.rotate(this.x1,this.y1,this.x2,this.y2, this.wX, this.wY, this.radianAngle);
    this.nextCoordX = nextX;
    this.nextCoordY = nextY;
    if (this.additional){
      const { nextX, nextY } = this.rotate(this.x1,this.y1,this.x3,this.y3, this.wX, this.wY, this.radianAngle);
      this.addCoordX = nextX;
      this.addCoordY = nextY;
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
  // 초기 버전 draw 삭제 예정
  draw_deprecate() {
    this.calculateCoordination();

    const image = new Image();
    image.src = this.imgSrc;

    const corrX = this.wX + this.offSetX;
    const corrY = this.wY + this.offSetY;
    // const convAngle = this.angle * (2*Math.PI ) / 360;

    // rotation Error Correction coordination
    const transformX = (corrX * Math.cos(this.radianAngle) + corrY * Math.sin(this.radianAngle));
    const transformY = (- corrX * Math.sin(this.radianAngle) + corrY * Math.cos(this.radianAngle));
    // x1 y1 is rotation Point
    // console.log(transformX, transformY);
    image.onload = () => {
      this.ctx.rotate(this.radianAngle);
      this.ctx.translate(-this.x1, -this.y1)  // 위치 원점으로 초기화
      this.ctx.translate(transformX , transformY);    // 변환 위치로 이동
      this.ctx.drawImage(image, 0, 0);        //이미지 그리기
      this.ctx.setTransform(1,0,0,1,0,0);     // 컨텍스트 초기화
    }
  }
}