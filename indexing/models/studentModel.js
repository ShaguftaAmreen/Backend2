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

studentSchema.index({ bio: "text", hobbies: "text", skills: "text" });

module.exports = mongoose.model("Student", studentSchema);

// You can assign weights to fields to give more importance to one field over another during searches.
// studentSchema.index(
//   { bio: "text", hobbies: "text", skills: "text" },
//   { weights: { bio: 10, hobbies: 5, skills: 1 } }
// );
// In this case, matches in the bio field will be given the highest priority.

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


// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   bestFriend: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }, // Refers to another User document
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

