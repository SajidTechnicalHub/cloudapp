

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
  const [azureNetworkInsights, setAzureNetworkInsights] = useState([])


  ////////////////////////////dashboar/////////////////////////////// 

  // HighAvailability Progress Bar

  const [highAvailabilityHighProgressBar, setHighAvailabilityHighProgressBar] = useState(0)
  const [highAvailabilityMediumProgressBar, setHighAvailabilityMediumProgressBar] = useState(0)
  const [highAvailabilityLowProgressBar, setHighAvailabilityLowProgressBar] = useState(0)

  const [highAvailabilityHighImpact, setHighAvailabilityHighImpact] = useState(0)
  const [highAvailabilityMediumImpact, setHighAvailabilityMediumImpact] = useState(0)
  const [highAvailabilityLowImpact, setHighAvailabilityLowImpact] = useState(0)

  /////////////////////////////////////////////////////////////////////////

  // total impact

  const [totalHighImpact, setTotalHighImpact] = useState([])
  const [totalMediumImpact, setTotalMediumImpact] = useState([])
  const [totalLowImpact, setTotalLowImpact] = useState([])

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

      setHighAvailabilityHighImpact(response.data.highAvailabilityHighImpact)
      setHighAvailabilityMediumImpact(response.data.highAvailabilityMediumImpact)
      setHighAvailabilityLowImpact(response.data.highAvailabilityLowImpact)

      let total = highAvailabilityHighImpact + highAvailabilityMediumImpact + highAvailabilityLowImpact;
      let highPer = (highAvailabilityHighImpact / total) * 100;
      let mediumPer = (highAvailabilityMediumImpact / total) * 100;
      let lowPer = (highAvailabilityLowImpact / total) * 100;

      setHighAvailabilityHighProgressBar(Math.round(highPer))
      setHighAvailabilityLowProgressBar(Math.round(lowPer))
      setHighAvailabilityMediumProgressBar(Math.round(mediumPer))
    }
    catch (error) {
      console.log(error);
    }
    console.log('high value', highAvailabilityHighImpact)
    console.log('medium value', highAvailabilityMediumImpact)
    console.log('low value', highAvailabilityLowImpact)

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
      azureNetworkInsights, setAzureNetworkInsights,

      // dashboard
      highAvailabilityHighProgressBar, setHighAvailabilityHighProgressBar,
      highAvailabilityMediumProgressBar, setHighAvailabilityMediumProgressBar,
      highAvailabilityLowProgressBar, setHighAvailabilityLowProgressBar,

      highAvailabilityHighImpact, setHighAvailabilityHighImpact,
      highAvailabilityMediumImpact, setHighAvailabilityMediumImpact,
      highAvailabilityLowImpact, setHighAvailabilityLowImpact,

      // total Impact
      totalHighImpact, setTotalHighImpact,
      totalMediumImpact, setTotalMediumImpact,
      totalLowImpact, setTotalLowImpact,

    }}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export { AppStateContextProvider, AppStateContext };