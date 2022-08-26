

import React, { useState, useEffect, createContext } from "react";

const AppStateContext = React.createContext();

const AppStateContextProvider = props => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState()
  const [virtualNetwork, setVirtualNetwork] = useState([])
  const [resourceGroup, setResourceGroup] = useState([])
  const [accountCredentials, setAzureCredentails] = useState([])
  const [loadBalancer, setLoadBalancer] = useState([])
  const [azureSubscription, setAzureSubscription] = useState([])
  

  // Get All Azure Account Details
  const getAccountDetails = async () => {
    setLoading(true)
    const response = await fetch("http://localhost:3000/api/v1/azure_accounts/azure_account_details", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const res = await response.json()
    console.log(res)
    setResourceGroup(res.resourceGroup)
    setVirtualNetwork(res.virtualNetwork)
    setAzureCredentails(res.azureCredential)
    setLoadBalancer(res.loadBalancer)
    setAzureSubscription(res.azureSubscription)
    setLoading(false)
  }

  useEffect(() => {

    // getAccountDetails()

  }, [])

  return (
    <AppStateContext.Provider value={{
      virtualNetwork, setVirtualNetwork,
      resourceGroup, setResourceGroup,
      accountCredentials, setAzureCredentails,
      loadBalancer, setLoadBalancer,
      azureSubscription, setAzureSubscription,
      loading, setLoading,
      isLogin, setIsLogin,

    }}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export { AppStateContextProvider, AppStateContext };