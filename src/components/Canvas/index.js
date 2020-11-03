import React, {useState, useRef, useEffect} from 'react';
import config from "./config";
import dummyData from './dummyData';
import partsData from "./partsData";
import convertCraneData from "./convertCraneData";
import CraneModule from './CraneModule';
import BuildingModule from "./BuildingModule";
import LineMarker from "./LineMarker";
import AngleMarker from "./AngleMarker";
import {drawPoints, getPoint} from "./utils";
import {getWireComposition, wirePoints } from "./getWireComposition";
import drawWire from './drawWire';
import {abbreviatePartName} from "./utils";

// canvas의 크기와 옵셋 설정
let { canvasWidth, canvasHeight, offSetX, offSetY, pixelPerMeter} = config;
const pointFromOrigin = getPoint({x:0,y:0}, pixelPerMeter);
const totalDistance = pointFromOrigin(dummyData.craneData.totalDistance);
const totalHeight = pointFromOrigin(dummyData.craneData.totalHeight);
canvasWidth = totalDistance.x + 2500;
canvasHeight = totalHeight.x + 5000;
offSetY = canvasHeight - 500;

function Canvas() {
  const [modParts, setModParts] = useState([]);
  const [BuildParts, setBuildParts] = useState([]);
  const canvasRef = useRef(null);
  let markerRef = useRef({});

  // canvasWidth   : 2000
  // canvasHeight  : 4700,
  // offSetX       : 200,
  // offSetY       : 3950,
  //화면에 그리기
  // const onClickButton = async () => {
  //   let tempModParts = [...modParts]; // 정렬을 위하 임시저장
  //   let tempBuildParts = [...BuildParts];
  //   await tempModParts.sort((a,b) => a.drawOrder - b.drawOrder);
  //   await tempModParts.map(( part) => part?.draw());
  //   await tempBuildParts.map((part) => part?.draw());
  // }

  useEffect( () => {
    const modulesA = convertCraneData(dummyData, partsData[dummyData.craneName]); //크레인정보 입력된 데이터 객체
    let transParts = {}; // wire를 그리기위해 변환된 와이어 좌표값 저장 객체

    const getBuildingCoordinate = async (_canvasRef) => {
      const ctx = _canvasRef.getContext('2d');

      const isBlock1Exist = Boolean(dummyData.craneData.block.vertical1);
      const isBlock2Exist = Boolean(dummyData.craneData.block.vertical2);

      let blockPart; // 진짜 장애물
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

      let block2Part; // 작은 장애물
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

      // 리깅할 건물
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

      // dummyData에서 craneData를 추출하여
      // MarkerPoint 좌표 생성
      const craneData = dummyData.craneData;
      // 주어진 거리값[m]을 좌표값(x,y)으로 변환
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
        },
        flyFixLuffing: {
          value: craneData.flyFixLuffing
        }
      }
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

      let totalDistanceLine = new LineMarker(
        ctx,
        {x:markerRef.current.boomStart.x, y:markerRef.current.boomStart.y},
        {x:markerRef.current.totalDistance.x, y:markerRef.current.totalDistance.y},
        markerRef.current.totalDistance.value, 10, 30);

      blockLine.calculateGuidelinePosition().applyOffset(350, 'down');
      craneDistanceLine.calculateGuidelinePosition().applyOffset(165, 'down');
      totalDistanceLine.calculateGuidelinePosition().applyOffset(500, 'down');

      await setBuildParts([
        block2Part,
        buildingPart,
        blockPart,
        blockLine,
        craneDistanceLine,
        totalDistanceLine,
        ]);
      return buildingPart
    }
    const getCraneCoordinate = async ( _canvasRef, modules ) => {
      let prevPartsNextCoord = { x:0, y:0}; // 이전 파츠 값을 저장하기위한 좌표
      let additionalParts = {}; //추가 파츠 좌표 저장 객체


      /* parts 모듈 생성 */
      const newModules = modules.map((part, index) => {
        const ctx = _canvasRef.getContext('2d');

        if (part.type === 'addParts'){ //추가 파츠이면 추가파츠 부착위치를 적용
          const refCode = part.refCode;
          prevPartsNextCoord.x = additionalParts[refCode].x;
          prevPartsNextCoord.y = additionalParts[refCode].y;
          part.angle = additionalParts[refCode].angle;
        }

        // 파츠 객체 생성
        const mod = new CraneModule(part, prevPartsNextCoord, offSetX,offSetY, ctx, dummyData );

        mod.calculateCoordination();
        prevPartsNextCoord.x = mod.next[0].x; // 다음 파츠 부착위치 저장
        prevPartsNextCoord.y = mod.next[0].y;

        if (part.code) {
          additionalParts = {...additionalParts, [part.code]:{x:mod.next[1].x,y:mod.next[1].y, angle:mod.angle}};
        }
        // MarkerPoint 좌표 생성 및 마커 그리기
        switch (mod.partName) {
          case 'T': {
            markerRef.current =  {
              ...markerRef.current,
              boomStart: {
                x:mod.pointInfo.start.x,
                y:mod.pointInfo.start.y,
                //value: mod.angle
              },
              center: {
                x:mod.pointInfo.start.x,
                y:mod.pointInfo.start.y,
                value: mod.angle
              },
              end: {
                x:mod.pointInfo.end.x,
                y:mod.pointInfo.end.y
              },
              boomAngle: {
                mainAngle : mod.pointInfo.mainAngle,
              }
            }
            // 마커 그리기
            const mainBoomAngle = new AngleMarker(
              ctx,
              markerRef.current.center,
              markerRef.current.boomAngle.mainAngle,
              markerRef.current.boomAngle.mainAngle,
              0,
              200,
            );
            mainBoomAngle.draw();
            let boomMarkerLine = new LineMarker(
              ctx,
              {x:markerRef.current.center.x, y:markerRef.current.center.y },
              {x:markerRef.current.end.x, y:markerRef.current.end.y },
              dummyData.craneData.mainBoom, 30, 30);
            boomMarkerLine.calculateGuidelinePosition().applyOffset(150, 'up2').draw();
            break;
          }
          case 'F': {
            markerRef.current = {
              ...markerRef.current,
              fixStart: {
                x: mod.pointInfo.start.x,
                y: mod.pointInfo.start.y,
                //value: mod.angle
              },
              end: {
                x: mod.pointInfo.end.x,
                y: mod.pointInfo.end.y,
                //value: mod.angle
              },
              jibAngle: {
                mainAngle : mod.pointInfo.mainAngle,
                fixLuffingAngle : mod.pointInfo.fixLuffingAngle
              }
            }
            // 마커 그리기
            const fixLuffingAngle1 = new AngleMarker(
              ctx,
              markerRef.current.fixStart,
              markerRef.current.jibAngle.fixLuffingAngle,
              markerRef.current.jibAngle.mainAngle,
              markerRef.current.jibAngle.fixLuffingAngle,
              200,
            );
            fixLuffingAngle1.draw();
            break;
          }
          case 'H': {
            markerRef.current =  {
              ...markerRef.current,
              end: {
                x:mod.pointInfo.end.x,
                y:mod.pointInfo.end.y,
                //value: mod.angle
              }
            }
            //마커 그리기
            let jibMarkerLine = new LineMarker(
              ctx,
              {x:markerRef.current.fixStart.x, y:markerRef.current.fixStart.y },
              {x:markerRef.current.end.x, y:markerRef.current.end.y },
              dummyData.craneData.flyFixLuffing, 30, 30);
            jibMarkerLine.calculateGuidelinePosition().applyOffset(150, 'up2').draw();
            break;
          }
          default : {
          }
        }
        // wire 좌표 변환
        if (/^T/g.test(mod.partName)) part.name =  'T'; //붐이면 여러개의 part.name이 올수 있기때문에 T 1개로 변경
        if(mod.transWire[0]){
          transParts[`${part.name}`] = mod.transWire; // wire 좌표 변환된 파츠 네임에 맞춰 값을 저장
        }

        return mod;
      })// end map

      await setModParts(newModules);
    }

    getCraneCoordinate(canvasRef.current, modulesA).catch((err) => {console.log(err)});
    getBuildingCoordinate(canvasRef.current).catch((err) => {console.log(err)});

    //  draw wire Lines
    const wireModules = getWireComposition(dummyData);
    const points = wirePoints(wireModules,transParts);
    const ctx = canvasRef.current.getContext('2d');
    drawWire(points,ctx);

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
        <canvas width={canvasWidth} height={canvasHeight} style={{borderStyle: 'solid', borderWidth: '1px', width:'468px'}} ref={canvasRef}/>
        {/*<button onClick={onClickButton}> 그리기 버튼</button>*/}
      </div>
    </div>
  )
}

export default Canvas;