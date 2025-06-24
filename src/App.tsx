import { MainLayout } from '@/components/layout/MainLayout'

function App() {
  console.log('🎪 App component rendering');
  
  try {
    console.log('🏗️ Creating MainLayout...');
    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        background: 'white',
        border: '2px solid red',
        padding: '10px',
        boxSizing: 'border-box'
      }}>
        <div style={{ color: 'black', fontSize: '16px', marginBottom: '10px' }}>
          🎯 App is loading...
        </div>
        <MainLayout />
      </div>
    )
  } catch (error) {
    console.error('❌ Error in App component:', error);
    return <div style={{ padding: '20px', color: 'red', background: 'white' }}>
      Error loading app: {error instanceof Error ? error.message : 'Unknown error'}
    </div>
  }
}

export default App