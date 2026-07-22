import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [data, setData] = useState({});

    useEffect(() => {
        getDashboard();
    }, []);

    const getDashboard = async () => {
        try {
            const response = await API.get("/dashboard");
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="page">

                <h1 className="dashboard-title">
Admin Dashboard
</h1>

             <div className="dashboard-container">
<div className="cards">

<div className="card">
    <h3>Total Employees</h3>
    <h1>{data.totalEmployees || 0}</h1>
</div>




<div className="card">
    <h3>Present Today</h3>
    <h1>{data.presentToday || 0}</h1>
</div>


<div className="card">
    <h3>Absent Today</h3>
    <h1>{data.absentToday || 0}</h1>
</div>
</div>

</div>

            </div>
        </>
    );
}

export default Dashboard;

