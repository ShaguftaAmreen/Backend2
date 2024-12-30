const Student = require("../models/studentModel"); 

exports.addStudent = async (req, res) => {
  const { name, age, email, phoneNumber, address, hobbies, skills, experience, bio } = req.body;

  try {
    
    if (!name || !age || !email || !phoneNumber || !address || !hobbies || !experience){
      return res
        .status(400)
        .json({ success: false, message: "All required fields must be provided" });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(401)
        .json({ success: false, message: "Student with this email already exists!" });
    }

    const newStudent = new Student({
      name,
      age,
      email,
      phoneNumber,
      address,
      hobbies,
      skills,
      experience,
      bio, 
    });

    
    const result = await newStudent.save();

    res.status(201).json({
      success: true,
      message: "Student record has been added successfully!",
      result,
    });
  } catch (error) {
    next(error); 
}
};

/*****************************************************************************/

exports.getOneStudent = async (req, res, next) => {
  try {
      const { city, age } = req.body;

      if (!city || !age) {
          return res.status(400).json({
              success: false,
              message: "City and age are required to fetch the student.",
          });
      }

     // nonExistentFunction();

      const student = await Student.findOne({
          $and: [{ "address.city": city }, { age: age }],
      });

      if (student) {
          res.status(200).json({
              success: true,
              message: `Student found in ${city} with age ${age} and name ${student.name}.`,
              student,
          });
      } else {
          res.status(404).json({
              success: false,
              message: `No student found in ${city} with age ${age}.`,
          });
      }
  } catch (error) {
      next(error); 
  }
};

/***********************************************************************************/
  
  exports.searchStudents = async (req, res) => {
    try {
      const { searchQuery } = req.body;
  
      if (!searchQuery) {
        return res.status(400).json({
          success: false,
          message: "Search query is required",
        });
      }
  
      let students;

    
    students = await Student.find({
      bio: { $regex: searchQuery, $options: "i" }, 
    }).sort({ name: 1 }); 

    if (students.length === 0) {
      students = await Student.aggregate([
        { $unwind: "$hobbies"?"$hobbies":"$skills"}, 
        { $match:{$or:[{ hobbies: { $regex: searchQuery, $options: "i" } },
                         { skills: { $regex: searchQuery, $options: "i" } }]}} , 
        { $sort: { name: 1 } }, 
      ]);
    }



    // if (students.length === 0) {
    //   students = await Student.aggregate([
    //     { $unwind: "$skills" }, 
    //     { $match: { skills: { $regex: searchQuery, $options: "i" } } }, 
    //     { $sort: { name: 1 } }, 
    //   ]);
    // }


      if (students.length > 0 ) {
        // if(students.length===1){
        res.status(200).json({
          success: true,
          message: students.length===1 ? "Student found!" : "Students found!" ,
          students,
        });
      //  }
        // else{
        //     res.status(200).json({
        //         success: true,
        //         message: "Students found.",
        //         students,
        //       }); 
        // }
      } 
      else {
        res.status(404).json({
          success: false,
          message: "No student found matching the search query",
        });
      }
    } catch (error) {
      next(error); 
  }
  };
  

// exports.searchStudents = async (req, res) => {
//   try {
//     const { searchQuery } = req.body; 
//      //console.log("ssssss",searchQuery)
//     let newSearch=`${searchQuery}`
//     //let newSearch=`${searchQuery} -Shariya -Rahman`

//     if (!searchQuery) {
//       return res.status(400).json({
//         success: false,
//         message: "Search query is required",
//       });
//     }

    // const students = await Student.find({
    //   $text: { $search: newSearch },
    // //  $text: { $search: searchQuery -actor },
    // }).sort({ name: 1 });

//     // const students= await Student.aggregate([
//     //     {
//     //       $unwind: "$skills"
//     //     },
//     //     {
//     //       $search: {
//     //         index: 'default',
//     //         text: {
//     //           query: 'Python',
//     //           path: '$skills'
//     //         }
//     //       }
//     //     }
//     //   ])

//     if (students.length > 0) {
//       res.status(200).json({
//         success: true,
//         message: "Students found",
//         students,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "No students found matching the search query",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

/*****************************************************************************/

exports.setAge = async (req, res) => {
    try {
    const students=await Student.updateMany({$min:{age:20}})
   if (students) {
        res.status(200).json({
          success: true,
          message: "Set the age.",
          students,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No student found to set the age.",
        });
      }
    } catch (error) {
      next(error); 
  }
  };

  /*********************************************************/
  
//   Student.aggregate([{$group:{_id:"$age",names:{$push:"$name"}}}]);
  
// Student.aggregate([{$group:{_id:"$age",completeDocs:{$push:"$$ROOT"}}}])

//Student.aggregate([{$match:{gender:"male"}},{$group:{_id:"$age",countStudentInThisAgeGroup:{$sum:1}}},{$sort:{countStudentInThisAgeGroup:-1}}])

// Student.aggregate([{$group:{_id:"$age",completeDocs:{$push:"$$ROOT"}}}])
// db.products.aggregate([
//     { $match: { name: { $regex: "laptop", $options: "i" } } },
    
//     { $match: { price: { $gte: 500, $lte: 1500 } } },

//     { $match: { brand: { $in: ["Dell", "HP"] } } },
    
//     { $match: { rating: { $gte: 4 } } },

//     { $sort: { price: 1 } },
    
//     { $skip: 0 },

//     { $limit: 10 }
//   ]);

// 

//employee.find({$text:{$search:"North"}})
