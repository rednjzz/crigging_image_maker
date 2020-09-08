export default {
  // base: {
  //   name: 'base',
  //   type: 'baseParts',
  //   origin: {
  //     x: 0,
  //     y: 0
  //   },
  //   joint: [{
  //     x: 63,
  //     y: 220,
  //   }],
  //   angle: 0,
  //   reference: null,
  //   imgSrc: 'http://localhost:3001/images/base.png',
  //   drawOrder: 15,
  //   additional: false,
  // },
  // body:{
  //   name: 'body',
  //   type: 'bodyParts',
  //   origin: {
  //     x: 63,
  //     y: 220,
  //   },
  //   joint: [{
  //     x: 240,
  //     y: 177,
  //   }],
  //   angle: 0,
  //   reference: {
  //     name: 'base'
  //   },
  //   imgSrc: 'http://localhost:3001/images/1_body.png',
  //   drawOrder: 14,
  //   additional: false,
  // },
  // boom1: {
  //   name: 'boom1',
  //   type: 'mainParts',
  //   origin: {
  //     x: 200,
  //     y: 285,
  //   },
  //   joint: [
  //     {x: 195, y: 110,},
  //     {x:206, y:214}],
  //   angle: 0,
  //   additional: true,
  //   reference: {
  //     name: 'body'
  //   },
  //   imgSrc: 'http://localhost:3001/images/boom0.png',
  //   drawOrder: 13,
  // },
  // boom2: {
  //   name: 'boom2',
  //   type: 'mainParts',
  //   origin: {
  //     x: 202,
  //     y: 275,
  //   },
  //   joint: [{
  //     x: 200,
  //     y: 122,
  //   }],
  //   angle: 0,
  //   reference: {
  //     name: 'boom1'
  //   },
  //   imgSrc: 'http://localhost:3001/images/boom1.png',
  //   drawOrder: 12,
  //   additional: false,
  // },boom3: {
  //   name: 'boom3',
  //   type: 'mainParts',
  //   origin: {
  //     x: 205,
  //     y: 275,
  //   },
  //   joint: [{
  //     x: 200,
  //     y: 124,
  //   }],
  //   angle: 0,
  //   reference: {
  //     name: 'boom2'
  //   },
  //   imgSrc: 'http://localhost:3001/images/boom2.png',
  //   drawOrder: 11,
  //   additional: false,
  // },boom4: {
  //   name: 'boom4',
  //   type: 'mainParts',
  //   origin: {
  //     x: 194,
  //     y: 204,
  //   },
  //   joint: [{
  //     x: 194,
  //     y: 164,
  //   }],
  //   angle: 0,
  //   reference: {
  //     name: 'boom3'
  //   },
  //   imgSrc: 'http://localhost:3001/images/boom3.png',
  //   drawOrder: 10,
  //   additional: false,
  // },fix1: {
  //   name: 'fix1',
  //   type: 'fixLuffParts',
  //   origin: {
  //     x: 200,
  //     y: 254,
  //   },
  //   joint: [{
  //     x: 199,
  //     y: 145,
  //   }],
  //   next: {
  //     x: 0,
  //     y: 0,
  //   },
  //   angle: 0,
  //   reference: {
  //     name: 'boom4'
  //   },
  //   imgSrc: 'http://localhost:3001/images/fix1.png',
  //   drawOrder: 9,
  //   additional: false,
  // },fix2: {
  //   name: 'fix2',
  //   type: 'fixLuffParts',
  //   origin: {
  //     x: 200,
  //     y: 246,
  //   },
  //   joint: [{
  //     x: 200,
  //     y: 170,
  //   }],
  //   next: {
  //     x: 0,
  //     y: 0,
  //   },
  //   angle: 0,
  //   reference: {
  //     name: 'fix1'
  //   },
  //   imgSrc: 'http://localhost:3001/images/fix2.png',
  //   drawOrder: 8,
  //   additional: false,
  // },add1: {
  //   name: 'add1',
  //   type: 'addParts',
  //   origin: {
  //     x: 200,
  //     y: 179,
  //   },
  //   joint: [{
  //     x: 199,
  //     y: 220,
  //   }],
  //   next: {
  //     x: 0,
  //     y: 0,
  //   },
  //   angle: 0,
  //   reference: {
  //     name: 'boom1'
  //   },
  //   imgSrc: 'http://localhost:3001/images/add1.png',
  //   drawOrder: 17,
  //   additional: false,
  // },
  LTM_11200: {
    BASE: {
      name: 'BASE',
      type: 'baseParts',
      origin: {
        x: 0,
        y: 0
      },
      joint: [{
        x: 2200,
        y: 2565,
      }],
      angle: 0,
      reference: null,
      imgSrc: 'http://localhost:3001/images/LTM_11200/BASE.png',
      drawOrder: 15,
      additional: false,
    },
    BODY:{
      name: 'BODY',
      type: 'bodyParts',
      origin: {
        x: 2200,
        y: 2587,
      },
      joint: [{
        x: 2490,
        y: 2459,
      }],
      angle: 0,
      reference: {
        name: 'BASE'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/BODY.png',
      drawOrder: 14,
      additional: false,
    },
    ["T7_88.3"]: {
      name: 'T7_88.3',
      type: 'mainParts',
      origin: {
        x: 1195,
        y: 2494,
      },
      joint: [
        {x: 3840, y: 2498,},
        {x: 1662, y: 2516,}],
      angle: 0,
      additional: true,
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_88.3.png',
      drawOrder: 13,
    },
    ["A_2.6"]: {
      name: 'A_2.6',
      type: 'mainParts',
      origin: {
        x: 2451,
        y: 2494,
      },
      joint: [
        {x: 2551 , y: 2500,}],
      angle: 0,
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/A_2.6.png',
      drawOrder: 12,
    },
    ["VE"]: {
      name: 'VE',
      type: 'mainParts',
      origin: {
        x: 2409,
        y: 2500,
      },
      joint: [
        {x: 2592, y: 2500,}],
      angle: 0,
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/VE.png',
      drawOrder: 11,
    },
    ["V3"]: {
      name: 'V3',
      type: 'mainParts',
      origin: {
        x: 2409,
        y: 2500,
      },
      joint: [
        {x: 2592, y: 2500,}],
      angle: 0,
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/V3.png',
      drawOrder: 10,
    },
    ["V2"]: {
      name: 'V2',
      type: 'mainParts',
      origin: {
        x: 2355,
        y: 2500,
      },
      joint: [
        {x: 2646, y: 2500,}],
      angle: 0,
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/V2.png',
      drawOrder: 9,
    },
    ["A_0.5"]: {
      name: 'A_0.5',
      type: 'mainParts',
      origin: {
        x: 2476,
        y: 2519,
      },
      joint: [
        {x: 2480, y: 2550,}],
      angle: 0,
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/A_0.5.png',
      drawOrder: 8,
    },
    ["F_6.5"]: {
      name: 'F_6.5',
      type: 'fixLuffParts',
      origin: {
        x: 2381,
        y: 2504,
      },
      joint: [
        {x: 2583, y: 2518,}],
      angle: 0,
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/F_6.5.png',
      drawOrder: 7,
    },
    ["Y"]: {
      name: 'Y',
      type: 'addParts',
      origin: {
        x: 2740,
        y: 2499,
      },
      joint: [
        {x: 2290 , y: 2482}],
      angle: 0,
      additional: false,
      reference: {
        name: 'T7_88.3'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/Y.png',
      drawOrder: 20,
    },
  }
}