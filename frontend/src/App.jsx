import React,{useEffect} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Loding from "./Components/Loding";
import {useAppContext } from "./Context/AppContext";
import Navbar from "./Components/MyComponents/Navbar";
import { TooltipProvider } from "./Components/ui/tooltip";
import { SidebarHeader, SidebarProvider, SidebarTrigger } from "./Components/ui/sidebar";
import { Toaster } from "sonner";
import { Dumbbell } from "lucide-react";
import { ThemeToggle } from "./Components/MyComponents/ThemeToggle";

const App = () => {
  const { loading,userDetails,getUserDetails } = useAppContext();

  console.log("userDetails in App.jsx:", userDetails); // Log userDetails to check its value
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <Router>
      <TooltipProvider>
        <SidebarProvider>
          <Navbar />
          <main className="w-full">
            <div className="w-full">
              <SidebarHeader className="border-b border-border/60 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-600">
              <Dumbbell size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">FitTrack</p>
              <p className="text-xs text-muted-foreground">Daily progress hub</p>
            </div>
          </div>
         <div className="flex items-center gap-3">
           <ThemeToggle />

          <SidebarTrigger />
         </div>
        </div>
      </SidebarHeader>
            </div>
            <AppRoutes />
          </main>
          <Toaster position="top-right" richColors />
        </SidebarProvider>
      </TooltipProvider>
      {/* {loading && <Loding />} */}
    </Router>
  );
};

export default App;
