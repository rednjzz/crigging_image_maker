// craneInfo : 영광이데이터
// partsData: 내가 입력한데이터
// 입력으로 들어오는 craneInfo는 영광이 getCraneData의 결과값이 입력으로 들어온다.

export default function convertCraneData(craneInfo, partsData) {
  // parts Data를 가져온다
  const parts = getParts(craneInfo);
  let moduleDetailArr = [];

  for( let i=0 ; i<parts.length ; i++) {
    const moduleName = parts[i];
    moduleDetailArr.push(partsData[moduleName]);

    // 각도 입력 bodyParts = 0, mainParts = mainAngle, fixLuffPart = fixLuffingAngle
    switch(partsData[moduleName].type){
      case 'bodyParts': {
        partsData[moduleName].angle = 0;
        break;
      }
      case 'mainParts': {
        partsData[moduleName].angle = craneInfo.craneData.mainAngle;
        partsData[moduleName].mainAngle = craneInfo.craneData.mainAngle;
        partsData[moduleName].length = craneInfo.craneData.mainBoom;
        break;
      }
      case 'fixLuffParts': {
        partsData[moduleName].angle = (craneInfo.craneData.mainAngle - craneInfo.craneData.fixLuffingAngle);
        partsData[moduleName].mainAngle = craneInfo.craneData.mainAngle;
        partsData[moduleName].fixLuffingAngle = craneInfo.craneData.fixLuffingAngle;
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

// function getPartsByParts
function getParts({craneName, craneCode, craneData}) {
  switch( craneName) {
    case 'LTM_11200':
      switch (craneCode) {
        case 'T7'             : return ['BODY', `T7_${craneData.mainBoom}`]
        case 'T7F'            : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','A_0.5', `F_${craneData.flyFixLuffing}`]
        case 'T7Y'            : return ['BODY', `T7_${craneData.mainBoom}`, 'Y']
        case 'T7YVEF|NZF'     : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','VE','A_0.5', `F_${craneData.flyFixLuffing}`]
        case 'T7YVEV2F|NZF'   : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','VE','V2','A_0.5', `F_${craneData.flyFixLuffing}`,'Y']
        case 'T7YVEV3V2F|NZF' : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','VE','V3','V2','A_0.5', `F_${craneData.flyFixLuffing}`, 'Y']
        case 'T3'             : return ['BODY', `T3_${craneData.mainBoom}`]
        case 'T3N'            : return ['BODY', `T3_${craneData.mainBoom}`, 'A_4.2',`N_${craneData.flyFixLuffing}` ]
        case 'T3F|NZF'        : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.7',`F_${craneData.flyFixLuffing}` ]
        case 'T3Y'            : return ['BODY', `T3_${craneData.mainBoom}`, 'Y' ]
        case 'T3YVEN'         : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2', 'VE', 'A_2', `N_${craneData.flyFixLuffing}` ]
        case 'T3YV2VEN'       : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2', 'V2', 'VE', 'A_2', `N_${craneData.flyFixLuffing}` ]
        case 'T3YVEF|NZF'     : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.7', 'VE', `F_${craneData.flyFixLuffing}` ]
        default               : return []
      }
    case 'LTM_1500_84m': {
      break;
    }
    default : {
      break;
    }
  }
}

