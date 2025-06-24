import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { useChartStore } from '@/stores/chartStore'
import { generateEChartsOption } from '@/lib/chartConfig'

export function ChartPreview() {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)
  const { config } = useChartStore()

  useEffect(() => {
    if (!chartRef.current) return

    try {
      // Initialize chart instance
      if (!chartInstanceRef.current) {
        chartInstanceRef.current = echarts.init(chartRef.current, null, {
          renderer: 'svg' // Use SVG renderer for better export
        })
      }

      // Generate ECharts option from config
      const option = generateEChartsOption(config)
      
      // Update chart
      chartInstanceRef.current.setOption(option, true)
    } catch (error) {
      console.error('Error updating chart:', error)
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.dispose()
        } catch (error) {
          console.error('Error disposing chart:', error)
        }
        chartInstanceRef.current = null
      }
    }
  }, [config])

  // Resize chart when container size changes
  useEffect(() => {
    const handleResize = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="h-full w-full flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <div
          id="chart-container"
          ref={chartRef}
          style={{
            width: `${config.dimensions.width}px`,
            height: `${config.dimensions.height}px`,
          }}
          className="bg-white"
        />
      </div>
    </div>
  )
}