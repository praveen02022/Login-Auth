import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";




const UpdateModal: React.FC = () => {

    function formatDate(date: any) {
        return new Date(date).toLocaleDateString()
    }
    const gettoken:any = localStorage.getItem('token')
    const token = JSON.parse(gettoken)
    const [users, setUsers] = useState<any>([])
    const userId = localStorage.getItem('userid')   
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            // const response = await fetch(`'http://localhost:5000/users/${userId}`);
            const newData = await response.json();
            setUsers(newData.result)
        };
        fetchData()
    }, [])

    const navigate = useNavigate();
    const phoneRegExp = /^((\\+[5-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .test(
                "len",
                "The username must be between 3 and 20 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required("This field is required!"),

        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),

        mobileNo: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required("this filed is required"),
        age: Yup.number()
            .required("this filed is required"),

        dob: Yup.date()
            .required("this filed is required"),

        password: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 40 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 40
            )
            .required("This field is required!"),
        confirmpassword: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState: { errors } } = useForm(formOptions);
    const usernameError: any = errors.username?.message
    const mobileError: any = errors.mobileNo?.message
    const emailError: any = errors.email?.message
    const passwordError: any = errors.password?.message
    const confirmPasswordError: any = errors.confirmpassword?.message
    const doberror: any = errors.dob?.message
    const ageerror: any = errors.age?.message


   const oninputChange = (e:any)=>{
       console.log(e);
       
   }
    const updateuser = async (data: any) => {
        try {
            const postdata = { username: data.username, age: data.age, dob: data.dob, email: data.email, mobileNo: data.mobileNo, password: data.password };
            const response = await fetch(`'http://localhost:5000/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postdata),
            })
            const res = await response.json()
            if (res.success === false) {
                window.alert(res.msg)
            } else {
                window.alert(res.data.msg)
                navigate("/dashboard")
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="d-flex justify-content-center align-items-center m-5">
                    <div className="">
                        <form className="" >
                            {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                            <div className="form-outline">
                                <label className="form-label">Username</label>
                                <input {...register('username')} type="text" value={users.username} onChange ={oninputChange}  id="form3Example1" className="form-control" />
                            </div>
                            <div className="text-danger">{usernameError}</div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" >age</label>
                                        <input type="number" {...register('age')} value={users.age} id="form8Example3" className="form-control" />
                                        <div className="text-danger">{ageerror}</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="form-label" >Dob</label>
                                        <input type="date" {...register('dob')} id="form8Example4" className="form-control" />
                                        <div className="text-danger">{doberror}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-outline">
                                <label className="form-label" >Mobile No</label>
                                <input type="number" {...register('mobileNo')} value={users.mobileNo} id="form3Example2" className="form-control" />
                            </div>
                            <div className="text-danger">{mobileError}</div>
                            <div className="form-outline mb-4">
                                <label className="form-label" >Email</label>
                                <input type="email" {...register('email')} value={users.email} id="form3Example3" className="form-control" />
                                <div className="text-danger">{emailError}</div>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" >Password</label>
                                <input type="password" {...register('password')} value={users.password} id="form3Example4" className="form-control" />
                                <div className="text-danger">{passwordError}</div>
                            </div> 
                            <button onClick={handleSubmit(updateuser)} className="btn btn-primary btn-block mb-4">save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default UpdateModal