export const colorPalette = {
  backgroundColor: '#69d69d',
  color: '#eee',
  theme: [
    '#69d69d',
    '#3c755e',
    '#27323b',
    '#c5ce97',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3'
  ],
  border: '#cccccc'
}

const axisCommon = function () {
  return {
    axisLine: {
      lineStyle: {
        color: '#333333'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#333333'
      }
    },
    axisLabel: {
      textStyle: {
        color: '#DDC394'
      }
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#FFFFFF',
        width: 0.5
      }
    },
    splitArea: {
      areaStyle: {
        color: '#333333'
      }
    }
  }
}
export default {
  backgroundColor: 'transparent',
  colorPalette:colorPalette,
  color: colorPalette.theme,
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: colorPalette.color
      },
      crossStyle: {
        color: colorPalette.color
      }
    }
  },
  legend: {
    textStyle: {
      color: colorPalette.color
    }
  },
  textStyle: {
    color: colorPalette.color
  },
  title: {
    textStyle: {
      color: colorPalette.color
    }
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: colorPalette.color
      }
    }
  },
  dataZoom: {
    textStyle: {
      color: colorPalette.color
    }
  },
  visualMap: {
    textStyle: {
      color: colorPalette.color
    }
  },
  timeline: {
    lineStyle: {
      color: colorPalette.color
    },
    itemStyle: {
      normal: {
        color: colorPalette.theme[1]
      }
    },
    label: {
      normal: {
        textStyle: {
          color: colorPalette.color
        }
      }
    },
    controlStyle: {
      normal: {
        color: colorPalette.color,
        borderColor: colorPalette.color
      }
    }
  },
  timeAxis: axisCommon(),
  logAxis: axisCommon(),
  valueAxis: axisCommon(),
  categoryAxis: axisCommon(),

  line: {
    symbol: 'circle'
  },
  graph: {
    color: colorPalette.theme
  },
  gauge: {
    title: {
      textStyle: {
        color: colorPalette.color
      }
    }
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#FD1050',
        color0: '#0CF49B',
        borderColor: '#FD1050',
        borderColor0: '#0CF49B'
      }
    }
  }
}
