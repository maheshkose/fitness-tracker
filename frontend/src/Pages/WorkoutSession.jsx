import CreateworkoutSession from '@/Components/MyComponents/WorkoutSessions/CreateworkoutSession';
import WorkoutSessionCard from '@/Components/MyComponents/WorkoutSessions/WorkoutSessionCard';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { useAppContext } from '@/Context/AppContext';
import WorkoutSessionProvider, { useWorkoutSessionContext } from '@/Context/WorkoutSessionContext';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const WorkoutSessionPage = () => {
  const { getAllWorkoutSessions } = useAppContext();
  const { showCreateWSF, setshowCreateWSF } = useWorkoutSessionContext();console.log(showCreateWSF);
  
  const [workoutSessions, setWorkoutSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const getAllWorkoutSessionsHandler = async () => {
    console.log('runed');
    
    try {
      setLoading(true);
      const res = await getAllWorkoutSessions();
      if (res?.data?.success) {
        toast.success(res.data.message);
        setWorkoutSessions(res.data.workoutSessions);
      } else {
        toast.error(res?.data?.message || 'Failed to load workout sessions');
      }
    } catch (error) {
      toast.error('Failed to load workout sessions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showCreateWSF) {
      getAllWorkoutSessionsHandler();
    }
  }, [showCreateWSF]);

  return (
   <>
     <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                    Training hub
                  </p>
                  <h1 className="text-3xl font-semibold text-foreground">
                    Workout sessions
                  </h1>
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                    log your workout sessions and track your progress over time.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    onClick={() => setshowCreateWSF(!showCreateWSF)}
                    className="rounded-full bg-cyan-600 px-5 text-sm font-medium text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
                  >
                    {showCreateWSF ? 'Close form' : 'Add session'}
                  </Button>
      
                </div>
              </div>
              {showCreateWSF && (
                <div className="w-full">
                  <CreateworkoutSession setshowCreateWSF={setshowCreateWSF} />
                </div>
              )}

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-xl">Recent Sessions</CardTitle>
          <CardDescription>Your latest workout logs appear here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="rounded-lg border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
              Loading your workout sessions…
            </div>
          ) : workoutSessions && workoutSessions.length > 0 ? (
            workoutSessions.map((session) => (
              <WorkoutSessionCard key={session._id} workoutSession={session} />
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
              No workout sessions found yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
   </>

    //   <div className="space-y-4 p-2 md:p-4">
    //   <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
    //     <div>
    //       <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
    //         Training hub
    //       </p>
    //       <h1 className="text-2xl font-semibold text-foreground">
    //         Workout sessions
    //       </h1>
    //       <p className="mt-1 max-w-xl text-xs text-muted-foreground">
    //         Log your workout sessions and track your progress over time.
    //       </p>
    //     </div>

    //     <div className="flex flex-wrap items-center gap-2">
    //       <Button
    //         onClick={() => setshowCreateWSF(!showCreateWSF)}
    //         className="h-9 rounded-full bg-cyan-600 px-3 text-xs font-medium text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
    //       >
    //         {showCreateWSF ? 'Close' : 'Add session'}
    //       </Button>
    //     </div>
    //   </div>

    //   {showCreateWSF && (
    //     <div className="w-full max-w-4xl">
    //       <CreateworkoutSession setshowCreateWSF={setshowCreateWSF} />
    //     </div>
    //   )}

    //   <Card className="border-border/70">
    //     <CardHeader className="space-y-1 p-3 pb-2">
    //       <CardTitle className="text-base font-semibold">Recent Sessions</CardTitle>
    //       <CardDescription className="text-xs">
    //         Your latest workout logs appear here.
    //       </CardDescription>
    //     </CardHeader>

    //     <CardContent className="space-y-3 p-3 pt-0">
    //       {loading ? (
    //         <div className="rounded-lg border border-dashed border-border/70 p-4 text-xs text-muted-foreground">
    //           Loading your workout sessions…
    //         </div>
    //       ) : workoutSessions && workoutSessions.length > 0 ? (
    //         workoutSessions.map((session) => (
    //           <WorkoutSessionCard key={session._id} workoutSession={session} />
    //         ))
    //       ) : (
    //         <div className="rounded-lg border border-dashed border-border/70 p-4 text-xs text-muted-foreground">
    //           No workout sessions found yet.
    //         </div>
    //       )}
    //     </CardContent>
    //   </Card>
    // </div>
  );
};
 


const WorkoutSession = () => {
  return (
    <WorkoutSessionProvider>
      <WorkoutSessionPage />
    </WorkoutSessionProvider>
  )
}

export default WorkoutSession