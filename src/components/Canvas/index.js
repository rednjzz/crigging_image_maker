import React, {useRef, useEffect} from 'react';
import CraneModule from './CraneModule';

const canvasWidth = 720;
const canvasHeight = 1280;
const offSetX = 0;
const offSetY = 0;

// const testData = {
//   x1: 236,
//   y1: 60,
//   x2: 240,
//   y2: 182,
//   wX: 236,
//   wY: 60,
//   angle: 0,
//   imgSrc: 'http://localhost:3001/images/1_body.png'
// };
const modules = [
  {
    x1: 63,
    y1: 220,
    x2: 240,
    y2: 177,
    wX: 63,
    wY: 220,
    angle: 0,
    imgSrc: 'http://localhost:3001/images/1_body.png'
  },
  // {
  //   x1: 202,
  //   y1: 275,
  //   x2: 200,
  //   y2: 122,
  //   wX: 240,
  //   wY: 182,
  //   angle:20,
  //   imgSrc: 'http://localhost:3001/images/22_boom.png'
  // }
]

function Canvas() {
  const canvasRef = useRef(null);
  
  useEffect( () => {
    
    // const context = canvasRef.current.getContext('2d');
    // const mod = new CraneModule(
    //   testData.x1, 
    //   testData.y1,
    //   testData.x2,
    //   testData.y2,
    //   testData.wX,
    //   testData.wY,
    //   testData.angle,
    //   canvasWidth,
    //   canvasHeight, 
    //   testData.imgSrc, 
    //   context); 
    // mod.draw(); 
    
    modules.map((data) => {
      const ctx = canvasRef.current.getContext('2d');
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
        ctx); 
      mod.draw();
      mod.drawPoints();
      return mod;
    })  
  }, [])

  return (
    <div >
      <div style={{padding: 20}}>
        <canvas width={canvasWidth} height={canvasHeight} style={{borderStyle: 'solid', borderWidth: '1px'}} ref={canvasRef}/>
      </div>
    </div>
  )
}

export default Canvas;