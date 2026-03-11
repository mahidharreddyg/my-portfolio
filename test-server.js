const http = require('http');

http.get('http://localhost:3001', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Just verifying server is alive
    console.log("Server responded with HTTP " + res.statusCode);
  });
}).on('error', err => {
  console.log("Error: " + err.message);
});
