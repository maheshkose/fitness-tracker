import ExerciseManager from '@/Components/MyComponents/Exercise/Exercise';
import React from 'react';

const Exercise = () => {

  //three types of exercise private,public,global
  //private exercise is only visible to the user who created it
  //public exercise is visible to all users but only the creator can edit it
  //global exercise is visible to all users and can be edited by admin only  
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#f8fafc_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 dark:bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_45%),linear-gradient(135deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] dark:text-slate-50">
      <div className="mx-auto max-w-7xl">
        <ExerciseManager />
      </div>
    </div>
  );
};

export default Exercise;