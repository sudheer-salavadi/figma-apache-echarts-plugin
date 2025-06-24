import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useChartStore } from '@/stores/chartStore'

export function GridSection() {
  const { config, toggleFeature } = useChartStore()

  const handleXGridToggle = () => {
    toggleFeature('showXAxisGrid')
  }

  const handleYGridToggle = () => {
    toggleFeature('showYAxisGrid')
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Grid Lines</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs">X-Axis Grid</Label>
          <Switch
            checked={config.showXAxisGrid}
            onChange={handleXGridToggle}
            size="sm"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs">Y-Axis Grid</Label>
          <Switch
            checked={config.showYAxisGrid}
            onChange={handleYGridToggle}
            size="sm"
          />
        </div>
      </div>
    </div>
  )
}