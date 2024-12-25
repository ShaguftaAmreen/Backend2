const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Student = require('./models/userModel'); 

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://0.0.0.0:27017/apiWithQueriesss", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

 /**********************************************************************/
 

app.post("/addStudent", async (req, res) => {
  const { name, age, hobbies, experience } = req.body;

  try {
    const student = new Student({ name, age, hobbies, experience });
    const savedStudent = await student.save();

    res.status(201).json({
      success: true,
      message: "Added a student successfully!",
      student: savedStudent,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

/************************************************************************/

/*app.patch("/renameAgeField", async (req, res) => {
  try {
    
    const studentsWithAgeField = await Student.find({ age: { $exists: true } });

    if (studentsWithAgeField.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No documents found with the 'age' field.",
      });
    }

    
    const result = await Student.updateMany(
      { age: { $exists: true } },
      { $rename: { age: "studentAge" } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Field 'age' has been renamed to 'studentAge' in all students.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No documents were updated.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
*/


/****************************************************************************/

app.get("/studentsGreaterThan20", async (req, res) => {
  try {
    const students = await Student.find({ studentAge: { $gt: 20 } });

    if (students.length > 0) {
      res.status(200).json({
        success: true,
        message: "Students with age greater than 20 found",
        students: students,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No students found with age greater than 20.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
/***************************************************************************/

app.get("/employeeWorkedInAmazon",async(req,res)=>{
  
  try {
    const finding=await Student.find({"experience.company":"Amazon"});

    if (finding) {
      res.status(200).json({
        success: true,
        message: "Students who have worked in Amazon!",
        students: finding,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No one has worked in Amazon.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
})

/************************************************************************************/
app.get("/size", async (req, res) => {
  try {
    const finding = await Student.find({ "experience": { $size: 3 } }); 

    if (finding.length > 0) {
      res.status(200).json({
        success: true,
        message: "Students with exactly 3 experiences found!",
        students: finding,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No students found with exactly 3 experiences.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
/*********************************************************************************/
app.get("/allOperator", async (req, res) => {
  try {
    
    const finding = await Student.find({ hobbies: { $all: ["Reading"] } });

    if (finding.length > 0) {
      res.status(200).json({
        success: true,
        message: "Students who have 'reading' as a hobby found!",
        students: finding,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No students found with 'reading' as a hobby.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
/*************************************************************************************/

app.get("/elemMatch", async (req, res) => {
  try {
    
    const finding = await Student.find({
      hobbies: { $in: ["Reading"] },  
    });

    if (finding.length > 0) {
      res.status(200).json({
        success: true,
        message: "Students with 'reading' as a hobby found!",
        students: finding,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No students found with 'reading' as a hobby.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

/************************************************************************************/


app.get("/andOperator", async (req, res) => {
  try {
    
    const finding = await Student.find({
      $and: [{
        $or:[{age:{$lte:50}},{age:{$gte:40}}]},        
        { hobbies: { $in: ["Reading"] } } 
      ]
    });

    if (finding.length > 0) {
      res.status(200).json({
        success: true,
        message: "Students with 'reading' as a hobby found!",
        students: finding,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No students found with 'reading' as a hobby.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});


/*************************************************************************************/

app.get("/RegexOperator", async (req, res) => {
  try {
  const finding = await Student.find({ name: { $regex: /^S/, $options: 'i' } });

    if (finding.length > 0) {
      res.status(200).json({
        success: true,
        message: "Students with names starting with 'S' found!",
        students: finding,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No students found with names starting with 'S'.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
/******************************************************************************/

app.get("/modOperator", async (req, res) => {
  try {
    const finding = await Student.find({
      age: {
        $mod: [3, 0], 
      },
    });

    if (finding.length > 0) {
      res.status(200).json({
        success: true,
        message: "Students whose age is divisible by 3 found!",
        students: finding,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No students found with age divisible by 3.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
/***********************************************************************************/
app.get("/sort", async (req, res) => {
  try {
    
    const finding = await Student.find().sort({ studentAge: 1});

    if (finding.length > 0) {
      res.status(200).json({
        success: true,
        message: "Students sorted by age in ascending order found!",
        students: finding,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No students found.",
      });
    }
  } catch (error) {
    
    res.status(400).json({ success: false, error: error.message });
  }
});

/*************************************************************************************/

// app.get("/mul", async (req, res) => {
//   try {
    
//     const result = await Student.updateMany({}, { $mul: { studentAge: 2 } });

//     if (result.modifiedCount > 0) {
//       res.status(200).json({
//         success: true,
//         message: `${result.modifiedCount} student(s) updated with 'studentAge' multiplied by 2.`,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "No students found to update.",
//       });
//     }
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// });
/***********************************************************************************/

app.put("/min", async (req, res) => {
  try {
    const result = await Student.updateOne(
      { name: "Yaqeen Uddin" },
      { $min: { studentAge: 12 } }
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: "Yaqeen's age updated to 12 if it was greater than 12.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Yaqeen's age is already 12 or lower, no update needed.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

/*****************************************************************************************/

app.put("/mul", async (req, res) => {
  try {
    const result = await Student.findOneAndUpdate(
      { name: "Yaqeen Uddin" },
      { $mul: { age: 2 } },
      { new: true } // This will return the updated document
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: "Yaqeen's age updated to " + result.age,
        students: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Yaqeen's age was not updated.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

/**********************************************************************************/

app.get("/eleMatch", async (req, res) => {
  try {
    
    const result = await Student.findOne(
      { name: "Yaqeen Uddin" },
      { experience: { $elemMatch: { company: "Ratnam" } } }
    );

    // If the student is found and has the experience with "Ratnam"
    if (result || result.experience.length > 0) {
      res.status(200).json({
        success: true,
        message: "Yaqeen's experience with Ratnam found!",
        students: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Yaqeen's experience with Ratnam was not found.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
/******************************************************************************/
app.get("/experienceLesserThan2", async (req, res) => {
  try {
    
    const result = await Student.find(
      { experience: { $elemMatch: { duration:{$lte:1} } } }
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: "See how many students found!",
        students: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No student found!!!",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
/***************************************************************************************/
app.get("/index", async (req, res) => {
  try {
    //await Student.createIndexes({"age":1,"gender":1})(compound indexing)
    //if two persons with same age are there then it should be sorted according to gender
   //Student.find({age:{$gte:27},gender:"male"}).explain("executionStats")
    //Student.createIndex({name:1},{unique:true});
    //{unique:true} means we can not add more than two persons with same name.
   //Student.createIndexes({age:1},{partialFilterExpression:{age:{$gt:22}}})
   //text index per collection should be one 
   await Student.createIndexes({ name: 1 });
  const indexes = await Student.collection.indexes();
    console.log("Indexes:", indexes);
    const result = await Student.findOne({ name: "Muqeem Uddin" }).explain("executionStats");

    if (result) {
      res.status(200).json({
        success: true,
        message: "Using indexing for searching.",
        students: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Using indexing but it is not working.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

/************************************************************************************/

app.put("/experience-neglect", async (req, res) => {
  try {
    
    const result = await Student.updateMany(
     {experience:{$elemMatch:{duration:{$lte:1}}}},
     {$set:{"experience.$.neglect":true}}//matched first element
    );

    /*$set:{"experience.$[].neglect":true} //all elements(this syntax will update the all elements even they are not meeting the above criteria)*/
    //for all matched


    // const result = await Student.updateMany(
    //   { "experience.duration": { $lte: 1 } }, // Matches the condition directly without $elemMatch
    //   { $set: { "experience.$.neglect": true } } // Updates the matched element in the array
    // );

    if (result) {
      res.status(200).json({
        success: true,
        message: "Neglect added successfully!",
        students: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No student found to add neglect!",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

/*******************************************************************************************/

app.put("/experience-push", async (req, res) => {
  try {
    
    const result = await Student.updateOne(
    {name:"Sameen"},{$push:{experience:{company:"Meta",duration:2}}}
    );

/*   
    const result = await Student.updateOne(
    {name:"Sameen"},{$addToSet:{experience:{company:"Meta",duration:2}}}
    ); 
    //this avoid the redundency ie. if it is already added then it wont add next time.If it is not added then only it will add it

      const result = await Student.updateOne(
    {name:"Sameen"},{$pull:{experience:{company:"Meta",duration:2}}}
    );
  //this for removing the element 
    */
//db.collection.find({field:"value"}).explain()(explain is used onlly on queries)
    if (result) {
      res.status(200).json({
        success: true,
        message: "New element added successfully!",
        students: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Can't add the new element!",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
/* db.collection.createIndex({ field: "text" });
   db.collection.find({ $text: { $search: "keyword" } });
*/
/**********************************************************

app.put("/experience-push", async (req, res) => {
  try {
    // Extract data from the request body
    const { name, experience } = req.body;

    // Check if both name and experience are provided
    if (!name || !experience) {
      return res.status(400).json({
        success: false,
        message: "Name and experience data are required.",
      });
    }

    // Update the document
    const result = await Student.updateOne(
      { name },
      { $push: { experience } }
    );

    // Check if the document was updated
    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "New element added successfully!",
        result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No matching student found, or no changes made.",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


***************************************************************************/

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Student.find({},{bio:1,name:1,_id:0})
// Student.createIndexes({name:"text",bio:"text"})
// Student.find({$text:{$search:"Youtuber"}})

