import React, { useEffect, useRef, useState } from 'react';
import { Cross, Dumbbell, PencilLine, PlusCircle, Sparkles, Trash2 } from 'lucide-react';
import { useAppContext } from '../../../Context/AppContext';
import { toast } from 'sonner';
import useFormPersist from '../../../hooks/useFormPersist';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Link } from 'react-router-dom';
import DeletePopUp from '../DeletePopUp';
import { Field, FieldDescription, FieldLabel } from '@/Components/ui/field';
import { DropDown } from '../DropDown';

const ExerciseManager = () => {
  const muscleGroupsList = ['chest', 'back', 'legs', 'arms', 'shoulders', 'core', 'full body'];
  const equipmentList = ['bodyweight', 'dumbbell', 'barbell', 'machine', 'cable', 'kettlebell', 'resistance band'];
  const categoryList = ['compound', 'isolation'];
  const difficultyList = ['beginner', 'intermediate', 'advanced'];
  const access = ["isPrivate", "isPublic", "isGlobal"]
  const { createExercise, getAllExercises, updateExercise, deleteExercise } = useAppContext();
  const [exercises, setExercises] = useState([]);

  const { form, setForm, resetState } = useFormPersist('exerciseForm', {
    name: '',
    description: '',
    muscleGroups: [],
    muscles: [],
    primaryMuscle: '',
    equipment: '',
    category: '',
    difficulty: '',
    instructions: '',
    tips: '',
    isPrivate: true,
    isPublic: false,
    gifUrl: '',
    videoUrl: '',
  });


  const editFormRef = useRef(null);

  const scrollToRefEdit = () => {
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 0);
  }


  const [showFormUi, setShowFormUi] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const getAllExercisesHandler = async () => {
    const res = await getAllExercises();
    if (res.data.success) {
      toast.success(res.data.message);
      setExercises(res.data.exercises);
      setAllExercise(res.data.exercises);
      setDisplayedExercise(res.data.exercises);
    } else {
      toast.error(res.data.message || 'Failed to load exercises');
    }
  };

  useEffect(() => {
    getAllExercisesHandler();
  }, []);

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
      if (filterDebounceRef.current) clearTimeout(filterDebounceRef.current);
    };
  }, []);

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      setForm({ ...form, [e.target.name]: e.target.checked });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setForm({ ...form, muscleGroups: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      handleUpdateExercise();
    } else {
      handleCreateExercise();
    }
  };

  const handleUpdateExercise = async () => {
    const res = await updateExercise(editingId, form);
    if (res.data?.success) {
      toast.success(res.data?.message || 'Exercise updated successfully!');
      getAllExercisesHandler();
      resetState();
      setEditingId(null);
      setShowFormUi(false);
    } else {
      toast.error(res?.data?.message || 'Failed to update exercise');
    }
  };

  const handleCreateExercise = async () => {
    const res = await createExercise(form);
    if (res.data?.success) {
      toast.success(res.data?.message || 'Exercise created successfully!');
      getAllExercisesHandler();
      resetState();
      setEditingId(null);
      setShowFormUi(false);
    } else {
      toast.error(res?.data?.message || 'Failed to create exercise');
    }
  };

  const handleEdit = (exercise) => {
    setShowFormUi(true);
    setEditingId(exercise._id);
    setForm({
      name: exercise.name || '',
      description: exercise.description || '',
      muscleGroups: exercise.muscleGroups || [],
      muscles: exercise.muscles || [],
      primaryMuscle: exercise.primaryMuscle || '',
      equipment: exercise.equipment || '',
      category: exercise.category || '',
      difficulty: exercise.difficulty || '',
      instructions: exercise.instructions || '',
      tips: exercise.tips || '',
      isPrivate: exercise.isPrivate ?? true,
      isPublic: exercise.isPublic ?? false,
      gifUrl: exercise.gifUrl || '',
      videoUrl: exercise.videoUrl || '',
    });
    scrollToRefEdit();
  };

  const handleDelete = async (id) => {
    const res = await deleteExercise(id);
    if (res.data?.success) {
      toast.success(res.data?.message || 'Exercise deleted successfully!');
      getAllExercisesHandler();
    } else {
      toast.error(res?.data?.message || 'Failed to delete exercise');
    }
  };

  // search logic
  const [searchQuery, setSearchQuery] = useState('');
  const [allExercise, setAllExercise] = useState([]);
  const [displayedExercise, setDisplayedExercise] = useState([]);
  const searchDebounceRef = useRef(null);
  const filterDebounceRef = useRef(null);
  const filterByAccessDebounceRef = useRef(null);

  const handleSearchQueryChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      if (!value.trim()) {
        setDisplayedExercise(allExercise);
        return;
      }

      const query = value.toLowerCase();
      const foundExercises = allExercise.filter((ex) => ex.name?.toLowerCase().includes(query));
      setDisplayedExercise(foundExercises);
    }, 300);
  };

  //filter logic
  const [filterQuery, setFilterQuery] = useState('');

  const handleFilterQueryChange = (value) => {
    if (filterDebounceRef.current) {
      clearTimeout(filterDebounceRef.current);
    }

    filterDebounceRef.current = setTimeout(() => {
      setFilterQuery(value);
      if (!value.trim()) {
        setDisplayedExercise(allExercise);
        return;
      }

      const query = value.toLowerCase();
      const foundExercise = allExercise.filter((ex) => ex.muscleGroups?.join(',').toLowerCase().includes(query));

      setDisplayedExercise(foundExercise);
    }, 300);
  };


  //filter by access logic
  const [filterByAccessQuery, setFilterByAccessQuery] = useState('');

  const handleFilterByAccessQueryChange = (value) => {
    if (filterByAccessDebounceRef.current) {
      clearTimeout(filterByAccessDebounceRef.current);
    }

    filterByAccessDebounceRef.current = setTimeout(() => {
      setFilterByAccessQuery(value);
      if (!value.trim()) {
        setDisplayedExercise(allExercise);
        return;
      }

      const query = value;
      console.log(query);
      
      let foundExercise = [];
      if (query === 'isPrivate') {
        foundExercise = allExercise.filter((ex) => ex.isPrivate)
      } else if (query === "isPublic") {
        foundExercise = allExercise.filter((ex) => ex.isPublic)
      } else if (query === "isGlobal") {

        foundExercise = allExercise.filter((ex) => ex.isGlobal)
        // console.log("foundExercise",foundExercise);
        
      }


      setDisplayedExercise(foundExercise);
    }, 300);
  };


  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-3 py-6 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/30">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-700 dark:text-cyan-300">
              <Dumbbell className="h-4 w-4" />
              Exercise library
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Manage your workouts</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                Create, update, and organise your exercise catalog with a clean, modern workspace.
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              setEditingId(null);
              setShowFormUi(true);
              resetState();
            }}
            className="rounded-full bg-gradient-to-r from-cyan-600 to-sky-500 px-5 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01] hover:from-cyan-500 hover:to-sky-400 dark:from-cyan-500 dark:to-sky-400 dark:text-slate-950"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New exercise
          </Button>
        </div>
      </div>

      {showFormUi ? (
        <Card className="overflow-hidden border border-slate-200/80 bg-white/95 text-slate-900 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] dark:border-white/10 dark:bg-slate-900/95 dark:text-slate-50 dark:shadow-black/30">
          <div ref={editFormRef}></div>
          <CardHeader className="border-b border-slate-200/80 pb-5 dark:border-white/10">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-2xl font-semibold">
                  {editingId ? 'Update exercise' : 'Create exercise'}
                </CardTitle>
                <CardDescription className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {editingId ? 'Adjust the exercise details below.' : 'Add a new exercise to your library.'}
                </CardDescription>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setShowFormUi(false);
                  resetState();
                }}
                className="rounded-full border border-slate-300 p-2 bg-red-600 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Cross className="h-4 w-4 rotate-45" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Exercise name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} required className="rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" value={form.description} onChange={handleChange} className="rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="muscleGroups">Muscle groups</Label>
                <select
                  id="muscleGroups"
                  name="muscleGroups"
                  multiple
                  value={form.muscleGroups}
                  onChange={handleMultiSelect}
                  className="h-32 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
                >
                  {muscleGroupsList.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-slate-500 dark:text-slate-400">Hold Ctrl/Cmd to select multiple groups.</p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="muscles">Muscles <span></span></Label>
                <Input
                  id="muscles"
                  name="muscles"
                  value={form.muscles.join(' ')}
                  onChange={(e) => {
                    const muscles = e.target.value.split(' ').filter(Boolean);
                    setForm({ ...form, muscles });
                  }}
                  className="rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
                />
                 <p className="text-sm text-slate-500 dark:text-slate-400">Seprate muscles with comma.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment</Label>
                <Select value={form.equipment || undefined} onValueChange={(value) => setForm({ ...form, equipment: value })}>
                  <SelectTrigger className="w-full rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50">
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {equipmentList.map((eq) => (
                        <SelectItem value={eq} key={eq}>{eq}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={form.category || undefined} onValueChange={(value) => setForm({ ...form, category: value })}>
                  <SelectTrigger className="w-full rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categoryList.map((cat) => (
                        <SelectItem value={cat} key={cat}>{cat}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={form.difficulty || undefined} onValueChange={(value) => setForm({ ...form, difficulty: value })}>
                  <SelectTrigger className="w-full rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {difficultyList.map((d) => (
                        <SelectItem value={d} key={d}>{d}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Input id="instructions" name="instructions" value={form.instructions} onChange={handleChange} placeholder="Comma separated" className="rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tips">Tips</Label>
                <Input id="tips" name="tips" value={form.tips} onChange={handleChange} placeholder="Comma separated" className="rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50" />
              </div>

              <div className="flex flex-wrap gap-6 md:col-span-2">
                <label className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                  <input type="checkbox" name="isPrivate" checked={form.isPrivate} onChange={handleChange} />
                  Private
                </label>

                <label className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                  <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} />
                  Public
                </label>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="gifUrl">GIF URL</Label>
                <Input id="gifUrl" name="gifUrl" value={form.gifUrl} onChange={handleChange} className="rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input id="videoUrl" name="videoUrl" value={form.videoUrl} onChange={handleChange} className="rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50" />
              </div>

              <div className="md:col-span-2">
                <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-cyan-600 to-sky-500 px-5 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01] hover:from-cyan-500 hover:to-sky-400 dark:from-cyan-500 dark:to-sky-400 dark:text-slate-950">
                  {editingId ? 'Update exercise' : 'Create exercise'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}

      <div className="space-y-4">
        <div className="flex flex-col gap-3 rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/30" >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Exercises</h3>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
              {exercises.length} total
            </span>
          </div>

          <div className='flex flex-row justify-between items-center gap-3'>
            <div>
              <Field orientation="horizontal">
                <Input
                  type="search"
                  placeholder="Search exercises by name"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                />
              </Field>
            </div>

            <div>
              <Select value={filterQuery} onValueChange={(value) => { handleFilterQueryChange(value) }}>
                <SelectTrigger>
                  <SelectValue placeholder={"select muscle group to filter"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={" "}>All</SelectItem>
                    {
                      muscleGroupsList.map((m, i) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filterByAccessQuery} onValueChange={(value) => { handleFilterByAccessQueryChange(value) }}>
                <SelectTrigger>
                  <SelectValue placeholder={"select access group to filter"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={" "}>All</SelectItem>
                    {
                      access.map((m, i) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>



        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {displayedExercise.map((ex) => (
            <Card key={ex._id} className="group flex h-full flex-col overflow-hidden border border-slate-200/80 bg-white/90 shadow-lg shadow-slate-200/60 transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/20">
              <Link to={`/ExerciseDetails/${ex._id}`} className="block">
                <img
                  src={ex.gifUrl.secure_url}
                  alt="Exercise cover"
                  className="aspect-video w-full object-cover brightness-70 grayscale transition duration-200 group-hover:brightness-90 dark:brightness-50"
                />
              </Link>
              <CardHeader className="pb-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
                  <div className="min-w-0">
                    <h4 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-50">{ex.name}</h4>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {ex.isGlobal ? 'Global Exercise' : ex.isPrivate ? 'Private Exercise' : 'Public Exercise'}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto px-5 pb-4">
                <Link to={`/ExerciseDetails/${ex._id}`} className="block">
                  <div className="space-y-2">
                    <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{ex.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1 text-sm text-slate-500 dark:text-slate-400">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800/80">Muscles: {ex.muscleGroups?.join(', ')}</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800/80">Difficulty: {ex.difficulty}</span>
                    </div>
                  </div>
                </Link>
              </CardContent>
              <CardFooter className="flex gap-2 border-t border-slate-200/70 bg-slate-50/70 px-5 py-4 dark:border-white/10 dark:bg-slate-950/30">
                {
                  ex.isGlobal ? <></> : (
                    <Button variant="outline" size="sm" onClick={() => handleEdit(ex)} className="flex-1 rounded-full border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                      <PencilLine className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  )
                }
                <DeletePopUp actionHandler={() => handleDelete(ex._id)} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseManager;
