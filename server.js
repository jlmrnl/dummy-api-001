const express = require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const { connectToMongoDB } = require('./src/config/mongodb');
const userRoutes = require('./src/routes/userRoutes');
const CRUDRoutes = require('./src/routes/CRUDRoutes')

const app = express();

require("dotenv").config();

app.use(cors());
app.use(bodyparser.json());

app.use('/api/auth', userRoutes);
app.use('/api/crud', CRUDRoutes);

connectToMongoDB()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
