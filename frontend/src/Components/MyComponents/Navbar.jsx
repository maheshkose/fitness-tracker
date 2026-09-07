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
  return (
    <Sidebar className="border-r border-border/60 bg-background/95">
      <SidebarHeader className="border-b border-border/60 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-600">
              <Dumbbell size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Fitness Tracker</p>
              <p className="text-xs text-muted-foreground">Daily progress hub</p>
            </div>
          </div>
          <ThemeToggle />
          
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup className="space-y-1.5">
          {mainNavItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
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

        <SidebarGroup className="mt-6 space-y-1.5 border-t border-border/60 pt-4">
          {accountNavItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-sky-500/15 text-sky-600 shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </SidebarGroup>
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
