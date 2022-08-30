import React, { useState, useEffect } from 'react'
import TopBar from '../header/TopBar'
import managementGroup from '../../images/management-group.png'
import resourceGroup from '../../images/resource-group.png'
import subscriptionGroup from '../../images/Subscriptions.png'
import ServiceHealth from '../../images/Service-Health.png'
import DevicesLogo from '../../images/Devices.png'
import GroupsLogo from '../../images/Groups.jpg'
import UsersLogo from '../../images/Users.png'
import StorageLogo from '../../images/Storage-Accounts.png'
import NetworkSecLogo from '../../images/Network-Sec-Groups.png'
import ApplicationSecLogo from '../../images/Application-Sec-Groups.jpg'
import virtualNetworksLogo from '../../images/virtual-networks.png'
import loadBalancersLogo from '../../images/load-balancers.png'
import dnsZonesLogo from '../../images/dns-zones.png'
import RouteTablesLogo from '../../images/RouteTables.png'
import VirtualWANsLogo from '../../images/Virtual-WANs.png'
import virtualMachineLogo from '../../images/virtual-machine.png'
import containerInstancesLogo from '../../images/container-instances.png'
import kubernetesServicesLogo from '../../images/kubernetes-services.png'
import AppServicesLogo from '../../images/AppServices.png'
import VirtualMachinesLogo from '../../images/VirtualMachines.png'
import DisksLogo from '../../images/Disks.png'
import AdvisorLogo from '../../images/Advisor.png'
import CostBillingLogo from '../../images/CostBilling.png'
import HelpSupportLogo from '../../images/HelpSupport.png'
import ResourceGroupsLogo from '../../images/ResourceGroups.png'


import appServicesLogo from '../../images/app-services.jpg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppStateContext } from '../../Context'
import Loading from './azure/Loading'

const azureGeneral = [
  {
    id: 1,
    group_name: 'Advisor',
    group_logo: AdvisorLogo,
    route: '/cloudapp/azure/advisor'
  },
  {
    id: 2,
    group_name: 'Resource Groups',
    group_logo: ResourceGroupsLogo,
    route: '/cloudapp/azure/resourceGroups'
  },
  {
    id: 3,
    group_name: 'Subscriptions',
    group_logo: subscriptionGroup,
    route: '/cloudapp/azure/subscription'
  },
  {
    id: 4,
    group_name: 'Service Health',
    group_logo: HelpSupportLogo,
    route: '/cloudapp/azure/serviceHealth'
  },
  {
    id: 5,
    group_name: 'Cost & Billings',
    group_logo: CostBillingLogo,
    route: ''
  },


]
const azureCompute = [
  {
    id: 1,
    group_name: 'Virtual Machine',
    group_logo: VirtualMachinesLogo,
    route:'/cloudapp/azure/virtualMachine'

  },
  {
    id: 2,
    group_name: 'Disks',
    group_logo: DisksLogo,
    route:'/cloudapp/azure/disks'

  },

  {
    id: 3,
    group_name: 'App Services',
    group_logo: AppServicesLogo,
    route:''

  },

]
const azureNetworking = [
  {
    id: 1,
    group_name: 'Virtual Networks',
    group_logo: virtualNetworksLogo,
    route: '/cloudapp/azure/virtualNetwork',

  },
  {
    id: 2,
    group_name: 'Load Balancers',
    group_logo: loadBalancersLogo,
    route: '/cloudapp/azure/loadBalancer',

  },
  {
    id: 3,
    group_name: 'DNS Zones',
    group_logo: dnsZonesLogo,
    route: '/cloudapp/azure/dnsZone',

  },
  {
    id: 4,
    group_name: 'Route Tables',
    group_logo: RouteTablesLogo,
    route: '/cloudapp/azure/routeTable',

  },
  {
    id: 5,
    group_name: 'Virtual WANs',
    group_logo: VirtualWANsLogo,
    route: '/cloudapp/azure/virtualWans',

  },
  {
    id: 6,
    group_name: 'NAT Gateways',
    group_logo: VirtualWANsLogo,
    route: '/cloudapp/azure/natGateway',

  },
  {
    id: 7,
    group_name: 'Public IP Addresses',
    group_logo: VirtualWANsLogo,
    route: '/cloudapp/azure/publicIpAddress',

  },


]
const azureSecurity = [
  {
    id: 1,
    group_name: 'Network Security Groups',
    group_logo: NetworkSecLogo,
    route:'/cloudapp/azure/networkSecurityGroups'

  },
  {
    id: 2,
    group_name: 'Application Security Groups',
    group_logo: ApplicationSecLogo,
    route:'/cloudapp/azure/applicationSecurityGroups'

  },
]
const azureStorage = [
  {
    id: 1,
    group_name: 'Storage Accounts',
    group_logo: StorageLogo,
    route:'/cloudapp/azure/storageAccounts'

  },
]





