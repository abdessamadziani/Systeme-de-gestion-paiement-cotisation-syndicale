import React, { useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'



export const ActiveMe = () => {
    const [validUrl,setValidUrl]=useState(false)
    const {token}=useParams()

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:8000/api/admins/profile/${token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, []); 

  return (
    <div>
       { validUrl &&
        (
            <Link to="/signin" className="flex items-center">
                <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Go to SignIn</button>
            </Link>
        )
        }

        
    </div>
  )
}
