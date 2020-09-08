import React, {useState, useRef, useEffect} from 'react';
import CraneModuleV2 from './CraneModuleV2';
import CraneModule from './CraneModule';
import dummyData from './dummyData';
import dummyDataBuilding from './dummyDataBuilding';
import partsData from "./partsData";
import convertCraneData from "./convertCraneData";
import config from "./config";
import BoxModule from "./BoxModule";

const { canvasWidth, canvasHeight, offSetX, offSetY, pixelPerMeter} = config;

function Canvas() {
  const [modParts, setModParts] = useState([]);
  const [BuildParts, setBuildParts] = useState([]);
  const canvasRef = useRef(null);

  //화면에 그리기
  const onClickButton = async () => {
    let tempModParts = [...modParts]; // 정렬을 위하 임시저장
    let tempBuildParts = [...BuildParts];
    await tempModParts.sort((a,b) => a.drawOrder - b.drawOrder);
    await tempModParts.map(( part) => part.draw());
    // await BuildParts.draw();
    await tempBuildParts.map((part) => part.draw());
  }

  useEffect( () => {
    const craneData = convertCraneData(dummyData, partsData.LTM_11200); //크레인좌표계산을 위한 객체
    const modulesA = craneData.moduleDetailArr;

    const getBuildingCoordinate = async (_canvasRef) => {
      const ctx = _canvasRef.getContext('2d');
      const height=400; const width=150;
      let buildings;
      const blockPart = new BoxModule(
        offSetX,
        offSetY,
        dummyDataBuilding.blockWidth,
        dummyDataBuilding.blockHeight,
        'Block',
        ctx,
        pixelPerMeter,
        dummyDataBuilding.craneSize,
        dummyData.craneData.rearToBlockDistance,
        ['right','bottom'],
        );
      const buildingPart = new BoxModule(
        offSetX,
        offSetY,
        dummyDataBuilding.buildingWidth,
        dummyDataBuilding.buildingHeight,
        'Building',
        ctx,
        pixelPerMeter,
        dummyDataBuilding.craneSize,
        dummyData.craneData.rearToBuildingDistance,
        ['right', 'bottom']
        );

      await setBuildParts([buildingPart, blockPart]);
      return buildingPart
    }
    const getCraneCoordinate = async ( _canvasRef, modules ) => {
      let prevPartsNextCoord = { x:0, y:0}; // 이전 파츠 값을 저장하기위한 좌표
      let additionalParts = {}; //추가 파츠 좌표 저장 객체

      const newModules = modules.map((part, index) => {
        const ctx = _canvasRef.getContext('2d');

        if (part.type === 'addParts'){ //추가 파츠이면 추가파츠 부착위치를 적용
          const refName = part.reference.name;
          prevPartsNextCoord.x = additionalParts[refName].x;
          prevPartsNextCoord.y = additionalParts[refName].y;
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
        // 다음 파츠 부착위치 설정
        prevPartsNextCoord.x = mod.next[0].x;
        prevPartsNextCoord.y = mod.next[0].y;

        if (part.additional === true) {
          console.log("mod_next",mod.next);
          additionalParts = {...additionalParts, [part.name]:{x:mod.next[1].x,y:mod.next[1].y}};
        }


        return mod;
      })// end map
      // console.log("additionalParts",additionalParts);
      await setModParts(newModules);
      console.log("additionalParts", additionalParts);
      console.log("newModules",newModules);
    }
    getCraneCoordinate(canvasRef.current, modulesA).catch((err) => {console.log(err)});
    getBuildingCoordinate(canvasRef.current).catch((err) => {console.log(err)});
    // setModParts(_modParts);
  }, [])

  return (
    <div >
      <div style={{padding: 20 }}>
        <canvas width={canvasWidth} height={canvasHeight} style={{borderStyle: 'solid', borderWidth: '1px', width:'800px'}} ref={canvasRef}/>
        <button onClick={onClickButton}> 그리기 버튼</button>
      </div>
    </div>
  )
}

export default Canvas;