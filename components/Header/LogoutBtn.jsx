import React from "react";
import {useDispath} from "react-redux"
import authService from "../../src/appwrite/auth";
import {logout} from "../../src/store/authSlice"


function LogoutBtn() {

    const dispatch = useDispath()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return ( 
        <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">Logout</button>
    );
}

export default LogoutBtn;