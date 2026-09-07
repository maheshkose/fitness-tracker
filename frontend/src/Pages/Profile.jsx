import { useAppContext } from '@/Context/AppContext';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

const Profile = () => {

  const {getUserDetails} = useAppContext();
const [userDetails, setuserDetails] = useState({})
  const getUserDetailsHandler = async () => {
    const res = await getUserDetails();
    console.log(res);
    
    if (res.data.success) {
      toast.success(res.data.message);
      console.log("user",res.data);
      setuserDetails(res.data.user)
    }else{
      toast.error(res.data.message)
    }
  }

  useEffect(() => {
    getUserDetailsHandler();
  }, [])
  
  return (
    <div>Profile

      <h1>{userDetails.userName}</h1>
    </div>
  )
}

export default Profile