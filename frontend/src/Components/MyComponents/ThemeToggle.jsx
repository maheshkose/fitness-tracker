
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";

export function ThemeToggle() {
  const [dark, setDark] = useState(()=>{
    return localStorage.getItem('theme') === "true";
  });
  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem('theme',dark);
  }, [dark]);

  return (
    <div className="flex items-center gap-2">
      <span>🌞</span>
      <Switch checked={dark} onCheckedChange={setDark} />
      <span>🌙</span>
    </div>
  );
}