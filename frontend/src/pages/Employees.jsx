import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";


function Employees(){

const [employees,setEmployees]=useState([]);


const [employee,setEmployee]=useState({

employee_id:"",   
name:"",
email:"",
mobile:"",
department:"",
designation:"",
status:"Active"

});


const [editId,setEditId]=useState(null);



useEffect(()=>{

getEmployees();

},[]);



const getEmployees=async()=>{

try{

const response=await API.get("/employees");

setEmployees(response.data);

}
catch(error){

console.log(error);

}

};





const saveEmployee=async()=>{


try{


if(editId){


await API.put(
`/employees/${editId}`,
employee
);


alert("Employee Updated");


}
else{


await API.post(
"/employees",
employee
);


alert("Employee Added");


}



setEmployee({


employee_id:"",    
name:"",
email:"",
mobile:"",
department:"",
designation:"",
status:"Active"

});


setEditId(null);


getEmployees();


}
catch(error){

console.log(error);

}

};





const editEmployee=(emp)=>{


setEditId(emp.id);


setEmployee({


employee_id:emp.employee_id,    
name:emp.name,
email:emp.email,
mobile:emp.mobile,
department:emp.department,
designation:emp.designation,
status:emp.status

});


};





const deleteEmployee=async(id)=>{


const confirmDelete=window.confirm(
"Delete this employee?"
);


if(!confirmDelete)
return;



try{


await API.delete(
`/employees/${id}`
);


alert("Employee Deleted");


getEmployees();


}
catch(error){

console.log(error);

}

};




return(

<>

<Navbar/>


<div className="page">


<h1>
Employees
</h1>



<div className="form-container">


<input
placeholder="Employee ID"
value={employee.employee_id}
onChange={(e)=>
setEmployee({
...employee,
employee_id:e.target.value
})
}
/>

<input
placeholder="Name"
value={employee.name}
onChange={(e)=>
setEmployee({
...employee,
name:e.target.value
})
}
/>



<input
placeholder="Email"
value={employee.email}
onChange={(e)=>
setEmployee({
...employee,
email:e.target.value
})
}
/>



<input
placeholder="Mobile"
value={employee.mobile}
onChange={(e)=>
setEmployee({
...employee,
mobile:e.target.value
})
}
/>




<input
placeholder="Department"
value={employee.department}
onChange={(e)=>
setEmployee({
...employee,
department:e.target.value
})
}
/>




<input
placeholder="Designation"
value={employee.designation}
onChange={(e)=>
setEmployee({
...employee,
designation:e.target.value
})
}
/>




<button onClick={saveEmployee}>

{
editId ?
"Update Employee"
:
"Add Employee"
}

</button>


</div>





<table>


<thead>

<tr>

<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Department</th>
<th>Designation</th>
<th>Status</th>
<th>Action</th>


</tr>

</thead>




<tbody>


{
employees.map((emp)=>(


<tr key={emp.id}>


<td>
{emp.employee_id}
</td>


<td>
{emp.name}
</td>


<td>
{emp.email}
</td>


<td>
{emp.department}
</td>


<td>
{emp.designation}
</td>


<td>
{emp.status}
</td>


<td>


<button
onClick={()=>editEmployee(emp)}
>
Edit
</button>



<button
onClick={()=>deleteEmployee(emp.id)}
>
Delete
</button>


</td>



</tr>



))
}



</tbody>


</table>



</div>


</>

);


}


export default Employees;