const mongoose = require('mongoose');

// Define the schema for the weight model
let weightSchema = mongoose.Schema({
    week: Number, 
    weight: Number, 
    GoalReached: String, 
    date: Date
}, {
    collection: 'weight' // Use 'collection' to specify the MongoDB collection name
});

// Create and export the weight model
module.exports = mongoose.model('weight', weightSchema);