// function getPartsByParts
export default function getParts(craneInfo) {
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
            modules:['LTM_11200_BODY', `T7_${craneData.mainBoom}`]
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

