const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  hobbies: { type: [String], required: true },
  skills: { type: [String] },
  experience: [
    {
      company: { type: String, required: true },
      duration: { type: Number, required: true },
    },
  ],
  bio: { type: String },
});

//studentSchema.index({ age: 1 });

studentSchema.index({ bio: "text", hobbies:"text",skills: "text" });

module.exports = mongoose.model("Student", studentSchema);

// {
//     "name": "Michael Brown",
//     "age": 25,
//     "email": "michael.brown@example.com",
//     "phoneNumber": "1234567890",
//     "address": {
//       "street": "789 Pine Avenue",
//       "city": "Seattle",
//       "state": "Washington"
//     },
//     "hobbies": ["Hiking", "Reading", "Cooking"],
//     "skills": ["JavaScript", "React", "Node.js"],
//     "experience": [
//       {
//         "company": "Tech Innovators Inc.",
//         "duration": 18
//       },
//       {
//         "company": "Cloud Solutions Ltd.",
//         "duration": 12
//       }
//     ]
//   }
