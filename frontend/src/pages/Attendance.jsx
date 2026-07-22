import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Attendance() {

    const [employees, setEmployees] = useState([]);
    const [history, setHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    const [attendance, setAttendance] = useState({
        employee_id: "",
        attendance_date: "",
        check_in: "",
        check_out: "",
        status: "Present"
    });

    useEffect(() => {

        getEmployees();
        getAttendance();

    }, []);

    const getEmployees = async () => {

        try {

            const response = await API.get("/employees");
            setEmployees(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const getAttendance = async () => {

    try {

        let url="/attendance";

        if(selectedDate){
            url=`/attendance?date=${selectedDate}`;
        }


        const response = await API.get(url);

        setHistory(response.data);


    }
    catch(error){

        console.log(error);

    }

};

    const markAttendance = async () => {

        try {

            await API.post("/attendance", attendance);

            alert("Attendance Marked");

            getAttendance();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>

            <Navbar />

            <div className="page">

                <h1>Attendance</h1>

                <div className="form-container">


<div className="input-group">

<label>Select Employee</label>

<select
className="attendance-input"
value={attendance.employee_id}
onChange={(e)=>
setAttendance({
...attendance,
employee_id:e.target.value
})
}
>

<option value="">
Select Employee
</option>


{
employees.map((emp)=>(

<option 
key={emp.id}
value={emp.id}
>

{emp.employee_id} - {emp.name}

</option>

))
}


</select>

</div>




<div className="input-group">

<label>Attendance Date</label>

<input

className="attendance-input"

type="date"

value={attendance.attendance_date}

onChange={(e)=>
setAttendance({
...attendance,
attendance_date:e.target.value
})
}

/>

</div>




<div className="input-group">

<label>Check In</label>

<input

className="attendance-input"

type="time"

value={attendance.check_in}

onChange={(e)=>
setAttendance({
...attendance,
check_in:e.target.value
})
}

/>

</div>





<div className="input-group">

<label>Check Out</label>

<input

className="attendance-input"

type="time"

value={attendance.check_out}

onChange={(e)=>
setAttendance({
...attendance,
check_out:e.target.value
})
}

/>

</div>




<button className="mark-btn" onClick={markAttendance}>
    Mark Attendance
</button>


</div>

               <div className="filter-box">

<h3>View Attendance By Date</h3>

<input
type="date"
value={selectedDate}
onChange={async(e)=>{

const date = e.target.value;

setSelectedDate(date);


const response = await API.get(
`/attendance?date=${date}`
);


setHistory(response.data);


}}
/>

</div>

                <h2>Attendance History</h2>

                <table>

                    <thead>

                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {history.map((att) => (

                            <tr key={att.id}>

                             <td>{att.employee_id}</td>
<td>{att.name}</td>
                              <td>
{
    new Date(att.attendance_date).toLocaleDateString()
}
</td>
                                <td>{att.check_in}</td>
                                <td>{att.check_out}</td>
                                <td>{att.status}</td>
                                <td>

<button
onClick={async()=>{

await API.delete(`/attendance/${att.id}`);

alert("Attendance Deleted");

getAttendance();

}}
>
Delete
</button>


</td>
                                
                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default Attendance;