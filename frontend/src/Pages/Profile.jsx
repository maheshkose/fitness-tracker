import { Button } from '@/Components/ui/button';
import { useAppContext } from '@/Context/AppContext';
import { CalendarDays, Check, ChevronRight, LogOutIcon, Mail, ShieldCheck, UserRound } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {

  const navigate = useNavigate();

  const { getUserDetails,userDetails } = useAppContext();
  // const [userDetails, setUserDetails] = useState({});


  // const getUserDetailsHandler = async () => {
  //   const res = await getUserDetails();
  //   if (res?.data?.success) {
  //     setUserDetails(res.data.user);
  //   } else {
  //     toast.error(res?.data?.message || 'Unable to load your profile');
  //   }
  // }

  // useEffect(() => {
  //   getUserDetailsHandler();
  // }, []);

  const initials = (userDetails?.name || userDetails?.userName || 'U')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const joinedDate = userDetails?.createdAt
    ? new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(userDetails.createdAt))
    : 'Recently';

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#ecfeff_50%,_#f8fafc_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-10 dark:bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.2),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] dark:text-slate-50">
      {userDetails?.userName ? (
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <section className="relative overflow-hidden rounded-[2rem] border border-emerald-200/80 bg-white/85 p-6 shadow-xl shadow-emerald-950/5 backdrop-blur-xl sm:p-8 dark:border-emerald-400/15 dark:bg-slate-900/75">
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[28px] border-emerald-400/10" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-[1.6rem] bg-emerald-500 text-2xl font-bold text-white shadow-lg shadow-emerald-500/25 sm:size-24 sm:text-3xl">
                  {initials}
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400">Your fitness identity</p>
                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{userDetails?.name}</h1>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">@{userDetails?.userName}</p>
                </div>
              </div>
              <Button onClick={() => navigate('/Metrics')} className="w-full rounded-full bg-slate-900 px-5 text-white hover:bg-emerald-600 sm:w-auto dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
                View my metrics <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-xl sm:p-7 dark:border-white/10 dark:bg-slate-900/75 dark:shadow-black/20">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-400">Account details</p>
                  <h2 className="mt-2 text-xl font-semibold">Keep your profile close</h2>
                </div>
                <UserRound className="size-5 text-slate-400" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                  <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400"><Mail className="size-4" /></div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Email address</p>
                  <p className="mt-1 break-all text-sm font-medium">{userDetails?.email}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                  <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><CalendarDays className="size-4" /></div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Member since</p>
                  <p className="mt-1 text-sm font-medium">{userDetails?.createdAt}</p>
                </div>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-slate-200/80 bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/15 sm:p-7 dark:border-white/10 dark:bg-emerald-950/70">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">Profile status</p>
                  <h2 className="mt-2 text-xl font-semibold">You are all set</h2>
                </div>
                <ShieldCheck className="size-6 text-emerald-300" />
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
                <div className="flex size-8 items-center justify-center rounded-full bg-emerald-400 text-slate-950"><Check className="size-4" /></div>
                <p className="text-sm text-slate-300">Your account is ready to track progress.</p>
              </div>
            </section>
            <section className="rounded-[1.75rem] border border-slate-200/80 bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/15 sm:p-7 dark:border-white/10 dark:bg-emerald-950/70">
              <div className="flex items-start justify-between bg-red-500/10 p-4 rounded-2xl">
               <Button onClick={() => navigate('/logout')} className="w-full rounded-full bg-red-500 px-5 text-white hover:bg-emerald-600 sm:w-auto dark:bg-slate-950 dark:text-emerald-400 dark:hover:bg-slate-800">
                <LogOutIcon className="mr-2 size-4" />
                Logout
              </Button>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center text-center">
          <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/60 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"><UserRound /></div>
            <h1 className="mt-5 text-2xl font-semibold">Your profile is waiting</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Log in to see your account details and fitness progress.</p>
            <Button className="mt-6 rounded-full bg-emerald-600 px-6 text-white hover:bg-emerald-500" onClick={() => navigate('/login')}>Log in</Button>
          </section>
        </div>
      )}
    </main>
  );
};

export default Profile;