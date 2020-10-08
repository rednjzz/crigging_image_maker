export default {
  craneName: 'LTM_11200',
  // craneCode: 'T7YVEV3V2F|NZF',
  craneCode: 'T7Y',
  craneModeName: 'LUFFING',
  excelSheetName: 'TN_135t_TAB231545.1',
  craneData: {
    mainBoom: 53.3, //**
    mainAngle: 76, //**
    totalExtLength: 4,
    adapter1: 4,
    extBoom1: 0,
    extBoom2: 0,
    extBoom3: 0,
    extBoom4: 0,
    adapter2: 0,
    flyFixLuffing: 126, //**
    fixLuffingAngle: 25, //**
    distance1: 2.4, // 센터에서 메인붐 d1
    distance2: 69.6, // 픽스 또는 러핑의 바닥 길이 d2
    craneDistance: 8.93,
    centerToBuildingDistance: 21,
    centerToBlockDistance: 10, // cn
    craneToBuildingDistance: 10, //**
    craneToBlockDistance: 1.9, //**
    totalDistance: 72, //d1 + d2
    tableDistance: 72,
    //workDistance: 1,
    height1: 20,
    height2: 58.7,
    totalHeight: 80.7,
    marginHeight: 6.7,
    workingArea: 10.0,
    // workHeight: 68,
    tableWeight: 9.1,
    counterWeight: '10',
    overRear: 'x',
    optional: 'x',
    safetyFactor: 70.1,
    craneLocation: 'LL',
    workWeight: 7.5,
    workBuilding:{
      vertical: 15,
      horizontal: 0,
      height: 70
    },
    block:{
      vertical1: 5.1,
      horizontal1: 0,
      height1: 25,
      vertical2: 2,
      horizontal2: 0,
    },
  }
}