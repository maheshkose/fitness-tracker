import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { ProvideAppContext } from '@/Context/AppContext';
const apiUrl = import.meta.env.VITE_Backend_Url;

const ExerciseApi = () => {
    const {setLoading} = ProvideAppContext();
    const createExercise = async (data) => {
      setLoading(true);
      try {
        const res = await axios.post(`${apiUrl}/exrcise/create`, data, {
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
  return {createExercise};
}

export default ExerciseApi
