export default class ShapeModule{
  constructor(startPoint,endPoint, offsetPoint, ctx) {
    this.x = x;
    this.y = y;
    this.offSetX = offSetX;
    this.offSetY = offSetY;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }
  calculateCoordinate() {

  }
  draw() {
    let x = this.offSetX + this.x;
    let y = this.offSetY + this.y - this.height;
    const width = this.width;
    const height = this.height;


    // this.ctx.translate(this.offSetX + this.x , this.offSetY + this.y );   // 변환 위치로 이동
    this.ctx.beginPath();

    this.ctx.rect(x,y, width, height);
    this.ctx.fillStyle = '#d9dbdb';
    this.ctx.fill();

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    this.ctx.setTransform(1,0,0,1,0,0);     // 컨텍스트 초기화
  }
  meterToPixel(meter, referencePoint) {
    //referencePoint는 1m에 몇 픽셀인지 나타냄
    return meter * referencePoint;
  }
}