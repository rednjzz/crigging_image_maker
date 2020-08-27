export default {
  base: {
    name: 'base',
    type: 'baseParts',
    origin: {
      x: 0,
      y: 0
    },
    joint: [{
      x: 63,
      y: 220,
    }],
    etc: {
      x: 0,
      y: 0,
    },
    angle: 0,
    reference: null,
    imgSrc: 'http://localhost:3001/images/base.png',
    drawOrder: 15,
    additional: false,
  },
  body:{
    name: 'body',
    type: 'bodyParts',
    origin: {
      x: 63,
      y: 220,
    },
    joint: [{
      x: 240,
      y: 177,
    }],
    angle: 0,
    reference: {
      name: 'base'
    },
    imgSrc: 'http://localhost:3001/images/1_body.png',
    drawOrder: 14,
    additional: false,
  },
  boom1: {
    name: 'boom1',
    type: 'mainParts',
    origin: {
      x: 200,
      y: 285,
    },
    joint: [{
      x: 195,
      y: 110,
    }],
    etc: {
      x: 206,
      y: 214,
    },
    angle: 0,
    additional: true,
    reference: {
      name: 'body'
    },
    imgSrc: 'http://localhost:3001/images/boom0.png',
    drawOrder: 13,
  },
  boom2: {
    name: 'boom2',
    type: 'mainParts',
    origin: {
      x: 202,
      y: 275,
    },
    joint: [{
      x: 200,
      y: 122,
    }],
    etc: {
      x: 0,
      y: 0,
    },
    angle: 0,
    reference: {
      name: 'boom1'
    },
    imgSrc: 'http://localhost:3001/images/boom1.png',
    drawOrder: 12,
    additional: false,
  },boom3: {
    name: 'boom3',
    type: 'mainParts',
    origin: {
      x: 205,
      y: 275,
    },
    joint: [{
      x: 200,
      y: 124,
    }],
    etc: {
      x: 0,
      y: 0,
    },
    angle: 0,
    reference: {
      name: 'boom2'
    },
    imgSrc: 'http://localhost:3001/images/boom2.png',
    drawOrder: 11,
    additional: false,
  },boom4: {
    name: 'boom4',
    type: 'mainParts',
    origin: {
      x: 194,
      y: 204,
    },
    joint: [{
      x: 194,
      y: 164,
    }],
    etc: {
      x: 0,
      y: 0,
    },
    angle: 0,
    reference: {
      name: 'boom3'
    },
    imgSrc: 'http://localhost:3001/images/boom3.png',
    drawOrder: 10,
    additional: false,
  },fix1: {
    name: 'fix1',
    type: 'fixLuffParts',
    origin: {
      x: 200,
      y: 254,
    },
    joint: [{
      x: 199,
      y: 145,
    }],
    next: {
      x: 0,
      y: 0,
    },
    etc: {
      x: 0,
      y: 0,
    },
    angle: 0,
    reference: {
      name: 'boom4'
    },
    imgSrc: 'http://localhost:3001/images/fix1.png',
    drawOrder: 9,
    additional: false,
  },fix2: {
    name: 'fix2',
    type: 'fixLuffParts',
    origin: {
      x: 200,
      y: 246,
    },
    joint: [{
      x: 200,
      y: 170,
    }],
    next: {
      x: 0,
      y: 0,
    },
    etc: {
      x: 0,
      y: 0,
    },
    angle: 0,
    reference: {
      name: 'fix1'
    },
    imgSrc: 'http://localhost:3001/images/fix2.png',
    drawOrder: 8,
    additional: false,
  },add1: {
    name: 'add1',
    type: 'addParts',
    origin: {
      x: 200,
      y: 179,
    },
    joint: [{
      x: 199,
      y: 220,
    }],
    next: {
      x: 0,
      y: 0,
    },
    etc: {
      x: 0,
      y: 0,
    },
    angle: 0,
    reference: {
      name: 'boom1'
    },
    imgSrc: 'http://localhost:3001/images/add1.png',
    drawOrder: 17,
    additional: false,
  },
}
