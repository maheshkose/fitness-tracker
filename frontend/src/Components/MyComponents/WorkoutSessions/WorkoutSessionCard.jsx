import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';

const WorkoutSessionCard = ({ workoutSession }) => {
  return (
    <Card className="border-border/70 bg-background/70">
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg">{workoutSession.completed ? 'Completed Session' : 'Planned Session'}</CardTitle>
            <CardDescription>
              {new Date(workoutSession.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </CardDescription>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${workoutSession.completed ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
            {workoutSession.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {workoutSession.workoutPlans?.map((plan, index) => (
          <div key={index} className="rounded-lg border border-border/70 bg-muted/30 p-4">
            <h3 className="font-semibold text-foreground">{plan.name}</h3>
            <div className="mt-3 space-y-3">
              {plan.exercises?.map((exercise, exIndex) => (
                <div key={exIndex} className="rounded-md bg-background/80 p-3">
                  <p className="text-sm font-medium text-foreground">
                    {exercise.exerciseId?.name || 'Exercise'}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Order: {exercise.order}</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {exercise.sets?.map((set, setIndex) => (
                      <li key={setIndex}>
                        Set {setIndex + 1}: {set.reps} reps • {set.weight} {set.unit} • Rest {set.restTime}s
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WorkoutSessionCard;