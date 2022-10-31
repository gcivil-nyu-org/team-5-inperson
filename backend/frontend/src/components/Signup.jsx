import '../styles/Form.css';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { ApiService } from '../api-service';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const onSubmit = async (data) => {
    console.log("signup data", data);
    const apiService = new ApiService();

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
      <div className="register">
        <div className="col-1"></div>
        <br></br>
        <h2>Signup Form</h2>
        <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <br></br>
          <input type='text' {...register("username", { required: true })} placeholder='username' />
          {errors.username?.type === "required" && "Username is Required"}
          {(usernameError !== "") ? (<div className="error">{usernameError}</div>) : ""}
          <br></br>
          <input type='text' {...register("password", { required: true })} placeholder='password' />
          {errors.password?.type === "required" && "Password is Required"}
          <br></br>
          <input type='text' {...register("confirmpwd", { required: true })} placeholder='confirm password' />
          {errors.confirmpwd?.type === "required" && "Please Confirm your Password"}
          <br></br>
          <input type='text' {...register("email", { required: true })} placeholder='email' />
          {errors.email?.type === "required" && "Email is Required"}
          {(emailError !== "") ? (<div className="error">{emailError}</div>) : ""}
          <br></br>
          <br></br>
          <button className='btn'> Signup </button>
        </form>

        <div className="col-2"></div>
      </div>
    </section>
  )

  /*
      const {
          register,
          handleSubmit,
          watch,
          formState: { errors }
        } = useForm();
      
        const onSubmit = (data) => {
          alert(JSON.stringify(data));
        }; // your form submit function which will invoke after successful validation
      
        console.log(watch("example")); // you can watch individual input by pass the name of the input
  
        return (
  
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input
              {...register("Name", {
                required: true,
                maxLength: 30
              })}
            />
            {errors?.name?.type === "required" && <p>This field is required</p>}
            {errors?.name?.type === "maxLength" && (
              <p>name cannot exceed 30 characters</p>
            )}
            {errors?.name?.type === "pattern" && (
              <p>No inappropriate words</p>
            )}
            <label>Password</label>
            <input {...register("Password", { 
                required: true,
                maxLength: 30
                })} />
            {errors?.password?.type === "required" && <p>This field is required</p>}
            <label>Email</label>
            <input {...register("Email", { 
              required: true,
              maxLength: 30
              })} />
            {errors?.Email?.type === "required" && <p>This field is required</p>}
            <input type="submit" />
          </form>
  
        );
  */
}

export default Signup