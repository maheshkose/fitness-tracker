import SignInform from '@/Components/MyComponents/SignInform';
import VerifyGamil from '@/Components/MyComponents/VerifyGamil';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/Components/ui/carousel';
import { Dumbbell, ShieldCheck, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#f8fafc_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 dark:bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_45%),linear-gradient(135deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] dark:text-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-slate-200/80 bg-white/70 p-4 shadow-2xl shadow-slate-200/60 backdrop-blur-xl lg:flex-row lg:p-8 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/30">
        <div className="flex flex-1 flex-col justify-center rounded-[1.5rem] bg-slate-950 p-8 text-white dark:bg-slate-950/95">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-200">
            <Dumbbell className="h-4 w-4" />
            Fitness Tracker
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Start your next workout with confidence.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Track your progress, manage your exercises, and stay consistent with a cleaner experience built for your fitness journey.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <div className="flex items-center gap-2 text-cyan-300">
                <ShieldCheck className="h-4 w-4" />
                Secure account access
              </div>
              <p className="mt-2 text-sm text-slate-300">Verify your email and sign in with confidence.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <div className="flex items-center gap-2 text-cyan-300">
                <Sparkles className="h-4 w-4" />
                Smarter fitness flow
              </div>
              <p className="mt-2 text-sm text-slate-300">Experience a polished dashboard from day one.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">

          {isSignUp ? <VerifyGamil setIsSignUp={setIsSignUp} /> : <SignInform setIsSignUp={setIsSignUp} />}
        </div>
      </div>
    </div>
  );
};

export default Login;