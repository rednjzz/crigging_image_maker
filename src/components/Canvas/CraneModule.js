/** 
 * rotation point 인 x1, y1으로 이동후
 * rotation 하고 
 * rotation 값에 의한 오차를 정정 wX wY로
*/

export default class CraneModule {
  constructor(x1,y1,x2,y2,wX,wY,offSetX, offSetY, angle, canvasWidth, canvasHeight, imgSrc, ctx) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.wX = wX;
    this.wY = wY;
    this.offSetX = offSetX;
    this.offSetY = offSetY;
    this.radianAngle = angle * (2*Math.PI ) / 360;
    this.imgSrc = imgSrc;
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.imageWidth = 400;
    this.imageHeight = 400;
    this.nextCoordX = 0;
    this.nextCoordY = 0;
  }

  calculateCoordination() {
    this.rotateX1 = (this.x1 * Math.cos(this.radianAngle) - this.y1 * Math.sin(this.radianAngle));
    this.rotateY1 = (this.x1 * Math.sin(this.radianAngle) + this.y1 * Math.cos(this.radianAngle));
    this.rotateX2 = (this.x2 * Math.cos(this.radianAngle) - this.y2 * Math.sin(this.radianAngle));
    this.rotateY2 = (this.x2 * Math.sin(this.radianAngle) + this.y2 * Math.cos(this.radianAngle));
    const diffX = this.rotateX2 - this.rotateX1;
    const diffY = this.rotateY2 - this.rotateY1;
    this.nextCoordX = diffX + this.wX;
    this.nextCoordY = diffY + this.wY;
  }

  draw() {
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
  drawPoints() {

    // this.drawPoint(200,200,'red');
    this.calculateCoordination();
    // this.drawPoint(this.rotateX1,this.rotateY1  ,'blue');
    this.drawPoint(this.x1,this.y1  ,'blue');
    // this.drawPoint(this.rotateX2,this.rotateY2  ,'green');
    this.drawPoint(this.x2,this.y2  ,'green');
    this.drawPoint(this.nextCoordX,this.nextCoordY  ,'blue');
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