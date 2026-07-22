const db = require("../config/db");


// Add Employee
exports.addEmployee = (req, res) => {

    const {
        employee_id,
        name,
        email,
        mobile,
        department,
        designation,
        status
    } = req.body;


    

    const sql = `
        INSERT INTO employees
        (employee_id, name, email, mobile, department, designation, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;


    db.query(
        sql,
        [
            employee_id,
            name,
            email,
            mobile,
            department,
            designation,
            status
        ],
        (err, result) => {

            if(err){
                return res.status(500).json({
                    message:"Database error",
                    error:err
                });
            }


            res.status(201).json({
                message:"Employee Added Successfully"
            });

        }
    );

};

// Get All Employees
exports.getEmployees = (req, res) => {

    const sql = "SELECT * FROM employees";

    db.query(sql, (err, result) => {

        if(err){
            return res.status(500).json({
                message:"Database error",
                error:err
            });
        }


        res.status(200).json(result);

    });

};

// Update Employee
exports.updateEmployee = (req, res) => {

    const { id } = req.params;

  const {
 name,
 email,
 mobile,
 department,
 designation,
 status
}=req.body;


    const sql = `
        UPDATE employees
        SET name=?,
            email=?,
            mobile=?,
            department=?,
            designation=?,
            status=?
        WHERE id=?
    `;


    db.query(
        sql,
        [
            name,
            email,
            mobile,
            department,
            designation,
            status,
            id
        ],
        (err, result)=>{

            if(err){
                return res.status(500).json({
                    message:"Database error",
                    error:err
                });
            }


            res.json({
                message:"Employee Updated Successfully"
            });

        }
    );

};

// Delete Employee
exports.deleteEmployee = (req,res)=>{

const {id}=req.params;


// first delete attendance

const deleteAttendance = `
DELETE FROM attendance
WHERE employee_id=?
`;


db.query(
deleteAttendance,
[id],
(err)=>{


if(err){
return res.status(500).json(err);
}



// then delete employee

const deleteEmployee = `
DELETE FROM employees
WHERE id=?
`;


db.query(
deleteEmployee,
[id],
(err)=>{


if(err){
return res.status(500).json(err);
}


res.json({
message:"Employee Deleted Successfully"
});


});


});


};