import React, {useState, useRef, useEffect} from 'react';
import convertCraneData from "./convertCraneData";
import CraneModule from './CraneModule';
import BuildingModule from "./BuildingModule";
import LineMarker from "./LineMarker";
import AngleMarker from "./AngleMarker";
import {getPoint, getPixelPerMeter} from "./utils";

import {wirePoints } from "./getWireComposition";
import drawWire from './drawWire';


function Canvas({craneInfo}) {
  // canvas의 크기와 옵셋 설정
  const craneData = craneInfo.craneData.craneData;
  const partsData = craneInfo.partsData;

  // config
  let pixelPerMeter = getPixelPerMeter(partsData);
  const offSetX = 200;
  let canvasWidth;
  let canvasHeight;
  let offSetY;

  const pointFromOrigin = getPoint({x:0,y:0}, pixelPerMeter);
  const totalDistance = pointFromOrigin(craneData.totalDistance);
  const totalHeight = pointFromOrigin(craneData.totalHeight);

  canvasWidth = totalDistance.x + 1000; // 전체 크레인 폭에서 1000px 추가 해서 공간 만들기
  canvasHeight = totalHeight.x + 1000; // 전체 크레인 길이에서 1000px 추가 해서 공간 만들기
  offSetY = canvasHeight - 500; // 크레인 바닥에 길이 표시를 위한 공간 만들기

  const [modParts, setModParts] = useState([]);
  const [BuildParts, setBuildParts] = useState([]);
  const canvasRef = useRef(null);
  let markerRef = useRef({});

  useEffect( () => {
    const craneData = craneInfo.craneData;
    const partsData = craneInfo.partsData;
    const partsList = craneInfo.partsList;
    const wireData = craneInfo.wireData;

    if(craneData && partsData && partsList) {
      const modulesA = convertCraneData(craneData, partsData, partsList); //크레인정보 입력된 데이터 객체
      let transParts = {}; // wire를 그리기위해 변환된 와이어 좌표값 저장 객체

      const getBuildingCoordinate = async (_canvasRef, {craneData}) => {
        const ctx = _canvasRef.getContext('2d');

        const isBlock1Exist = Boolean(craneData.block.vertical1);
        const isBlock2Exist = Boolean(craneData.block.vertical2);

        let blockPart; // 진짜 장애물
        if(isBlock1Exist) {
          blockPart = new BuildingModule(
            offSetX,
            offSetY,
            2,
            craneData.block.height1,
            'Block',
            ctx,
            pixelPerMeter,
            markerRef.current.center.x,
            craneData.centerToBlockDistance + craneData.block.vertical2,
            ['right'],
            0,
          );
        }

        let block2Part; // 작은 장애물
        if(isBlock2Exist){
          block2Part = new BuildingModule(
            offSetX,
            offSetY,
            craneData.block.vertical2,
            0.5,
            'Building',
            ctx,
            pixelPerMeter,
            markerRef.current.center.x,
            craneData.centerToBlockDistance,
            ['bottom'],
            0,
          );
        }

        // 리깅할 건물
        const buildingPart = new BuildingModule(
          offSetX,
          offSetY,
          craneData.workBuilding.vertical,
          craneData.workBuilding.height,
          'Building',
          ctx,
          pixelPerMeter,
          markerRef.current.center.x,
          craneData.centerToBuildingDistance,
          ['right', 'bottom'],
          0,
        );

        // craneData에서 craneData를 추출하여
        // MarkerPoint 좌표 생성

        // 주어진 거리값[m]을 좌표값(x,y)으로 변환
        const pointFromCenter = getPoint({
          x:markerRef.current.center.x,
          y:markerRef.current.center.y}, pixelPerMeter);

        const blockPoint1 = pointFromCenter(craneData.centerToBlockDistance + craneData.block.vertical2);
        const blockPoint2 = pointFromCenter(craneData.centerToBlockDistance);
        const buildingPoint = pointFromCenter(craneData.centerToBuildingDistance);
        const rearPoint = pointFromCenter(craneData.craneDistance);
        const totalPoint = pointFromCenter(craneData.totalDistance);

        markerRef.current = {
          ...markerRef.current,
          rearPoint: {
            x:rearPoint.x,
            y:rearPoint.y,
            value: craneData.craneDistance
          },
          craneDistance: {
            x:rearPoint.x,
            y: rearPoint.y,
            value: craneData.craneDistance
          },
          blockDistance1: {
            x: blockPoint1.x,
            y: blockPoint1.y,
            value: craneData.centerToBlockDistance
          },
          blockDistance2: {
            x: blockPoint2.x,
            y: blockPoint2.y,
            value: craneData.centerToBlockDistance
          },
          buildingDistance: {
            x:buildingPoint.x,
            y:buildingPoint.y,
            value: craneData.centerToBuildingDistance
          },
          totalDistance: {
            x:totalPoint.x,
            y:totalPoint.y,
            value:craneData.totalDistance
          },
        }
        let blockLine = new LineMarker(
          ctx,
          {x:markerRef.current.center.x, y:markerRef.current.center.y},
          {x:markerRef.current.blockDistance2.x, y:markerRef.current.blockDistance2.y},
          markerRef.current.blockDistance2.value, 15, 30);
        let craneDistanceLine = new LineMarker(
          ctx,
          {x:markerRef.current.center.x, y:markerRef.current.center.y},
          {x:markerRef.current.rearPoint.x, y:markerRef.current.rearPoint.y},
          markerRef.current.craneDistance.value, 15, 30);

        let totalDistanceLine = new LineMarker(
          ctx,
          {x:markerRef.current.center.x, y:markerRef.current.center.y},
          {x:markerRef.current.totalDistance.x, y:markerRef.current.totalDistance.y},
          markerRef.current.totalDistance.value, 15, 30);

        craneDistanceLine.calculateGuidelinePosition().applyOffset(100, 'down');
        blockLine.calculateGuidelinePosition().applyOffset(200, 'down');
        totalDistanceLine.calculateGuidelinePosition().applyOffset(300, 'down');

        let blockToBuildingLine = new LineMarker(
          ctx,
          {x:markerRef.current.blockDistance1.x, y:markerRef.current.blockDistance1.y},
          {x:markerRef.current.buildingDistance.x, y:markerRef.current.buildingDistance.y},
          markerRef.current.buildingDistance.value - (markerRef.current.blockDistance1.value + craneData.block.vertical2), 15, 30,
          36);
        blockToBuildingLine.calculateGuidelinePosition().applyOffset(48, 'down');

        let testLine = new LineMarker(
          ctx,
          {x:markerRef.current.center.x, y:markerRef.current.center.y},
          {x:markerRef.current.buildingDistance.x, y:markerRef.current.buildingDistance.y},
          markerRef.current.buildingDistance.value, 15, 30);
        testLine.calculateGuidelinePosition().applyOffset(400, 'down');

        let testLine2 = new LineMarker(
          ctx,
          {x:markerRef.current.rearPoint.x, y:markerRef.current.rearPoint.y},
          {x:markerRef.current.blockDistance2.x, y:markerRef.current.blockDistance2.y},
          markerRef.current.blockDistance2.value - markerRef.current.rearPoint.value, 15, 30);
        testLine2.calculateGuidelinePosition().applyOffset(450, 'down');

        await setBuildParts([
          block2Part,
          buildingPart,
          blockPart,
          blockLine,
          craneDistanceLine,
          totalDistanceLine,
          // testLine,
          // testLine2,
          blockToBuildingLine,
        ]);
        return buildingPart
      }

      const getCraneCoordinate = async ( _canvasRef, modules ) => {
        let prevPartsNextCoord = { x:0, y:0}; // 이전 파츠 값을 저장하기위한 좌표
        let additionalParts = {}; //추가 파츠 좌표 저장 객체

        /* parts 모듈 생성 */
        const newModules = modules.map((part) => {
          const ctx = _canvasRef.getContext('2d');

          if (part.type === 'addParts'){ //추가 파츠이면 추가파츠 부착위치를 적용
            const refCode = part.refCode;
            prevPartsNextCoord.x = additionalParts[refCode].x;
            prevPartsNextCoord.y = additionalParts[refCode].y;
          }

          // 파츠 객체 생성
          const mod = new CraneModule(part, prevPartsNextCoord, offSetX, offSetY, ctx, 'down' );

          mod.calculateCoordination();
          prevPartsNextCoord.x = mod.next[0].x; // 다음 파츠 부착위치 저장
          prevPartsNextCoord.y = mod.next[0].y;

          if (part.code) { // 이 파츠를 참조하는 파츠가 있다면
            additionalParts = {...additionalParts, [part.code]:{x:mod.next[1].x,y:mod.next[1].y, angle:mod.angle}};
          }
          // MarkerPoint 좌표 생성 및 마커 그리기
          // console.log("AAA",mod.transCenter.x);
          switch (mod.partName) {
            case 'BODY': {
              markerRef.current = {
                ...markerRef.current,
                center: {
                  x: mod.transCenter.x,
                  y: mod.transCenter.y,
                  // value: mod.angle
                },
              }
              break;
            }
            case 'T': {
              // console.log("TT", mod.pointInfo.start.x, mod.transCenter.x);
              // console.log("TT2", mod.pointInfo.start.y, mod.transCenter.y);
              markerRef.current =  {
                ...markerRef.current,
                boomStart: {
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
              // const points = [markerRef.current.center]
              // drawPoints(points, ctx);

              const mainBoomAngle = new AngleMarker(
                ctx,
                markerRef.current.boomStart,
                markerRef.current.boomAngle.mainAngle,
                markerRef.current.boomAngle.mainAngle,
                markerRef.current.boomAngle.mainAngle,
                200,
                { size: 30, color: 'black' },
                'boom'
              );
              mainBoomAngle.draw();
              let boomMarkerLine = new LineMarker(
                ctx,
                {x:markerRef.current.boomStart.x, y:markerRef.current.boomStart.y },
                {x:markerRef.current.end.x, y:markerRef.current.end.y },
                craneData.craneData.mainBoom, 30, 30);
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
                  flyFixLuffingAngle: mod.pointInfo.flyFixLuffingAngle

                }
              }

              // 마커 그리기
              const flyFixLuffingAngle1 = new AngleMarker(
                ctx,
                markerRef.current.fixStart,
                markerRef.current.jibAngle.flyFixLuffingAngle,
                markerRef.current.jibAngle.mainAngle,
                markerRef.current.jibAngle.flyFixLuffingAngle,
                200,
                { size: 30, color: 'black' },
                'fix'
              );
              flyFixLuffingAngle1.draw();
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
                craneData.craneData.flyFixLuffing, 30, 30);
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
      getBuildingCoordinate(canvasRef.current, craneData).catch((err) => {console.log(err)});

      // // //  draw wire Lines
      // const wireModules = getWireComposition(craneData.wire);
      if   (wireData) {
        const points = wirePoints(wireData,transParts);
        const ctx = canvasRef.current.getContext('2d');
        drawWire(points,ctx);
      }
    }

  }, [craneInfo, pixelPerMeter, offSetY])

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