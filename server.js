const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const {connectMongoDB} = require('./database/mongodb');
const { addDateTimeStampForAllInvoices, mapPayuFields } = require('./src/controllers/test.controller');
const { calculateFormulaController } = require('./src/controllers/formulaController');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// app.get("/test", addDateTimeStampForAllInvoices);
// app.get("/testa", mapPayuFields);
app.get("/testa", calculateFormulaController);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.message 
  });
});

app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`Server running on port ${PORT}`);
});