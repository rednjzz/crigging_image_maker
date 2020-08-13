/** 
 * rotation point 인 x1, y1으로 이동후
 * rotation 하고 
 * rotation 값에 의한 오차를 정정 wX wY로
*/

export default class CraneModule {
  constructor(x1,y1,wX,wY,offSetX, offSetY, angle, canvasWidth, canvasHeight, imgSrc, ctx) {
    this.x1 = x1;
    this.y1 = y1;
    this.wX = wX;
    this.wY = wY;
    this.offSetX = offSetX;
    this.offSetY = offSetY;
    this.angle = angle;
    this.imgSrc = imgSrc;
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.imageWidth = 400;
    this.imageHeight = 400;
    // this. jointX = 0;
    // this. jointY = 0;
  }

  draw() {
    const image = new Image();
    image.src = this.imgSrc; 
    const corrX = this.wX + this.offSetX;
    const corrY = this.wY + this.offSetY; 
    const convAngle = this.angle * (2*Math.PI ) / 360;
    

    // rotation Error Correction corrdination
    const corrwX = -(corrX * Math.cos(convAngle) + corrY * Math.sin(convAngle));
    const corrwY = -(- corrX * Math.sin(convAngle) + corrY * Math.cos(convAngle));
    // x1 y1 is rotation Point
    console.log(corrwX, corrwY);
    image.onload = () => {
      this.ctx.rotate(convAngle);
      this.ctx.translate(-(corrwX+this.x1) , (-(corrwY+this.y1)));
      this.ctx.drawImage(image, 0, 0);
      this.ctx.setTransform(1,0,0,1,0,0);
    }
  }
}