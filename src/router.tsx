import { Navigate, createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/layouts/AppLayout";
import { Companies } from "@/pages/Companies";
import { CompanyProfile } from "@/pages/CompanyProfile";
import { Compare } from "@/pages/Compare";
import { Dashboard } from "@/pages/Dashboard";
import { NewAnalysis } from "@/pages/NewAnalysis";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
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
]);
