import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useChartStore } from '@/stores/chartStore'

export function AxesSection() {
  const { config, toggleFeature } = useChartStore()

  const handleXAxisToggle = () => {
    toggleFeature('showXAxis')
  }

  const handleYAxisToggle = () => {
    toggleFeature('showYAxis')
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Axes</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs">X-Axis</Label>
          <Switch
            checked={config.showXAxis}
            onChange={handleXAxisToggle}
            size="sm"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs">Y-Axis</Label>
          <Switch
            checked={config.showYAxis}
            onChange={handleYAxisToggle}
            size="sm"
          />
        </div>
      </div>
    </div>
  )
}