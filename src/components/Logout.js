import React from "react";
import { useEffect } from "react";
import { axiosWithAuth } from "../util/axiosWithAuth";

const Logout = () => {
    useEffect(()=>{
        axiosWithAuth().post(`http://localhost:9000/api/logout`)
        .then(res=>localStorage.removeItem('token'))
        .catch(err=>console.log(err))
    }, []);

    return <div>You have been logged out</div>
}

export default Logout;