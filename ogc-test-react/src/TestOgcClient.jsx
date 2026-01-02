import { useState } from 'react';
import { 
  setFetchOptions, 
  resetFetchOptions,
  enableFallbackWithoutWorker,
  WmtsEndpoint,
  clearCache,
} from '@camptocamp/ogc-client/bundled';

// Initialize worker fetch options synchronization
//initWorkerFetchOptionsSync();

function TestOgcClient() {
  const [message, setMessage] = useState('Click the button to test');

  const testExports = async () => {
    try {
      clearCache();
      //enableFallbackWithoutWorker();
      
      const sampleOptions = {
        headers: {
          Authorization: 'Bearer test-token-123'
        }
      };
    
      //setFetchOptions(sampleOptions);
      
      console.log('Testing WMTS capabilities parsing with bundled variant...');
      
      const endpoint = new WmtsEndpoint('https://mrdata.usgs.gov/mapcache/wmts/');
      await endpoint.isReady();
      console.log('✅ WMTS Endpoint loaded successfully!', endpoint);
      
      setMessage(`✅ Success! Found ${endpoint.getLayers().length} WMTS layers`);
    } catch (error) {
      console.error('❌ Error:', error);
      setMessage(`❌ ERROR: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔍 OGC Client Export Test</h1>
      
      <button 
        onClick={testExports} 
        style={{ 
          padding: '15px 30px', 
          fontSize: '18px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold'
        }}
      >
        Test Package Exports
      </button>
      
      <pre style={{ 
        marginTop: '20px', 
        padding: '20px', 
        background: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        fontSize: '14px',
        lineHeight: '1.6'
      }}>
        {message}
      </pre>
      
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        background: '#fff3cd', 
        border: '2px solid #ffc107', 
        borderRadius: '5px' 
      }}>
        <h2>🐛 Debugging Instructions</h2>
        <ol style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li>Open Browser DevTools (F12)</li>
          <li>Go to the <strong>Sources</strong> tab</li>
          <li>Search for <code>setFetchOptionsUpdateCallback</code></li>
          <li>You'll find it ONLY in the source files under <code>node_modules</code>, not in the bundled code</li>
          <li>Try setting a breakpoint - it won't work in your client code!</li>
          <li>The function is tree-shaken out because it's not exported</li>
        </ol>
        
        <h3>📝 Root Cause</h3>
        <p>
          In <code>src/index.ts</code>, only these functions are exported from <code>http-utils.ts</code>:
        </p>
        <pre style={{ background: '#fff', padding: '10px', borderRadius: '3px' }}>
{`export {
  sharedFetch,
  setFetchOptions,
  resetFetchOptions,
  // setFetchOptionsUpdateCallback is MISSING!
} from './shared/http-utils.js';`}
        </pre>
      </div>
    </div>
  );
}

export default TestOgcClient;
