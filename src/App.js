import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
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
import SignInVarificationCode from "./components/registration/SignInVarificationCode";
import AzureInventoryDetails from "./components/dashboard/cloudVendors/AzureInventoryDetails";
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react'
import { AppStateContext } from './components/Context'
import AzureLoadBalancer from "./components/dashboard/cloudVendors/azure/AzureLoadBalancer";
import AzureDnsZone from "./components/dashboard/cloudVendors/azure/AzureDnsZone";
import AzureRouteTable from "./components/dashboard/cloudVendors/azure/AzureRouteTable";
import AzureVirtualWans from "./components/dashboard/cloudVendors/azure/AzureVirtualWans";
import AzureNatGateway from "./components/dashboard/cloudVendors/azure/AzureNatGateway";
import AzurePublicIpAddress from "./components/dashboard/cloudVendors/azure/AzurePublicIpAddress";
import AzureAdvisor from "./components/dashboard/cloudVendors/azure/AzureAdvisor";
import AzureServiceHealth from "./components/dashboard/cloudVendors/azure/AzureServiceHealth";
import AzureSubscription from "./components/dashboard/cloudVendors/azure/AzureSubscription";
import AzureResourceGroups from "./components/dashboard/cloudVendors/azure/AzureResourceGroups";
import AzureVirtualMachine from "./components/dashboard/cloudVendors/azure/AzureVirtualMachine";
import AzureDisks from "./components/dashboard/cloudVendors/azure/AzureDisks";
import AzureAplicationSecurityGroup from "./components/dashboard/cloudVendors/azure/AzureAplicationSecurityGroup";
import AzureNetworkSecurityGroups from "./components/dashboard/cloudVendors/azure/AzureNetworkSecurityGroups";
import AzureStorageAccounts from "./components/dashboard/cloudVendors/azure/AzureStorageAccounts";
import RegistrationLayout from "./components/registration/RegistrationLayout";

function App() {
  const navigate = useNavigate();
  const { loading, isoAuth, isLogin } = useContext(AppStateContext)
  return (
    <div className="container-flude">

      <Routes>
        <Route path="/" element={<RegistrationLayout />} >
          <Route index element={<SignIn />} />
          <Route path="registration/signin" element={<SignIn />} />
          <Route path="registration/signin_varification_code" element={<SignInVarificationCode />} />
          <Route path="registration/signup" element={<SignUp />} />
          <Route path="registration/forgot_password" element={<ForgotPassword />} />
          <Route path="registration/varification_code" element={<VarificationCode />} />
          <Route path="registration/update_password" element={<UpdatePassword />} />
          <Route path="registration/request_success" element={<RequestSuccess />} />
        </Route>

        <Route path="cloudapp/dashboard" element={<DashboardLyout />} >
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="AWS" element={<Aws />} />
          <Route path="Azure" element={<Azure />} />
          {/* Azure Networking */}
          <Route path="azure/virtualNetwork" element={<AzureInventoryDetails />} />
          <Route path="azure/loadBalancer" element={<AzureLoadBalancer />} />
          <Route path="azure/dnsZone" element={<AzureDnsZone />} />
          <Route path="azure/routeTable" element={<AzureRouteTable />} />
          <Route path="azure/virtualWans" element={<AzureVirtualWans />} />
          <Route path="azure/natGateway" element={<AzureNatGateway />} />
          <Route path="azure/publicIpAddress" element={<AzurePublicIpAddress />} />
          {/* Azure General */}
          <Route path="azure/advisor" element={<AzureAdvisor />} />
          <Route path="azure/resourceGroups" element={<AzureResourceGroups />} />
          <Route path="azure/serviceHealth" element={<AzureServiceHealth />} />
          <Route path="azure/subscription" element={<AzureSubscription />} />
          {/* Azure Compute */}
          <Route path="azure/virtualMachine" element={<AzureVirtualMachine />} />
          <Route path="azure/disks" element={<AzureDisks />} />
          {/* Azure Security */}
          <Route path="azure/applicationSecurityGroups" element={<AzureAplicationSecurityGroup />} />
          <Route path="azure/networkSecurityGroups" element={<AzureNetworkSecurityGroups />} />
          {/* Azure Storage Accounts */}
          <Route path="azure/storageAccounts" element={<AzureStorageAccounts />} />

          <Route path="GCP" element={<Gcp />} />
          <Route path="summary" element={<Summary />} />
          <Route path="reports" element={<Reports />} />
          <Route path="account-management" element={<AccountManagement />} />
        </Route>

      </Routes>

    </div>
  );
}

export default App;
