import React, {useState, useRef, useEffect} from 'react';
import CraneModuleV2 from './CraneModuleV2';
import CraneModule from './CraneModule';

import dummyData from './dummyData';
import partsData from "./partsData";
import getParts from './getParts';

const canvasWidth = 720;
const canvasHeight = 800;
const offSetX = 0;
const offSetY = 500;

const parts = [
  {
    name: 'base',
    startingPointX: 0,
    startingPointY: 0,
    endingPointX: 63,
    endingPointY: 220,
    pointToMoveX: 0,
    pointToMoveY: 0,
    angle: 0,
    imgSrc: 'http://localhost:3001/images/base.png',
    drawOrder: 15,
    refs: null,
  },
  {
    name: 'body',
    startingPointX: 63,
    startingPointY: 220,
    endingPointX: 240,
    endingPointY: 177,
    pointToMoveX: 63,
    pointToMoveY: 220,
    angle: 0,
    imgSrc: 'http://localhost:3001/images/1_body.png',
    drawOrder: 5,
    nextCoordX: 63,
    nextCoordY: 220,
    refs: 'base',
  },
  {
    name: 'mainBoom1',
    startingPointX: 200,
    startingPointY: 285,
    endingPointX: 195,
    endingPointY: 110,
    pointToMoveX: 240,
    pointToMoveY: 177,
    angle: 20,
    imgSrc: 'http://localhost:3001/images/14_boom0.png',
    drawOrder: 4,
    nextCoordX: 63,
    nextCoordY: 220,
    refs: 'body',
  },
  {
    name: 'mainBoom2',
    startingPointX: 202,
    startingPointY: 275,
    endingPointX: 200,
    endingPointY: 122,
    pointToMoveX: 192,
    pointToMoveY: 137,
    angle:20,
    imgSrc: 'http://localhost:3001/images/22_boom1.png',
    drawOrder: 3,
    nextCoordX: 63,
    nextCoordY: 220,
    refs: 'mainBoom1',
  },
  {
    name: 'mainBoom3',
    startingPointX: 205,
    startingPointY: 275,
    endingPointX: 200,
    endingPointY: 124,
    pointToMoveX: 200,
    pointToMoveY: 122,
    angle:20,
    imgSrc: 'http://localhost:3001/images/21_boom2.png',
    drawOrder: 2,
    nextCoordX: 63,
    nextCoordY: 220,
    refs: 'mainBoom2',
  },
  {
    name: 'mainBoom4',
    startingPointX: 194,
    startingPointY: 204,
    endingPointX: 194,
    endingPointY: 164,
    pointToMoveX: 200,
    pointToMoveY: 122,
    angle:20,
    imgSrc: 'http://localhost:3001/images/20_boom3.png',
    drawOrder: 1,
    nextCoordX: 63,
    nextCoordY: 220,
    refs: 'mainBoom3',
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
      return part.draw();
    })
  }

  let modPartsTest= {};
  useEffect( () => {
    // const partsKeys = Object.keys(partsData); // 파츠 데이터의 키값
    // const parts = getParts(dummyData); // 영광 데이터를 이용하여 생성
    //
    // let _modParts;
    //
    // const setCraneNextCoordination = async ( parts ) => {
    //   console.log("######",parts);
    //   await parts.map((mod) => {
    //     mod.applyRefCoordination(parts)
    //     console.log("mod2:",mod);
    //   })
    //   return setModParts((_modParts));
    // }
    //
    // const getCraneCoordinate = async ( _canvasRef ) => {
    //   _modParts = await partsKeys.map((data, index) => {
    //     const ctx = _canvasRef.getContext('2d');
    //     const mod = new CraneModuleV2(
    //       partsData[`${data}`].name,
    //       partsData[`${data}`].origin.x,
    //       partsData[`${data}`].origin.y,
    //       partsData[`${data}`].joint[0].x,
    //       partsData[`${data}`].joint[0].y,
    //       0,
    //       0,
    //       offSetX,
    //       offSetY,
    //       canvasWidth,
    //       canvasHeight,
    //       parts.info.mainAngle,
    //       partsData[`${data}`].imgSrc, // need to be correct
    //       partsData[`${data}`].drawOrder,
    //       partsData[`${data}`].reference,
    //       ctx
    //     );
    //     console.log("mod1:",mod);
    //     mod.calculateCoordination();
    //
    //
    //     modPartsTest[data.name] = mod;
    //     return mod;
    //   })
    //
    //   await setModParts((_modParts));
    // }
    // getCraneCoordinate(canvasRef.current).then(() => {
    //   setCraneNextCoordination(_modParts)
    // }).catch((err) => {console.log(err)});

    let _modParts


    const getCraneCoordinate = async ( _canvasRef ) => {

      console.log(parts);
      _modParts = await parts.map((data, index) => {
        const ctx = _canvasRef.getContext('2d');
        const mod = new CraneModule(
          data.startingPointX,
          data.startingPointY,
          data.endingPointX,
          data.endingPointY,
          data.refs ? modPartsTest[data.refs].nextCoordX : 0,
          data.refs ? modPartsTest[data.refs].nextCoordY : 0,
          // data.pointToMoveX,
          // data.pointToMoveY,
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
          parts[index+1].pointToMoveX = mod.nextCoordX;
          parts[index+1].pointToMoveY = mod.nextCoordY;
        }
        modPartsTest[data.name] = mod;
        return mod;
      })
      await setModParts((_modParts));
      console.log("modpartsTest:",modPartsTest);
    }
    getCraneCoordinate(canvasRef.current).catch((err) => {console.log(err)});
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