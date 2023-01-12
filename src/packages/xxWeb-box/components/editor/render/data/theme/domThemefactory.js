// import {colorPalette as chalkColorPalette} from './echarts/chalk'
// import {colorPalette as blueColorPalette} from './echarts/blue'
// import dark, {colorPalette as darkColorPalette} from './echarts/dark'
// import darkblue, {colorPalette as darkblueColorPalette} from './echarts/dark-blue'
// import yyjk, {colorPalette as yyjkColorPalette} from './echarts/yyjk'
// import essos, {colorPalette as essosColorPalette} from './echarts/essos'
// import halloween, {colorPalette as halloweenColorPalette} from './echarts/halloween'
// import {colorPalette as infographicColorPalette} from './echarts/infographic'
// import {colorPalette as macaronsColorPalette} from './echarts/macarons'
// import , {colorPalette as romaColorPalette} from './echarts/roma'
// import purplePassion, {colorPalette as purplePassionColorPalette} from './echarts/purple-passion'
// import shine, {colorPalette as shineColorPalette} from './echarts/shine'
// import walden, {colorPalette} from './echarts/walden'
// import westeros, {colorPalette} from './echarts/westeros'
// import wonderland, {colorPalette} from './echarts/wonderland'

export default {
  generateTheme: function (colorPalette) {
    colorPalette = colorPalette||{
      background: '#fff',
      color: '#fff',
      theme: [
        '#fff',
        '#BC3333',
        '#333',
        '#ddd'
      ],
      border: '#CCCCCC' }
    return {
      canvas: {
        backgroundColor: colorPalette.background
      },
      table: {
        primary: {
          background: colorPalette.background,
          borderColor: colorPalette.border
        },
        th: {
          color: colorPalette.theme[2],
          backgroundColor: colorPalette.theme[0],
          borderBottomColor: colorPalette.border,
          borderRightColor: colorPalette.border
        },
        td: {
          color: colorPalette.theme[1],
          backgroundColor: colorPalette.background,
          borderBottomColor: colorPalette.border,
          borderRightColor: colorPalette.border
        }
      },
      container: {
        title: {
          color: colorPalette.theme[2],
          background: {
            backgroundColor: colorPalette.theme[0]
          },
          border: {
            borderBottomColor: colorPalette.border
          }
        },
        background: {
          backgroundColor: colorPalette.background
        },
        border: {
          borderColor: colorPalette.border
        }
      },
      text: {
        text: {
          color: colorPalette.color
        },
        background: {
          color: colorPalette.background
        },
        border: {
          color: colorPalette.border
        }
      },
      slide: {
        pageColor: {
          normal: colorPalette.theme[1],
          active: colorPalette.theme[0]
        }
      }
    }
  }
}


// export default {
//   'dark-blue':darkblue,
//   'purple-passion':purplePassion,
//   blue,
//   chalk:chalkColorPalette,
//   dark,
//   yyjk,
//   essos,
//   halloween,
//   infographic,
//   macarons,
//   roma,
//   shine,
//   walden,
//   westeros,
//   wonderland
// }