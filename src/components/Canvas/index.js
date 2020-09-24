import React, {useState, useRef, useEffect} from 'react';
import config from "./config";
import dummyData from './dummyData';
import partsData from "./partsData";
import convertCraneData from "./convertCraneData";
import CraneModule from './CraneModule';
import BuildingModule from "./BuildingModule";
import LineMarker from "./LineMarker";
import {drawPoints, getPoint} from "./utils";

const { canvasWidth, canvasHeight, offSetX, offSetY, pixelPerMeter} = config;

function Canvas() {
  const [modParts, setModParts] = useState([]);
  const [BuildParts, setBuildParts] = useState([]);
  const canvasRef = useRef(null);
  let markerRef = useRef({});

  //화면에 그리기
  // const onClickButton = async () => {
  //   let tempModParts = [...modParts]; // 정렬을 위하 임시저장
  //   let tempBuildParts = [...BuildParts];
  //   await tempModParts.sort((a,b) => a.drawOrder - b.drawOrder);
  //   await tempModParts.map(( part) => part?.draw());
  //   await tempBuildParts.map((part) => part?.draw());
  // }

  useEffect( () => {
    const modulesA = convertCraneData(dummyData, partsData.LTM_11200); //크레인정보 입력된 데이터 객체

    const getBuildingCoordinate = async (_canvasRef) => {
      const ctx = _canvasRef.getContext('2d');

      const isBlock1Exist = Boolean(dummyData.craneData.block.vertical1);
      const isBlock2Exist = Boolean(dummyData.craneData.block.vertical2);

      let blockPart;
      if(isBlock1Exist) {
        blockPart = new BuildingModule(
          offSetX,
          offSetY,
          dummyData.craneData.block.vertical1,
          dummyData.craneData.block.height1,
          'Block',
          ctx,
          pixelPerMeter,
          markerRef.current.center.x,
          dummyData.craneData.centerToBlockDistance + dummyData.craneData.block.vertical2,
          ['right','bottom'],
        );
      }

      let block2Part;
      if(isBlock2Exist){
        block2Part = new BuildingModule(
          offSetX,
          offSetY,
          dummyData.craneData.block.vertical2,
          0.5,
          'Building',
          ctx,
          pixelPerMeter,
          markerRef.current.center.x,
          dummyData.craneData.centerToBlockDistance,
          ['bottom']
        );
      }

      const buildingPart = new BuildingModule(
        offSetX,
        offSetY,
        dummyData.craneData.workBuilding.vertical,
        dummyData.craneData.workBuilding.height,
        'Building',
        ctx,
        pixelPerMeter,
        markerRef.current.center.x,
        dummyData.craneData.centerToBuildingDistance,
        ['right', 'bottom']
        );



      // MarkerPoint 좌표 생성
      const craneData = dummyData.craneData;
      const pointFromCenter = getPoint({
        x:markerRef.current.center.x,
        y:markerRef.current.center.y}, pixelPerMeter);

      const blockPoint = pointFromCenter(craneData.centerToBlockDistance);
      const buildingPoint = pointFromCenter(craneData.centerToBuildingDistance);
      const rearPoint = pointFromCenter(craneData.craneDistance);

      markerRef.current = {
        ...markerRef.current,
        buildingStart: {
          x:buildingPoint.x,
          y:buildingPoint.y,
          value: craneData.craneDistance
        },
        blockStart: {
          x:blockPoint.x,
          y:blockPoint.y,
        },
        rearPoint: {
          x:rearPoint.x,
          y:rearPoint.y
        },
        totalDistance: {
          x:markerRef.current.end.x,
          y:markerRef.current.boomStart.y,
          value:craneData.totalDistance
        },
        craneDistance: {
          x:rearPoint.x,
          y: rearPoint.y,
          value: craneData.craneDistance
        },
        blockDistance: {
          x: blockPoint.x,
          y: blockPoint.y,
          value: craneData.centerToBlockDistance
        }
      }

      // let buildingLine = new LineMarker(
      //   ctx,
      //   {x:markerRef.current.boomStart.x, y:markerRef.current.boomStart.y},
      //   {x:markerRef.current.buildingStart.x, y:markerRef.current.buildingStart.y},
      //   'BuildingDistance', 10, 30);
      let blockLine = new LineMarker(
        ctx,
        {x:markerRef.current.boomStart.x, y:markerRef.current.boomStart.y},
        {x:markerRef.current.blockDistance.x, y:markerRef.current.blockDistance.y},
        markerRef.current.blockDistance.value, 10, 30);
      let craneDistanceLine = new LineMarker(
        ctx,
        {x:markerRef.current.boomStart.x, y:markerRef.current.boomStart.y},
        {x:markerRef.current.rearPoint.x, y:markerRef.current.rearPoint.y},
        markerRef.current.craneDistance.value, 10, 30);
      // let d1Line = new LineMarker(
      //   ctx,
      //   {x:markerRef.current.boomStart.x, y:markerRef.current.boomStart.y},
      //   {x:markerRef.current.fixStart.x, y:markerRef.current.boomStart.y},
      //   'd1', 10, 30);
      // let d2Line = new LineMarker(
      //   ctx,
      //   {x:markerRef.current.fixStart.x, y:markerRef.current.boomStart.y},
      //   {x:markerRef.current.fixEnd.x, y:markerRef.current.boomStart.y},
      //   'd2', 10, 30);
      let totalDistanceLine = new LineMarker(
        ctx,
        {x:markerRef.current.boomStart.x, y:markerRef.current.boomStart.y},
        {x:markerRef.current.totalDistance.x, y:markerRef.current.totalDistance.y},
        markerRef.current.totalDistance.value, 10, 30);
      // let h1Line = new LineMarker(
      //   ctx,
      //   {x:markerRef.current.fixEnd.x, y:3950},
      //   {x:markerRef.current.fixEnd.x, y:markerRef.current.fixEnd.y},
      //   'h1', 10, 30);
      // let h2Line = new LineMarker(
      //   ctx,
      //   {x:markerRef.current.fixEnd.x, y:markerRef.current.fixStart.y},
      //   {x:markerRef.current.fixEnd.x, y:markerRef.current.fixEnd.y},
      //   'h2', 10, 30);

      blockLine.calculateGuidelinePosition().applyOffset(350, 'down');
      // buildingLine.calculateGuidelinePosition().applyOffset(450, 'down');
      craneDistanceLine.calculateGuidelinePosition().applyOffset(165, 'down');
      // d1Line.calculateGuidelinePosition().applyOffset(600, 'down');
      // d2Line.calculateGuidelinePosition().applyOffset(600, 'down');
      totalDistanceLine.calculateGuidelinePosition().applyOffset(500, 'down');
      // h1Line.calculateGuidelinePosition().applyOffset(500, 'right');
      // h2Line.calculateGuidelinePosition().applyOffset(500, 'right');

      await setBuildParts([
        block2Part,
        buildingPart,
        blockPart,
        // linePart1,
        // linePart2,
        // buildingLine,
        blockLine,
        craneDistanceLine,
        totalDistanceLine,
        // d1Line,
        // d2Line,
        // h1Line,
        // h2Line
        ]);
      return buildingPart
    }

    // const getLineMarkerCoordinate = async (_canvasRef) => {
    //   const ctx = _canvasRef.getContext('2d');
    //   const test1 = new LineMarker(line1s , line1e, 'bottom', 10) ;
    // }
    const getCraneCoordinate = async ( _canvasRef, modules ) => {
      let prevPartsNextCoord = { x:0, y:0}; // 이전 파츠 값을 저장하기위한 좌표
      let additionalParts = {}; //추가 파츠 좌표 저장 객체

      /* parts 모듈 생성 */
      const newModules = modules.map((part, index) => {
        const ctx = _canvasRef.getContext('2d');

        if (part.type === 'addParts'){ //추가 파츠이면 추가파츠 부착위치를 적용
          const refName = part.reference.name;
          prevPartsNextCoord.x = additionalParts[refName].x;
          prevPartsNextCoord.y = additionalParts[refName].y;
        }

        const mod = new CraneModule(part, prevPartsNextCoord, offSetX,offSetY, ctx, dummyData );

        mod.calculateCoordination();
        prevPartsNextCoord.x = mod.next[0].x;
        prevPartsNextCoord.y = mod.next[0].y;

        if (part.additional === true) {
          // console.log("mod_next",mod.next);
          additionalParts = {...additionalParts, [part.name]:{x:mod.next[1].x,y:mod.next[1].y}};
        }
        // MarkerPoint 좌표 생성
        switch (mod.partName) {
          case 'T': {
            markerRef.current =  {
              ...markerRef.current,
              boomStart: {
                x:mod.pointInfo.center.x,
                y:mod.pointInfo.center.y,
                //value: mod.angle
              },
              center: {
                x:mod.pointInfo.center.x,
                y:mod.pointInfo.center.y,
                value: mod.angle
              },
              end: {
                x:mod.pointInfo.top.x,
                y:mod.pointInfo.top.y
              }
            }
            break;
          }
          case 'F': {
            markerRef.current =  {
              ...markerRef.current,
              fixStart: {
                x:mod.pointInfo.center.x,
                y:mod.pointInfo.center.y,
                //value: mod.angle
              },
              end: {
                x:mod.pointInfo.top.x,
                y:mod.pointInfo.top.y,
                //value: mod.angle
              }
            }
            break;
          }
          default : {

          }
        }

        // 테스트 포인트 그리기
        if (mod.pointInfo.center) {
          drawPoints([mod.pointInfo.center], ctx);
        }

        return mod;
      })// end map

      // console.log("additionalParts",additionalParts);
      await setModParts(newModules);
    }

    getCraneCoordinate(canvasRef.current, modulesA).catch((err) => {console.log(err)});
    getBuildingCoordinate(canvasRef.current).catch((err) => {console.log(err)});

  }, [])

  // Draw Image
  let tempModParts = [...modParts]; // 정렬을 위하 임시저장
  let tempBuildParts = [...BuildParts];
  tempModParts.sort((a,b) => a.drawOrder - b.drawOrder);
  tempModParts.map(( part) => part?.draw());
  tempBuildParts.map((part) => part?.draw());

  return (
    <div >
      <div style={{padding: 20 }}>
        <canvas width={canvasWidth} height={canvasHeight} style={{borderStyle: 'solid', borderWidth: '1px', width:'650px'}} ref={canvasRef}/>
        {/*<button onClick={onClickButton}> 그리기 버튼</button>*/}
      </div>
    </div>
  )
}

export default Canvas;