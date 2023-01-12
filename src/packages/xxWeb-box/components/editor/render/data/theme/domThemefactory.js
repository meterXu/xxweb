import {colorPalette as chalkColorPalette} from './echarts/chalk'
import {colorPalette} from './echarts/blue'
import {colorPalette} from './echarts/dark'
import {colorPalette} from './echarts/dark-blue'
import {colorPalette} from './echarts/yyjk'
import {colorPalette} from './echarts/essos'
import {colorPalette} from './echarts/halloween'
import {colorPalette} from './echarts/infographic'
import {colorPalette} from './echarts/macarons'
import {colorPalette} from './echarts/roma'
import {colorPalette} from './echarts/purple-passion'
import {colorPalette} from './echarts/shine'
import {colorPalette} from './echarts/walden'
import {colorPalette} from './echarts/westeros'
import {colorPalette} from './echarts/wonderland'

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
