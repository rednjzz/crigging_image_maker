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
    "T7_100": {
      name: 'T7_100',
      type: 'mainParts',
      origin: {
        x: 266,
        y: 493,
      },
      joint: [
        {x: 3226, y: 500,},
        {x: 733, y: 525,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_100.png',
      drawOrder: 13,
    },
    "T7_94.2": {
      name: 'T7_94.2',
      type: 'mainParts',
      origin: {
        x: 352,
        y: 490,
      },
      joint: [
        {x: 3140, y: 500,},
        {x: 818, y: 524,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_94.2.png',
      drawOrder: 13,
    },
    "T7_88.3": {
      name: 'T7_88.3',
      type: 'mainParts',
      origin: {
        x: 441,
        y: 492,
      },
      joint: [
        {x: 3053, y: 502,},
        {x: 907, y: 525,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_88.3.png',
      drawOrder: 13,
    },
    "T7_82.5": {
      name: 'T7_82.5',
      type: 'mainParts',
      origin: {
        x: 526,
        y: 492,
      },
      joint: [
        {x: 2968, y: 500,},
        {x: 992, y: 525,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_82.5.png',
      drawOrder: 13,
    },
    "T7_76.7": {
      name: 'T7_76.7',
      type: 'mainParts',
      origin: {
        x: 612,
        y: 491,
      },
      joint: [
        {x: 2882, y: 499,},
        {x: 1077, y: 524,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_76.7.png',
      drawOrder: 13,
    },
    "T7_70.8": {
      name: 'T7_70.8',
      type: 'mainParts',
      origin: {
        x: 698,
        y: 490,
      },
      joint: [
        {x: 2796, y: 499,},
        {x: 1164, y: 524,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_70.8.png',
      drawOrder: 13,
    },
    "T7_65": {
      name: 'T7_65',
      type: 'mainParts',
      origin: {
        x: 785,
        y: 491,
      },
      joint: [
        {x: 2708, y: 499,},
        {x: 1252, y: 525,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_65.png',
      drawOrder: 13,
    },
    "T7_59.1": {
      name: 'T7_59.1',
      type: 'mainParts',
      origin: {
        x: 876,
        y: 492,
      },
      joint: [
        {x: 2619, y: 500,},
        {x: 1341, y: 525,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_59.1.png',
      drawOrder: 13,
    },
    "T7_53.3": {
      name: 'T7_53.3',
      type: 'mainParts',
      origin: {
        x: 959,
        y: 491,
      },
      joint: [
        {x: 2535, y: 500,},
        {x: 1425, y: 524,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_53.3.png',
      drawOrder: 13,
    },
    "T7_47.5": {
      name: 'T7_47.5',
      type: 'mainParts',
      origin: {
        x: 933,
        y: 495,
      },
      joint: [
        {x: 2560, y: 498,},
        {x: 1418, y: 518,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_47.5.png',
      drawOrder: 13,
    },
    "T7_41.6": {
      name: 'T7_41.6',
      type: 'mainParts',
      origin: {
        x: 1137,
        y: 490,
      },
      joint: [
        {x: 2359, y: 500,},
        {x: 1602, y: 525,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_41.6.png',
      drawOrder: 13,
    },
    "T7_35.8": {
      name: 'T7_35.8',
      type: 'mainParts',
      origin: {
        x: 1120,
        y: 492,
      },
      joint: [
        {x: 2276, y: 500,},
        {x: 1685, y: 525,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_35.8.png',
      drawOrder: 13,
    },
    "T7_29.9": {
      name: 'T7_29.9',
      type: 'mainParts',
      origin: {
        x: 1310,
        y: 491,
      },
      joint: [
        {x: 2185, y: 499,},
        {x: 1841, y: 532,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_29.9.png',
      drawOrder: 13,
    },
    "T7_24.1": {
      name: 'T7_24.1',
      type: 'mainParts',
      origin: {
        x: 1394,
        y: 491,
      },
      joint: [
        {x: 2101, y: 500,},
        {x: 1925, y: 532,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_24.1.png',
      drawOrder: 13,
    },
    "T7_18.3": {
      name: 'T7_18.3',
      type: 'mainParts',
      origin: {
        x: 1482,
        y: 491,
      },
      joint: [
        {x: 2012, y: 500,},
        {x: 1943, y: 525,}],
      angle: 0,
      additional: true,
      addCode: 'T',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/T7_18.3.png',
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
    "F_18": {
      name: 'F_18',
      type: 'fixLuffParts',
      origin: {
        x: 2381,
        y: 2504,
      },
      joint: [
        {x: 2583, y: 2518,},
        {x: 2381, y: 2504,}],
      marker: {
        position: 'top',
        end: {x: 2583, y: 2504}
      },
      angle: 0,
      additional: true,
      addCode: 'F',
      reference: {
        name: 'BODY'
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/F_6.5.png',
      drawOrder: 7,
    },
    "F9m_nsbs":{
      name: 'F9m_nsbs',
      type: 'jibParts',
      origin: {
        x: 350,
        y: 500
      },
      joint: [
        {x: 638, y: 500},
        {x: 350, y: 500}
      ],
      additional: true,
      addCode: 'F',
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/F9m_nsbs.png`,
      drawOrder: 7,
    },
    "F3.5m_TF_bs":{
      name: 'F3.5m_TF_bs',
      type: 'jibParts',
      origin: {
        x: 395,
        y: 516
      },
      joint: [
        {x: 579, y: 483},
        {x: 395, y: 516}
      ],
      additional: true,
      addCode: 'F',
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/F3.5m_TF_bs.png`,
      drawOrder: 7,
    },
    "NA_6m":{
      name: 'NA_6m',
      type: 'jibParts',
      origin: {
        x: 409,
        y: 500
      },
      joint: [
        {x: 591, y: 500}
      ],
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/NA_6m.png`,
      drawOrder: 7,
    },
    "NA_12m":{
      name: 'NA_12m',
      type: 'jibParts',
      origin: {
        x: 312,
        y: 500
      },
      joint: [
        {x: 687, y: 500}
      ],
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/NA_12m.png`,
      drawOrder: 7,
    },
    "2m_NM_rs":{
      name: '2m_NM_rs',
      type: 'jibParts',
      origin: {
        x: 469,
        y: 500
      },
      joint: [
        {x: 531, y: 500}
      ],
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/2m_NM_rs.png`,
      drawOrder: 7,
    },
    "NM_6m":{
      name: 'NM_6m',
      type: 'jibParts',
      origin: {
        x: 406,
        y: 500
      },
      joint: [
        {x: 591, y: 500}
      ],
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/NM_6m.png`,
      drawOrder: 7,
    },
    "NM_12m":{
      name: 'NM_12m',
      type: 'jibParts',
      origin: {
        x: 309,
        y: 500
      },
      joint: [
        {x: 690, y: 500}
      ],
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/NM_12m.png`,
      drawOrder: 7,
    },
    "1m_NM_head":{
      name: '1m_NM_head',
      type: 'jibParts',
      origin: {
        x: 489,
        y: 495
      },
      joint: [
        {x: 512, y: 500},

      ],
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/1m_NM_head.png`,
      drawOrder: 7,
    },
    "1m_NM_h":{
      name: '1m_NM_h',
      type: 'jibParts',
      origin: {
        x: 489,
        y: 495
      },
      joint: [
        {x: 512, y: 500}
      ],
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/1m_NM_h.png`,
      drawOrder: 7,
    },
    "2.2m_NI_rs":{
      name: '2.2m_NI_rs',
      type: 'jibParts',
      origin: {
        x: 468,
        y: 498
      },
      joint: [
        {x: 530, y: 502}
      ],
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/2.2m_NI_rs.png`,
      drawOrder: 7,
    },
    "NI_6m":{
      name: 'NI_6m',
      type: 'jibParts',
      origin: {
        x: 404,
        y: 500
      },
      joint: [
        {x: 596, y: 500}
      ],
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/NI_6m.png`,
      drawOrder: 7,
    },
    "NI_12m":{
      name: 'NI_12m',
      type: 'jibParts',
      origin: {
        x: 304,
        y: 500
      },
      joint: [
        {x: 695, y: 500}
      ],
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/NI_12m.png`,
      drawOrder: 7,
    },
    "3.8m_NI_head":{
      name: '3.8m_NI_head',
      type: 'jibParts',
      origin: {
        x: 434,
        y: 489
      },
      joint: [
        {x: 552, y: 546}
      ],
      additional: false,
      reference: {
        name: 'BODY'
      },
      imgSrc: `http://localhost:3001/images/LTM_11200/3.8m_NI_head.png`,
      drawOrder: 7,
    },
    "Y": {
      name: 'Y',
      type: 'addParts',
      origin: {
        x: 519,
        y: 737,
      },
      joint: [
        {x: 519 , y: 737}],
      angle: 0,
      additional: false,
      reference: {
        code: 'T',
        name: ['T7_88.3']
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/Y.png',
      drawOrder: 20,
    },
    "N": {
      name: 'N',
      type: 'addParts',
      origin: {
        x: 676,
        y: 654,
      },
      joint: [
        {x: 676 , y: 654}],
      angle: 0,
      additional: false,
      reference: {
        code: 'F',
        name: ['F9m_nsbs' , 'F3.5m_TF_bs']
      },
      imgSrc: 'http://localhost:3001/images/LTM_11200/N.png',
      drawOrder: 21,
    },
  }
}