const db = require("../config/db");


// Mark Attendance
exports.markAttendance = (req,res)=>{

    const {
        employee_id,
        attendance_date,
        check_in,
        check_out,
        status
    } = req.body;


    const checkSql = `
    SELECT *
    FROM attendance
    WHERE employee_id=?
    AND DATE(attendance_date)=?
    `;


    db.query(
        checkSql,
        [employee_id, attendance_date],
        (err,result)=>{


            if(err){
                return res.status(500).json(err);
            }


            if(result.length > 0){

                return res.status(400).json({
                    message:"Attendance already marked for this employee"
                });

            }



            const sql=`
            INSERT INTO attendance
            (employee_id,attendance_date,check_in,check_out,status)
            VALUES(?,?,?,?,?)
            `;



            db.query(
                sql,
                [
                    employee_id,
                    attendance_date,
                    check_in,
                    check_out,
                    status
                ],
                (err)=>{


                    if(err){
                        return res.status(500).json(err);
                    }


                    res.json({
                        message:"Attendance Marked Successfully"
                    });


                }
            );


        }
    );

};




// Get Attendance (with optional date filter)

exports.getAttendance=(req,res)=>{


    const {date}=req.query;


    let sql=`

    SELECT

    attendance.id,

    employees.employee_id,

    employees.name,

    attendance.attendance_date,

    attendance.check_in,

    attendance.check_out,

    attendance.status


    FROM attendance


    INNER JOIN employees

    ON attendance.employee_id = employees.id

    `;


    let values=[];


    if(date){

        sql += `
        WHERE DATE(attendance.attendance_date)=?
        `;

        values.push(date);

    }



    sql += `
    ORDER BY attendance.attendance_date DESC
    `;



    db.query(
        sql,
        values,
        (err,result)=>{


            if(err){
                return res.status(500).json(err);
            }


            res.json(result);


        }
    );


};





// Employee history

exports.getEmployeeAttendance=(req,res)=>{


    const {employee_id}=req.params;


    const sql=`

    SELECT

    attendance.*,
    employees.employee_id,
    employees.name

    FROM attendance


    JOIN employees

    ON attendance.employee_id=employees.id


    WHERE employees.id=?

    `;


    db.query(
        sql,
        [employee_id],
        (err,result)=>{


            if(err){
                return res.status(500).json(err);
            }


            res.json(result);


        }
    );

};





// Delete attendance

exports.deleteAttendance=(req,res)=>{


    const {id}=req.params;


    const sql=
    "DELETE FROM attendance WHERE id=?";


    db.query(
        sql,
        [id],
        (err)=>{


            if(err){
                return res.status(500).json(err);
            }


            res.json({
                message:"Attendance Deleted"
            });


        }
    );

};