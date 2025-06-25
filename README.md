# Echarts Builder For Figma

A Figma plugin with a visual editor to create [Apache ECharts](https://echarts.apache.org/examples/en/index.html) and export them as SVGs directly to the canvas.

[![Watch on YouTube](https://github.com/user-attachments/assets/86c6ba06-4bed-4a77-bd0f-9f17ee94048e)](https://www.youtube.com/watch?v=Qw_z4N0fAvw)

<img width="1437" alt="image" src="https://github.com/user-attachments/assets/1bedf415-7e3e-4080-8e6c-8ef5910aa4ba" />
<img width="1019" alt="image" src="https://github.com/user-attachments/assets/7555b213-47b2-4fdd-ad5d-5d549a498d4e" />



## ✨ Features

### 📈 Chart Types
- **Line Charts** - Simple and smooth line visualizations
- **Bar Charts** - Vertical bar charts with multiple series support
- **Horizontal Bar Charts** - Horizontal orientation for better label readability
- **Pie Charts** - Circular data representation
- **Doughnut Charts** - Pie charts with center hole
- **Area Charts** - Filled line charts
- **Scatter Charts** - Point-based data visualization
- **Mixed Charts** - Combine different chart types in one visualization

### 🎨 Visual Controls
- **Title Management** - Show/hide, alignment (left/center/right), positioning (top/bottom)
- **Legend Controls** - Position (top/bottom/left/right), alignment options
- **Axis Controls** - Show/hide X/Y axes, grid lines
- **Dark Mode** - Built-in ECharts dark theme support
- **Custom Dimensions** - Manual width/height input (300-1200px × 200-900px)

### 📊 Data Management
- **Multi-Series Support** - Add unlimited data series
- **Individual Series Controls** - Custom colors, types, visibility per series
- **Data Randomization** - Generate random test data (global or per-series)
- **Real-time Editing** - JSON data input with live preview

### 🔧 Interface Features
- **Minimize/Maximize** - Collapse to header-only view
- **Export to Figma** - Direct SVG insertion into Figma canvas
- **Responsive Design** - Adapts to plugin window size
- **Black & White UI** - Clean, professional interface (except color pickers)

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

## 🎯 Usage

1. **Launch Plugin** in Figma
2. **Select Chart Type** from the 8 available options
3. **Configure Title & Legend** with positioning controls
4. **Add/Edit Data Series** with custom colors and types
5. **Adjust Appearance** with axis controls and dark mode
6. **Set Dimensions** with manual width/height inputs
7. **Export to Figma** as scalable SVG

### Pro Tips
- Use **🎲 Randomize** buttons to generate test data
- **Mixed chart type** allows different series types in one chart
- **Dark mode** provides professional chart themes
- **Minimize** feature keeps plugin header visible while working

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

### Colors
- Each series has individual color picker
- Dark mode automatically adjusts colors
- Professional color palette defaults

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
