import React, {useState, useRef, useEffect} from 'react';
import CraneModule from './CraneModule';

const canvasWidth = 720;
const canvasHeight = 800;
const offSetX = 0;
const offSetY = 500;

let wX = 63;
let wY = 220;

const parts = [
  {
    x1: 0,
    y1: 0,
    x2: 63,
    y2: 220,
    wX: 0,
    wY: 0,
    angle: 0,
    imgSrc: 'http://localhost:3001/images/base.png',
    drawOrder: 15,
    refs: 0,
  },
  {
    x1: 63,
    y1: 220,
    x2: 240,
    y2: 177,
    wX: 63,
    wY: 220,
    angle: 0,
    imgSrc: 'http://localhost:3001/images/1_body.png',
    drawOrder: 5,
    nextCoordX: 63,
    nextCoordY: 220,
    refs: 0,
  },
  {
    x1: 200,
    y1: 285,
    x2: 195,
    y2: 110,
    wX: 240,
    wY: 177,
    angle: 20,
    imgSrc: 'http://localhost:3001/images/14_boom0.png',
    drawOrder: 4,
    nextCoordX: 63,
    nextCoordY: 220,
    refs: 1,
  },
  {
    x1: 202,
    y1: 275,
    x2: 200,
    y2: 122,
    wX: 192,
    wY: 137,
    angle:20,
    imgSrc: 'http://localhost:3001/images/22_boom1.png',
    drawOrder: 3,
    nextCoordX: 63,
    nextCoordY: 220,
    refs: 2,
  },
  {
    x1: 205,
    y1: 275,
    x2: 200,
    y2: 124,
    wX: 200,
    wY: 122,
    angle:20,
    imgSrc: 'http://localhost:3001/images/21_boom2.png',
    drawOrder: 2,
    nextCoordX: 63,
    nextCoordY: 220,
    refs: 3,
  },
  {
    x1: 194,
    y1: 204,
    x2: 194,
    y2: 164,
    wX: 200,
    wY: 122,
    angle:20,
    imgSrc: 'http://localhost:3001/images/20_boom3.png',
    drawOrder: 1,
    nextCoordX: 63,
    nextCoordY: 220,
    refs: 4,
  }
]
function Canvas() {

  const [modParts, setModParts] = useState([]);
  const canvasRef = useRef(null);
  const onClickButton = () => {
    let tempModParts = [...modParts];
    tempModParts.sort((a,b) => a.drawOrder - b.drawOrder);
    console.log(tempModParts);
    tempModParts.map(( part) => {
      part.draw();
    })
  }
  useEffect( () => {
    const test = async ( _canvasRef ) => {

      let _modParts = await parts.map((data, index) => {
        const ctx = _canvasRef.getContext('2d');
        const mod = new CraneModule(
          data.x1,
          data.y1,
          data.x2,
          data.y2,
          data.wX,
          data.wY,
          offSetX,
          offSetY,
          data.angle,
          canvasWidth,
          canvasHeight,
          data.imgSrc,
          data.drawOrder,
          data.refs,
          ctx
        );

        mod.calculateCoordination();
        if (parts.length-1 > index){
          parts[index+1].wX = mod.nextCoordX;
          parts[index+1].wY = mod.nextCoordY;
        }
        return mod;
      })
      await setModParts((_modParts));
    }
    test(canvasRef.current);
    // setModParts(_modParts);
  }, [])

  return (
    <div >
      <div style={{padding: 20}}>
        <canvas width={canvasWidth} height={canvasHeight} style={{borderStyle: 'solid', borderWidth: '1px'}} ref={canvasRef}/>
        <button onClick={onClickButton}> 그리기 버튼</button>
      </div>
    </div>
  )
}

export default Canvas;