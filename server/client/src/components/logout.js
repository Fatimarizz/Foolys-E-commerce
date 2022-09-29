import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {user} from '../redux/counter'
import { toast } from "react-toastify";
import axios from "axios";

export default function Logout() {
    const toastsuccess = () => {
        toast.success('Successfully Logout !', {
            position: toast.POSITION.TOP_RIGHT
        });
      };
    const navigate= useNavigate()
    const dispatch= useDispatch();
    useEffect(()=>{
        axios.get('http://localhost:5000/logout',
        {
          withCredentials: true,
        })
          
          .then(res => {
              console.log('logout Successfully', res)
              dispatch(user(false))
              toastsuccess();
              navigate('/login')
            if (res.status!==200){
                const error= new Error ("err of logout",res.err);
                throw error
            }
            }).catch((err)=>{
                console.log(err)
            })
})

    return(
        <div>
            logout oage
        </div>
    )
}