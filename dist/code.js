// ECharts Figma Plugin - Backend Code
// This file runs in the Figma plugin sandbox and handles communication with the UI

// Show the plugin UI
figma.showUI(__html__, { 
  width: 1200, 
  height: 800,
  themeColors: true 
});

// Handle messages from the UI
figma.ui.onmessage = async (msg) => {
  try {
    switch (msg.type) {
      case 'insert-chart':
        await insertChart(msg);
        break;
      
      case 'export-svg':
        await exportSVG(msg);
        break;
        
      case 'export-png':
        await exportPNG(msg);
        break;
        
      case 'copy-svg':
        // SVG copying will be handled in the UI
        figma.notify('SVG copied to clipboard!');
        break;
      
      case 'cancel':
        figma.closePlugin();
        break;
        
      default:
        console.warn('Unknown message type:', msg.type);
    }
  } catch (error) {
    figma.notify('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    console.error('Plugin error:', error);
  }
};

async function insertChart(msg) {
  if (!msg.svgData || !msg.width || !msg.height) {
    figma.notify('Invalid chart data');
    return;
  }

  try {
    // Create a new frame to contain the chart
    const frame = figma.createFrame();
    frame.name = `${msg.chartType || 'Chart'} - ${new Date().toLocaleString()}`;
    frame.resize(msg.width, msg.height);
    
    // Set frame background to white
    frame.fills = [{
      type: 'SOLID',
      color: { r: 1, g: 1, b: 1 }
    }];
    
    // Position the frame at the center of the viewport
    const viewport = figma.viewport.center;
    frame.x = viewport.x - msg.width / 2;
    frame.y = viewport.y - msg.height / 2;

    // Create SVG node from the chart data
    const svgNode = figma.createNodeFromSvg(msg.svgData);
    
    // Resize the SVG to match the specified dimensions
    svgNode.resize(msg.width, msg.height);
    
    // Add the SVG to the frame
    frame.appendChild(svgNode);
    
    // Add the frame to the current page
    figma.currentPage.appendChild(frame);
    
    // Select the new frame and focus on it
    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);
    
    // Send success message back to UI
    figma.ui.postMessage({ 
      type: 'chart-inserted',
      message: 'Chart inserted successfully!' 
    });
    
    figma.notify(`${msg.chartType || 'Chart'} inserted successfully!`);
    
  } catch (error) {
    console.error('Error inserting chart:', error);
    figma.notify('Failed to insert chart. Please try again.');
    throw error;
  }
}

async function exportSVG(msg) {
  // For now, just notify that SVG export is handled in the UI
  figma.notify('SVG export ready - use the Copy SVG button');
}

async function exportPNG(msg) {
  // PNG export would require additional implementation
  figma.notify('PNG export coming soon!');
}

// Cleanup when plugin closes
figma.on('close', () => {
  // Perform any necessary cleanup
});