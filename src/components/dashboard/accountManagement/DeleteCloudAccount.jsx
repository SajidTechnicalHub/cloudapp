import React from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import axios from 'axios'
import { useContext } from 'react'
import { AppStateContext } from '../../Context' 
import { baseUrl } from '../cloudVendors/azure/GetAzureServices'


const DeleteCloudAccount = (props) => {

    const {
        isLogin, setIsLogin,
        loading, setLoading,
        isoAuth, setoAuth,
        virtualNetwork, setVirtualNetwork,
        loadBalancer, setLoadBalancer,
        azureDnsZone, setAzureDnsZone,
        azureRouteTable, setAzureRouteTable,
        azureNatGateway, setAzureNatGateway,
        azureVirtualWans, setAzureVirtualWans,
        azurePublicIpAddress, setAzurePublicIpAddress,
        azureNetworkSecurityGroups, setAzureNetworkSecurityGroups,
        azureApplicationSecurityGroups, setAzureApplicationSecurityGroups,
        azureStorageAccount, setAzureStorageAccount,
        azureSupportsTickets, setAzureSupportsTickets,
        azureRecommendation, setAzureRecommendation,
        azureVirtualMachine, setAzureVirtualMachine,
        azureDisks, setAzureDisks,
    
        resourceGroup, setResourceGroup,
        accountCredentials, setAzureCredentails,
        azureSubscription, setAzureSubscription,
    
      } = useContext(AppStateContext)

    // Get All Azure Account Details
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
      setoAuth(false)
      setLoading(false)
    }
    catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const updateAzureAccounts = () =>{
    
  
    
      const request1 = axios.get(`${baseUrl}/azure_resource_groups/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request2 = axios.get(`${baseUrl}/azure_subscription/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request3 = axios.get(`${baseUrl}/azure_recommendations/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request4 = axios.get(`${baseUrl}/azure_supports_tickets/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request5 = axios.get(`${baseUrl}/azure_recommendations/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request6 = axios.get(`${baseUrl}/azure_application_security_groups/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request7 = axios.get(`${baseUrl}/azure_storage_accunt/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request8 = axios.get(`${baseUrl}/azure_application_security_groups/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request9 = axios.get(`${baseUrl}/azure_network_security_groups/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request10 = axios.get(`${baseUrl}/azure_public_ip_address/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request11 = axios.get(`${baseUrl}/azure_virtual_wans/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request12 = axios.get(`${baseUrl}/azure_nat_gateway/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request13 = axios.get(`${baseUrl}/azure_route_tables/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request14 = axios.get(`${baseUrl}/azure_dns_zone/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request15 = axios.get(`${baseUrl}/azure_virtual_machine/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request16 = axios.get(`${baseUrl}/azure_load_balancer/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      const request17 = axios.get(`${baseUrl}/azure_disks/index`,{headers:{
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    }});
      
      
      axios.all([request1, request2, request3, request4, request5, request6, request7, 
        request8, request9, request10, request11, request12, request13, request14, request15, 
        request16, request17 ])
      
      .then(axios.spread((res)=>{
        console.log(res[0])
        console.log(res[1])
        console.log(res[2])
        console.log(res[3])
        console.log(res[4])
        console.log(res[6])
        console.log(res[7])
        console.log(res[8])
        console.log(res[9])
        console.log(res[10])
        console.log(res[11])
        console.log(res[12])
        console.log(res[13])
        console.log(res[14])
        console.log(res[15])
        console.log(res[16])
        console.log(res[17])
        
      }))
      
      .catch((err)=>console.log(err));
  
      
  }

    const handleDeleteAccount = async () =>{
    //    console.log(props.deleteAccoutData)
       const response = await axios.delete(`${baseUrl}/azure_credentials/${props.deleteAccoutData}`, {
    
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
         
        })
        if (response.status == 200) {
          console.log(response)
          getAccountDetails()
        }

        props.handleDeleteClose()
    }
 
    return (
        <>
            <div className='delete-cloud-account-container'>
                <div className="delete-account-block">
                    <div className="delete-icon">
                        <BsQuestionCircle fontSize='100px' color='orange' />
                    </div>
                    <span className='delete-text'>Delete?</span>
                    <span className='delete-ensure'>Please ensure and then confirm!</span>
                    <div className="delete-account-btn-block ">
                        <span onClick={props.handleDeleteClose} className='delete-account-cancel-btn'>No, Cancel!</span>
                        <button onClick={handleDeleteAccount} className='delete-account-btn'>Yes, Delete it!</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteCloudAccount