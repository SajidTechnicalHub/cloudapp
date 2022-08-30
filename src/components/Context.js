

import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

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


  const getAccountDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/azure_accounts/azure_account_details", {
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
      setoAuth(false)
      setLoading(false)
    }
    catch (error) {
      console.log(error);
      setLoading(false)
      setoAuth(true)
    }
  }


  useEffect(() => {

    getAccountDetails()
  }, [])



  return (
    <AppStateContext.Provider value={{
      loading, setLoading,
      isLogin, setIsLogin,
      isoAuth, setoAuth,
      isLoading, setIsLoading,
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




    }}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export { AppStateContextProvider, AppStateContext };