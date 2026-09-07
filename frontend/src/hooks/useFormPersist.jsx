import { useState, useEffect } from "react";
// import { toast } from "sonner";

const useFormPersist = (key, initialState) => {
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      const parsed = saved ? JSON.parse(saved) : initialState;
      return {
        // ...initialState,
        ...parsed,
        // isPrivate: parsed?.isPrivate === true,
        // isPublic: parsed?.isPublic === true,
      };
    } catch (error) {
      console.error("Error loading form data", error);
      // toast.error("Failed to load saved form");
      return initialState;
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(form));
      } catch (error) {
        console.error("Error saving form data", error);
        // toast.error("Failed to save form");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [key, form]);

  const resetState = () => {
    setForm(initialState);
    localStorage.removeItem(key);
  };

  return { form, setForm, resetState };
};

export default useFormPersist;
