import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""}) 
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const host = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:5000';
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const {name, email, password} = credentials
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        setLoading(false);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            props.showAlert("Account Created Successfully", "success");
            navigate("/");

        }
        else{
            props.showAlert("Invalid details", "danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 rounded-3">
                <div className="card-body">
                <h2 className="text-center text-dark">Sign-up</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
                </div>
                
                <button type="submit" className="btn btn-primary w-100 py-2 mt-3" disabled={loading}>{loading ? "Creating Account..." : "Sign Up"}</button>
            </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Signup
