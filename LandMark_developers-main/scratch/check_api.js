const fetch = require('node-fetch'); // wait, let's use dynamic import or standard fetch since newer Node.js has fetch built-in, or just use standard http/https module to be safe.
const https = require('https');

const url = 'https://wildfire-ample-justifier.ngrok-free.dev/api/townshipDetails?id=9';

https.get(url, {
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Accept': 'application/json'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('SUCCESS:', json.success);
      if (json.data) {
        console.log('Top level data keys:', Object.keys(json.data));
        console.log('nearby_places type:', typeof json.data.nearby_places, Array.isArray(json.data.nearby_places) ? 'array len: ' + json.data.nearby_places.length : 'not array');
        if (json.data.nearby_places && json.data.nearby_places.length > 0) {
          console.log('Sample nearby place:', JSON.stringify(json.data.nearby_places[0], null, 2));
        }
        
        console.log('Properties length:', json.data.properties ? json.data.properties.length : 0);
        if (json.data.properties && json.data.properties.length > 0) {
          const firstProp = json.data.properties[0];
          console.log('First property keys:', Object.keys(firstProp));
          console.log('First property places:', firstProp.places);
        }
      } else {
        console.log('No data object in response:', json);
      }
    } catch (e) {
      console.error('Failed to parse JSON:', e.message);
      console.log('Raw output snippet:', data.substring(0, 500));
    }
  });
}).on('error', (err) => {
  console.error('HTTPS request error:', err.message);
});
