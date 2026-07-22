import { Link } from "react-router-dom";
import "./navbar.css";


function Navbar(){

return(

<div className="sidebar">

<h2>AMS</h2>

<p>Attendance System</p>


<Link to="/dashboard">
Dashboard
</Link>


<Link to="/employees">
Employees
</Link>


<Link to="/attendance">
Attendance
</Link>


</div>

);

}


export default Navbar;