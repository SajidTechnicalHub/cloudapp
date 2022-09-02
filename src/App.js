import { Routes, Route, useNavigate } from "react-router-dom"
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
  const { loading } = useContext(AppStateContext)
  return (
    <div className="container-flude">
      {loading == true ?
        <div className="loading">

          <CircularProgress />

        </div> :
        <Routes>
          <Route path="cloudapp" element={<RegistrationLayout />} >
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
            <Route path="dashboard/overview" element={<Overview />} />
            <Route path="dashboard/AWS" element={<Aws />} />
            <Route path="dashboard/Azure" element={<Azure />} />
            {/* Azure Networking */}
            <Route path="dashboard/azure/virtualNetwork" element={<AzureInventoryDetails />} />
            <Route path="dashboard/azure/loadBalancer" element={<AzureLoadBalancer />} />
            <Route path="dashboard/azure/dnsZone" element={<AzureDnsZone />} />
            <Route path="dashboard/azure/routeTable" element={<AzureRouteTable />} />
            <Route path="dashboard/azure/virtualWans" element={<AzureVirtualWans />} />
            <Route path="dashboard/azure/natGateway" element={<AzureNatGateway />} />
            <Route path="dashboard/azure/publicIpAddress" element={<AzurePublicIpAddress />} />
            {/* Azure General */}
            <Route path="dashboard/azure/advisor" element={<AzureAdvisor />} />
            <Route path="dashboard/azure/resourceGroups" element={<AzureResourceGroups />} />
            <Route path="dashboard/azure/serviceHealth" element={<AzureServiceHealth />} />
            <Route path="dashboard/azure/subscription" element={<AzureSubscription />} />
            {/* Azure Compute */}
            <Route path="dashboard/azure/virtualMachine" element={<AzureVirtualMachine />} />
            <Route path="dashboard/azure/disks" element={<AzureDisks />} />
            {/* Azure Security */}
            <Route path="dashboard/azure/applicationSecurityGroups" element={<AzureAplicationSecurityGroup />} />
            <Route path="dashboard/azure/networkSecurityGroups" element={<AzureNetworkSecurityGroups />} />
            {/* Azure Storage Accounts */}
            <Route path="dashboard/azure/storageAccounts" element={<AzureStorageAccounts />} />

            <Route path="dashboard/GCP" element={<Gcp />} />
            <Route path="dashboard/summary" element={<Summary />} />
            <Route path="dashboard/reports" element={<Reports />} />
            <Route path="dashboard/account-management" element={<AccountManagement />} />


          </Route>
        </Routes>}


    </div>
  );
}

export default App;
