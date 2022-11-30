import '../styles/Form.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiService } from '../api-service';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    const apiService = new ApiService();

    const onSubmit = async (data) => {

        data['code'] = Math.floor(100000 + Math.random() * 900000)

        try {
            await apiService.resetPassword(data);
            await apiService.resetPasswordSendEmail(data);

            navigate("/reset-pass-2", { state: { email: data['email'] } });
        } catch (error) {
            console.error(error['email'])
            setEmailError(error['email'])
        }
    }

    return (
        <section>
            <div className="login">
                <div className="form-container"></div>
                <form id='form' className='form-inner' onSubmit={handleSubmit(onSubmit)}>
                    <h2>Reset Password</h2>

                    <label htmlFor="email">Please enter your registered email. </label>
                    <input type='text' {...register("email", { required: true })} placeholder='' />
                    {(errors.email?.type === "required") ? (<div className="warning">Email is Required</div>) : ""}
                    {(emailError !== "") ? (<div className="warning">{emailError}</div>) : ""}

                    <br></br>
                    <input type="submit" value="Send Email" />
                </form>
            </div>
        </section>
    )
}

export default ResetPassword