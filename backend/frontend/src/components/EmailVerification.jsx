import '../styles/Form.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiService } from '../api-service';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

function EmailVerification() {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const navigate = useNavigate();
    const location = useLocation();

    const [codeError, setCodeError] = useState("");
    const toast = useToast()

    const apiService = new ApiService();


    const onSubmit = async (data) => {
        data['email'] = location.state.email

        if (data['code'].length !== 6) {
            setCodeError("The code must be 6 digits")
        }
        else {
            setCodeError("")
            try {
                const verifyResponse = await apiService.verifyEmail(data);

                if (verifyResponse[0]?.is_email_verified) {
                    toast({
                        title: 'Email Verified.',
                        description: "Verification Successful. Please login.",
                        status: 'success', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                    })
                    navigate("/login");
                }
                else {
                    toast({
                        title: 'Email Not Verified.',
                        description: "Verification Unsuccessful. Please signup again.",
                        status: 'error', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                    })
                    navigate("/signup");
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
                    {/* {errors.code?.type === "required" && "Code is Required"} */}
                    {(errors.code?.type === "required") ? (<div className="warning">Code is Required</div>) : ""}
                    {(codeError !== "") ? (<div className="warning">{codeError}</div>) : ""}

                    <br></br>
                    <input type="submit" value="Verify" />
                </form>
            </div>
        </section>
    )
}

export default EmailVerification