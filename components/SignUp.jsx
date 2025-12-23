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
             <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>

                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>

                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>

                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                    <form onSubmit={handleSubmit(create)}>
                        <div className="space-y-5">
                            <Input 
                                label='Full Name : '
                                placeholder = 'Enter Your Ful Name'
                                {
                                    // Here the register is not sign up register it is form handling  sintax
                                    ...register("name",{
                                        required : true
                                    })
                                }
                            />

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

                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>

                        </div>
                    </form>

                </div>

        </div>
    );

}

export default SignUp;