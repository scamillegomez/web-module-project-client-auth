import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialCreds = {
    username: '',
    password: ''
}

const Login = (props) => {
    const [credentials, setCredentials] = useState(initialCreds);
    const navigate = useNavigate();

    const handleChange = e => {
        console.log(props);
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const login = e => {
        e.preventDefault();
        axios.post(`http://localhost:9000/api/login`, credentials)
            .then(res=>{
                localStorage.setItem("token", res.data.token);
                navigate('/protected/friends');
            })
            .catch(err=>console.log(err));
    }
    
    return(
        <div>
            <h2>LOGIN</h2>
            <form onSubmit={login}>
                <label>USERNAME
                    <input 
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </label>
                <label>PASSWORD
                    <input 
                        type="text"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </label>
                <button>SUBMIT</button>
            </form>
        </div>
    )
}

export default Login;