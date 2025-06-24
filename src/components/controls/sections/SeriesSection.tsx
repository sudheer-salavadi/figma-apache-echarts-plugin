import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useChartStore } from '@/stores/chartStore'

const lineTypeOptions = [
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' }
]

const symbolOptions = [
  { value: 'circle', label: 'Circle' },
  { value: 'rect', label: 'Rectangle' },
  { value: 'triangle', label: 'Triangle' },
  { value: 'diamond', label: 'Diamond' },
  { value: 'none', label: 'None' }
]

export function SeriesSection() {
  const { config, updateSeries } = useChartStore()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSeries({ name: e.target.value })
  }

  const handleLineColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSeries({
      lineStyle: {
        ...config.series.lineStyle,
        color: e.target.value
      },
      itemStyle: {
        ...config.series.itemStyle,
        color: e.target.value
      }
    })
  }

  const handleLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value) || 1
    updateSeries({
      lineStyle: {
        ...config.series.lineStyle,
        width
      }
    })
  }

  const handleLineTypeChange = (value: string) => {
    updateSeries({
      lineStyle: {
        ...config.series.lineStyle,
        type: value as 'solid' | 'dashed' | 'dotted'
      }
    })
  }

  const handleSymbolChange = (value: string) => {
    updateSeries({
      symbol: value as 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'none'
    })
  }

  const handleSymbolSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const symbolSize = parseInt(e.target.value) || 6
    updateSeries({ symbolSize })
  }

  const handleSmoothToggle = () => {
    updateSeries({ smooth: !config.series.smooth })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Series Styling</h3>
      
      <div className="space-y-3">
        {/* Series Name */}
        <div className="space-y-2">
          <Label htmlFor="series-name" className="text-xs">Series Name</Label>
          <Input
            id="series-name"
            value={config.series.name}
            onChange={handleNameChange}
            placeholder="Series 1"
            className="h-8 text-xs"
          />
        </div>

        {/* Line Color */}
        <div className="space-y-2">
          <Label htmlFor="line-color" className="text-xs">Color</Label>
          <div className="flex items-center gap-2">
            <Input
              id="line-color"
              type="color"
              value={config.series.lineStyle.color}
              onChange={handleLineColorChange}
              className="h-8 w-16 p-1"
            />
            <Input
              value={config.series.lineStyle.color}
              onChange={handleLineColorChange}
              placeholder="#5470c6"
              className="h-8 text-xs flex-1"
            />
          </div>
        </div>

        {/* Line Style */}
        {(config.type === 'line' || config.type === 'area') && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="line-width" className="text-xs">Line Width</Label>
                <Input
                  id="line-width"
                  type="number"
                  value={config.series.lineStyle.width}
                  onChange={handleLineWidthChange}
                  min={1}
                  max={10}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Line Type</Label>
                <Select
                  value={config.series.lineStyle.type}
                  onValueChange={handleLineTypeChange}
                  options={lineTypeOptions}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Symbol</Label>
                <Select
                  value={config.series.symbol}
                  onValueChange={handleSymbolChange}
                  options={symbolOptions}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="symbol-size" className="text-xs">Symbol Size</Label>
                <Input
                  id="symbol-size"
                  type="number"
                  value={config.series.symbolSize}
                  onChange={handleSymbolSizeChange}
                  min={0}
                  max={20}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs">Smooth Curve</Label>
              <Switch
                checked={config.series.smooth}
                onChange={handleSmoothToggle}
                size="sm"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}