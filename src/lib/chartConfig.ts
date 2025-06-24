import { ChartConfig } from '@/types/chart.types'

export function generateEChartsOption(config: ChartConfig) {
  const option: any = {
    // Base configuration
    backgroundColor: config.customBackground ? config.backgroundColor : 'transparent',
    color: config.color,
  }

  // Add title if enabled
  if (config.showTitle) {
    option.title = {
      text: config.title.text,
      left: config.title.left,
      top: config.title.top,
      textStyle: {
        fontSize: config.title.textStyle.fontSize,
        fontWeight: config.title.textStyle.fontWeight,
        color: config.title.textStyle.color,
        fontFamily: config.title.textStyle.fontFamily,
      }
    }
  }

  // Add legend if enabled
  if (config.showLegend) {
    option.legend = {
      show: config.legend.show,
      orient: config.legend.orient,
      left: config.legend.left,
      top: config.legend.top,
      textStyle: {
        fontSize: config.legend.textStyle.fontSize,
        color: config.legend.textStyle.color,
      }
    }
  }

  // Add grid configuration
  option.grid = {
    left: config.grid.left,
    right: config.grid.right,
    top: config.grid.top,
    bottom: config.grid.bottom,
    borderWidth: config.grid.show ? config.grid.borderWidth : 0,
    borderColor: config.grid.borderColor,
    containLabel: true
  }

  // Always add X-axis (ECharts requires it)
  option.xAxis = {
    type: 'category',
    data: config.labels,
    show: config.showXAxis && config.xAxis.show,
    name: config.xAxis.name,
    nameLocation: config.xAxis.nameLocation,
    nameTextStyle: {
      fontSize: config.xAxis.nameTextStyle.fontSize,
      color: config.xAxis.nameTextStyle.color,
      fontWeight: config.xAxis.nameTextStyle.fontWeight,
    },
    axisLine: {
      show: config.showXAxis && config.xAxis.axisLine.show,
      lineStyle: {
        color: config.xAxis.axisLine.lineStyle.color,
        width: config.xAxis.axisLine.lineStyle.width,
      }
    },
    axisTick: {
      show: config.showXAxis && config.xAxis.axisTick.show,
      length: config.xAxis.axisTick.length,
      lineStyle: {
        color: config.xAxis.axisTick.lineStyle.color,
        width: config.xAxis.axisTick.lineStyle.width,
      }
    },
    axisLabel: {
      show: config.showXAxis && config.xAxis.axisLabel.show,
      fontSize: config.xAxis.axisLabel.fontSize,
      color: config.xAxis.axisLabel.color,
      rotate: config.xAxis.axisLabel.rotate,
    },
    splitLine: {
      show: config.showXAxisGrid && config.xAxis.splitLine.show,
      lineStyle: {
        color: config.xAxis.splitLine.lineStyle.color,
        width: config.xAxis.splitLine.lineStyle.width,
        type: config.xAxis.splitLine.lineStyle.type,
      }
    }
  }

  // Always add Y-axis (ECharts requires it)
  option.yAxis = {
    type: 'value',
    show: config.showYAxis && config.yAxis.show,
    name: config.yAxis.name,
    nameLocation: config.yAxis.nameLocation,
    nameTextStyle: {
      fontSize: config.yAxis.nameTextStyle.fontSize,
      color: config.yAxis.nameTextStyle.color,
      fontWeight: config.yAxis.nameTextStyle.fontWeight,
    },
    axisLine: {
      show: config.showYAxis && config.yAxis.axisLine.show,
      lineStyle: {
        color: config.yAxis.axisLine.lineStyle.color,
        width: config.yAxis.axisLine.lineStyle.width,
      }
    },
    axisTick: {
      show: config.showYAxis && config.yAxis.axisTick.show,
      length: config.yAxis.axisTick.length,
      lineStyle: {
        color: config.yAxis.axisTick.lineStyle.color,
        width: config.yAxis.axisTick.lineStyle.width,
      }
    },
    axisLabel: {
      show: config.showYAxis && config.yAxis.axisLabel.show,
      fontSize: config.yAxis.axisLabel.fontSize,
      color: config.yAxis.axisLabel.color,
      rotate: config.yAxis.axisLabel.rotate,
    },
    splitLine: {
      show: config.showYAxisGrid && config.yAxis.splitLine.show,
      lineStyle: {
        color: config.yAxis.splitLine.lineStyle.color,
        width: config.yAxis.splitLine.lineStyle.width,
        type: config.yAxis.splitLine.lineStyle.type,
      }
    }
  }

  // Add series based on chart type
  option.series = [generateSeriesConfig(config)]

  // Add global text style if enabled
  if (config.customTextStyle) {
    option.textStyle = {
      fontFamily: config.textStyle.fontFamily,
      fontSize: config.textStyle.fontSize,
      color: config.textStyle.color,
      fontWeight: config.textStyle.fontWeight,
    }
  }

  return option
}

function generateSeriesConfig(config: ChartConfig) {
  const baseSeries = {
    name: config.series.name,
    data: config.data,
    type: config.type === 'area' ? 'line' : config.type,
  }

  switch (config.type) {
    case 'line':
    case 'area':
      return {
        ...baseSeries,
        lineStyle: {
          color: config.series.lineStyle.color,
          width: config.series.lineStyle.width,
          type: config.series.lineStyle.type,
        },
        itemStyle: {
          color: config.series.itemStyle.color,
        },
        symbol: config.series.symbol,
        symbolSize: config.series.symbolSize,
        smooth: config.series.smooth,
        ...(config.type === 'area' && config.series.areaStyle && {
          areaStyle: {
            color: config.series.areaStyle.color,
            opacity: config.series.areaStyle.opacity,
          }
        })
      }

    case 'bar':
      return {
        ...baseSeries,
        itemStyle: {
          color: config.series.itemStyle.color,
        }
      }

    case 'pie':
      return {
        ...baseSeries,
        type: 'pie',
        radius: '50%',
        data: config.labels.map((label, index) => ({
          name: label,
          value: config.data[index] || 0
        })),
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        }
      }

    case 'scatter':
      return {
        ...baseSeries,
        itemStyle: {
          color: config.series.itemStyle.color,
        },
        symbolSize: config.series.symbolSize,
      }

    default:
      return baseSeries
  }
}