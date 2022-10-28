import React, { useState } from 'react'
import Loginform from './Loginform'

function Login() {
    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    }

    const [user,setUser] = useState({name:"", email:""});
    const [error,setError] = useState("");

    const Login = details => {
        console.log(details);

        if (details.email == adminUser.email && details.password == adminUser.password){
            console.log("Logged in");
            setUser({
                name: details.name,
                email: details.email
            })
        } else {
            console.log("Invalid Login!");
            setError("Invalid Login!");
        }
    }

    const Logout = () => {
        setUser({ name: "", email: ""})
    }

    return (
        <div className="login">
            {(user.email != "") ? (
                <div className="welcome"> 
                    <h2> Welcome, <span>{user.name}</span></h2>
                    <button onClick={Logout}>Logout</button>
                </div>
            ) : (
                <Loginform Login={Login} error={error}/>
            )}
        </div>
    )
}

export default Login