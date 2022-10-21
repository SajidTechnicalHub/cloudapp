import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AppStateContext } from '../../Context';
import Loading from '../cloudVendors/azure/Loading';
import axios from 'axios';
import { baseUrl } from '../cloudVendors/azure/GetAzureServices';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


const NetworkInsights = () => {

  const {

    isoAuth, setoAuth,
    isLoading, setIsLoading,
    azureVirtualNetworkData, setAzureVirtualNetworkData,
    azurePublicIpAddressData, setAzurePublicIpAddressData,
    azureNetworkSecurityGroupsdata, setazureNetworkSecurityGroupsdata,

  } = useContext(AppStateContext)


  const data = [
    {
      name: "VNETs",
      value: azureVirtualNetworkData,
    },
    {
      name: "NSGs",
      value: azureNetworkSecurityGroupsdata,
    },
    {
      name: "Public IPs",
      value: azurePublicIpAddressData,

    },

  ];
  
  const getAzurenetworks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/azure_dashboards/azure_network_insights`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      // setAzureNetworkInsightsData(response.data)
      setAzureVirtualNetworkData(response.data.azureVitrualNetwork)
      setAzurePublicIpAddressData(response.data.azurePublicIpAddress)
      setazureNetworkSecurityGroupsdata(response.data.azureNetworkSecurityGroups)

    }
    catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    getAzurenetworks()


  }, [])

  return (
    <>
      <BarChart
        width={500}
        height={350}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="value" fill="#8884d8" />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </>
  )
}

export default NetworkInsights