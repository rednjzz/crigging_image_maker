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
  let jib;
  const jibMode = 'F';
  switch( craneName) {
    case 'LTM_11200':
      switch (jibMode) {
        case 'F' : {
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
            default : jib = ['F9m_nsbs','2m_NM_rs','NM_6m','1m_NM_head']; break;
          }
        } break;
        case 'N' : {
          switch(craneData.flyFixLuffing) {
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
        } break;
      }
      switch (craneCode) {
        case 'T7'             : return ['BODY', `T7_${craneData.mainBoom}`]
        case 'T7F'            : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','A_0.5', ...jib]
        case 'T7F|NZF'        : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','A_0.5', ...jib]
        case 'T7Y'            : return ['BODY', `T7_${craneData.mainBoom}`, 'Y']
        case 'T7YVEF|NZF'     : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','VE','A_0.5', ...jib, 'Y']
        case 'T7YVEV2F|NZF'   : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','VE','V2','A_0.5', ...jib,'Y']
        case 'T7YVEV3V2F|NZF' : return ['BODY', `T7_${craneData.mainBoom}`, 'A_2.6','VE','V3','V2','A_0.5', ...jib, 'Y']
        case 'T3'             : return ['BODY', `T3_${craneData.mainBoom}`]
        case 'T3N'            : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2','A_2',...jib, 'L' ]
        case 'T3F|NZF'        : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2','A_0.5',...jib ]
        case 'T3Y'            : return ['BODY', `T3_${craneData.mainBoom}`, 'Y' ]
        case 'T3YVEN'         : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2', 'VE', 'A_2', ...jib ]
        case 'T3YV2VEN'       : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2', 'V2', 'VE', 'A_2', ...jib, 'Y','L' ]
        case 'T3YVEF|NZF'     : return ['BODY', `T3_${craneData.mainBoom}`, 'A_2.2', 'VE', 'A_0.5', ...jib ]
        default               : return ['BODY']
      }
    case 'LTM_1750': {
      switch(craneData.flyFixLuffing) {
        // 맨마지막 값은 head라는 표시를 해두어서 나중에 total_distance 같은 값을 구할수 있도록함
        case 21     : jib = ['F10.5m_nsbs',	'NA_3.5m', 'NA_3.5m', '1.5m_NM_rs', '2m_N_head']; break;
        case 24.5   : jib = ['F10.5m_nsbs',	'NA_3.5m', 'NA_7m',	'1.5m_NM_rs',	'2m_N_head']; break;
        case 28     : jib = ['F10.5m_nsbs',	'NA_3.5m', 'NA_3.5m', 'NA_7m', '1.5m_NM_rs', '2m_N_head']; break;
        case 31.5   : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_7m', '1.5m_NM_rs', 'NI_7m','2m_N_head']; break;
        case 35     : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_3.5m', 'NA_7m', '1.5m_NM_rs', 'NI_7m','2m_N_head']; break;
        case 38.5   : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_7m', 'NA_7m', '1.5m_NM_rs', 'NI_7m','2m_N_head']; break;
        case 42     : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_7m', '1.5m_NM_rs', 'NI_7m','2m_N_head']; break;
        case 45.5   : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_7m', 'NA_7m', '1.5m_NM_rs', 'NI_7m', 'NI_7m','2m_N_head']; break;
        case 49     : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_7m', '1.5m_NM_rs', 'NI_7m', 'NI_7m','2m_N_head']; break;
        case 52.5   : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_7m','2m_N_head']; break;
        case 56     : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_7m','2m_N_head']; break;
        case 59.5   : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_14m','2m_N_head']; break;
        case 63     : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_14m','2m_N_head']; break;
        case 66.5   : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_7m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_14m','2m_N_head']; break;
        case 70     : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_14m','2m_N_head']; break;
        case 73.5   : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_7m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_7m', 'NI_14m','2m_N_head']; break;
        case 77     : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_7m', 'NI_14m','2m_N_head']; break;
        case 80.5   : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_7m', 'NA_14m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_7m', 'NI_14m','2m_N_head']; break;
        case 84     : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_14m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_7m', 'NI_14m','2m_N_head']; break;
        case 87.5   : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_7m', 'NA_14m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_14m', 'NI_14m','2m_N_head']; break;
        case 91     : jib = ['F10.5m_nsbs', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_14m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_14m', 'NI_14m', '2m_N_head']; break;
        case 6      : jib = ['F2.5m_TF_a', '1.5m_NM_rs', '2m_N_head']; break;
        case 9.5    : jib = ['F2.5m_TF_a', 'NA_3.5m', '1.5m_NM_rs', '2m_N_head']; break;
        case 13     : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_3.5m', '1.5m_NM_rs', '2m_N_head']; break;
        case 16.5   : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_7m', '1.5m_NM_rs', '2m_N_head']; break;
        case 20     : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_3.5m', 'NA_7m', '1.5m_NM_rs', '2m_N_head']; break;
        case 23.5   : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_7m', '1.5m_NM_rs', 'NI_7m', '2m_N_head']; break;
        case 27     : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_3.5m', 'NA_7m', '1.5m_NM_rs', 'NI_7m', '2m_N_head']; break;
        case 30.5   : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_7m', 'NA_7m', '1.5m_NM_rs', 'NI_7m', '2m_N_head']; break;
        case 34     : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_7m', '1.5m_NM_rs', 'NI_7m', '2m_N_head']; break;
        case 37.5   : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_7m', 'NA_7m', '1.5m_NM_rs', 'NI_7m', 'NI_7m', '2m_N_head']; break;
        case 41     : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_7m', '1.5m_NM_rs', 'NI_7m', 'NI_7m', '2m_N_head']; break;
        case 44.5   : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_7m', '2m_N_head']; break;
        case 48     : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_7m', '2m_N_head']; break;
        case 51.5   : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_14m', '2m_N_head']; break;
        case 55     : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_14m', '2m_N_head']; break;
        case 58.5   : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_7m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_14m', '2m_N_head']; break;
        case 62     : jib = ['F2.5m_TF_a', 'NA_3.5m', 'NA_3.5m', 'NA_7m', 'NA_7m', 'NA_14m', '1.5m_NM_rs', 'NI_7m', 'NI_14m', '2m_N_head']; break;
        default     : jib = ['F10.5m_nsbs',	'NA_3.5m', 'NA_3.5m', '1.5m_NM_rs', '2m_N_head']; break;
      }
      switch (craneCode) {
        case 'T'              : return ['BODY', `T_${craneData.mainBoom}`]
        case 'TY'             : return ['BODY', `T_${craneData.mainBoom}`, 'Y']
        case 'TF|NZF'         : return ['BODY', `T_${craneData.mainBoom}`, 'A_2.2', 'A_0.5', ...jib]
        case 'TYVEF|NZF'      : return ['BODY', `T_${craneData.mainBoom}`, 'A_2.2', 'VE', 'A_0.5', ...jib, 'Y']
        case 'TYV2EF|NZF'     : return ['BODY', `T_${craneData.mainBoom}`, 'A_2.2', 'V2', 'VE', 'A_0.5', ...jib, 'Y']
        case 'TYV23EF|NZF'    : return ['BODY', `T_${craneData.mainBoom}`, 'A_2.2', 'V2', 'V3', 'VE', 'A_0.5', ...jib, 'Y']
        case 'TYV23E3F|NZF'   : return ['BODY', `T_${craneData.mainBoom}`, 'A_2.2', 'V2', 'V3', 'VE', 'V3', 'A_0.5', ...jib, 'Y']
        case 'TN'             : return ['BODY', `T_${craneData.mainBoom}`, 'A_2.2', 'A_1.8', ...jib, 'N']
        case 'TYVEN'          : return ['BODY', `T_${craneData.mainBoom}`, 'A_2.2', 'VE', 'A_1.8', ...jib, 'N']
        case 'TYV2EN'         : return ['BODY', `T_${craneData.mainBoom}`, 'A_2.2', 'V2', 'VE', 'A_1.8', ...jib, 'N']
        default               : return ['BODY']
      }
    }
    default : {
      break;
    }
  }
}

