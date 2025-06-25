import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// Enhanced chart types
type EnhancedChartType = 'line' | 'bar' | 'horizontalBar' | 'pie' | 'doughnut' | 'area' | 'scatter' | 'mixed';

// Series configuration for multi-series support
interface SeriesData {
  name: string;
  type: EnhancedChartType;
  data: number[];
  color: string;
  visible: boolean;
  smooth: boolean;
  showLabels: boolean;
}

// Main component configuration
interface ChartBuilderConfig {
  // Title controls
  title: string;
  subtitle: string;
  showTitle: boolean;
  titleAlign: 'left' | 'center' | 'right';
  titlePosition: 'top' | 'bottom';
  subtitleAlign: 'left' | 'center' | 'right';
  subtitlePosition: 'top' | 'bottom';
  
  // Axis controls
  xAxisLabel: string;
  yAxisLabel: string;
  xAxisLabelRotate: number;
  yAxisLabelRotate: number;
  showXAxis: boolean;
  showYAxis: boolean;
  showXAxisLabel: boolean;
  showYAxisLabel: boolean;
  showXLines: boolean;
  showYLines: boolean;
  
  // Legend controls
  showLegend: boolean;
  legendPosition: 'top' | 'bottom' | 'left' | 'right';
  legendAlign: 'auto' | 'left' | 'center' | 'right';
  
  // Chart options
  categories: string[];
  seriesData: SeriesData[];
  smoothLine: boolean;
  showDataLabels: boolean;
  stackSeries: boolean;
  chartSize: number;
  currentChartType: EnhancedChartType;
}

const defaultColors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'];

