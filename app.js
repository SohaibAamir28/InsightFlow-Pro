const express = require('express');
const mongoose = require('mongoose');
const pgp = require('pg-promise')();
const { Client } = require('@elastic/elasticsearch');
const redis = require('redis');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// PostgreSQL connection
const db = pgp(process.env.POSTGRES_URI);

// Elasticsearch connection
const esClient = new Client({ node: process.env.ELASTICSEARCH_URI });

// Redis connection
const redisClient = redis.createClient({
    url: process.env.REDIS_URI
});
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

// Routes
app.use('/documents', require('./routes/document'));
app.use('/users', require('./routes/user'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
