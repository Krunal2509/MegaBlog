import React ,{useState} from "react";  
import authService from "../src/appwrite/auth";
import {Link , useNavigate} from 'react-router'
import {login} from "../src/store/authSlice"
import { Button , Input , Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";


function SignUp() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error , setError]  = useState('')
    const {register, handleSubmit} = useForm()

    const create = async (data) => {
        setError('')
        try {
           const userData = await authService.createAccount(data)

           if(userData) {

            const userData = await authService.getCurrentUser()
            if(uerData) dispatch(login(userData));
            navigate('/')
        
           }


        } catch (error) {
            setError(error.message)
        }
    } 

    return (
        <div className="flex items-center justify-center">
            <div>
                
            </div>
        </div>
    );

}

export default SignUp;