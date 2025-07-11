const express = require('express');
const verifyToken = require('./middlewares/authMiddleware'); // Tambahan

const app = express();
app.use(express.json());

// Protected route
app.get('/products', verifyToken, (req, res) => {
  res.json([
    { id: 1, name: 'Sample Product' },
    { id: 2, name: 'Another Product', user: req.user.sub }
  ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
