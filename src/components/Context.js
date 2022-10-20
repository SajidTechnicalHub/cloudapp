

import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { baseUrl } from "./dashboard/cloudVendors/azure/GetAzureServices";

const AppStateContext = React.createContext();

const AppStateContextProvider = props => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isoAuth, setoAuth] = useState(false)
  const [virtualNetwork, setVirtualNetwork] = useState([])
  const [loadBalancer, setLoadBalancer] = useState([])
  const [azureDnsZone, setAzureDnsZone] = useState([])
  const [azureRouteTable, setAzureRouteTable] = useState([])
  const [azureNatGateway, setAzureNatGateway] = useState([])
  const [azureVirtualWans, setAzureVirtualWans] = useState([])
  const [azurePublicIpAddress, setAzurePublicIpAddress] = useState([])
  const [azureNetworkSecurityGroups, setAzureNetworkSecurityGroups] = useState([])
  const [azureApplicationSecurityGroups, setAzureApplicationSecurityGroups] = useState([])
  const [azureStorageAccount, setAzureStorageAccount] = useState([])
  const [azureSupportsTickets, setAzureSupportsTickets] = useState([])
  const [azureRecommendation, setAzureRecommendation] = useState([])
  const [azureVirtualMachine, setAzureVirtualMachine] = useState([])
  const [azureDisks, setAzureDisks] = useState([])
  const [resourceGroup, setResourceGroup] = useState([])
  const [accountCredentials, setAzureCredentails] = useState([])
  const [azureSubscription, setAzureSubscription] = useState([])

  const [editAzureCredential, setEditAzureCredential] = useState([])
  const [randomNumber, setRandomNumber] = useState(0)
  const [randomNumberTimeInMinutes, setRandomNumberTimeInMinutes] = useState(0)
  const [forgotPasswordUser, setForgotPasswordUser] = useState([])
  const [azureRegion, setAzureRegion] = useState([])

  // Networks Insights Bar chart data
  const [azureVirtualNetworkData, setAzureVirtualNetworkData] = useState([])
  const [azurePublicIpAddressData, setAzurePublicIpAddressData] = useState([])
  const [azureNetworkSecurityGroupsdata, setazureNetworkSecurityGroupsdata] = useState([])


  ////////////////////////////dashboar/////////////////////////////// 

  // HighAvailability Progress Bar performanceReliability
  const [performanceReliabilityHighProgressBar, setPerformanceReliabilityHighProgressBar] = useState(0)
  const [performanceReliabilityMediumProgressBar, setPerformanceReliabilityMediumProgressBar] = useState(0)
  const [performanceReliabilityLowProgressBar, setPerformanceReliabilityLowProgressBar] = useState(0)

  const [performanceReliabilityHighImpact, setPerformanceReliabilityHighImpact] = useState(0)
  const [performanceReliabilityMediumImpact, setPerformanceReliabilityMediumImpact] = useState(0)
  const [performanceReliabilityLowImpact, setPerformanceReliabilityLowImpact] = useState(0)

  /////////////////////////////////////////////////////////////////////////

  // total impact
  const [totalHighImpact, setTotalHighImpact] = useState([])
  const [totalMediumImpact, setTotalMediumImpact] = useState([])
  const [totalLowImpact, setTotalLowImpact] = useState([])

  // Total Azure Accounts
  const [totalAzureAccounts, setTotalAzureAccounts ] = useState(0)

  const getAccountDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/azure_accounts/azure_account_details`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      // const res = await response.json()
      console.log(response)
      setAzureCredentails(response.data.azureCredential)
      setAzureSubscription(response.data.azureSubscription)
      setResourceGroup(response.data.resourceGroup)

      setVirtualNetwork(response.data.virtualNetwork)
      setLoadBalancer(response.data.loadBalancer)
      setAzureDnsZone(response.data.azureDnsZone)
      setAzureRouteTable(response.data.azureRouteTable)
      setAzureNatGateway(response.data.azureNatGateway)
      setAzureVirtualWans(response.data.azureVirtualWans)
      setAzurePublicIpAddress(response.data.azurePublicIpAddress)

      setAzureApplicationSecurityGroups(response.data.azureApplicationSecurityGroups)
      setAzureNetworkSecurityGroups(response.data.azureNetworkSecurityGroups)
      setAzureStorageAccount(response.data.azureStorageAccount)
      setAzureSupportsTickets(response.data.azureSupportsTickets)
      setAzureRecommendation(response.data.azureRecommendation)
      setAzureVirtualMachine(response.data.azureVirtualMachine)
      setAzureDisks(response.data.azureDisks)
      setAzureRegion(response.data.azureRegion)
      setoAuth(false)
      setLoading(false)
    }
    catch (error) {
      console.log(error);
      setLoading(false)

    }
  }
  const getAzureRegion = async () => {
    try {
      const response = await axios.get(`${baseUrl}/azure_dashboards/index`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })

      setAzureRegion(response.data.azureRegion)


    }
    catch (error) {
      console.log(error);
    }
  }

  const setProgressBarValues = async () => {

    try {
      const response = await axios.get(`${baseUrl}/azure_dashboards/azure_impact_count`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      console.log('count impact', response)

      setPerformanceReliabilityHighImpact(response.data.performanceReliabilityHighImpact)
      setPerformanceReliabilityMediumImpact(response.data.performanceReliabilityMediumImpact)
      setPerformanceReliabilityLowImpact(response.data.performanceReliabilityLowImpact)

      let total = performanceReliabilityHighImpact + performanceReliabilityMediumImpact + performanceReliabilityLowImpact;
      let highPer = (performanceReliabilityHighImpact / total) * 100;
      let mediumPer = (performanceReliabilityMediumImpact / total) * 100;
      let lowPer = (performanceReliabilityLowImpact / total) * 100;

      setPerformanceReliabilityHighProgressBar(Math.round(highPer))
      setPerformanceReliabilityLowProgressBar(Math.round(lowPer))
      setPerformanceReliabilityMediumProgressBar(Math.round(mediumPer))
    }
    catch (error) {
      console.log(error);
    }
    console.log('high value', performanceReliabilityHighImpact)
    console.log('medium value', performanceReliabilityMediumImpact)
    console.log('low value', performanceReliabilityLowImpact)

  }


  useEffect(() => {
    getAccountDetails()
    setProgressBarValues()
    // getAzureRegion()
  }, [])



  return (
    <AppStateContext.Provider value={{
      loading, setLoading,
      isLogin, setIsLogin,
      isoAuth, setoAuth,
      isLoading, setIsLoading,
      randomNumberTimeInMinutes, setRandomNumberTimeInMinutes,
      randomNumber, setRandomNumber,

      editAzureCredential, setEditAzureCredential,
      virtualNetwork, setVirtualNetwork,
      loadBalancer, setLoadBalancer,
      azureDnsZone, setAzureDnsZone,
      azureRouteTable, setAzureRouteTable,
      azureNatGateway, setAzureNatGateway,
      azureVirtualWans, setAzureVirtualWans,
      azurePublicIpAddress, setAzurePublicIpAddress,

      azureApplicationSecurityGroups, setAzureApplicationSecurityGroups,
      azureNetworkSecurityGroups, setAzureNetworkSecurityGroups,

      azureStorageAccount, setAzureStorageAccount,
      azureSupportsTickets, setAzureSupportsTickets,
      azureRecommendation, setAzureRecommendation,
      azureVirtualMachine, setAzureVirtualMachine,
      azureDisks, setAzureDisks,

      resourceGroup, setResourceGroup,
      accountCredentials, setAzureCredentails,
      azureSubscription, setAzureSubscription,
      editAzureCredential, setEditAzureCredential,
      forgotPasswordUser, setForgotPasswordUser,
      azureRegion, setAzureRegion,
      

      // dashboard
      performanceReliabilityHighProgressBar, setPerformanceReliabilityHighProgressBar,
      performanceReliabilityMediumProgressBar, setPerformanceReliabilityMediumProgressBar,
      performanceReliabilityLowProgressBar, setPerformanceReliabilityLowProgressBar,

      performanceReliabilityHighImpact, setPerformanceReliabilityHighImpact,
      performanceReliabilityMediumImpact, setPerformanceReliabilityMediumImpact,
      performanceReliabilityLowImpact, setPerformanceReliabilityLowImpact,

      // total Impact
      totalHighImpact, setTotalHighImpact,
      totalMediumImpact, setTotalMediumImpact,
      totalLowImpact, setTotalLowImpact,

      // Network Insights Bar Chart Data
      azureVirtualNetworkData, setAzureVirtualNetworkData,
      azurePublicIpAddressData, setAzurePublicIpAddressData,
      azureNetworkSecurityGroupsdata, setazureNetworkSecurityGroupsdata,

      // Total Azure Accounts
      totalAzureAccounts, setTotalAzureAccounts,

    }}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export { AppStateContextProvider, AppStateContext };