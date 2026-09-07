import React from "react";
import AppContext from "./AppContext";
import { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_Backend_Url;
const AppState = ({ children }) => {
  const [loading, setLoading] = useState(false);

  //user api
  const sendGmailOtp = async (email) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/user/gmailOtp`,
        { email },
        {
          withCredentials: true,
        },
      );
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const verifyGmailOtp = async (email, otp) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/user/verifyGmailOtp`,
        { email, otp },
        {
          withCredentials: true,
        },
      );
      console.log(res);

      return res;
    } catch (error) {
      console.log(error);

      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const registerUser = async (email, userName, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/user/register`,
        { email, name: userName, userName, password },
        {
          withCredentials: true,
        },
      );
      console.log(res);

      return res;
    } catch (error) {
      console.log(error);

      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const loginUser = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/user/login`,
        data,
        {
          withCredentials: true,
        },
      );
      console.log(res);

      return res;
    } catch (error) {
      console.log(error);

      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const getUserDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl}/user/getUserDetails`,
        {
          withCredentials: true,
        },
      );
      console.log(res);

      return res;
    } catch (error) {
      console.log(error);

      return error.response;
    } finally {
      setLoading(false);
    }
  };
  
  const logoutUser = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/user/logout`,
        {
          withCredentials: true,
        },
      );
      console.log(res);

      return res;
    } catch (error) {
      console.log(error);

      return error.response;
    } finally {
      setLoading(false);
    }
  };


  //exrcise api

  const createExercise = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/exercise/create`, data, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };

  const getAllExercises = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/exercise/`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const getExerciseById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/exercise/${id}`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const updateExercise = async (id ,data) => {
    setLoading(true);
    try {
      const res = await axios.put(`${apiUrl}/exercise/${id}`, data, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const deleteExercise = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${apiUrl}/exercise/${id}`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };

  //workoutplans
  const createWorkoutPlan = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/workoutplans/create`, data, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };

  const getAllWorkoutPlans = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/workoutplans/`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const getWorkoutPlanById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/workoutplans/${id}`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const updateWorkoutPlanById = async (id, data) => {
    setLoading(true);
    try {
      const res = await axios.put(`${apiUrl}/workoutplans/${id}`, data, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const deleteWorkoutPlanById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${apiUrl}/workoutplans/${id}`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };

  //bodymetrics api

  const addBodyMetric = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/bodymetrics/add`, data, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const getAllBodyMetrics = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/bodymetrics/`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const getBodyMetricById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/bodymetrics/${id}`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const updateBodyMetricById = async (id,data) => {
    setLoading(true);
    try {
      const res = await axios.put(`${apiUrl}/bodymetrics/${id}`, data, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };

  //delete body metric can be added if required

  //workout sessions api 
 const createWorkoutSession = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/workoutsessions/create`, data, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
 const getAllWorkoutSessions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/workoutsessions/`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
 const getWorkoutSessionById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/workoutsessions/${id}`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
 const updateWorkoutSessionById = async (id, data) => {
    setLoading(true);
    try {
      const res = await axios.put(`${apiUrl}/workoutsessions/:${id}`, data, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
 const deleteWorkoutSessionById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${apiUrl}/workoutsessions/${id}`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };

  //proggress api
  const getAllWorkoutPlanUsedByUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/progress/workoutplans/all`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };
  const progressOfWorkoutPlan = async (planId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/progress/workoutplan/${planId}`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };

  const progressOfExercise = async (exerciseId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/progress/${exerciseId}`, {
        withCredentials: true,
      });
      console.log(res);

      return res;
    } catch (error) {
      console.log(error.response);
      return error.response;
    } finally {
      setLoading(false);
    }
  };


  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        sendGmailOtp,
        verifyGmailOtp,
        registerUser,
        loginUser,
       getUserDetails,
        logoutUser,


        createExercise,
        getAllExercises,
        getExerciseById,
        updateExercise,
        deleteExercise,


        createWorkoutPlan,
        getAllWorkoutPlans,
        getWorkoutPlanById,
        updateWorkoutPlanById,
        deleteWorkoutPlanById,


        addBodyMetric,
        getAllBodyMetrics,
        getBodyMetricById,
        updateBodyMetricById,


        createWorkoutSession,
        getAllWorkoutSessions,
        getWorkoutSessionById,
        updateWorkoutSessionById,
        deleteWorkoutSessionById,

        progressOfExercise,
        progressOfWorkoutPlan,
        getAllWorkoutPlanUsedByUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