const EnhancedChartBuilder: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [config, setConfig] = useState<ChartBuilderConfig>({
    title: 'Multi-Series Chart',
    subtitle: '',
    showTitle: true,
    titleAlign: 'center',
    titlePosition: 'top',
    subtitleAlign: 'center',
    subtitlePosition: 'top',
    
    xAxisLabel: '',
    yAxisLabel: '',
    xAxisLabelRotate: 0,
    yAxisLabelRotate: 0,
    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    showXLines: false,
    showYLines: false,
    
    showLegend: true,
    legendPosition: 'bottom',
    legendAlign: 'auto',
    
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    seriesData: [
      {
        name: 'Sales',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110],
        color: '#5470c6',
        visible: true,
        smooth: false,
        showLabels: false
      },
      {
        name: 'Profit',
        type: 'line',
        data: [20, 50, 30, 15, 10, 25],
        color: '#91cc75',
        visible: true,
        smooth: false,
        showLabels: false
      }
    ],
    smoothLine: false,
    showDataLabels: false,
    stackSeries: false,
    chartSize: 600,
    currentChartType: 'line'
  });

  // Initialize chart
  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, null, { renderer: 'svg' });
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  // Update chart when config changes
  useEffect(() => {
    if (chartInstance.current && !isMinimized) {
      const option = generateChartOption(config);
      chartInstance.current.setOption(option, true);
      chartInstance.current.resize();
    }
  }, [config, isMinimized]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current && !isMinimized) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMinimized]);

  const generateChartOption = (config: ChartBuilderConfig) => {
    const baseOption: any = {
      title: config.showTitle ? {
        show: true,
        text: config.title,
        subtext: config.subtitle,
        left: config.titleAlign,
        top: config.titlePosition === 'bottom' ? 'bottom' : 'top',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
        subtextStyle: { fontSize: 12, align: config.subtitleAlign }
      } : { show: false },
      
      legend: config.showLegend ? {
        show: true,
        [config.legendPosition]: 10,
        orient: config.legendPosition === 'left' || config.legendPosition === 'right' ? 'vertical' : 'horizontal',
        align: config.legendAlign === 'auto' ? 'auto' : config.legendAlign,
        type: 'scroll'
      } : { show: false },
      
      grid: {
        left: config.legendPosition === 'left' ? '15%' : '10%',
        right: config.legendPosition === 'right' ? '15%' : '10%',
        top: config.legendPosition === 'top' ? '25%' : '20%',
        bottom: config.legendPosition === 'bottom' ? '20%' : '15%'
      },
      
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      }
    };

    // Handle pie and doughnut charts
    if (config.currentChartType === 'pie' || config.currentChartType === 'doughnut') {
      const firstSeries = config.seriesData.find(s => s.visible);
      if (firstSeries) {
        const pieData = firstSeries.data.map((value, i) => ({
          value,
          name: config.categories[i] || `Item ${i + 1}`,
          itemStyle: { color: config.seriesData[i % config.seriesData.length]?.color || firstSeries.color }
        }));
        
        baseOption.series = [{
          type: 'pie',
          radius: config.currentChartType === 'doughnut' ? ['40%', '70%'] : '60%',
          center: ['50%', '50%'],
          data: pieData,
          label: {
            show: config.showDataLabels,
            formatter: '{b}: {c} ({d}%)'
          }
        }];
      }
      return baseOption;
    }

    // Handle other chart types
    const isHorizontalBar = config.currentChartType === 'horizontalBar';
    
    baseOption.xAxis = {
      show: config.showXAxis,
      type: isHorizontalBar ? 'value' : 'category',
      data: isHorizontalBar ? undefined : config.categories,
      name: config.showXAxisLabel ? config.xAxisLabel : '',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: { rotate: config.xAxisLabelRotate },
      splitLine: { show: config.showXLines }
    };
    
    baseOption.yAxis = {
      show: config.showYAxis,
      type: isHorizontalBar ? 'category' : 'value',
      data: isHorizontalBar ? config.categories : undefined,
      name: config.showYAxisLabel ? config.yAxisLabel : '',
      nameLocation: 'middle',
      nameGap: 40,
      axisLabel: { rotate: config.yAxisLabelRotate },
      splitLine: { show: config.showYLines }
    };

    baseOption.series = config.seriesData
      .filter(series => series.visible)
      .map((series) => {
        let seriesType = series.type;
        if (config.currentChartType !== 'mixed') {
          seriesType = config.currentChartType;
        }
        
        const echartsType = seriesType === 'horizontalBar' ? 'bar' : 
                          seriesType === 'area' ? 'line' : seriesType;
        
        const seriesConfig: any = {
          name: series.name,
          type: echartsType,
          data: series.data,
          itemStyle: { color: series.color },
          lineStyle: { color: series.color },
          label: {
            show: series.showLabels || config.showDataLabels,
            position: echartsType === 'line' ? 'top' : 'inside'
          }
        };
        
        if (echartsType === 'line' || seriesType === 'area') {
          seriesConfig.smooth = series.smooth || config.smoothLine;
          if (seriesType === 'area') {
            seriesConfig.areaStyle = { color: series.color, opacity: 0.6 };
          }
        }
        
        if (config.stackSeries && (echartsType === 'bar' || seriesType === 'area' || echartsType === 'line')) {
          seriesConfig.stack = 'total';
        }
        
        return seriesConfig;
      });

    return baseOption;
  };

  const updateConfig = (updates: Partial<ChartBuilderConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const addSeries = () => {
    const newSeries: SeriesData = {
      name: `Series ${config.seriesData.length + 1}`,
      type: 'line',
      data: [10, 20, 30, 40, 50, 60],
      color: defaultColors[config.seriesData.length % defaultColors.length],
      visible: true,
      smooth: false,
      showLabels: false
    };
    
    updateConfig({
      seriesData: [...config.seriesData, newSeries]
    });
  };

  const removeSeries = (index: number) => {
    updateConfig({
      seriesData: config.seriesData.filter((_, i) => i !== index)
    });
  };

  const updateSeries = (index: number, updates: Partial<SeriesData>) => {
    const newSeriesData = [...config.seriesData];
    newSeriesData[index] = { ...newSeriesData[index], ...updates };
    updateConfig({ seriesData: newSeriesData });
  };

  const toggleMinimize = () => {
    const newMinimizedState = !isMinimized;
    setIsMinimized(newMinimizedState);
    
    // Send message to Figma to resize the plugin window
    if (typeof parent !== 'undefined' && parent !== window) {
      parent.postMessage({
        pluginMessage: {
          type: newMinimizedState ? 'minimize' : 'maximize'
        }
      }, '*');
    }
  };

  const exportToFigma = () => {
    if (!chartInstance.current) return;
    
    try {
      const svgData = chartInstance.current.renderToSVGString();
      const chartContainer = chartRef.current;
      const width = chartContainer ? chartContainer.offsetWidth : config.chartSize;
      const height = chartContainer ? chartContainer.offsetHeight : config.chartSize * 0.75;
      
      // Send to Figma
      if (typeof parent !== 'undefined' && parent !== window) {
        parent.postMessage({
          pluginMessage: {
            type: 'insert-chart',
            svgData,
            width,
            height,
            chartType: config.currentChartType + ' (multi-series)'
          }
        }, '*');
      } else {
        // Fallback for testing
        navigator.clipboard.writeText(svgData).then(() => {
          alert('SVG copied to clipboard!');
        });
      }
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100vh', 
      fontFamily: 'system-ui',
      minWidth: '800px',
      overflow: 'hidden'
    }}>
      
      {/* Header - Always Visible */}
      <div style={{ 
        background: 'white',
        borderBottom: '1px solid #ddd',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        minHeight: '60px',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>📊 Advanced ECharts Builder</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            onClick={exportToFigma}
            disabled={isMinimized}
            style={{ 
              background: isMinimized ? '#ccc' : '#000', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              cursor: isMinimized ? 'not-allowed' : 'pointer',
              fontSize: '13px',
              fontWeight: 500
            }}
          >
            Export to Figma
          </button>
          <button 
            onClick={toggleMinimize}
            style={{ 
              background: 'white', 
              color: '#000', 
              border: '1px solid #000', 
              padding: '8px 12px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500
            }}
          >
            {isMinimized ? '🔼 Maximize' : '🔽 Minimize'}
          </button>
        </div>
      </div>

      {/* Main Content - Hidden when minimized */}
      {!isMinimized && (
        <div style={{ 
          display: 'flex', 
          flex: 1, 
          overflow: 'hidden',
          minHeight: 0
        }}>
          {/* Chart Area */}
          <div style={{ 
            flex: '7', 
            background: 'white', 
            borderRight: '1px solid #ddd', 
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <div 
              ref={chartRef} 
              style={{ 
                width: '100%',
                height: '100%',
                maxWidth: `${config.chartSize}px`,
                maxHeight: `${config.chartSize * 0.75}px`,
                minWidth: '300px',
                minHeight: '225px',
                border: '1px solid #eee'
              }} 
            />
          </div>
          
          {/* Controls */}
          <div style={{ 
            flex: '3', 
            background: '#f9f9f9', 
            padding: '20px', 
            overflowY: 'auto',
            minWidth: '350px'
          }}>
            
            {/* Chart Types */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>📈 Chart Type</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {['line', 'bar', 'horizontalBar', 'pie', 'doughnut', 'area', 'scatter', 'mixed'].map((type) => (
                  <button
                    key={type}
                    onClick={() => updateConfig({ currentChartType: type as EnhancedChartType })}
                    style={{
                      padding: '8px', textAlign: 'center', fontSize: '10px',
                      border: config.currentChartType === type ? '2px solid #000' : '2px solid #ccc',
                      background: config.currentChartType === type ? '#f5f5f5' : 'white',
                      borderRadius: '4px', cursor: 'pointer'
                    }}
                  >
                    {type === 'horizontalBar' ? 'H-Bar' : 
                     type === 'doughnut' ? 'Donut' : 
                     type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Title Controls */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>📝 Title</h3>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => updateConfig({ title: e.target.value })}
                  placeholder="Chart title"
                  style={{ flex: 1, padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                  <input
                    type="checkbox"
                    checked={config.showTitle}
                    onChange={(e) => updateConfig({ showTitle: e.target.checked })}
                  />
                  Show
                </label>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <select
                  value={config.titleAlign}
                  onChange={(e) => updateConfig({ titleAlign: e.target.value as any })}
                  style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
                <select
                  value={config.titlePosition}
                  onChange={(e) => updateConfig({ titlePosition: e.target.value as any })}
                  style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>
            </div>

            {/* Legend Controls */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>🏷️ Legend</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px', fontSize: '12px' }}>
                <input
                  type="checkbox"
                  checked={config.showLegend}
                  onChange={(e) => updateConfig({ showLegend: e.target.checked })}
                />
                Show Legend
              </label>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <select
                  value={config.legendPosition}
                  onChange={(e) => updateConfig({ legendPosition: e.target.value as any })}
                  style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
                <select
                  value={config.legendAlign}
                  onChange={(e) => updateConfig({ legendAlign: e.target.value as any })}
                  style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <option value="auto">Auto</option>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>

            {/* Series Management */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>📊 Data Series</h3>
              
              {config.seriesData.map((series, index) => (
                <div key={index} style={{ 
                  border: '1px solid #ddd', borderRadius: '4px', padding: '8px', 
                  marginBottom: '8px', background: '#f9f9f9' 
                }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '4px' }}>
                    <input
                      type="text"
                      value={series.name}
                      onChange={(e) => updateSeries(index, { name: e.target.value })}
                      style={{ flex: 1, padding: '4px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                    />
                    <input
                      type="color"
                      value={series.color}
                      onChange={(e) => updateSeries(index, { color: e.target.value })}
                      style={{ width: '24px', height: '24px', border: 'none', borderRadius: '4px' }}
                    />
                    <select
                      value={series.type}
                      onChange={(e) => updateSeries(index, { type: e.target.value as EnhancedChartType })}
                      style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '11px' }}
                    >
                      <option value="line">Line</option>
                      <option value="bar">Bar</option>
                      <option value="horizontalBar">H-Bar</option>
                      <option value="area">Area</option>
                      <option value="scatter">Scatter</option>
                    </select>
                    <button
                      onClick={() => removeSeries(index)}
                      style={{ 
                        background: 'white', border: '1px solid #000', padding: '4px 8px', 
                        borderRadius: '4px', cursor: 'pointer', fontSize: '11px' 
                      }}
                    >
                      ×
                    </button>
                  </div>
                  
                  <textarea
                    value={JSON.stringify(series.data)}
                    onChange={(e) => {
                      try {
                        const data = JSON.parse(e.target.value);
                        updateSeries(index, { data });
                      } catch (err) {
                        // Invalid JSON, ignore
                      }
                    }}
                    style={{ 
                      width: '100%', height: '40px', padding: '4px', border: '1px solid #ccc', 
                      borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace', resize: 'none' 
                    }}
                    placeholder="[10, 20, 30, 40, 50]"
                  />
                  
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px', fontSize: '11px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <input
                        type="checkbox"
                        checked={series.visible}
                        onChange={(e) => updateSeries(index, { visible: e.target.checked })}
                      />
                      Visible
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <input
                        type="checkbox"
                        checked={series.smooth}
                        onChange={(e) => updateSeries(index, { smooth: e.target.checked })}
                      />
                      Smooth
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <input
                        type="checkbox"
                        checked={series.showLabels}
                        onChange={(e) => updateSeries(index, { showLabels: e.target.checked })}
                      />
                      Labels
                    </label>
                  </div>
                </div>
              ))}
              
              <button
                onClick={addSeries}
                style={{ 
                  width: '100%', padding: '8px', background: 'white', border: '1px solid #000', 
                  borderRadius: '4px', cursor: 'pointer', fontSize: '12px' 
                }}
              >
                + Add Series
              </button>
            </div>

            {/* Chart Options */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>⚙️ Options</h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', fontSize: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input
                    type="checkbox"
                    checked={config.showDataLabels}
                    onChange={(e) => updateConfig({ showDataLabels: e.target.checked })}
                  />
                  Data Labels
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input
                    type="checkbox"
                    checked={config.stackSeries}
                    onChange={(e) => updateConfig({ stackSeries: e.target.checked })}
                  />
                  Stack Series
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input
                    type="checkbox"
                    checked={config.showXLines}
                    onChange={(e) => updateConfig({ showXLines: e.target.checked })}
                  />
                  X Grid
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input
                    type="checkbox"
                    checked={config.showYLines}
                    onChange={(e) => updateConfig({ showYLines: e.target.checked })}
                  />
                  Y Grid
                </label>
              </div>
              
              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                  Chart Size: {config.chartSize}px
                </label>
                <input
                  type="range"
                  min="300"
                  max="800"
                  step="50"
                  value={config.chartSize}
                  onChange={(e) => updateConfig({ chartSize: parseInt(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedChartBuilder;