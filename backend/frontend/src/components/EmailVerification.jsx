import '../styles/Form.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiService } from '../api-service';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function EmailVerification() {

    const { register, handleSubmit, getValues, watch, formState: { errors } } = useForm()

    const navigate = useNavigate();
    const location = useLocation();

      const [codeError, setCodeError] = useState("");


    const onSubmit = async (data) => {
        console.log("email prop is", location.state.email)
        console.log("verify data", data);
        // const apiService = new ApiService();
        if (data['code'].length !== 6){
            setCodeError("Please enter a 6-digit code.")
        }
        else {
            setCodeError("")
        }

        // console.log(watch("password"));

        // try {
        //   const signupResponse = await apiService.addUser(data);
        //   console.log("signupResponse", signupResponse)
        //   navigate("/login");
        // } catch (error) {
        //   console.log("error", error)
        //   if ("email" in error) {
        //     setEmailError(error['email'])
        //   }
        //   else {
        //     setEmailError("")
        //   }
        //   if ("username" in error) {
        //     setUsernameError(error['username'])
        //   }
        //   else {
        //     setUsernameError("")
        //   }
        // }
    }

    return (
        <section>
            <div className="login">
                <div className="form-container"></div>
                <form id='form' className='form-inner' onSubmit={handleSubmit(onSubmit)}>
                    <h2>Email Verification</h2>

                    <label>Enter your 6-digit verification code.</label>
                    <input type='number' {...register("code", { required: true })} placeholder='' />
                    {errors.code?.type === "required" && "Code is Required"}
                    {(codeError !== "") ? (<div className="warning">{codeError}</div>) : ""}

                    {/* {watch("code")?.length > 6 ? (
                        <p className="warning">Code is greater than 6 digits.</p>
                    ) : null} */}

                    <br></br>
                    <input type="submit" value="Verify" />
                </form>
            </div>
        </section>
    )
}

export default EmailVerification