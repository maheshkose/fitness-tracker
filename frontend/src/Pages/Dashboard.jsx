import React from 'react'
import {
  Activity,
  CalendarDays,
  ChevronRight,
  Clock3,
  Droplets,
  Dumbbell,
  Flame,
  Play,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { Button } from '../Components/ui/button'

const stats = [
  {
    label: 'Calories',
    value: '1,840',
    detail: '+12% vs yesterday',
    icon: Flame,
    tone: 'from-orange-500/20 to-orange-400/10',
  },
  {
    label: 'Steps',
    value: '18.2k',
    detail: 'Near your daily goal',
    icon: Activity,
    tone: 'from-emerald-500/20 to-emerald-400/10',
  },
  {
    label: 'Workout time',
    value: '45 min',
    detail: 'Upper body focus',
    icon: Dumbbell,
    tone: 'from-sky-500/20 to-sky-400/10',
  },
  {
    label: 'Hydration',
    value: '2.1L',
    detail: 'Good pace today',
    icon: Droplets,
    tone: 'from-cyan-500/20 to-cyan-400/10',
  },
]

const upcomingWorkouts = [
  { title: 'HIIT Cardio', time: '06:30 AM', duration: '25 min' },
  { title: 'Core Strength', time: '07:45 PM', duration: '35 min' },
  { title: 'Mobility Flow', time: '09:00 PM', duration: '20 min' },
]

const progressItems = [
  { label: 'Consistency', value: '7/9 workouts', accent: 'bg-emerald-500' },
  { label: 'Sleep', value: '7.4 hrs avg', accent: 'bg-sky-500' },
  { label: 'Energy', value: 'High', accent: 'bg-orange-500' },
]

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_24%)] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[28px] border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600">
                <Sparkles size={16} />
                Daily fitness hub
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Good morning, Alex
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                You’re 78% toward your weekly goal. A steady session today will keep your momentum strong.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-full">
                Log metrics
              </Button>
              <Button className="rounded-full bg-emerald-500 hover:bg-emerald-600">
                <Play size={16} className="mr-2" />
                Start workout
              </Button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className={`rounded-[24px] border border-border/70 bg-gradient-to-br ${item.tone} p-5 shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-background/70 p-2.5 text-foreground">
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                </div>
                <p className="mt-6 text-3xl font-semibold">{item.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            )
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[28px] border border-border/70 bg-card/85 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today’s plan</p>
                <h2 className="text-xl font-semibold">Upper body strength</h2>
              </div>
              <Button variant="ghost" className="rounded-full">
                View all
              </Button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[24px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-background p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-500/15 p-2.5 text-emerald-600">
                    <Dumbbell size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Session focus</p>
                    <p className="font-semibold">3 rounds • 6 exercises</p>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-semibold">45 min</p>
                    <p className="mt-1 text-sm text-muted-foreground">Push, pull, and core</p>
                  </div>
                  <Button className="rounded-full bg-emerald-500 hover:bg-emerald-600">
                    Continue
                  </Button>
                </div>
              </div>

              <div className="rounded-[24px] border border-border/70 bg-muted/40 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Weekly goal</p>
                  <span className="text-sm font-semibold">78%</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-background">
                  <div className="h-2 w-[78%] rounded-full bg-emerald-500" />
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    ['Workouts completed', '7/9'],
                    ['Recovery score', 'Excellent'],
                    ['Calories target', '82%'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-xl bg-background/70 px-3 py-2">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-border/70 bg-card/85 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Progress snapshot</p>
                <h2 className="text-xl font-semibold">This week</h2>
              </div>
              <Button variant="ghost" className="rounded-full">
                <TrendingUp size={16} className="mr-2" />
                View
              </Button>
            </div>

            <div className="mt-6 flex flex-col items-center">
              <div
                className="relative flex h-32 w-32 items-center justify-center rounded-full"
                style={{ background: 'conic-gradient(#10b981 0 282deg, rgba(255,255,255,0.08) 282deg 360deg)' }}
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-background text-center">
                  <div>
                    <p className="text-2xl font-semibold">78%</p>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Goal</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 w-full space-y-3">
                {progressItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/40 px-3 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.accent}`} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[28px] border border-border/70 bg-card/85 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                <h2 className="text-xl font-semibold">Sessions</h2>
              </div>
              <Button variant="ghost" className="rounded-full">
                View all
              </Button>
            </div>

            <div className="mt-4 space-y-3">
              {upcomingWorkouts.map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/40 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-500/12 p-2 text-emerald-600">
                      <CalendarDays size={16} />
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock3 size={15} />
                    {item.duration}
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-border/70 bg-card/85 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recovery</p>
                <h2 className="text-xl font-semibold">Hydration & rest</h2>
              </div>
              <Sparkles size={18} className="text-emerald-500" />
            </div>

            <div className="mt-4 rounded-[24px] bg-muted/70 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-sky-500/15 p-2 text-sky-600">
                  <Droplets size={16} />
                </div>
                <div>
                  <p className="font-medium">Hydration</p>
                  <p className="text-sm text-muted-foreground">2.1L today</p>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-background">
                <div className="h-2 w-[72%] rounded-full bg-sky-500" />
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-[20px] border border-border/70 bg-muted/40 p-4">
                <p className="text-sm text-muted-foreground">Sleep</p>
                <p className="mt-1 text-xl font-semibold">7.4 hrs</p>
              </div>
              <div className="rounded-[20px] border border-border/70 bg-muted/40 p-4">
                <p className="text-sm text-muted-foreground">Mood</p>
                <p className="mt-1 text-xl font-semibold">Focused</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard