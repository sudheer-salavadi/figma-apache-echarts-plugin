import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { useChartStore } from '@/stores/chartStore'

const orientOptions = [
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' }
]

const positionOptions = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' }
]

const verticalPositionOptions = [
  { value: 'top', label: 'Top' },
  { value: 'middle', label: 'Middle' },
  { value: 'bottom', label: 'Bottom' }
]

export function LegendSection() {
  const { config, toggleFeature, updateLegend } = useChartStore()

  const handleToggle = () => {
    toggleFeature('showLegend')
  }

  const handleOrientChange = (value: string) => {
    updateLegend({ orient: value as 'horizontal' | 'vertical' })
  }

  const handlePositionChange = (value: string) => {
    updateLegend({ left: value as 'left' | 'center' | 'right' })
  }

  const handleVerticalPositionChange = (value: string) => {
    updateLegend({ top: value as 'top' | 'middle' | 'bottom' })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Legend</h3>
        <Switch
          checked={config.showLegend}
          onChange={handleToggle}
          size="sm"
        />
      </div>

      {config.showLegend && (
        <div className="space-y-3 pl-4 border-l-2 border-muted">
          {/* Orientation */}
          <div className="space-y-2">
            <Label className="text-xs">Orientation</Label>
            <Select
              value={config.legend.orient}
              onValueChange={handleOrientChange}
              options={orientOptions}
              className="h-8 text-xs"
            />
          </div>

          {/* Position */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">Horizontal</Label>
              <Select
                value={config.legend.left}
                onValueChange={handlePositionChange}
                options={positionOptions}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Vertical</Label>
              <Select
                value={config.legend.top}
                onValueChange={handleVerticalPositionChange}
                options={verticalPositionOptions}
                className="h-8 text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}