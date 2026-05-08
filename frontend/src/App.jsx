import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import HRDashboard from "./pages/HRDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AssignTraining from "./pages/AssignTraining";
// ✅ ADD THESE IMPORTS
import Trainings from "./pages/Trainings";
import Modules from "./pages/Modules";
import EmployeeQuiz from "./pages/EmployeeQuiz";
import AccessDenied from "./pages/AccessDenied";

import ProtectedRoute from "./components/ProtectedRoute";
import EmployeeModules from "./pages/EmployeeModules";
import Certificate from "./pages/Certificate";
import CreateTraining from "./pages/CreateTraining";

import CreateModule from "./pages/CreateModule";
import CreateQuiz from "./pages/CreateQuiz";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT ROUTE */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/quiz/:training_id" element={<EmployeeQuiz />} />
<Route path="/modules/:training_id/:enrollment_id" element={<EmployeeModules />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-training" element={<CreateTraining />} />
        <Route path="/certificates" element={<Certificate />} />
        <Route path="/quiz/:moduleId" element={<Quiz />} />
        <Route path="/create-quiz/:moduleId" element={<CreateQuiz />} />
<Route
  path="/assign-training"
  element={
    <ProtectedRoute allowedRoles={["hr"]}>
      <AssignTraining />
    </ProtectedRoute>
  }
/>
<Route
  path="/modules"
  element={
    <ProtectedRoute>
      {JSON.parse(localStorage.getItem("user"))?.role === "hr"
        ? <AccessDenied />
        : <Modules />
      }
    </ProtectedRoute>
  }
/>
<Route path="/trainer" element={<TrainerDashboard />} />
<Route path="/create-module" element={<CreateModule />} />

        <Route
  path="/hr"
  element={
    <ProtectedRoute allowedRoles={["hr"]}>
      <HRDashboard />
    </ProtectedRoute>
  }
/>

        {/* MODULES ✅ FIXED */}
        <Route
          path="/modules"
          element={
            <ProtectedRoute>
              <Modules />
            </ProtectedRoute>
          }
        />
<Route
  path="/trainings"
  element={
    <ProtectedRoute allowedRoles={["hr", "trainer"]}>
      <Trainings />
    </ProtectedRoute>
  }
/>

        {/* EMPLOYEE */}
       <Route
  path="/employee"
  element={
    <ProtectedRoute allowedRoles={["employee"]}>
      <EmployeeDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/trainings"
  element={
    <ProtectedRoute allowedRoles={["hr", "trainer"]}>
      <Trainings />
    </ProtectedRoute>
  }
/>
      

      </Routes>
    </BrowserRouter>
  );
}