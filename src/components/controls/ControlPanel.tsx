import { DataSection } from './sections/DataSection'
import { TitleSection } from './sections/TitleSection'
import { LegendSection } from './sections/LegendSection'
import { GridSection } from './sections/GridSection'
import { AxesSection } from './sections/AxesSection'
import { SeriesSection } from './sections/SeriesSection'
import { BackgroundSection } from './sections/BackgroundSection'

export function ControlPanel() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Configuration</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <DataSection />
        <TitleSection />
        <LegendSection />
        <GridSection />
        <AxesSection />
        <SeriesSection />
        <BackgroundSection />
      </div>
    </div>
  )
}