const db = require("../config/db");


exports.getDashboardStats = (req,res)=>{


    const totalEmployees = `
    SELECT COUNT(*) AS totalEmployees
    FROM employees
    `;



    const presentToday = `
    SELECT COUNT(*) AS presentToday
    FROM attendance
    WHERE DATE(attendance_date)=CURDATE()
    AND status='Present'
    `;



    const absentToday = `

    SELECT COUNT(*) AS absentToday

    FROM employees e

    WHERE e.id NOT IN (

        SELECT employee_id

        FROM attendance

        WHERE DATE(attendance_date)=CURDATE()

    )

    `;

const totalAttendance = `
SELECT COUNT(*) AS totalAttendance
FROM attendance
`;

    const todayAttendance = `

    SELECT

    employees.employee_id,
    employees.name,
    attendance.status,
    attendance.check_in,
    attendance.check_out

    FROM employees

    LEFT JOIN attendance

    ON employees.id = attendance.employee_id

    AND DATE(attendance.attendance_date)=CURDATE()

    `;




    db.query(totalEmployees,(err,totalResult)=>{


        if(err)
        return res.status(500).json(err);



        db.query(presentToday,(err,presentResult)=>{


            if(err)
            return res.status(500).json(err);



            db.query(absentToday,(err,absentResult)=>{


                if(err)
                return res.status(500).json(err);



                db.query(totalAttendance,(err,totalAttendanceResult)=>{

    if(err)
    return res.status(500).json(err);



    db.query(todayAttendance,(err,todayResult)=>{


        if(err)
        return res.status(500).json(err);



        res.json({

            totalEmployees:
            totalResult[0].totalEmployees,


            totalAttendance:
            totalAttendanceResult[0].totalAttendance,


            presentToday:
            presentResult[0].presentToday,


            absentToday:
            absentResult[0].absentToday,


            todayAttendance:
            todayResult

        });


    });


});


            });



        });



    });



};