import { useAppContext } from '@/Context/AppContext';
import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ExerciseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getExerciseById } = useAppContext();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);



  const getExerciseByIdHandler = async (id) => {
    setLoading(true);
    const res = await getExerciseById(id);

    if (res?.data?.success) {
      setExercise(res.data.exercise);
    } else {
      toast.error(res?.data?.message || 'Failed to fetch exercise');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (id) getExerciseByIdHandler(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/70 bg-card/90 px-8 py-10 text-center shadow-sm shadow-black/5">
          <p className="text-lg font-medium text-slate-700 dark:text-slate-200">Loading exercise details…</p>
        </div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/70 bg-card/90 px-8 py-10 text-center shadow-sm shadow-black/5">
          <p className="text-lg font-medium text-slate-700 dark:text-slate-200">Exercise not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const {
    name,
    description,
    muscleGroups,
    muscles,
    primaryMuscle,
    equipment,
    category,
    difficulty,
    instructions,
    tips,
    gifUrl,
    videoUrl,
  } = exercise;

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#f8fafc_100%)] px-4 py-8 text-slate-900 dark:bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_45%),linear-gradient(135deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] dark:text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 dark:shadow-black/20 sm:p-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            ← Back
          </button>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-700 dark:text-cyan-300">
                  Exercise details
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">{name}</h2>
                {description && <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>}
              </div>

              {gifUrl && (
                <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/90">
                  <img src={gifUrl} alt={name} className="h-full w-full max-h-[420px] object-contain" />
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                {primaryMuscle && (
                  <div className="rounded-3xl border border-border/70 bg-slate-50 p-4 dark:bg-slate-900/90">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Primary muscle</p>
                    <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{primaryMuscle}</p>
                  </div>
                )}
                {category && (
                  <div className="rounded-3xl border border-border/70 bg-slate-50 p-4 dark:bg-slate-900/90">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Category</p>
                    <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{category}</p>
                  </div>
                )}
                {equipment && (
                  <div className="rounded-3xl border border-border/70 bg-slate-50 p-4 dark:bg-slate-900/90">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Equipment</p>
                    <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{equipment}</p>
                  </div>
                )}
                {difficulty && (
                  <div className="rounded-3xl border border-border/70 bg-slate-50 p-4 dark:bg-slate-900/90">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Difficulty</p>
                    <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{difficulty}</p>
                  </div>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {muscleGroups?.length > 0 && (
                  <div className="rounded-3xl border border-border/70 bg-slate-50 p-4 dark:bg-slate-900/90">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Muscle groups</p>
                    <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{muscleGroups.join(', ')}</p>
                  </div>
                )}
                {muscles?.length > 0 && (
                  <div className="rounded-3xl border border-border/70 bg-slate-50 p-4 dark:bg-slate-900/90">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Muscles</p>
                    <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{muscles.join(', ')}</p>
                  </div>
                )}
              </div>

              {videoUrl && (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
                >
                  Watch demonstration video
                </a>
              )}
            </div>

            <div className="space-y-6">
              {instructions?.length > 0 && (
                <section className="rounded-[1.75rem] border border-border/70 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/90">
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Instructions</h3>
                  <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    {instructions.map((ins, idx) => (
                      <li key={idx} className="rounded-3xl bg-white/80 p-4 shadow-sm shadow-slate-200/40 dark:bg-slate-950/80 dark:shadow-black/10">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-semibold text-cyan-700 dark:text-cyan-300">{idx + 1}</span>
                        <p className="mt-2">{ins}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {tips?.length > 0 && (
                <section className="rounded-[1.75rem] border border-border/70 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/90">
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Tips</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    {tips.map((t, idx) => (
                      <li key={idx} className="rounded-3xl bg-white/80 p-4 shadow-sm shadow-slate-200/40 dark:bg-slate-950/80 dark:shadow-black/10">
                        {t}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetails;