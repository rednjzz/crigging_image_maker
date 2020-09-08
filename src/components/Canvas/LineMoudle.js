export default class BuildingModule{
  constructor(startPoint,endPoint, offSetX, offSetY, ctx) {
    this.sX = startPoint.x;
    this.sY = startPoint.y;
    this.eX = endPoint.x;
    this.eY = endPoint.y;
    this.offSetX = offSetX;
    this.offSetY = offSetY;
    this.ctx = ctx;
  }

  draw() {
    let x = this.offSetX + this.sX;
    let y = this.offSetY + this.sY;

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