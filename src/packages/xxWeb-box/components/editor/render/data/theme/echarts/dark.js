export const colorPalette = {
    backgroundColor: '#fc97af',
    color: '#eee',
    theme: [
        '#dd6b66',
        '#759aa0',
        '#e69d87',
        '#8dc1a9',
        '#ea7e53',
        '#eedd78',
        '#73a373',
        '#73b9bc',
        '#7289ab',
        '#91ca8c',
        '#f49f42'
    ],
    border: '#ccc'
}

let axisCommon = function() {
    return {
        axisLine: {
            lineStyle: {
                color: colorPalette.color
            }
        },
        axisTick: {
            lineStyle: {
                color: colorPalette.color
            }
        },
        axisLabel: {
            textStyle: {
                color: colorPalette.color
            }
        },
        splitLine: {
            lineStyle: {
                type: 'dashed',
                color: '#aaa'
            }
        },
        splitArea: {
            areaStyle: {
                color: colorPalette.color
            }
        }
    };
};


export default {
    colorPalette:colorPalette,
    color: colorPalette.theme,
    backgroundColor: 'transparent',
    tooltip: {
        axisPointer: {
            lineStyle: {
                color: colorPalette.color
            },
            crossStyle: {
                color: colorPalette.color
            },
            label: {
                color: '#000'
            }
        }
    },
    legend: {
        textStyle: {
            color: colorPalette.color
        }
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

    // Area scaling controller
    dataZoom: {
        dataBackgroundColor: '#eee', // Data background color
        fillerColor: 'rgba(200,200,200,0.2)', // Fill the color
        handleColor: '#dd6b66' // Handle color
    },

    timeline: {
        itemStyle: {
            color: colorPalette[1]
        },
        lineStyle: {
            color: colorPalette.color
        },
        controlStyle: {
            color: colorPalette.color,
            borderColor: colorPalette.color
        },
        label: {
            color: colorPalette.color
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
        color: colorPalette.color
    },

    gauge: {
        axisLine: {
            lineStyle: {
                color: [
                    [0.2, '#dd6b66'],
                    [0.8, '#759aa0'],
                    [1, '#ea7e53']
                ],
                width: 8
            }
        }
    },

    candlestick: {
        itemStyle: {
            color: '#FD1050',
            color0: '#0CF49B',
            borderColor: '#FD1050',
            borderColor0: '#0CF49B'
        }
    }
}
