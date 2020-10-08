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
        // partsData[moduleName].length = craneInfo.craneData.mainBoom;
        break;
      }
      case 'boomParts': {
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
      case 'jibParts': {
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
      let jib;
      switch(craneData.flyFixLuffing) {
        // 맨마지막 값은 head라는 표시를 해두어서 나중에 total_distance 같은 값을 구할수 있도록함
        case 18   : jib = ['F9m_nsbs','2m_NM_rs','NM_6m','1m_NM_head']; break;
        case 24   : jib = ['F9m_nsbs','NA_6m','2m_NM_rs','NM_6m','1m_NM_head']; break;
        case 30   : jib = ['F9m_nsbs','NA_6m','NA_6m','2m_NM_rs','NM_6m','1m_NM_head']; break;
        case 36   : jib = ['F9m_nsbs','NA_6m','NA_6m','2m_NM_rs','NM_6m','NM_6m','1m_NM_head']; break;
        case 42   : jib = ['F9m_nsbs','NA_6m','NA_12m','2m_NM_rs','NM_6m','NM_6m','1m_NM_head']; break;
        case 48   : jib = ['F9m_nsbs','NA_6m','NA_12m','2m_NM_rs','NM_6m','NM_12m','1m_NM_head']; break;
        case 54   : jib = ['F9m_nsbs','NA_6m','NA_6m','NA_12m','2m_NM_rs','NM_6m','NM_12m','1m_NM_head']; break;
        case 60   : jib = ['F9m_nsbs','NA_6m','NA_6m','NA_12m','2m_NM_rs','NM_6m','NM_6m','NM_12m','1m_NM_head']; break;
        case 66   : jib = ['F9m_nsbs','NA_6m','NA_12m','NA_12m','2m_NM_rs','NM_6m','NM_6m','NM_12m','1m_NM_head']; break;
        case 72   : jib = ['F9m_nsbs','NA_6m','NA_12m','NA_12m','2m_NM_rs','NM_6m','NM_12m','NM_12m','1m_NM_head']; break;
        case 78   : jib = ['F9m_nsbs','NA_6m','NA_6m','NA_12m','NA_12m','2m_NM_rs','NM_6m','NM_12m','NM_12m','1m_NM_head']; break;
        case 84   : jib = ['F9m_nsbs','NA_6m','NA_6m','NA_12m','NA_12m','2m_NM_rs','NM_6m','NM_6m','NM_12m','NM_12m','1m_NM_head']; break;
        case 90   : jib = ['F9m_nsbs','NA_6m','NA_12m','NA_12m','NA_12m','2m_NM_rs','NM_6m','NM_6m','NM_12m','NM_12m','1m_NM_head']; break;
        case 96   : jib = ['F9m_nsbs','NA_6m','NA_12m','NA_12m','NA_12m','2m_NM_rs','NM_6m','NM_6m','NM_12m','NM_12m','1m_NM_h','2.2m_NI_rs','3.8m_NI_head']; break;
        case 102  : jib = ['F9m_nsbs','NA_6m','NA_12m','NA_12m','NA_12m','2m_NM_rs','NM_6m','NM_6m','NM_12m','NM_12m','1m_NM_h','2.2m_NI_rs','NI_6m','3.8m_NI_head']; break;
        case 108  : jib = ['F9m_nsbs','NA_6m','NA_12m','NA_12m','NA_12m','2m_NM_rs','NM_6m','NM_6m','NM_12m','NM_12m','1m_NM_h','2.2m_NI_rs','NI_6m','NI_6m','3.8m_NI_head']; break;
        case 114  : jib = ['F9m_nsbs','NA_6m','NA_12m','NA_12m','NA_12m','2m_NM_rs','NM_6m','NM_6m','NM_12m','NM_12m','1m_NM_h','2.2m_NI_rs','NI_6m','NI_12m','3.8m_NI_head']; break;
        case 120  : jib = ['F9m_nsbs','NA_6m','NA_12m','NA_12m','NA_12m','2m_NM_rs','NM_6m','NM_6m','NM_12m','NM_12m','1m_NM_h','2.2m_NI_rs','NI_6m','NI_6m','NI_12m','3.8m_NI_head']; break;
        case 126  : jib = ['F9m_nsbs','NA_6m','NA_12m','NA_12m','NA_12m','2m_NM_rs','NM_6m','NM_6m','NM_12m','NM_12m','1m_NM_h','2.2m_NI_rs','NI_6m','NI_12m','NI_12m','3.8m_NI_head']; break;
        case 6.5  : jib = ['F3.5m_TF_bs','2m_NM_rs','1m_NM_head']; break;
        case 12.5 : jib = ['F3.5m_TF_bs','NA_6m','2m_NM_rs','1m_NM_head']; break;
        case 18.5 : jib = ['F3.5m_TF_bs','NA_6m','2m_NM_rs','NM_6m','1m_NM_head']; break;
        case 24.5 : jib = ['F3.5m_TF_bs','NA_6m','NA_6m','2m_NM_rs','NM_6m','1m_NM_head']; break;
        case 30.5 : jib = ['F3.5m_TF_bs','NA_6m','NA_6m','2m_NM_rs','NM_6m','NM_6m','1m_NM_head']; break;
        case 36.5 : jib = ['F3.5m_TF_bs','NA_6m','NA_12m','2m_NM_rs','NM_6m','NM_6m','1m_NM_head']; break;
        case 42.5 : jib = ['F3.5m_TF_bs','NA_6m','NA_12m','2m_NM_rs','NM_6m','NM_12m','1m_NM_head']; break;
        case 48.5 : jib = ['F3.5m_TF_bs','NA_6m','NA_6m','NA_12m','2m_NM_rs','NM_6m','NM_12m','1m_NM_head']; break;
        case 54.5 : jib = ['F3.5m_TF_bs','NA_6m','NA_6m','NA_12m','2m_NM_rs','NM_6m','NM_6m','NM_12m','1m_NM_head']; break;
        case 60.5 : jib = ['F3.5m_TF_bs','NA_6m','NA_12m','NA_12m','2m_NM_rs','NM_6m','NM_6m','NM_12m','1m_NM_head']; break;
        default : jib = ['F9m_nsbs','2m_NM_rs','NM_6m','1m_NM_head']; break;
      }

      switch (craneCode) {
        case 'T7'             : return ['BODY', `T7_${craneData.mainBoom}`]
        case 'T7F'            : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','A_0.5', ...jib]
        case 'T7F|NZF'        : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','A_0.5', ...jib]
        case 'T7Y'            : return ['BODY', `T7_${craneData.mainBoom}`, 'Y']
        case 'T7YVEF|NZF'     : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','VE','A_0.5', ...jib]
        case 'T7YVEV2F|NZF'   : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','VE','V2','A_0.5', ...jib,'Y']
        case 'T7YVEV3V2F|NZF' : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','VE','V3','V2','A_0.5', ...jib, 'Y']
        case 'T3'             : return ['BODY', `T3_${craneData.mainBoom}`]
        case 'T3N'            : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2','A_2',...jib, 'N' ]
        case 'T3F|NZF'        : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2','A_0.5',...jib ]
        case 'T3Y'            : return ['BODY', `T3_${craneData.mainBoom}`, 'Y' ]
        // case 'T3YVEN'         : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2', 'VE', 'A_2', `N_${craneData.flyFixLuffing}` ]
        // case 'T3YV'           : return ['BODY', `T3_${craneData.mainBoom}`, 'A_4.3','V3','Y' ]
        case 'T3YVEN'         : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2', 'VE', 'A_2', ...jib ]
        case 'T3YV2VEN'       : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2', 'V2', 'VE', 'A_2', ...jib, 'Y','N' ]
        case 'T3YVEF|NZF'     : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2', 'VE', 'A_0.5', ...jib ]
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

