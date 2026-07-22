const express = require("express");
const router = express.Router();

const {
    markAttendance,
    getAttendance,
    getEmployeeAttendance,
    deleteAttendance
} = require("../controllers/attendanceController");


router.post("/", markAttendance);

router.get("/", getAttendance);

router.get("/employee/:employee_id", getEmployeeAttendance);

router.delete("/:id", deleteAttendance);

module.exports = router;