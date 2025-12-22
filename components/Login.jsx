import React ,{useState} from "react";
import {Link , matchPath, useNavigate} from 'react-router'
//auth login  or store login remember
import {login as authLogin} from '../src/store/authSlice'
import {Button , Input , Logo} from './index'
import { useDispatch } from "react-redux";
import authService from "../src/appwrite/auth";
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //below is from docs of hook form
    const {register , handleSubmit} = useForm()
    const [error , setError] = useState("")

    const login = async (data) => {
        setError("")
        try {

            //session true means logged in

            const session = await authService.login(data)

            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                navigate("/")
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (  
            <div className='flex items-center justify-center w-full'>
              
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

                 <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {
                    error && <p className="text-red-600 mt-8 text-center">{error}</p>
                }

                <form onSubmit={handleSubmit(login)} className="mt-8">

                    <div className="space-y-5">

                        <Input 
                            label="Email"
                            type='email'
                            placeholder="Enter Your Email"
                            {
                                //the name(here it is email) is unique
                                ...register("email" , {
                                    required:true,
                                    validate:{
                                        matchPatern:(value) => {
                                            (/^[^\s@] + @[^\s@]+\.[^\s@]$/).test(value) || "Enter Valid Email Address"
                                        }
                                    }
                                })
                            }
                            
                        />

                        <Input 
                            label = "Password"
                            type = "password"
                            placeholder ="Enter Your Password"
                            
                            {
                                ...register("Password",{
                                    required : true,

                                })
                            }
                        />

                        <Button type = "submit" className="w-full" >
                            Sign In
                        </Button>

                    </div>
                    

                </form>

            </div>

            
    );
}

export default Login;