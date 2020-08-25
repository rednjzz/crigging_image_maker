export default {
  base: {
    name: 'base',
    type: 'mainParts',
    origin: {
      x: 0,
      y: 0
    },
    joint: [{
      x: 63,
      y: 220,
    }],
    reference: null,
    imgSrc: 'http://localhost:3001/images/base.png',
    drawOrder: 15,
  },
  body:{
    name: 'body',
    type: 'mainParts',
    origin: {
      x: 63,
      y: 220,
    },
    joint: [{
      x: 240,
      y: 177,
    }],
    reference: {
      name: 'base'
    },
    imgSrc: 'http://localhost:3001/images/1_body.png',
    drawOrder: 14,
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
    reference: {
      name: 'body'
    },
    imgSrc: 'http://localhost:3001/images/14_boom0.png',
    drawOrder: 14,
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
    reference: {
      name: 'boom1'
    },
    imgSrc: 'http://localhost:3001/images/14_boom0.png',
    drawOrder: 14,
  },
}
