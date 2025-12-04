// admin login page 
import { useState } from "react";
import { useAuth } from "../authShared.jsx";
const apiUrl = import.meta.env.VITE_API_URL;


function Login (){
    const { logIn } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${apiUrl}user`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: username, password: password})
            });
            const data = await response.json();
            logIn(data.id);
            window.location.href = "/";
        }catch(err){
            console.error("Error:" + err.message);
        }
    }
    return(
            <div className="login-container">
                <form action="" className="login-form">
                    <input type="text" placeholder="Username"  className="input-field" onChange={(e) => setUsername(e.target.value) } />
                    <input type="password" placeholder="Password" className="input-field"  onChange={(e) => setPassword(e.target.value) } />
                    <button type="submit" onClick={handleSubmit} className="login-button"> Login</button>
                </form>
            </div>
    )
}

export default Login;
