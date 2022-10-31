import React, { useState } from 'react'
import Loginform from './Loginform'

function Login() {

  // const adminUser = {
  //   email: "admin@admin.com",
  //   password: "admin123"
  // }

  const authenticatedUser = localStorage.getItem('authenticatedUser');
  const [user, setUser] = useState({ username: "", email: "" });


  // const Login = formDetails => {
  //   console.log(formDetails);

  //   if (formDetails.email === adminUser.email && formDetails.password === adminUser.password) {
  //     console.log("Logged in");
  //     setUser({
  //       username: formDetails.username,
  //       email: formDetails.email
  //     })
  //   } else {
  //     console.log("Invalid Login!");
  //     setError("Invalid Login!");
  //   }
  // }

  const Logout = () => {
    setUser({ username: "", email: "" })
  }

  return (
    <div className="login">
      {(user.email !== "") ? (
        <div className="welcome">
          {/* <h2> Welcome, <span>{user.username}</span></h2> */}
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <Loginform />
      )}
    </div>
  )
}

export default Login