export default {
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
        x: 2515,
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
    "T7_88.3": {
      name: 'T7_88.3',
      type: 'mainParts',
      origin: {
        x: 1195,
        y: 2494,
      },
      joint: [
        {x: 3840, y: 2498,},
        {x: 1662, y: 2516,}],
      marker: {
        position: 'top',
        end: {x: 3840, y: 2494}
      },
      angle: 0,
      additional: true,
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_88.3.png',
      drawOrder: 13,
    },
    "A_2.6": {
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
    "VE": {
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
    "V3": {
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
    "V2": {
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
    "A_0.5": {
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
    "F_6.5": {
      name: 'F_6.5',
      type: 'fixLuffParts',
      origin: {
        x: 2381,
        y: 2504,
      },
      joint: [
        {x: 2583, y: 2518,}],
      marker: {
        position: 'top',
        end: {x: 2583, y: 2504}
      },
      angle: 0,
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/F_6.5.png',
      drawOrder: 7,
    },
    "Y": {
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