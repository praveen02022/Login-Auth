import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './signup.scss';
function Signup() {

    // const navigate = useNavigate();
    // const handleOnClick = useCallback(() => navigate('/sample', {replace: true}), [navigate]);
    return (
        <div >
            <div className="container-fluid h">
                <div className="row d-flex justify-content-center align-items-center m-5">
                    <div className="col-8">
                        <img src="images/1.png"
                            className="img-fluid" alt="Sample image"></img>
                    </div>
                    <div className="col-4">
                        <form className="" >
                            {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text" id="form3Example1" className="form-control" />
                                        <label className="form-label">First name</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text" id="form3Example2" className="form-control" />
                                        <label className="form-label" >Last name</label>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Email input --> */}
                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control" />
                                <label className="form-label" >Email address</label>
                            </div>

                            {/* <!-- Password input --> */}
                            <div className="form-outline mb-4">
                                <input type="password" id="form3Example4" className="form-control" />
                                <label className="form-label" >Password</label>
                            </div>

                            {/* <!-- Checkbox --> */}
                            <div className="form-check d-flex justify-content-center mb-4">
                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                                <label className="form-check-label" >
                                    Subscribe to our newsletter
                                </label>
                            </div>

                            {/* <!-- Submit button --> */}
                            <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>

                            {/* <!-- Register buttons --> */}
                            <div className="text-center">
                                <p>or sign up with:</p>
                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="bi bi-facebook"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="bi bi-google"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="bi bi-twitter"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="bi bi-github"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>




        </div>
    );
}

export default Signup;
