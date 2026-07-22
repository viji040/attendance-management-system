import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            await API.post("/login", {
                username,
                password
            });

            navigate("/dashboard");

        }
        catch {

            alert("Login Failed");

        }

    };

    return (

        // <div className="login-page">
        <div style={{
    width:"100vw",
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
   background:"linear-gradient(135deg,#2563eb,#0f172a)"
}}>

            <div className="login-card">

                <h1>Employee Management</h1>

                <p>Admin Login</p>

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;