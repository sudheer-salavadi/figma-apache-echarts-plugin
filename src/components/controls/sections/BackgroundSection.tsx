import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useChartStore } from '@/stores/chartStore'

export function BackgroundSection() {
  const { config, toggleFeature, updateConfig } = useChartStore()

  const handleBackgroundToggle = () => {
    toggleFeature('customBackground')
  }

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig({ backgroundColor: e.target.value })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Background</h3>
        <Switch
          checked={config.customBackground}
          onChange={handleBackgroundToggle}
          size="sm"
        />
      </div>

      {config.customBackground && (
        <div className="space-y-3 pl-4 border-l-2 border-muted">
          <div className="space-y-2">
            <Label htmlFor="bg-color" className="text-xs">Background Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="bg-color"
                type="color"
                value={config.backgroundColor}
                onChange={handleBackgroundColorChange}
                className="h-8 w-16 p-1"
              />
              <Input
                value={config.backgroundColor}
                onChange={handleBackgroundColorChange}
                placeholder="#ffffff"
                className="h-8 text-xs flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}