import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useChartStore } from '@/stores/chartStore'

export function DataSection() {
  const { config, updateDimensions, updateData, updateLabels } = useChartStore()

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value) || 600
    updateDimensions({ ...config.dimensions, width })
  }

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value) || 400
    updateDimensions({ ...config.dimensions, height })
  }

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const dataString = e.target.value
      const data = dataString.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n))
      updateData(data)
    } catch (error) {
      console.error('Invalid data format')
    }
  }

  const handleLabelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const labelsString = e.target.value
    const labels = labelsString.split(',').map(s => s.trim()).filter(s => s.length > 0)
    updateLabels(labels)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Data & Dimensions</h3>
      
      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="width" className="text-xs">Width (px)</Label>
          <Input
            id="width"
            type="number"
            value={config.dimensions.width}
            onChange={handleWidthChange}
            min={100}
            max={1200}
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height" className="text-xs">Height (px)</Label>
          <Input
            id="height"
            type="number"
            value={config.dimensions.height}
            onChange={handleHeightChange}
            min={100}
            max={800}
            className="h-8 text-xs"
          />
        </div>
      </div>

      {/* Data */}
      <div className="space-y-2">
        <Label htmlFor="data" className="text-xs">Data (comma-separated)</Label>
        <Input
          id="data"
          value={config.data.join(', ')}
          onChange={handleDataChange}
          placeholder="120, 200, 150, 80, 70, 110, 130"
          className="h-8 text-xs"
        />
      </div>

      {/* Labels */}
      <div className="space-y-2">
        <Label htmlFor="labels" className="text-xs">Labels (comma-separated)</Label>
        <Input
          id="labels"
          value={config.labels.join(', ')}
          onChange={handleLabelsChange}
          placeholder="Mon, Tue, Wed, Thu, Fri, Sat, Sun"
          className="h-8 text-xs"
        />
      </div>
    </div>
  )
}