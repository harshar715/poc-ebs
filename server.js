/**
 * Sample EBS Application - 5 GET REST Endpoints
 * This simulates an EBS monolith application
 */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  // test
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Endpoint 1: Get Users
app.get('/v1/users', (req, res) => {
  // test
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  // Simulate some processing time
  setTimeout(() => {
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  }, Math.random() * 100);
});

// Endpoint 2: Get User by ID
app.get('/v1/users/:id', (req, res) => {
  // test
  const userId = parseInt(req.params.id);
  
  // Simulate database lookup
  setTimeout(() => {
    if (userId > 0 && userId <= 10) {
      res.json({
        success: true,
        data: {
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`,
          createdAt: new Date().toISOString()
        }
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
  }, Math.random() * 150);
});

// Endpoint 3: Get Products
app.get('/v1/products', (req, res) => {
  // test
  const products = [
    { id: 1, name: 'Product A', price: 29.99, category: 'Electronics' },
    { id: 2, name: 'Product B', price: 49.99, category: 'Clothing' },
    { id: 3, name: 'Product C', price: 19.99, category: 'Books' }
  ];
  
  setTimeout(() => {
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  }, Math.random() * 120);
});

// Endpoint 4: Get Orders
app.get('/v1/orders', (req, res) => {
  // test
  const { status, limit = 10 } = req.query;
  
  const orders = [
    { id: 1, userId: 1, total: 99.99, status: 'completed', createdAt: new Date().toISOString() },
    { id: 2, userId: 2, total: 149.99, status: 'pending', createdAt: new Date().toISOString() },
    { id: 3, userId: 1, total: 79.99, status: 'completed', createdAt: new Date().toISOString() }
  ];
  
  let filteredOrders = orders;
  if (status) {
    filteredOrders = orders.filter(o => o.status === status);
  }
  
  setTimeout(() => {
    res.json({
      success: true,
      data: filteredOrders.slice(0, parseInt(limit)),
      count: filteredOrders.length
    });
  }, Math.random() * 200);
});

// Endpoint 5: Get Statistics
app.get('/v1/stats', (req, res) => {
  const stats = {
    totalUsers: 150,
    totalOrders: 1250,
    totalRevenue: 125000.50,
    activeUsers: 45,
    lastUpdated: new Date().toISOString()
  };
  
  setTimeout(() => {
    res.json({
      success: true,
      data: stats
    });
  }, Math.random() * 180);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`EBS Sample App running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Available endpoints:`);
  console.log(`  GET /v1/users`);
  console.log(`  GET /v1/users/:id`);
  console.log(`  GET /v1/products`);
  console.log(`  GET /v1/orders`);
  console.log(`  GET /v1/stats`);
});

module.exports = app;

