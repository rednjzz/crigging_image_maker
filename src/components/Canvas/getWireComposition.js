import parts from "./Trash/parts";

export function getWireComposition({craneName, craneCode, craneData}) {
  switch(craneName) {
    case 'L_11200' : {
      switch (craneCode) {
        case 'T7'             : return [[['BODY',1], [`T7_${craneData.mainBoom}`,1]]]
        case 'T7F'            : return [[['BODY',1], [`T7_${craneData.mainBoom}`,1]], [['A_0.5',1],[`T7_${craneData.mainBoom}`,1]] ]
        case 'T7YVEF|NZF'     : return [{
          from: {
            name: 'BODY',
            number: 0
          },
          to: {
            name: `A_0.5`,
            number: 0
          }
        }, {
          from: {
            name: 'A_0.5',
            number: 0
          },
          to: {
            name: `1m_NM_head`,
            number: 0
          }
        },{
          from: {
            name: 'Y',
            number: 0
          },
          to: {
            name: `VE`,
            number: 0
          }
        }, {
          from: {
            name: 'Y',
            number: 1
          },
          to: {
            name: `VE`,
            number: 1
          }
        },{
          from: {
            name: 'Y',
            number: 2
          },
          to: {
            name: `BODY`,
            number: 1
          }
        }
        ]
        default               : return []
      }
    }
  }
}

export function wirePoints(wireComposition, wireData) {
  // const model = 'L_11200';
  return wireComposition.map(arr => {
    if(wireData[arr.from.name] && wireData[arr.to.name] ) {
      const from = wireData[arr.from.name][arr.from.number];
      const to = wireData[arr.to.name][arr.to.number];
      return [from, to]
    }
  })
}

