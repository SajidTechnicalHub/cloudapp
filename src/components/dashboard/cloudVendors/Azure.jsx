import React, { useState, useEffect } from 'react'
import TopBar from '../header/TopBar'
import subscriptionGroup from '../../images/Subscriptions.png'
import RouteTablesLogo from '../../images/RouteTables.png'
import AppServicesLogo from '../../images/AppServices.png'
import VirtualMachinesLogo from '../../images/VirtualMachines.png'
import DisksLogo from '../../images/Disks.png'
import AdvisorLogo from '../../images/Advisor.png'
import CostBillingLogo from '../../images/CostBilling.png'
import HelpSupportLogo from '../../images/HelpSupport.png'
import ResourceGroupsLogo from '../../images/ResourceGroups.png'
import DNSZonesLogo from '../../images/DNS Zones.png'
import LoadBalancersLogo from '../../images/LoadBalancers.png'
import NATGatewaysLogo from '../../images/NATGateways.png'
import PublicIPAddressesLogo from '../../images/PublicIPAddresses.png'
import VirtualNetworksLogo from '../../images/VirtualNetworks.png'
import VirtualWANsLogo from '../../images/VirtualWANs.png'
import NetworkSecurityGroupsLogo from '../../images/NetworkSecurityGroups.png'
import ApplicationSecurityGroupsLogo from '../../images/ApplicationSecurityGroups.png'
import StorageAccountsLogo from '../../images/StorageAccounts.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppStateContext } from '../../Context'
import Loading from './azure/Loading'
import { updateAzureAccounts, baseUrl } from './azure/GetAzureServices'
import axios from 'axios'


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
    group_logo: VirtualNetworksLogo,
    route: '/cloudapp/azure/virtualNetwork',

  },
  {
    id: 2,
    group_name: 'Load Balancers',
    group_logo: LoadBalancersLogo,
    route: '/cloudapp/azure/loadBalancer',

  },
  {
    id: 3,
    group_name: 'DNS Zones',
    group_logo: DNSZonesLogo,
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
    group_logo: NATGatewaysLogo,
    route: '/cloudapp/azure/natGateway',

  },
  {
    id: 7,
    group_name: 'Public IP Addresses',
    group_logo: PublicIPAddressesLogo,
    route: '/cloudapp/azure/publicIpAddress',

  },


]
const azureSecurity = [
  {
    id: 1,
    group_name: 'Network Security Groups',
    group_logo: ApplicationSecurityGroupsLogo,
    route:'/cloudapp/azure/networkSecurityGroups'

  },
  {
    id: 2,
    group_name: 'Application Security Groups',
    group_logo: NetworkSecurityGroupsLogo,
    route:'/cloudapp/azure/applicationSecurityGroups'

  },
]
const azureStorage = [
  {
    id: 1,
    group_name: 'Storage Accounts',
    group_logo: StorageAccountsLogo,
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
     
      
    }
    catch (error) {
      console.log(error);
     
    }
  }

  useEffect(() => {
    getAccountDetails()
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