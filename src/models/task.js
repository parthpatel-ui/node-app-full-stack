const mongoose = require('mongoose');

// Define the schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'], // Custom error message
    trim: true, // Removes leading/trailing whitespace
  },
  image: {
    type: String,
    default: '', // Optional field defaults to an empty string
  },
  description: {
    type: String,
    default: '', // Optional field defaults to an empty string
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'], // Allowed values
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default to the current timestamp
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Default to the current timestamp
  },
});

// Middleware to auto-update `updatedAt` on save
todoSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware to auto-update `updatedAt` on update
todoSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Create and export the model
const Todo = mongoose.model('todos', todoSchema);
module.exports = Todo;
