import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import { login } from "./auth.service"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = (props) => {



    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState: { errors }, formState } = useForm(formOptions);
    const usernameError: any = errors.username?.message;
    const passwordError: any = errors.password?.message
  

    const handleLogin = async (data: any) => {
     
        try {
            const postdata = { username: data.username, password: data.password };
            const response = await fetch('http://localhost:5000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postdata),
            })

            const res = await response.json()
            console.log(res.success);

            if (res.success === false) {
               window.alert(res.msg)
            } else {
                localStorage.setItem("user", JSON.stringify(res.data));
                localStorage.setItem("token", JSON.stringify(res.data.token));
                window.alert(res.message)
                navigate("/dashboard")
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (

        <>

            <section className="">
                <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div className="toast-body">
                       sssssssssssss
                    </div>
                </div>
                <div className="container-fluid h">
                    <div className="row d-flex justify-content-center align-items-center m-5">
                        <div className="col-7">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image"></img>
                        </div>
                        <div className="col-5">

                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="bi bi-facebook"></i>
                                    </button>

                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="bi bi-twitter"></i>
                                    </button>

                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="bi bi-linkedin"></i>
                                    </button>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>

                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4">
                                    <input  {...register('username')} type="text" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="username" >Username</label>
                                    <div className="text-danger">{usernameError}</div>
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-3">
                                    <input  {...register('password')} type="password" className="form-control form-control-lg" />
                                    <label className="form-label">Password</label>
                                    <div className="text-danger">{passwordError}</div>
                                </div>

                                {/* <div className="d-flex justify-content-between align-items-center">
                                    <!-- Checkbox -->
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" >
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div> */}

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button onClick={handleSubmit(handleLogin)} type="button" className="btn btn-primary btn-lg"
                                    >Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/sign-up"
                                        className="link-danger">Register</a></p>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>


                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>

                <div>
                    <a href="#!" className="text-white me-4">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="bi bi-google"></i>
                    </a>
                    <a href="#!" className="text-white">
                        <i className="bi bi-linkedin"></i>
                    </a>
                </div>
            </section>
        </>
    );
}

export default Login;
