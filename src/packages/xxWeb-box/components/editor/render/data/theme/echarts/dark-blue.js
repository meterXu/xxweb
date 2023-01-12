export const colorPalette = {
    backgroundColor: '#00305a',
    color: '#eee',
    theme: [
        '#00305a',
        '#004b8d',
        '#0074d9',
        '#4192d9',
        '#7abaf2',
        '#99cce6',
        '#d6ebf5',
        '#eeeeee'
    ],
    border: '#ccc'
}

const axisCommon = function() {
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
    color: colorPalette.color,
    backgroundColor: 'transparent',
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
        handleColor: '#00305a' // Handle color
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
                    [0.2, '#004b8d'],
                    [0.8, '#00305a'],
                    [1, '#7abaf2']
                ],
                width: 8
            }
        }
    }
};