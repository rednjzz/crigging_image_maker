// craneInfo : 크레인의 각도 붐길이 건물 위치 픽스 길이 등등의 정보
// partsData: 파츠의 좌표 wire의 좌표 이미지 위치 등등의 정보 배열
// partsList: 조홥되어야할 파츠들의 List 배열

export default function convertCraneData(craneInfo, partsData, partsList) {
  let moduleDetailArr = [];

  for( let i=0 ; i<partsList.length ; i++) {
    const moduleName = partsList[i];
    moduleDetailArr.push(partsData[moduleName]);

    switch(partsData[moduleName].type){
      case 'bodyParts': {
        partsData[moduleName].angle = 0;
        break;
      }
      case 'mainParts': {
        partsData[moduleName].angle = craneInfo.craneData.mainAngle;
        partsData[moduleName].mainAngle = craneInfo.craneData.mainAngle;
        // partsData[moduleName].length = craneInfo.craneData.mainBoom;
        break;
      }
      case 'boomParts': {
        partsData[moduleName].angle = craneInfo.craneData.mainAngle;
        partsData[moduleName].mainAngle = craneInfo.craneData.mainAngle;
        partsData[moduleName].length = craneInfo.craneData.mainBoom;
        break;
      }
      case 'jibParts': {
        partsData[moduleName].angle = (craneInfo.craneData.mainAngle - craneInfo.craneData.flyFixLuffingAngle);
        partsData[moduleName].mainAngle = craneInfo.craneData.mainAngle;
        partsData[moduleName].flyFixLuffingAngle = craneInfo.craneData.flyFixLuffingAngle;
        partsData[moduleName].length = craneInfo.craneData.flyFixLuffing;
        break;
      }
      default : {
        partsData[moduleName].angle = 0;
      }
    }
  }
  return moduleDetailArr;
}
