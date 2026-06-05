import React, { useEffect, useState } from "react";
import axios from "axios";
import { AwardIcon, Cross, CrossIcon } from "lucide-react";
import {useAppContext} from "../../../Context/AppContext"
import { toast } from "sonner";
import useFormPersist from "../../../hooks/useFormPersist";

const ExerciseManager = () => {
  const muscleGroupsList = [
    "chest",
    "back",
    "legs",
    "arms",
    "shoulders",
    "core",
    "full body",
  ];
  const equipmentList = [
    "bodyweight",
    "dumbbell",
    "barbell",
    "machine",
    "cable",
    "kettlebell",
    "resistance band",
  ];
  const categoryList = ["compound", "isolation"];
  const difficultyList = ["beginner", "intermediate", "advanced"];

  const {
    createExercise,
    getAllExercises,
    getExerciseById,
    updateExercise,
    deleteExercise,
  } = useAppContext();
  const [exercises, setExercises] = useState([]);

  const { form, setForm, resetState } = useFormPersist("exerciseForm", {
    name: "",
    description: "",
    muscleGroups: [],
    muscles: [],
    primaryMuscle: "",
    equipment: "",
    category: "",
    difficulty: "",
    instructions: "",
    tips: "",
    isCustom: true,
    isPublic: false,
    gifUrl: "dffdg",
    videoUrl: "dfgs",
  });

  const [showFormUi, setshowFormUi] = useState(false)
  const [editingId, setEditingId] = useState(null);
  console.log("editingId",editingId);
  
  //  GET ALL
  const getAllExercisesHandler = async () => {
    const res = await getAllExercises();
    if (res.data.success) {
      toast.success(res.data.message);
      setExercises(res.data.exercises);
    } else {
      toast.error(res.data.message || "failed to load exercises");
    }
  };

  useEffect(() => {
    getAllExercisesHandler();
  }, []);

  // 🟢 HANDLE INPUT
 
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setForm({ ...form, [e.target.name]: e.target.checked });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleMultiSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value,
    );

    setForm({ ...form, muscleGroups: selectedOptions });
  };

  // 🟢 CREATE / UPDATE
   const handleSubmit = (e)=>{
     e.preventDefault();
     if (editingId) {
      handleUpdateExercise();
     }else{
      handleCreateExercise();
     }
  }
  const handleUpdateExercise = async (e) => {
   
    const res = await updateExercise(editingId,form);
    if (res.data?.success) {
      toast.success(res.data?.message || "Exercise Upadated successfully!");
      getAllExercisesHandler();
      resetState();
    } else {
      toast.error(res?.data?.message || "Failed to Upadate exercise");
    }
  };
  const handleCreateExercise = async (e) => {
   
    const res = await createExercise(form);
    if (res.data?.success) {
      toast.success(res.data?.message || "Exercise created successfully!");
      getAllExercisesHandler();
      resetState();
    } else {
      toast.error(res?.data?.message || "Failed to create exercise");
    }
  };

  // 🟡 EDIT
  const handleEdit = (exercise) => {
    setshowFormUi(true);
  setEditingId(exercise._id);
  setForm({
    name: exercise.name || "",
    description: exercise.description || "",

    // must be array for multi-select
    muscleGroups: exercise.muscleGroups || [],

    // ensure array
    muscles: exercise.muscles || [],

    primaryMuscle: exercise.primaryMuscle || "",

    equipment: exercise.equipment || "",
    category: exercise.category || "",
    difficulty: exercise.difficulty || "",

    instructions: exercise.instructions || "",
    tips: exercise.tips || "",

    // ensure boolean
    isCustom: exercise.isCustom ?? true,
    isPublic: exercise.isPublic ?? false,

    gifUrl: exercise.gifUrl || "",
    videoUrl: exercise.videoUrl || "",
  });
};

  // 🔴 DELETE
  const handleDelete = async (id) => {
    const res = await deleteExercise(id);
    if (res.data?.success) {
      toast.success(res.data?.message || "Exercise deleted successfully!");
      getAllExercisesHandler();
    } else {
      toast.error(res?.data?.message || "Failed to delete exercise");
    }
  };
  console.log("form", form);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Exercise Manager</h1>
      <h2 className="text-2xl font-bold mb-6 text-center" onClick={()=>{setshowFormUi(true)}}>Create Exercise</h2>

     { /* FORM */
      showFormUi ? 
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-4"
      >
        <div>
          <h2>
            {editingId ? "Update Exercise" : "Create Exercise"}
          </h2>
          <h2 onClick={()=>{setEditingId(null); setshowFormUi(false); resetState();}}><Cross/></h2>
        </div>
        {/* NAME */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Exercise Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        {/* MUSCLE GROUP */}
        <div>
          <label className="block text-sm font-medium mb-1">Muscle Group</label>
          <select
            name="muscleGroups"
            multiple
            value={form.muscleGroups}
            onChange={handleMultiSelect}
            className="w-full border rounded-lg px-3 py-2 h-32"
          >
            <option value="" disabled>Select Muscle Group</option>
            {muscleGroupsList.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500">
            Hold Ctrl (Windows) / Cmd (Mac) to select multiple
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Muscles</label>
          <input
            name="muscles"
            value={form.muscles.join(" ")}
            onChange={(e) => {
              const Muscles = e.target.value.split(" ").filter(Boolean);
              setForm({ ...form, muscles: Muscles });
            }}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
          />
        </div>
        {/* EQUIPMENT */}
        <div>
          <label className="block text-sm font-medium mb-1">Equipment</label>
          <select
            name="equipment"
            value={form.equipment}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required={true}
          >
            <option value="" disabled>Select Equipment</option>
            {equipmentList?.map((eq) => (
              <option key={eq} value={eq}>
                {eq}
              </option>
            ))}
          </select>
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required={true}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categoryList?.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* DIFFICULTY */}
        <div>
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required={true}
          >
            <option value="">Select Difficulty</option>
            {difficultyList.map((d,i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* INSTRUCTIONS */}
        <div>
          <label className="block text-sm font-medium mb-1">Instructions</label>
          <input
            type="text"
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            placeholder="Comma separated"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* TIPS */}
        <div>
          <label className="block text-sm font-medium mb-1">Tips</label>
          <input
            type="text"
            name="tips"
            value={form.tips}
            onChange={handleChange}
            placeholder="Comma separated"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* CHECKBOXES */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isCustom"
              checked={form.isCustom}
              onChange={handleChange}
            />
            Custom Exercise
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
            />
            Public
          </label>
        </div>

        {/* URL INPUTS */}
        <div>
          <label className="block text-sm font-medium mb-1">GIF URL</label>
          <input
            name="gifUrl"
            value={form.gifUrl}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Video URL</label>
          <input
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editingId ? "Update Exercise" : "Create Exercise"}
        </button>
      </form>:""
      }

      {/* LIST */}
     

      <div className="space-y-4">
         <h3 className="text-xl font-semibold mt-8 mb-4">Exercises</h3>
        {exercises.map((ex) => (
          <div
            key={ex._id}
            className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold text-lg">{ex.name}</h4>
              <p className="text-sm text-gray-500">{ex.description}</p>
              <p className="text-sm">Muscles: {ex.muscleGroups?.join(", ")}</p>
              <p className="text-sm">Difficulty: {ex.difficulty}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(ex)}
                className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(ex._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseManager;
