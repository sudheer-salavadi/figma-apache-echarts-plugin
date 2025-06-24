import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { useChartStore } from '@/stores/chartStore'
import { ChartType } from '@/types/chart.types'
import { Download, Copy, RotateCcw } from 'lucide-react'

const chartTypeOptions = [
  { value: 'line', label: 'Line Chart' },
  { value: 'bar', label: 'Bar Chart' },
  { value: 'pie', label: 'Pie Chart' },
  { value: 'area', label: 'Area Chart' },
  { value: 'scatter', label: 'Scatter Plot' }
]

export function Header() {
  const { config, setChartType, resetConfig } = useChartStore()

  const handleChartTypeChange = (type: string) => {
    setChartType(type as ChartType)
  }

  const handleExportSVG = () => {
    // Get SVG from the chart
    const chartContainer = document.querySelector('#chart-container svg');
    if (chartContainer) {
      const svgString = new XMLSerializer().serializeToString(chartContainer);
      
      // Send to Figma plugin
      parent.postMessage({
        pluginMessage: {
          type: 'insert-chart',
          svgData: svgString,
          width: config.dimensions.width,
          height: config.dimensions.height,
          chartType: config.type
        }
      }, '*');
    } else {
      console.warn('No chart found to export');
    }
  }

  const handleExportPNG = () => {
    // For now, use the same SVG export functionality
    handleExportSVG();
  }

  const handleCopySVG = () => {
    const chartContainer = document.querySelector('#chart-container svg');
    if (chartContainer) {
      const svgString = new XMLSerializer().serializeToString(chartContainer);
      
      // Copy to clipboard
      navigator.clipboard.writeText(svgString).then(() => {
        parent.postMessage({
          pluginMessage: {
            type: 'copy-svg'
          }
        }, '*');
      }).catch(err => {
        console.error('Failed to copy SVG to clipboard:', err);
      });
    }
  }

  const handleReset = () => {
    resetConfig()
  }

  return (
    <div className="h-16 bg-background border-b border-border px-6 flex items-center justify-between">
      {/* Left side - Chart type selector */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-foreground">ECharts Builder</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Chart Type:</span>
          <Select
            value={config.type}
            onValueChange={handleChartTypeChange}
            options={chartTypeOptions}
            className="w-36"
          />
        </div>
      </div>

      {/* Right side - Action buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopySVG}
          className="gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy SVG
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportSVG}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          SVG
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={handleExportPNG}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          PNG
        </Button>
      </div>
    </div>
  )
}