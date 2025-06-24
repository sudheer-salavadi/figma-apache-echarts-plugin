import { create } from 'zustand'
import { ChartConfig, defaultChartConfig, ChartType } from '@/types/chart.types'

interface ChartStore {
  config: ChartConfig
  updateConfig: (updates: Partial<ChartConfig>) => void
  updateTitle: (updates: Partial<ChartConfig['title']>) => void
  updateLegend: (updates: Partial<ChartConfig['legend']>) => void
  updateGrid: (updates: Partial<ChartConfig['grid']>) => void
  updateXAxis: (updates: Partial<ChartConfig['xAxis']>) => void
  updateYAxis: (updates: Partial<ChartConfig['yAxis']>) => void
  updateSeries: (updates: Partial<ChartConfig['series']>) => void
  updateTextStyle: (updates: Partial<ChartConfig['textStyle']>) => void
  updateDimensions: (dimensions: { width: number; height: number }) => void
  updateData: (data: number[]) => void
  updateLabels: (labels: string[]) => void
  setChartType: (type: ChartType) => void
  resetConfig: () => void
  toggleFeature: (feature: keyof Pick<ChartConfig, 'showTitle' | 'showLegend' | 'showXAxisGrid' | 'showYAxisGrid' | 'showXAxis' | 'showYAxis' | 'customBackground' | 'customTextStyle'>) => void
}

export const useChartStore = create<ChartStore>((set) => ({
  config: defaultChartConfig,
  
  updateConfig: (updates) => 
    set((state) => ({
      config: { ...state.config, ...updates }
    })),
  
  updateTitle: (updates) => 
    set((state) => ({
      config: {
        ...state.config,
        title: { ...state.config.title, ...updates }
      }
    })),
  
  updateLegend: (updates) => 
    set((state) => ({
      config: {
        ...state.config,
        legend: { ...state.config.legend, ...updates }
      }
    })),
  
  updateGrid: (updates) => 
    set((state) => ({
      config: {
        ...state.config,
        grid: { ...state.config.grid, ...updates }
      }
    })),
  
  updateXAxis: (updates) => 
    set((state) => ({
      config: {
        ...state.config,
        xAxis: { ...state.config.xAxis, ...updates }
      }
    })),
  
  updateYAxis: (updates) => 
    set((state) => ({
      config: {
        ...state.config,
        yAxis: { ...state.config.yAxis, ...updates }
      }
    })),
  
  updateSeries: (updates) => 
    set((state) => ({
      config: {
        ...state.config,
        series: { ...state.config.series, ...updates }
      }
    })),
  
  updateTextStyle: (updates) => 
    set((state) => ({
      config: {
        ...state.config,
        textStyle: { ...state.config.textStyle, ...updates }
      }
    })),
  
  updateDimensions: (dimensions) => 
    set((state) => ({
      config: {
        ...state.config,
        dimensions
      }
    })),
  
  updateData: (data) => 
    set((state) => ({
      config: {
        ...state.config,
        data
      }
    })),
  
  updateLabels: (labels) => 
    set((state) => ({
      config: {
        ...state.config,
        labels
      }
    })),
  
  setChartType: (type) => 
    set((state) => ({
      config: {
        ...state.config,
        type
      }
    })),
  
  resetConfig: () => 
    set({ config: defaultChartConfig }),
  
  toggleFeature: (feature) => 
    set((state) => ({
      config: {
        ...state.config,
        [feature]: !state.config[feature]
      }
    }))
}))