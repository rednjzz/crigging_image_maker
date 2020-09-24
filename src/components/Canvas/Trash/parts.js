export default {
  partsName: {
    coords: {
      startingPointX : 63,
      startingPointY : 220,
      endingPointX : 240,
      endingPointY : 177,
      desirePointX : 63, // coordinates that this parts want to locate
      desirePointY : 220,
      zIndex : 1
    },
    imgSrc: 'http://localhost:3001/images/i_body.png',
    subParts: {
      name: 'extParts',
      coords: {
        x: 100,
        y: 199,
        zIndex: 5
      },
      imgSrc: 'http://localhost:3001/images/subparts.png'
    },
    nextParts: 'nextPartsName',
  },
  partsName2: {
    coords: {
      startingPointX : 63,
      startingPointY : 220,
      endingPointX : 240,
      endingPointY : 177,
      desirePointX : 63, // coordinates that this parts want to locate
      desirePointY : 220,
      zIndex : 1
    },
    imgSrc: 'http://localhost:3001/images/i_body.png',
    subParts: {
      name: 'extParts',
      coords: {
        x: 100,
        y: 199,
        zIndex: 5
      }
    },
    nextParts: 'nextPartsName',
  }
}