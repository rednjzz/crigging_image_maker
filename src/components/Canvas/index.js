import React, {useRef, useEffect} from 'react';
import CraneModule from './CraneModule';

const canvasWidth = 720;
const canvasHeight = 1280;
const offSetX = 0;
const offSetY = 500;

let wX = 63;
let wY = 220;

/*
 partsName: {
 coords: {
   startingPointX = 63,
   startingPointY = 220,
   endingPointX = 240,
   endingPointY = 177,
   desirePointX = 63, // coordinates that this parts want to locate
   desirePointY = 220,
   zIndex = 1
 },
 imgSrc: 'http://localhost:3001/images/i_body.png',
 subParts: {
   name: 'extParts',
   coords: {
     x: 100,
     y: 199,
     zIndex: 5
   }
 }
 nextParts: 'nextPartsName',
 }
 * */

const parts = [
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
  {
    x1: 200,
    y1: 285,
    x2: 195,
    y2: 110,
    wX: 240,
    wY: 177,
    angle: 20,
    imgSrc: 'http://localhost:3001/images/14_boom0.png'
  },
  {
    x1: 202,
    y1: 275,
    x2: 200,
    y2: 122,
    wX: 192,
    wY: 137,
    angle:20,
    imgSrc: 'http://localhost:3001/images/22_boom1.png'
  },
  {
    x1: 205,
    y1: 275,
    x2: 200,
    y2: 124,
    wX: 200,
    wY: 122,
    angle:20,
    imgSrc: 'http://localhost:3001/images/21_boom2.png'
  },
  {
    x1: 194,
    y1: 234,
    x2: 194,
    y2: 164,
    wX: 200,
    wY: 122,
    angle:20,
    imgSrc: 'http://localhost:3001/images/20_boom3.png'
  }
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

    parts.map((data) => {
      const ctx = canvasRef.current.getContext('2d');
      const mod = new CraneModule(
        data.x1, 
        data.y1,
        data.x2,
        data.y2,
        wX,
        wY,
        offSetX,
        offSetY,
        data.angle,
        canvasWidth,
        canvasHeight, 
        data.imgSrc, 
        ctx); 
      mod.draw();
      // mod.drawPoints();
      wX = mod.nextCoordX;
      wY = mod.nextCoordY;
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