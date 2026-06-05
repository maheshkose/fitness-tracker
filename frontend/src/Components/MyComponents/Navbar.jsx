import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="w-full flex justify-between items-center">
            <h1>Fitness Tracker</h1>
            <ThemeToggle />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <Link to={'/'}>Dashboard</Link>
            <Link to={'/Metrics'}>Metrics</Link>
            <Link to={'/Exercise'}>Exercise</Link>
            <Link to={'/Profile'}>Profile</Link>
            <Link to={'/Progress'}>Progress</Link>
            <Link to={'/WorkoutPlans'}>Workout Plans</Link>
            <Link to={'/WorkoutSession'}>Workout Session</Link>
            
          </SidebarGroup>
          <SidebarGroup>
            <div className="w-full flex flex-col justify-center items-start">
                <Link to={'/register'}>Register</Link>
                <Link to={'/login'}>Login</Link>
                <Link>LogOut</Link>
            </div>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <h1>Footer</h1>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default Navbar;
