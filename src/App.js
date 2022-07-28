import { Routes, Route } from "react-router-dom"
import './App.css';
import DashboardHome from "./components/dashboard/dashboardLayout/DashboardHome";
import DashboardLyout from "./components/dashboard/dashboardLayout/DashboardLyout";
import SignIn from "./components/registration/SignIn";
import SignUp from "./components/registration/SignUp";
import Overview from "./components/dashboard/overview/Overview";
import Summary from "./components/dashboard/cloudInsights/Summary";
import Reports from "./components/dashboard/cloudInsights/Reports";
import AccountManagement from "./components/dashboard/accountManagement/AccountManagement";
import Aws from './components/dashboard/cloudVendors/Aws'
import Azure from './components/dashboard/cloudVendors/Azure'
import Gcp from "./components/dashboard/cloudVendors/Gcp";
import ForgotPassword from "./components/registration/ForgotPassword";
import VarificationCode from "./components/registration/VarificationCode";
import UpdatePassword from "./components/registration/UpdatePassword";
import RequestSuccess from "./components/registration/RequestSucess";




function App() {
  return (
    <div className="container-flude">
      <SignIn />
      <Routes>
        <Route path="/" element={<DashboardLyout />} >
          <Route index element={<Overview />} />
          {/* <Route path="/dashboard_home" element={<DashboardHome />} /> */}
          <Route path="/overview" element={<Overview />} />
          <Route path="/AWS" element={<Aws/>} />
          <Route path="/Azure" element={<Azure/>} />
          <Route path="/GCP" element={<Gcp/>} />
          <Route path="/summary" element={<Summary/>} />
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
