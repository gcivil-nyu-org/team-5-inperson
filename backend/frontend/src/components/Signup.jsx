import '../styles/Form.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiService } from '../api-service';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const { register, handleSubmit, getValues, watch, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const onSubmit = async (data) => {
    console.log("signup data", data);
    const apiService = new ApiService();
  
  console.log(watch("password"));

    try {
      const signupResponse = await apiService.addUser(data);
      console.log("signupResponse", signupResponse)
      navigate("/login");
    } catch (error) {
      console.log("error", error)
      if ("email" in error) {
        setEmailError(error['email'])
      }
      else {
        setEmailError("")
      }
      if ("username" in error) {
        setUsernameError(error['username'])
      }
      else {
        setUsernameError("")
      }
    }
  }

  return (
    <section>
      <div className="login">
        <div className="form-container"></div>
        <form id='form' className='form-inner' onSubmit={handleSubmit(onSubmit)}>
          <h2>Signup Form</h2>
          <label htmlFor="email">Email: </label>
          <input type='text' {...register("email", { required: true })} placeholder='' />
          {errors.email?.type === "required" && "Email is Required"}
          {(emailError !== "") ? (<div className="error">{emailError}</div>) : ""}
          <label htmlFor="password">Password: </label>
          <input type='password' {...register("password", { required: true })} placeholder='' />
          {errors.password?.type === "required" && "Password is Required"}
          <label htmlFor="confirmpassword">Confirm Password: </label>
          <input type='password' {...register("confirmpwd", { required: true })} placeholder='' />
          {errors.confirmpwd?.type === "required" && "Please Confirm your Password"}
          {watch("confirmpwd") !== watch("password") &&
          getValues("confirmpwd") ? (
            <p>password not match</p>
          ) : null}
          <br></br>
          <button className='btn'> Signup </button>
        </form>
      </div>
    </section>
  )
}

export default Signup