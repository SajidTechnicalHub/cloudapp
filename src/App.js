import { Routes, Route } from "react-router-dom"
import './App.css';
import DashboardHome from "./components/dashboard/dashboardLayout/DashboardHome";
import DashboardLyout from "./components/dashboard/dashboardLayout/DashboardLyout";
import SignIn from "./components/registration/SignIn";
import SignUp from "./components/registration/SignUp";
import Overview from "./components/dashboard/overview/Overview";
import Summary from "./components/dashboard/insights/Summary";
import Configuration from "./components/dashboard/insights/Configuration";
import Reports from "./components/dashboard/insights/Reports";
import AccountManagement from "./components/dashboard/accountManagement/AccountManagement";
import Aws from "./components/dashboard/inventory/Aws";
import Azur from "./components/dashboard/inventory/Azur";
import ForgotPassword from "./components/registration/ForgotPassword";
import VarificationCode from "./components/registration/VarificationCode";
import UpdatePassword from "./components/registration/UpdatePassword";
import RequestSuccess from "./components/registration/RequestSucess";



function App() {
  return (
    <div className="container-flude">
      <Routes>
        <Route path="/" element={<DashboardLyout />} >
          <Route index element={<DashboardHome />} />
          <Route path="/dashboard_home" element={<DashboardHome />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/AWS" element={<Aws/>} />
          <Route path="/Azure" element={<Azur/>} />
          <Route path="/summary" element={<Summary/>} />
          <Route path="/configuration" element={<Configuration/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/account-management" element={<AccountManagement/>} />
          
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/varification_code" element={<VarificationCode />} />
        <Route path="/update_password" element={<UpdatePassword />} />
        <Route path="/request_success" element={<RequestSuccess />} />

      </Routes>
    </div>
  );
}

export default App;
