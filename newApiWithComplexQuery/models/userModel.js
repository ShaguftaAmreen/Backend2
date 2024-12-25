const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  age: { type: Number, required: true },  
  hobbies: { type: [String], required: true },
  experience: [
    {
      company: { type: String, required: true }, 
      duration: { type: Number, required: true }, 
    },
  ],
  
});

module.exports = mongoose.model('Student', studentSchema);
