// craneInfor : 영광이데이터
// partsData: 내가 입력한데이터
// 입력으로 들어오는 craneInfo는 영광이 getCraneData의 결과값이 입력으로 들어온다.

export default function convertCraneData(craneInfo, partsData) {
  // parts Data를 가져온다
  const parts = getParts(craneInfo);
  parts.moduleDetailArr = [];
  // parts.moduleDetailObj = {};

  for( let i=0 ; i<parts.moduleNames.length ; i++) {
    const moduleName = parts.moduleNames[i];
    parts.moduleDetailArr.push(partsData[moduleName]);
    // parts.moduleDetailObj[moduleName] = partsData[moduleName];

    // 각도 입력 bodyParts = 0, mainParts = mainAngle, fixLuffPart = fixLuffingAngle
    switch(partsData[moduleName].type){
      case 'bodyParts': {
        partsData[moduleName].angle = 0;
        break;
      }
      case 'mainParts': {
        partsData[moduleName].angle = craneInfo.craneData.mainAngle;
        break;
      }
      case 'fixLuffParts': {
        partsData[moduleName].angle = craneInfo.craneData.fixLuffingAngle;
        break;
      }
      default : {
        partsData[moduleName].angle = 0;
      }
    }
  }
  return parts;
}

// function getPartsByParts
function getParts(craneInfo) {
  const {craneName, craneCode, craneData} = craneInfo;
  let parts;
  switch( craneName) {
    case 'LTM_11200': {
      switch (craneCode) {
        case 'T7' : {
          parts = {
            info:{
              craneName,
              craneCode,
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            moduleNames: ['base','body', 'boom1', 'boom2', 'boom3', 'boom4', 'fix1', 'fix2', 'add1'],
            modules:['LTM_11200_BODY', `T7_${craneData.mainBoom}`],
            moduleDetail:[],
          };
          break;
        }
        case 'T7F' : {
          parts = {
            info:{
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            modules:['LTM_11200_BODY', `T7_${craneData.mainBoom}`, 'A_2.6','A_0.5', `F_${craneData.fixLuffing}`]
          };
          break;
        }
        case 'T7Y' : {
          parts = {
            info:{
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            modules:['LTM_11200_BODY', `T7_${craneData.mainBoom}`, 'Y']
          };
          break;
        }
        case 'T7YVEF|NZF' : {
          parts = {
            info:{
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            modules:['LTM_11200_BODY', `T7_${craneData.mainBoom}`, 'A_2.6','VE','A_0.5', `F_${craneData.fixLuffing}`]
          };
          break;
        }
        case 'T7YVEV2F|NZF' : {
          parts = {
            info:{
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            modules:['LTM_11200_BODY', `T7_${craneData.mainBoom}`, 'A_2.6','VE','V2','A_0.5', `F_${craneData.fixLuffing}`]
          };
          break;
        }
        case 'T7YVEV3V2F|NZF' : {
          parts = {
            info:{
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            modules:['LTM_11200_BODY', `T7_${craneData.mainBoom}`, 'A_2.6','VE','V3','V2','A_0.5', `F_${craneData.fixLuffing}`]
          };
          break;
        }
        case 'T3' : {
          parts = {
            info:{
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            modules:['LTM_11200_BODY', `T3_${craneData.mainBoom}`]
          };
          break;
        }
        case 'T3N' : {
          parts = {
            info:{
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            modules:['LTM_11200_BODY', `T3_${craneData.mainBoom}`, 'A_4.2',`N_${craneData.fixLuffing}` ]
          };
          break;
        }
        case 'T3F|NZF' : {
          parts = {
            info:{
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            modules:['LTM_11200_BODY', `T3_${craneData.mainBoom}`, 'A_2.7',`F_${craneData.fixLuffing}` ]
          };
          break;
        }
        case 'T3Y' : {
          parts = {
            info:{
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            modules:['LTM_11200_BODY', `T3_${craneData.mainBoom}`, 'Y' ]
          };
          break;
        }
        case 'T3YVEN' : {
          parts = {
            info:{
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            modules:['LTM_11200_BODY', `T3_${craneData.mainBoom}`, 'A_2.2', 'VE', 'A_2', `N_${craneData.fixLuffing}` ]
          };
          break;
        }
        case 'T3YV2VEN' : {
          parts = {
            info:{
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            modules:['LTM_11200_BODY', `T3_${craneData.mainBoom}`, 'A_2.2', 'V2', 'VE', 'A_2', `N_${craneData.fixLuffing}` ]
          };
          break;
        }
        case 'T3YVEF|NZF' : {
          parts = {
            info:{
              mainAngle: craneData.mainAngle,
              fixLuffingAngle: craneData.fixLuffingAngle
            },
            modules:['LTM_11200_BODY', `T3_${craneData.mainBoom}`, 'A_2.7', 'VE', `F_${craneData.fixLuffing}` ]
          };
          break;
        }
        default : {
          parts = {}
          break;
        }
      }
      break;
    }
    case 'LTM_1500_84m': {
      break;
    }
    default : {
      break;
    }
  }

  return parts;
}
