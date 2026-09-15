import React from "react";
import {
  Activity,
  CalendarDays,
  Dumbbell,
  LayoutGrid,
  LogIn,
  LogOut,
  Sparkles,
  TrendingUp,
  UserCircle2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  
} from "../ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { NavLink } from "react-router-dom";
import { useAppContext } from "@/Context/AppContext";


const mainNavItems = [
  { to: "/", label: "Dashboard", icon: LayoutGrid },
  { to: "/Metrics", label: "Metrics", icon: Activity },
  { to: "/Exercise", label: "Exercise", icon: Dumbbell },
  { to: "/Profile", label: "Profile", icon: UserCircle2 },
  { to: "/Progress", label: "Progress", icon: TrendingUp },
  { to: "/WorkoutPlans", label: "Workout Plans", icon: CalendarDays },
  { to: "/WorkoutSession", label: "Workout Session", icon: Sparkles },
];

const accountNavItems = [
  { to: "/login", label: "Login", icon: LogIn },
  { to: "/logout", label: "Logout", icon: LogOut },
];

const Navbar = () => {
  const { userDetails } = useAppContext();
  return (
    <Sidebar className="border-r border-border/60 bg-background/95">
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

      <SidebarContent className="px-3 py-4">

        {/* for mobile view */}
        <SidebarGroup className="space-y-1.5 block lg:hidden">
          {mainNavItems.map(({ to, label, icon: Icon }) => (
            <SidebarTrigger 
            isInsideSidebar={true}
            className="w-full flex items-center justify-start gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all hover:bg-muted hover:text-foreground"
            >
              <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${isActive
                  ? "bg-emerald-500/15 text-emerald-600 shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
             
            >
              <Icon size={16} />
              <span>{label}</span>
              
            </NavLink>
            </SidebarTrigger>
          ))}
        </SidebarGroup>

          {/* for desktop view */}
        <SidebarGroup className="space-y-1.5 hidden lg:block">
          {mainNavItems.map(({ to, label, icon: Icon }) => (
            
              <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${isActive
                  ? "bg-emerald-500/15 text-emerald-600 shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
             
            >
              <Icon size={16} />
              <span>{label}</span>
              
            </NavLink>
            
          ))}
        </SidebarGroup>

         {/* for desktop view
        <SidebarGroup className="mt-6 space-y-1.5 border-t border-border/60 pt-4 hidden lg:block">
          {accountNavItems.map(({ to, label, icon: Icon }) => {
            if (label === "Login" && userDetails) {
              return null; // Don't render Login if userDetails exists
            }
            if (label === "Logout" && !userDetails) {
              return null; // Don't render Logout if userDetails does not exist
            }
            return(
               <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${isActive
                  ? "bg-sky-500/15 text-sky-600 shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
             
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
            )
})}
        </SidebarGroup>


         {/* for mobile view *
        <SidebarGroup className="mt-6 space-y-1.5 border-t border-border/60 pt-4 lg:hidden">
          {accountNavItems.map(({ to, label, icon: Icon }) => {
            if (label === "Login" && userDetails) {
              return null; // Don't render Login if userDetails exists
            }
            if (label === "Logout" && !userDetails) {
              return null; // Don't render Logout if userDetails does not exist
            }
            return(
               <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${isActive
                  ? "bg-sky-500/15 text-sky-600 shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
             
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
            )
          })}
        </SidebarGroup> */}

      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 p-4">
        <div className="rounded-[20px] bg-gradient-to-br from-emerald-500/15 to-sky-500/10 p-4">
          <p className="text-sm font-semibold">Stay consistent</p>
          <p className="mt-1 text-xs text-muted-foreground">
            One strong workout today builds your momentum.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navbar;
