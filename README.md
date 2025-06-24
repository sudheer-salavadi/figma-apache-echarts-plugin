# Advanced ECharts Figma Plugin

A modern, React-based Figma plugin for creating and customizing ECharts with real-time preview and comprehensive configuration options.

## Features

- **70/30 Layout**: Chart preview (70%) and controls panel (30%)
- **Real-time Preview**: Live ECharts rendering with SVG output
- **Smart Controls**: Conditional configuration panels with toggle switches
- **Chart Types**: Line, Bar, Pie, Area, Scatter charts
- **Full Customization**: Title, legend, grid, axes, series styling
- **Figma Integration**: Direct SVG insertion into Figma canvas
- **Modern Stack**: React 18 + TypeScript + Vite + Tailwind CSS

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (includes plugin files)
npm run build

# Build UI only (without plugin files)
npm run build:ui

# Copy plugin files to dist
npm run copy-plugin-files

# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── chart/
│   │   └── ChartPreview.tsx       # ECharts rendering component
│   ├── controls/
│   │   ├── ControlPanel.tsx       # Main control panel
│   │   └── sections/              # Individual control sections
│   ├── layout/
│   │   ├── MainLayout.tsx         # 70/30 layout
│   │   └── Header.tsx             # Chart type selector + actions
│   └── ui/                        # Reusable UI components
├── lib/
│   ├── chartConfig.ts             # ECharts configuration generator
│   └── utils.ts                   # Utility functions
├── stores/
│   └── chartStore.ts              # Zustand state management
├── types/
│   └── chart.types.ts             # TypeScript interfaces
└── index.css                      # Tailwind CSS + custom styles

plugin/
├── manifest.json                  # Figma plugin manifest (source)
└── code.js                        # Figma plugin backend (source)
```

## Figma Plugin Files

```
dist/
├── manifest.json                  # Figma plugin manifest
├── code.js                        # Figma plugin backend
├── index.html                     # Plugin UI
├── ui.js                          # Bundled React app
└── ui.css                         # Bundled styles
```

## Usage in Figma

1. Import the plugin using `dist/manifest.json`
2. Select chart type from the dropdown
3. Configure chart using the control panel
4. Click "SVG" or "PNG" to insert into Figma canvas
5. Use "Copy SVG" to copy chart to clipboard

## Chart Configuration

### Conditional Controls
- **Title**: Toggle + text, position, fonts, colors
- **Legend**: Toggle + orientation, positioning
- **Grid**: Toggle X/Y axis grid lines
- **Axes**: Toggle X/Y axis visibility
- **Series**: Colors, line styles, markers, smooth curves
- **Background**: Toggle + custom background colors

### Supported Chart Types
- **Line Chart**: With markers, smooth curves, area fill
- **Bar Chart**: Vertical bars with custom colors
- **Pie Chart**: Circular charts with labels
- **Area Chart**: Line charts with filled areas
- **Scatter Plot**: Point-based data visualization

## Technical Details

- **State Management**: Zustand for predictable state updates
- **Chart Rendering**: ECharts with SVG renderer for crisp output
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for fast development and optimized builds
- **Type Safety**: Full TypeScript coverage with strict mode

## Next Steps

- [ ] PNG export functionality
- [ ] Data import (CSV, JSON)
- [ ] Extended chart types
- [ ] Animation controls
- [ ] Theme presets