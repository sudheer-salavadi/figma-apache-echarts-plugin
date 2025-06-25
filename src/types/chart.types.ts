export type ChartType = 'line' | 'bar' | 'horizontalBar' | 'pie' | 'doughnut' | 'area' | 'scatter' | 'mixed'

export interface ChartDimensions {
  width: number
  height: number
}

export interface ChartConfig {
  type: ChartType
  dimensions: ChartDimensions
  
  // Feature toggles
  showTitle: boolean
  showLegend: boolean
  showXAxisGrid: boolean
  showYAxisGrid: boolean
  showXAxis: boolean
  showYAxis: boolean
  customBackground: boolean
  customTextStyle: boolean
  
  // Configuration objects
  title: TitleConfig
  legend: LegendConfig
  grid: GridConfig
  xAxis: AxisConfig
  yAxis: AxisConfig
  series: SeriesConfig
  backgroundColor: string
  textStyle: TextStyleConfig
  color: string[]
  
  // Data
  data: number[]
  labels: string[]
}

export interface TitleConfig {
  text: string
  left: 'left' | 'center' | 'right'
  top: 'top' | 'middle' | 'bottom'
  textStyle: {
    fontSize: number
    fontWeight: 'normal' | 'bold'
    color: string
    fontFamily: string
  }
}

export interface LegendConfig {
  show: boolean
  orient: 'horizontal' | 'vertical'
  left: 'left' | 'center' | 'right'
  top: 'top' | 'middle' | 'bottom'
  textStyle: {
    fontSize: number
    color: string
  }
}

export interface GridConfig {
  show: boolean
  left: string
  right: string
  top: string
  bottom: string
  borderWidth: number
  borderColor: string
}

export interface AxisConfig {
  show: boolean
  name: string
  nameLocation: 'start' | 'middle' | 'end'
  nameTextStyle: {
    fontSize: number
    color: string
    fontWeight: 'normal' | 'bold'
  }
  axisLine: {
    show: boolean
    lineStyle: {
      color: string
      width: number
    }
  }
  axisTick: {
    show: boolean
    length: number
    lineStyle: {
      color: string
      width: number
    }
  }
  axisLabel: {
    show: boolean
    fontSize: number
    color: string
    rotate: number
  }
  splitLine: {
    show: boolean
    lineStyle: {
      color: string
      width: number
      type: 'solid' | 'dashed' | 'dotted'
    }
  }
}

export interface SeriesConfig {
  name: string
  lineStyle: {
    color: string
    width: number
    type: 'solid' | 'dashed' | 'dotted'
  }
  itemStyle: {
    color: string
  }
  symbol: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'none'
  symbolSize: number
  smooth: boolean
  areaStyle?: {
    color: string
    opacity: number
  }
}

export interface TextStyleConfig {
  fontFamily: string
  fontSize: number
  color: string
  fontWeight: 'normal' | 'bold'
}

// Default configurations
export const defaultChartConfig: ChartConfig = {
  type: 'line',
  dimensions: { width: 600, height: 400 },
  
  // Feature toggles
  showTitle: true,
  showLegend: true,
  showXAxisGrid: false,
  showYAxisGrid: true,
  showXAxis: true,
  showYAxis: true,
  customBackground: false,
  customTextStyle: false,
  
  // Configuration objects
  title: {
    text: 'Sample Chart',
    left: 'center',
    top: 'top',
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333',
      fontFamily: 'sans-serif'
    }
  },
  legend: {
    show: true,
    orient: 'horizontal',
    left: 'center',
    top: 'bottom',
    textStyle: {
      fontSize: 12,
      color: '#666666'
    }
  },
  grid: {
    show: true,
    left: '10%',
    right: '10%',
    top: '15%',
    bottom: '15%',
    borderWidth: 1,
    borderColor: '#cccccc'
  },
  xAxis: {
    show: true,
    name: '',
    nameLocation: 'end',
    nameTextStyle: {
      fontSize: 12,
      color: '#666666',
      fontWeight: 'normal'
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
        width: 1
      }
    },
    axisTick: {
      show: true,
      length: 5,
      lineStyle: {
        color: '#cccccc',
        width: 1
      }
    },
    axisLabel: {
      show: true,
      fontSize: 12,
      color: '#666666',
      rotate: 0
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#e6e6e6',
        width: 1,
        type: 'solid'
      }
    }
  },
  yAxis: {
    show: true,
    name: '',
    nameLocation: 'end',
    nameTextStyle: {
      fontSize: 12,
      color: '#666666',
      fontWeight: 'normal'
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
        width: 1
      }
    },
    axisTick: {
      show: true,
      length: 5,
      lineStyle: {
        color: '#cccccc',
        width: 1
      }
    },
    axisLabel: {
      show: true,
      fontSize: 12,
      color: '#666666',
      rotate: 0
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#e6e6e6',
        width: 1,
        type: 'solid'
      }
    }
  },
  series: {
    name: 'Series 1',
    lineStyle: {
      color: '#5470c6',
      width: 2,
      type: 'solid'
    },
    itemStyle: {
      color: '#5470c6'
    },
    symbol: 'circle',
    symbolSize: 6,
    smooth: false
  },
  backgroundColor: '#ffffff',
  textStyle: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    color: '#333333',
    fontWeight: 'normal'
  },
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
  
  // Sample data
  data: [120, 200, 150, 80, 70, 110, 130],
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
}