import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Loding from "./Components/Loding";
import {useAppContext } from "./Context/AppContext";
import Navbar from "./Components/MyComponents/Navbar";
import { TooltipProvider } from "./Components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "./Components/ui/sidebar";
import { Toaster } from "sonner";

const App = () => {
  const { loading } = useAppContext();
  return (
    <Router>
      <TooltipProvider>
        <SidebarProvider>
          <Navbar />
          <main className="w-full">
            <SidebarTrigger />
            <AppRoutes />
          </main>
          <Toaster position="top-right" richColors />
        </SidebarProvider>
      </TooltipProvider>
      {loading && <Loding />}
    </Router>
  );
};

export default App;
