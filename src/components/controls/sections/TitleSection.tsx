import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { useChartStore } from '@/stores/chartStore'

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

const fontWeightOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'bold', label: 'Bold' }
]

export function TitleSection() {
  const { config, toggleFeature, updateTitle } = useChartStore()

  const handleToggle = () => {
    toggleFeature('showTitle')
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTitle({ text: e.target.value })
  }

  const handlePositionChange = (value: string) => {
    updateTitle({ left: value as 'left' | 'center' | 'right' })
  }

  const handleVerticalPositionChange = (value: string) => {
    updateTitle({ top: value as 'top' | 'middle' | 'bottom' })
  }

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fontSize = parseInt(e.target.value) || 16
    updateTitle({
      textStyle: {
        ...config.title.textStyle,
        fontSize
      }
    })
  }

  const handleFontWeightChange = (value: string) => {
    updateTitle({
      textStyle: {
        ...config.title.textStyle,
        fontWeight: value as 'normal' | 'bold'
      }
    })
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTitle({
      textStyle: {
        ...config.title.textStyle,
        color: e.target.value
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Title</h3>
        <Switch
          checked={config.showTitle}
          onChange={handleToggle}
          size="sm"
        />
      </div>

      {config.showTitle && (
        <div className="space-y-3 pl-4 border-l-2 border-muted">
          {/* Title Text */}
          <div className="space-y-2">
            <Label htmlFor="title-text" className="text-xs">Text</Label>
            <Input
              id="title-text"
              value={config.title.text}
              onChange={handleTextChange}
              placeholder="Chart Title"
              className="h-8 text-xs"
            />
          </div>

          {/* Position */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">Horizontal</Label>
              <Select
                value={config.title.left}
                onValueChange={handlePositionChange}
                options={positionOptions}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Vertical</Label>
              <Select
                value={config.title.top}
                onValueChange={handleVerticalPositionChange}
                options={verticalPositionOptions}
                className="h-8 text-xs"
              />
            </div>
          </div>

          {/* Font Settings */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="title-font-size" className="text-xs">Font Size</Label>
              <Input
                id="title-font-size"
                type="number"
                value={config.title.textStyle.fontSize}
                onChange={handleFontSizeChange}
                min={8}
                max={48}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Font Weight</Label>
              <Select
                value={config.title.textStyle.fontWeight}
                onValueChange={handleFontWeightChange}
                options={fontWeightOptions}
                className="h-8 text-xs"
              />
            </div>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label htmlFor="title-color" className="text-xs">Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="title-color"
                type="color"
                value={config.title.textStyle.color}
                onChange={handleColorChange}
                className="h-8 w-16 p-1"
              />
              <Input
                value={config.title.textStyle.color}
                onChange={handleColorChange}
                placeholder="#333333"
                className="h-8 text-xs flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}