import { useState } from 'react';

// Simple fallback component to test if React is working
function SimpleApp() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'system-ui',
      background: 'white',
      minHeight: '100vh'
    }}>
      <h1>🎯 React App Test</h1>
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ padding: '8px 16px', margin: '8px' }}
      >
        Increment
      </button>
      <button 
        onClick={() => loadEnhancedApp()}
        style={{ padding: '8px 16px', margin: '8px', background: '#000', color: 'white' }}
      >
        Load Enhanced App
      </button>
    </div>
  );
}

let EnhancedChartBuilder: any = null;

async function loadEnhancedApp() {
  try {
    console.log('🚀 Loading enhanced app...');
    const module = await import('./components/enhanced/EnhancedChartBuilder');
    EnhancedChartBuilder = module.default;
    console.log('✅ Enhanced app loaded');
    // Force re-render by updating state
    window.location.reload();
  } catch (error) {
    console.error('❌ Error loading enhanced app:', error);
    alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function App() {
  console.log('🎪 App loading, enhanced available:', !!EnhancedChartBuilder);
  
  try {
    if (EnhancedChartBuilder) {
      return <EnhancedChartBuilder />
    } else {
      return <SimpleApp />
    }
  } catch (error) {
    console.error('❌ Error in App component:', error);
    return <div style={{ padding: '20px', color: 'red', background: 'white' }}>
      Error loading app: {error instanceof Error ? error.message : 'Unknown error'}
    </div>
  }
}

export default App