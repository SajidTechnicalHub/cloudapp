import { Routes, Route } from "react-router-dom"
import './App.css';
import DashboardHome from "./components/dashboard/dashboardLayout/DashboardHome";
import DashboardLyout from "./components/dashboard/dashboardLayout/DashboardLyout";
import SignIn from "./components/registration/SignIn";
import SignUp from "./components/registration/SignUp";


function App() {
  return (
    <div className="container-flude">
      <Routes>
        <Route path="/" element={<DashboardLyout />} >
          <Route index element={<DashboardHome />} />
          <Route path="/dashboard_home" element={<DashboardHome />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        

      </Routes>
    </div>
  );
}

export default App;
