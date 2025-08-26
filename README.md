# Echarts Builder For Figma

A powerful Figma plugin with a comprehensive visual editor to create [Apache ECharts](https://echarts.apache.org/examples/en/index.html) and export them as SVGs directly to the canvas. Build professional charts with advanced customization options and intelligent color memory.

[![Watch on YouTube](https://github.com/user-attachments/assets/86c6ba06-4bed-4a77-bd0f-9f17ee94048e)](https://www.youtube.com/watch?v=Qw_z4N0fAvw)

<img width="1437" alt="image" src="https://github.com/user-attachments/assets/1bedf415-7e3e-4080-8e6c-8ef5910aa4ba" />
<img width="1019" alt="image" src="https://github.com/user-attachments/assets/7555b213-47b2-4fdd-ad5d-5d549a498d4e" />



## ✨ Features

### 📈 Chart Types
- **Line Charts** - Simple and smooth line visualizations with configurable smoothing
- **Bar Charts** - Vertical bar charts with customizable border radius and corner styles
- **Horizontal Bar Charts** - Horizontal orientation for better label readability
- **Pie Charts** - Circular data representation with individual slice management
- **Doughnut Charts** - Pie charts with adjustable inner/outer radius controls
- **Area Charts** - Filled line charts with opacity controls
- **Scatter Charts** - Point-based data visualization
- **Mixed Charts** - Intelligently combines different chart types in one visualization

### 🎨 Advanced Visual Controls
- **Title Management** - Show/hide, alignment (left/center/right), positioning (top/bottom)
- **Legend Controls** - Position (top/bottom/left/right), alignment options, optimized spacing
- **X-Axis Customization** - Custom labels, multiple time scales (minute/hour/daily/monthly/yearly), increment/decrement data points
- **Axis Controls** - Show/hide X/Y axes, grid lines, smart positioning
- **Dark Mode** - Built-in ECharts dark theme support with automatic color adjustment
- **Custom Dimensions** - Manual width/height input (300-1200px × 200-900px) with responsive scaling
- **Individual Point Colors** - Set unique colors for each data point within series (🎨 button)
- **Color Memory System** - Automatically remembers and suggests your recently used colors

### 📊 Smart Data Management
- **Multi-Series Support** - Add unlimited data series with intelligent type detection
- **Dynamic Chart Type Selection** - Auto-switches to "Mixed" when combining different chart types
- **Individual Series Controls** - Custom colors, types, visibility per series
- **Smart Color Assignment** - New series automatically use your preferred colors (no more manual setup!)
- **Flexible X-Axis Control** - Custom string labels with +/- buttons to adjust point count
- **Time Scale Support** - Built-in minute/hour/daily/weekly/monthly/quarterly/yearly scales
- **Global Data Randomization** - Single button randomizes all series data (🎲 Randomize All)
- **Real-time Editing** - JSON data input with live preview and validation

### 🔧 Enhanced Interface Features
- **Streamlined Layout** - Dark Mode toggle moved to Chart Type header for easy access
- **Minimize/Maximize** - Collapse to header-only view with smooth transitions
- **Export to Figma** - Direct SVG insertion into Figma canvas with proper legend positioning
- **Responsive Design** - Adapts to plugin window size with optimized spacing
- **Professional UI** - Clean, intuitive interface with contextual controls
- **Smart Chart Type Detection** - UI automatically reflects current chart composition
- **Persistent Settings** - Color preferences saved across plugin sessions

## 🚀 Installation

1. **Download the plugin files**
2. **Open Figma Desktop**
3. **Go to Plugins → Development → Import plugin from manifest**
4. **Select the `dist/manifest.json` file**
5. **Run the plugin**

## 📁 Project Structure

```
figma-echarts/
├── dist/                    # Ready-to-use plugin files
│   ├── index.html          # Main plugin UI (vanilla JS)
│   ├── manifest.json       # Figma plugin manifest
│   └── code.js            # Plugin backend code
├── plugin/                 # Source plugin files
│   ├── manifest.json      # Plugin configuration
│   └── code.js           # Backend logic
└── README.md
```

## 🛠️ Development

This plugin is built with **vanilla JavaScript** for maximum compatibility and minimal dependencies.

### Key Technologies
- **ECharts 5.4.3** - Chart library loaded from CDN
- **Vanilla JavaScript** - No build process required
- **Figma Plugin API** - Native integration
- **SVG Rendering** - Vector output for crisp charts

### Making Changes

1. **Edit UI**: Modify `dist/index.html` for interface changes
2. **Edit Backend**: Modify `plugin/code.js` for Figma integration
3. **Update Config**: Edit `plugin/manifest.json` for plugin settings
4. **Copy Changes**: Run `cp plugin/* dist/` to sync changes

### No Build Process Needed!
Since this uses vanilla JavaScript, you can edit files directly and refresh the plugin in Figma.

## 🎯 Usage Guide

### Basic Workflow
1. **Launch Plugin** in Figma
2. **Select Chart Type** from the 8 available options (automatically detects Mixed charts)
3. **Configure X-Axis** - Choose time scales or create custom labels with +/- controls
4. **Manage Data Series** - Add/remove series, set individual colors and types
5. **Customize Appearance** - Title, legend, axis controls, and dark mode
6. **Fine-tune Colors** - Use 🎨 button for individual point colors
7. **Export to Figma** as perfectly scaled SVG

### Advanced Features
- **🎨 Individual Point Colors**: Click the paint brush icon to color each data point differently
- **Smart Color Memory**: Plugin remembers your color choices and suggests them for new series
- **Dynamic X-Axis**: Use +/- buttons to add/remove data points for any time scale
- **Mixed Chart Intelligence**: UI automatically switches to "Mixed" when combining chart types
- **Global Randomization**: Single 🎲 button randomizes all series data at once

### Pro Tips
- **Color Efficiency**: Plugin learns your color preferences - new series use your recently picked colors
- **X-Axis Flexibility**: Custom labels support any string values (quarters, products, regions, etc.)
- **Export Optimization**: Legend positioning is automatically optimized for different chart dimensions
- **Mixed Charts**: Combine bar + line, area + scatter, or any chart type combinations
- **Persistent Memory**: Your color preferences are saved between plugin sessions

## 🔧 Configuration

### Chart Dimensions
- Width: 300-1200px
- Height: 200-900px
- Real-time preview
- SVG export at exact dimensions

### Data Format
Series data should be JSON arrays:
```json
[120, 200, 150, 80, 70, 110]
```

### Smart Color System
- **Color Memory**: Automatically remembers last 12 used colors across sessions
- **Intelligent Assignment**: New series use your preferred colors (avoids duplicates)
- **Individual Point Colors**: 🎨 button allows unique colors per data point within series
- **Dark Mode Integration**: Automatic color adjustment for dark theme compatibility
- **Professional Defaults**: Curated color palette with accessibility considerations

## 🆕 Latest Enhancements

### X-Axis Revolution
- **Universal +/- Controls**: Add/remove data points for ANY time scale (not just custom labels)
- **Smart Time Scales**: Minute, Hour, Daily, Weekly, Monthly, Quarterly, Yearly with proper formatting
- **Custom String Support**: Enter any labels like "Q1,Q2,Q3,Q4" or "Product A,Product B,Product C"

### Color Intelligence  
- **Memory System**: Plugin learns and remembers your color preferences
- **Per-Point Coloring**: Color individual bars/points within same series (6 different colored bars from 1 series!)
- **Smart Suggestions**: No more manual color setup - uses your recently picked colors

### UX Improvements
- **Mixed Chart Detection**: Auto-selects "Mixed" chart type when combining different series types
- **Streamlined Randomization**: One 🎲 button for all series (removed redundant individual buttons)
- **Better Layout**: Dark mode moved to chart type header for cleaner interface
- **Export Optimization**: Fixed legend positioning issues in exported SVGs

## 📦 Dependencies

**Runtime:**
- ECharts 5.4.3 (loaded from CDN)
- Modern browser with ES6 support

**Development:**
- None! Pure vanilla JavaScript

## 🤝 Contributing

1. Fork the repository
2. Make your changes in `dist/index.html` or `plugin/code.js`
3. Test in Figma
4. Submit a pull request

## 📄 License

MIT License - feel free to use and modify for your projects.

## 🌟 Credits

- **ECharts** - Apache ECharts team for the excellent charting library
- **Figma** - For the powerful plugin API
