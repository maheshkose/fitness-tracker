import { Card } from '@/Components/ui/card';
import { useAppContext } from '@/Context/AppContext';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Logout = () => {
    const { logoutUser } = useAppContext();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const res = await logoutUser();
        if(res.data.success){
            toast.success(res.data.message);
            navigate('/');
        }

    }
  return (
    <div className="p-4">
        <Card className="w-full max-w-md mx-auto p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Are you sure you want to logout?</h2>
            <p className="mb-6">Click the button below to confirm your logout.</p>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
                Logout
            </button>
        </Card>
    </div>
  )
}

export default Logout