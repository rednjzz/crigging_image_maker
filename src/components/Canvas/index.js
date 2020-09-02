import React, {useState, useRef, useEffect} from 'react';
import CraneModuleV2 from './CraneModuleV2';
import CraneModule from './CraneModule';
import dummyData from './dummyData';
import partsData from "./partsData";
import convertCraneData from "./convertCraneData";
import config from "./config";

const { canvasWidth, canvasHeight, offSetX, offSetY} = config;

function Canvas() {
  const [modParts, setModParts] = useState([]);
  const canvasRef = useRef(null);

  const onClickButton = () => {
    let tempModParts = [...modParts]; // 정렬을 위하 임시저장
    tempModParts.sort((a,b) => a.drawOrder - b.drawOrder);
    tempModParts.map(( part) => part.draw());
  }

  useEffect( () => {
    const craneData = convertCraneData(dummyData, partsData); //크레인좌표계산을 위한 객체
    const modulesA = craneData.moduleDetailArr;

    const getCraneCoordinate = async ( _canvasRef, modules ) => {
      let prevPartsNextCoord = { x:0, y:0}; // 이전 파츠 값을 저장하기위한 좌표
      let additionalParts = {}; //추가 파츠 좌표 저장 객체

      const newModules = modules.map((part, index) => {
        const ctx = _canvasRef.getContext('2d');

        if (part.type === 'addParts'){ //추가 파츠이면 추가파츠 부착위치를 적용
          const refName = part.reference.name;
          console.log(additionalParts)
          prevPartsNextCoord.x = additionalParts[refName].x;
          prevPartsNextCoord.y = additionalParts[refName].y;
          console.log("prevPartsNextCoord",prevPartsNextCoord);
        }
        const mod = new CraneModule(
          part.origin.x,
          part.origin.y,
          prevPartsNextCoord.x, // 이전 part 값의 nextCoordX
          prevPartsNextCoord.y, // 이전 part 값의 nextCoordY
          offSetX,
          offSetY,
          part.angle,
          part.imgSrc,
          part.drawOrder,
          part.reference,
          ctx,
          part.joint,
        )
        mod.calculateCoordination();
        // 추가 파츠의 부착위치 계산
        // ** if (part.joint.length > 1) {
        // mod.next[1].x}
        // **

        if (part.additional === true) {
          additionalParts = {...additionalParts, [part.name]:{x:mod.next[1].x,y:mod.next[1].y}};
        }

        // 다음 파츠 부착위치 설정
        prevPartsNextCoord.x = mod.next[0].x;
        prevPartsNextCoord.y = mod.next[0].y;
        return mod;
      })// end map
      // console.log("additionalParts",additionalParts);
      await setModParts(newModules);
      console.log("additionalParts", additionalParts);
      console.log("newModules",newModules);
    }
    getCraneCoordinate(canvasRef.current, modulesA).catch((err) => {console.log(err)});
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