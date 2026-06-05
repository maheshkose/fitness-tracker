import SignInform from '@/Components/MyComponents/SignInform'
import VerifyGamil from '@/Components/MyComponents/VerifyGamil'
import { FieldLegend, FieldSet } from '@/Components/ui/field'
import React from 'react'

const Login = () => {
  return (
    <div className='w-100 h-auto '>
        <VerifyGamil/>
        <SignInform/>
        login page
        <SignInform/>
    </div>
  )
}

export default Login