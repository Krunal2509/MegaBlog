import React from "react";
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router";
import authService from "../../src/appwrite/auth";
import {logout} from "../../src/store/authSlice"


function LogoutBtn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async() => {
        try {
            await authService.logout();
        } catch (error) {
            console.log(error);
        }
        
        dispatch(logout());
        navigate('/login',{replace:true})
    }

    return ( 
        <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logoutHandler}>Logout</button>
    );
}

export default LogoutBtn;