const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3003 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // Kirim pesan awal
  ws.send(JSON.stringify({ message: 'Terhubung ke Notification Service 🚀' }));

  // 🌐 Inter-service call ke user-service
axios.get('http://user-service:3001/users')
  .then(res => {
    console.log('User service response:', res.data);
  })
  .catch(err => {
    console.error('Error accessing user-service:', err.message);
  });
  
  // Simulasi notifikasi tiap 10 detik
  const interval = setInterval(() => {
    ws.send(JSON.stringify({ message: '🔔 Notifikasi baru: Pesanan Anda sedang dikemas!' }));
  }, 10000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

console.log('🔔 Notification WebSocket server running on ws://localhost:3003');
