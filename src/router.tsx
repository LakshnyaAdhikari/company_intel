import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/layouts/AppLayout";
import { Companies } from "@/pages/Companies";
import { CompanyProfile } from "@/pages/CompanyProfile";
import { Compare } from "@/pages/Compare";
import { Dashboard } from "@/pages/Dashboard";
import { NewAnalysis } from "@/pages/NewAnalysis";
import { LandingPage } from "@/pages/LandingPage";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  // Protected Workspace Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "analyze",
            element: <NewAnalysis />
          },
          {
            path: "company/:id",
            element: <CompanyProfile />
          },
          {
            path: "companies",
            element: <Companies />
          },
          {
            path: "compare",
            element: <Compare />
          }
        ]
      }
    ]
  }
]);