const Azure = () => {

  const {

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
  const [isLoading, setIsLoading] = useState()

  //////////////// fatch data from database//////////////////////////////
  // const getVirtualNetwork = async () => {
  //   setLoading(true);
  //   const response = await fetch("http://localhost:3000/api/v1/azure_accounts/virtual_network", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: localStorage.getItem("token"),
  //     },
  //   })
  //   const res = await response.json()
  //   console.log(res)
  //   setVirtualNetwork(res.data)
  //   setLoading(false);
  // }

  //////////////// update data//////////////////////////////

  const updateResourceGroups = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_resource_groups/index", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }
  const updateLoadBalancer = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_load_balancer/index", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }
  const updateAzureSubscription = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_subscription/index", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }
  const updateAzureDnsZone = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_dns_zone/index", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }
  const updateAzureRouteTAble = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_route_tables/index", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }
  const updateAzureNatGateway = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_nat_gateway/index", {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }
  const updateAzureVirtualWans = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_virtual_wans/index", {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }
  const updateAzurePublicIpAddress = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_public_ip_address/index", {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }
  const updateAzureNetworkSecurityGroups = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_network_security_groups/index", {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }

  const updateAzureApplicationSecurityGroups = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_application_security_groups/index", {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }
  const updateAzureStorageAccount = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_storage_accunt/index", {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }

  const updateAzureSupportsTickets = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_supports_tickets/index", {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }
  const updateAzureRecommendation = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_recommendations/index", {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }
  const updateAzureVirtualMachine = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_virtual_machine/index", {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const data = await response.json()
    console.log(data)

  }

  const updateAzureDisks = async () => {
    const response = await fetch("http://localhost:3000/api/v1/azure_disks/index", {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          // setIsLogin(true)
          return res.json();
        } else if (res.status == "401") {
          // setIsLogin(false)
          // return res.text().then((text) => Promise.reject(text));
        }
      })
    const data = await response.json()
    console.log(data.status)

  }

  //////////////// update data//////////////////////////////
  useEffect(() => {
    // getVirtualNetwork()
    // updateResourceGroups()
    // updateAzureSubscription()
    // updateVirtualNetwork()
    // updateLoadBalancer();
    // updateAzureDnsZone()
    // updateAzureRouteTAble()
    // updateAzureNatGateway()
    // updateAzureVirtualWans()
    // updateAzurePublicIpAddress()
    // updateAzureNetworkSecurityGroups()
    // updateAzureApplicationSecurityGroups()
    // updateAzureStorageAccount()/cloudapp/azure/advisor
    // updateAzureSupportsTickets()
    // updateAzureRecommendation()
    // updateAzureVirtualMachine()
    // updateAzureDisks()
  }, [])
  return (
    <>
      <TopBar subtitle='Azure' />
      <div className="azure-inventory-container">
        <div className="row gy-3 mb-3">

          <span className="azure-inventory-block-heading">General</span>

          {
            azureGeneral.map((val, index) => {
              return (
                <React.Fragment key={val.id}>
                  <div className="col-lg-4">
                    <Link to={val.route}>
                      {
                        val.group_name == 'Cost & Billings' ?
                          <div className="azure-inventory-groups-block-disable">
                            <div className="azure-inventory-sub-groups-block">
                              <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                              <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                            </div>
                            <span className="azure-inventory-sub-groups-number">0</span>
                          </div> :


                          <div className="azure-inventory-groups-block">
                            <div className="azure-inventory-sub-groups-block">
                              <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                              <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                            </div>
                            <span className="azure-inventory-sub-groups-number">
                              {
                                val.group_name == 'Advisor' ?
                                  <span>{azureRecommendation.length}</span> :
                                  <span>
                                    {
                                      val.group_name == 'Resource Groups' ?
                                        <span>{resourceGroup.length}</span> :
                                        <span>
                                          {
                                            val.group_name == 'Subscriptions' ?
                                              <span>{azureSubscription.length}</span> :
                                              <span>
                                                {
                                                  val.group_name == 'Service Health' ?
                                                    <span>{azureSupportsTickets.length}</span> :
                                                    <sapn>0</sapn>
                                                }
                                              </span>
                                          }
                                        </span>
                                    }
                                  </span>
                              }

                            </span>
                          </div>
                      }
                    </Link><br />
                  </div>
                </React.Fragment>

              )
            })
          }
        </div>
        <div className="row gy-3 mb-3">
          <span className="azure-inventory-block-heading">Compute</span>
          {
            azureCompute.map((val, index) => {
              return (
                <React.Fragment key={val.id}>
                  <div className="col-lg-4">
                    <Link to={val.route}>
                      {
                        val.group_name == 'App Services' ?
                        <div className="azure-inventory-groups-block-disable">
                        <div className="azure-inventory-sub-groups-block">
                          <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                          <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                        </div>
                        <span className="azure-inventory-sub-groups-number">0</span>
                      </div> :


                          <div className="azure-inventory-groups-block">
                            <div className="azure-inventory-sub-groups-block">
                              <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                              <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                            </div>
                            <span className="azure-inventory-sub-groups-number">
                              {
                                val.group_name == 'Virtual Machine' ?
                                  <span>{azureVirtualMachine.length}</span> :
                                  <span>
                                    {
                                      val.group_name == 'Disks' ?
                                      <span>{azureDisks.length}</span> :
                                      <span>0</span>
                                    }
                                  </span>
                              }
                            </span>
                          </div>
                      }
                    </Link><br />
                  </div>

                </React.Fragment>

              )
            })
          }
        </div>

        <div className="row gy-3 mb-3">
          <span className="azure-inventory-block-heading">Networking</span>
          {
            azureNetworking.map((val, index) => {
              return (
                <React.Fragment key={val.id}>
                  <div className="col-lg-4">
                    <Link to={val.route}>
                      <div className="azure-inventory-groups-block">
                        <div className="azure-inventory-sub-groups-block">
                          <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                          <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                        </div>

                        <span className="azure-inventory-sub-groups-number">
                          {
                            val.group_name == 'Virtual Networks' ?
                              <span>{virtualNetwork.length}</span> :
                              <span>
                                {
                                  val.group_name == 'Load Balancers' ?
                                    <span>{loadBalancer.length}</span> :
                                    <span>
                                      {
                                        val.group_name == 'DNS Zones' ?
                                          <span>{azureDnsZone.length}</span> :
                                          <span>
                                            {
                                              val.group_name == 'Route Tables' ?
                                                <span>{azureRouteTable.length}</span> :
                                                <span>
                                                  {
                                                    val.group_name == 'Virtual WANs' ?
                                                      <span>{azureVirtualWans.length}</span> :
                                                      <span>
                                                        {
                                                          val.group_name == 'NAT Gateways' ?
                                                            <span>{azureNatGateway.length}</span> :
                                                            <span>
                                                              {
                                                                val.group_name == 'Public IP Addresses' ?
                                                                  <span>{azurePublicIpAddress.length}</span> :
                                                                  <sapn>0</sapn>
                                                              }
                                                            </span>
                                                        }
                                                      </span>
                                                  }
                                                </span>
                                            }
                                          </span>
                                      }
                                    </span>
                                }
                              </span>
                          }

                        </span>
                      </div>
                    </Link><br />
                  </div>

                </React.Fragment>

              )
            })
          }
        </div>
        <div className="row gy-3 mb-3">
          <span className="azure-inventory-block-heading">Security</span>
          {
            azureSecurity.map((val, index) => {
              return (
                <React.Fragment key={val.id}>
                  <div className="col-lg-4">
                    <Link to={val.route}>
                      <div className="azure-inventory-groups-block">
                        <div className="azure-inventory-sub-groups-block">
                          <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                          <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                        </div>
                        <span className="azure-inventory-sub-groups-number">
                          {
                            val.group_name == 'Network Security Groups' ?
                              <span>{azureNetworkSecurityGroups.length}</span> :
                              <span>
                                {
                                  val.group_name == 'Application Security Groups' ?
                                    <span>{azureApplicationSecurityGroups.length}</span> :
                                    <sapn>0</sapn>
                                }
                              </span>
                          }
                        </span>
                      </div>

                    </Link><br />
                  </div>

                </React.Fragment>

              )
            })
          }
        </div>

        <div className="row gy-3 mb-3">
          <span className="azure-inventory-block-heading">Storage</span>
          {
            azureStorage.map((val, index) => {
              return (
                <React.Fragment key={val.id}>
                  <div className="col-lg-4">
                    <Link to={val.route}>
                      <div className="azure-inventory-groups-block">
                        <div className="azure-inventory-sub-groups-block">
                          <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                          <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                        </div>
                        <span className="azure-inventory-sub-groups-number">{azureStorageAccount.length}</span>
                      </div>
                    </Link><br />
                  </div>

                </React.Fragment>

              )
            })
          }
        </div>

      </div>
    </>
  )
}

export default Azure