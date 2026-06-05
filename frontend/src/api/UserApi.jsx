import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { ProvideAppContext } from '@/Context/AppContext';
const apiUrl = import.meta.env.VITE_Backend_Url;

const UserApi = () => {
    const {loading, setLoading} = ProvideAppContext();
   const sendGmailOtp = async (email) => {
      setLoading(true);
      try {
        const res = await axios.post(`${apiUrl}/user/gmailOtp`, {email},{
          withCredentials: true,
        });
        console.log(res);
        
        return res;
      } catch (error) {
        console.log(error.response);
        return error.response;
      }finally{
        setLoading(false);
      }
    }
    const verifyGmailOtp = async (email,otp) => {
      setLoading(true);
      try {
        const res = await axios.post(`${apiUrl}/user/verifyGmailOtp`, {email,otp},{
          withCredentials: true,
        });
        console.log(res);
        
        return res;
      } catch (error) {
        console.log(error);
        
        return error.response;
      }finally{
        setLoading(false);
      }
    }
     const registerUser = async (email,name,userName,password) => {
      setLoading(true);
      try {
        const res = await axios.post(`${apiUrl}/user/register`, {email,name,userName,password},{
          withCredentials: true,
        });
        console.log(res);
        
        return res;
      } catch (error) {
        console.log(error);
        
        return error.response;
      }finally{
        setLoading(false);
      }
    }
     const loginUser = async (email,name,userName,password) => {
      setLoading(true);
      try {
        const res = await axios.post(`${apiUrl}/user/login`, {email,name,userName,password},{
          withCredentials: true,
        });
        console.log(res);
        
        return res;
      } catch (error) {
        console.log(error);
        
        return error.response;
      }finally{
        setLoading(false);
      }
    }
  return{sendGmailOtp,verifyGmailOtp,registerUser,loginUser}
}

export default UserApi;