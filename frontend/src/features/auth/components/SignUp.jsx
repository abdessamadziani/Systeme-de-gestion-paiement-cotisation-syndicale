import React from 'react'
import signUpImg from '../../../shared/imgs/Sign up-cuate.png'
import { useForm } from "react-hook-form"
import {useState} from 'react'
import axios  from 'axios'


import Swal from 'sweetalert2'; // Import the main SweetAlert2 module
import 'sweetalert2/dist/sweetalert2.min.css'; // Import the CSS file
import 'sweetalert2/dist/sweetalert2.min.js'; // Import the JavaScript file

function SignUp() {


const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()


    const clearInputs=()=>{
      document.getElementById('email').value=""
      document.getElementById('name').value=""
      document.getElementById('password').value=""
    
    }
    
    
       const [user,setUser]=useState({
        name: '',
        email: '',
        password: '',
       })



    const submitSignUp = () => {
        //  e.preventDefault()
    
    
            axios.post('http://localhost:8000/api/admins/signup', user, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            })
              .then(res => {
                // Handle the successful response here.
                console.log(res.data);
                clearInputs()
                Swal.fire({
                  title: 'Your registration is done successfully',
                  text: 'Go Check Your Email To Activate Your Account',
                  icon: 'success',
                  confirmButtonText: 'Cool'
                })
                
              })
              .catch(error => {
                // Handle any errors that occur during the request.
                console.error(error);
                Swal.fire({
                  title: 'Failed registration',
                  text: 'Try Again ',
                  icon: 'error',
                  confirmButtonText: 'Okey'
                })
            
              });
          
    
       };

       const handleChange=(e)=>{

        setUser({...user,[e.target.id]:e.target.value})
  
     }

  return (
       <>
        <div className="container flex  mx-auto mt-6 ">
        <div className="flex w-1/2 justify-center h-1/3	 ">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form onSubmit={handleSubmit(submitSignUp)} className="space-y-6"  >
                {/* <form className="space-y-6"  > */}

                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign Up</h5>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                        <input  type="text" name="name"  id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"   {... register ("name",{required:"Name is required",minLength: {value: 4,message :"Min Length you need 4 caracters "},maxLength: {value: 15,message: "max Length is 15 caracters"}})}  onChange={handleChange}   />

                        {errors.name && (<small className='flex text-red-500'>{errors.name.message}</small>)}
                        
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input  type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"  {...register("email",{required: "Email is required",pattern: {value:/^\S+@\S+\.\S+$/,message: 'Invalid Email Address'}})}  onChange={handleChange}  />

                        {errors.email && (<small className='flex text-red-500'>{errors.email.message}</small>)}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"    {...register("password",{required: "Password is required",minLength: {value: 6,message :"Min Length you need 6 caracters "},maxLength: {value: 15,message: "max Length is 15 caracters"}})} onChange={handleChange}  />

                        {errors.password && (<small className='flex text-red-500'>{errors.password.message}</small>)}

                    </div>
                   
                  
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
                    

                    {/* {JSON.stringify(user)} */}
                </form>

            </div>

        </div>
        <div className="w-1/2  h-2/3">
          <img src={signUpImg} alt="image" />
        </div>
    </div>
       </>
  )
}

export default SignUp