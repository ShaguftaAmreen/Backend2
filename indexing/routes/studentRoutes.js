const express = require("express");
const router = express.Router();

const { addStudent,getOneStudent,searchStudents,setAge } = require("../controller/routeController");

router.post("/addStudent", addStudent);
router.get("/getOneStudentQuery",getOneStudent);
router.post("/searchStudents",searchStudents);
router.put("/setAge",setAge);


module.exports = router;
