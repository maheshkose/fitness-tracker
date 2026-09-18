import React from 'react'
import { ArrowRight, Dumbbell, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/Components/ui/button'

const HeroCard = () => {
  return (
    <section className="w-100 m-auto relative overflow-hidden rounded-[28px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 via-card to-sky-500/10 p-6 shadow-sm md:p-10">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
          <Dumbbell size={16} aria-hidden="true" />
          <span>FitTrack</span>
          <Sparkles size={14} aria-hidden="true" />
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Build momentum. Train with purpose.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Keep your workouts organized, track the metrics that matter, and turn every session into measurable progress.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button asChild className="rounded-full bg-emerald-600 px-6 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400">
            <Link to="/login">
              Login
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">Your training history, plans, and progress in one place.</p>
        </div>
      </div>
    </section>
  )
}

export default HeroCard