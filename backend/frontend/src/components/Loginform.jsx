import '../styles/Form.css';
import React, { useState } from 'react'
import { ApiService } from '../api-service';
import { useNavigate, Link } from 'react-router-dom';

function Loginform() {

  const [formDetails, setFormDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {

    e.preventDefault();
    console.log("formDetails", formDetails)
    const apiService = new ApiService();

    try {

      const loginResponse = await apiService.login(formDetails);
      console.log("loginResponse", loginResponse)
      let authenticatedUserObj = {
        'token': loginResponse['token']
      }
      localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUserObj));
      window.dispatchEvent(new Event("storage"));
      navigate("/home");

    } catch (error) {

      console.error(error['non_field_errors'])
      setError(error['non_field_errors'][0])

    }
  }

  return (
    <div className="login">
      <div className="form-container">
        <form onSubmit={loginHandler}>
          <div className="form-inner">
            <h2>Login Form</h2>
            {(error !== "") ? (<div className="error">{error}</div>) : ""}
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" id="email" onChange={e => setFormDetails({ ...formDetails, email: e.target.value })} value={formDetails.email} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" id="password" onChange={e => setFormDetails({ ...formDetails, password: e.target.value })} value={formDetails.password} />
            </div>
            <input type="submit" value="Login" />
          </div>
        </form>
        <br /><br />
        <p className="signup-prompt">New user? <Link to='/signup'>Sign up here</Link></p>
      </div>
    </div>
  )
}

export default Loginform