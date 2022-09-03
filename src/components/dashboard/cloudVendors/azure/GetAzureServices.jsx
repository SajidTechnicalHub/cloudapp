import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AppStateContext } from '../../../Context'

// export const baseUrl = 'https://cloudnox.herokuapp.com/api/v1'
export const baseUrl = 'http://localhost:3000/api/v1'
export const  headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token"),
}



export const updateAzureAccounts = () =>{
  const baseUrl = 'https://cloudnox.herokuapp.com/api/v1'

  
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
