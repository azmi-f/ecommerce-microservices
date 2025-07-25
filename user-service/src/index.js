require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
