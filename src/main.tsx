import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('🚀 Main.tsx loaded');
console.log('🌐 Document ready state:', document.readyState);
console.log('📍 Current location:', window.location.href);

function initApp() {
  console.log('🎯 initApp called');
  
  const rootElement = document.getElementById('root');
  console.log('🔍 Root element:', rootElement);
  
  if (!rootElement) {
    console.error('❌ Root element not found');
    return;
  }

  console.log('⚛️ Creating React root...');
  try {
    const root = ReactDOM.createRoot(rootElement);
    console.log('✅ React root created');
    
    console.log('🎨 Rendering App...');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    console.log('✅ App rendered');
  } catch (error) {
    console.error('❌ Error during React initialization:', error);
  }
}

// Ensure DOM is ready before initializing
console.log('🔄 Setting up initialization...');
if (document.readyState === 'loading') {
  console.log('⏳ Document still loading, waiting for DOMContentLoaded');
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  console.log('✅ Document ready, initializing immediately');
  initApp();
}