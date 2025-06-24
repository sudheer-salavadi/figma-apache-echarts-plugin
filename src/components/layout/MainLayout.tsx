import { ChartPreview } from '@/components/chart/ChartPreview'
import { ControlPanel } from '@/components/controls/ControlPanel'
import { Header } from '@/components/layout/Header'

export function MainLayout() {
  console.log('🏠 MainLayout rendering');
  
  try {
    return (
      <div className="h-screen w-full flex flex-col bg-background">
        {/* Header */}
        <Header />
        
        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chart Preview Area - 70% */}
          <div className="flex-[7] bg-background border-r border-border">
            <ChartPreview />
          </div>
          
          {/* Control Panel - 30% */}
          <div className="flex-[3] bg-muted/30 overflow-hidden">
            <ControlPanel />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('❌ Error in MainLayout:', error);
    return <div style={{ padding: '20px', color: 'red' }}>
      MainLayout Error: {error instanceof Error ? error.message : 'Unknown error'}
    </div>
  }
}