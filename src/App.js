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


function App() {
  const navigate = useNavigate();
  const {loading} = useContext(AppStateContext)
  return (
    <div className="container-flude">
      {loading == true ?
        <div className="loading">

          <CircularProgress />

        </div> :
        <Routes>
          <Route path="cloudapp" element={<DashboardLyout />} >
            <Route index element={<Overview />} />
            <Route path="/cloudapp/overview" element={<Overview />} />
            <Route path="/cloudapp/AWS" element={<Aws />} />

            <Route path="/cloudapp/Azure" element={<Azure />} />

            {/* Azure Networking */}
            <Route path="/cloudapp/azure/virtualNetwork" element={<AzureInventoryDetails />} />
            <Route path="/cloudapp/azure/loadBalancer" element={<AzureLoadBalancer />} />
            <Route path="/cloudapp/azure/dnsZone" element={<AzureDnsZone />} />
            <Route path="/cloudapp/azure/routeTable" element={<AzureRouteTable />} />
            <Route path="/cloudapp/azure/virtualWans" element={<AzureVirtualWans />} />
            <Route path="/cloudapp/azure/natGateway" element={<AzureNatGateway />} />
            <Route path="/cloudapp/azure/publicIpAddress" element={<AzurePublicIpAddress />} />

            {/* Azure General */}
            <Route path="/cloudapp/azure/advisor" element={<AzureAdvisor />} />
            <Route path="/cloudapp/azure/resourceGroups" element={<AzureResourceGroups />} />
            <Route path="/cloudapp/azure/serviceHealth" element={<AzureServiceHealth />} />
            <Route path="/cloudapp/azure/subscription" element={<AzureSubscription />} />

            {/* Azure Compute */}
            <Route path="/cloudapp/azure/virtualMachine" element={<AzureVirtualMachine />} />
            <Route path="/cloudapp/azure/disks" element={<AzureDisks />} />

            {/* Azure Security */}
            <Route path="/cloudapp/azure/applicationSecurityGroups" element={<AzureAplicationSecurityGroup />} />
            <Route path="/cloudapp/azure/networkSecurityGroups" element={<AzureNetworkSecurityGroups />} />

            {/* Azure Storage Accounts */}
            <Route path="/cloudapp/azure/storageAccounts" element={<AzureStorageAccounts />} />

            
            <Route path="/cloudapp/GCP" element={<Gcp />} />
            <Route path="/cloudapp/summary" element={<Summary />} />
            <Route path="/cloudapp/reports" element={<Reports />} />
            <Route path="/cloudapp/account-management" element={<AccountManagement />} />

            
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signin_varification_code" element={<SignInVarificationCode />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/varification_code" element={<VarificationCode />} />
          <Route path="/update_password" element={<UpdatePassword />} />
          <Route path="/request_success" element={<RequestSuccess />} />


        </Routes>}


    </div>
  );
}

export default App;
