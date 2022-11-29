import '../styles/Form.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiService } from '../api-service';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

function ResetPassword2() {

    const { register, handleSubmit, getValues, watch, formState: { errors } } = useForm({mode:"onChange"})
    const [codeError, setCodeError] = useState("");
    const toast = useToast()

    const navigate = useNavigate();
    const location = useLocation();

    const apiService = new ApiService();

    const onSubmit = async (data) => {

        data['email'] = location.state.email

        if (data['code'].length !== 6) {
            setCodeError("The code must be 6 digits")
        }
        else {
            setCodeError("")
            try {
                const resetPasswordUpdateResponse = await apiService.resetPasswordUpdate(data);
                console.log("resetPasswordUpdateResponse", resetPasswordUpdateResponse)

                if (resetPasswordUpdateResponse[0]) {
                    toast({
                        title: 'Reset Password Success',
                        description: "Login with the new password.",
                        status: 'success', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                    })
                    
                    navigate("/login");
                }
                else {
                    toast({
                        title: 'Reset Password Failed.',
                        description: "Wrong code entered. Please try again.",
                        status: 'error', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                    })
                }

            } catch (error) {
                console.log("error", error)
            }
        }

    }

    return (
        <section>
            <div className="login">
                <div className="form-container"></div>
                <form id='form' className='form-inner' onSubmit={handleSubmit(onSubmit)}>
                    <h2>Email Verification</h2>

                    <label>Please enter the 6-digit verification code sent to your email.</label>

                    <label>Code:</label>
                    <input type='number' {...register("code", { required: true })} placeholder='' />
                    {(errors.code?.type === "required") ? (<div className="warning">Code is Required</div>) : ""}
                    {(codeError !== "") ? (<div className="warning">{codeError}</div>) : ""}

                    <label htmlFor="password">New Password: </label>
                    <input type='password' {...register("password", { required: true, minLength:{value:8, message:"Password must be 8 characters"}, maxLength:{value:25, message:"Password cannot be more than 25 characters"}, pattern:{value:/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password must have: 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character."} })} placeholder='' />
                    {(errors.password?.type === "required") ? (<div className="warning">Password is Required</div>) : ""}
                    {errors.password && <div className="warning"><span>{errors.password.message}</span></div>}

                    <label>Confirm New Password: </label>
                    <input type='password' {...register("confirmpwd", { required: true })} placeholder='' />
                    {(errors.confirmpwd?.type === "required") ? (<div className="warning">Please Confirm your Password</div>) : ""}

                    {watch("confirmpwd") !== watch("password") &&
                        getValues("confirmpwd") ? (
                        <p className="warning">Passwords do not match.</p>
                    ) : null}

                    <br></br>

                    <input type="submit" value="Update Password" />
                </form>
            </div>
        </section>
    )
}

export default ResetPassword2