import React from 'react'
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
import appServicesLogo from '../../images/app-services.jpg'
import { Link } from 'react-router-dom'

const azureGeneral = [
  {
    id: 1,
    group_name: 'Management Groups',
    group_logo: managementGroup,
    group_number: 1,

  },
  {
    id: 2,
    group_name: 'Resource Groups',
    group_logo: resourceGroup,
    group_number: 1,

  },
  {
    id: 3,
    group_name: 'Subscriptions',
    group_logo: subscriptionGroup,
    group_number: 1,

  },
  {
    id: 4,
    group_name: 'Service Health',
    group_logo: ServiceHealth,
    group_number: 1,

  }

]
const azureCompute = [
  {
    id: 1,
    group_name: 'Virtual Machine',
    group_logo: virtualMachineLogo,
    group_number: 2,

  },
  {
    id: 2,
    group_name: 'Container Instances',
    group_logo: containerInstancesLogo,
    group_number: 2,

  },
  {
    id: 3,
    group_name: 'Kubernetes Services',
    group_logo: kubernetesServicesLogo,
    group_number: 2,

  },
  {
    id: 4,
    group_name: 'App Services',
    group_logo: appServicesLogo,
    group_number: 2,

  },
]
const azureNetworking = [
  {
    id: 1,
    group_name: 'Virtual Networks',
    group_logo: virtualNetworksLogo,
    group_number: 2,

  },
  {
    id: 2,
    group_name: 'Load Balancers',
    group_logo: loadBalancersLogo,
    group_number: 2,

  },
  {
    id: 3,
    group_name: 'DNS Zone',
    group_logo: dnsZonesLogo,
    group_number: 2,

  },
  {
    id: 4,
    group_name: 'Route Tables',
    group_logo: RouteTablesLogo,
    group_number: 2,

  },
  {
    id: 5,
    group_name: 'Virtual WANs',
    group_logo: VirtualWANsLogo,
    group_number: 2,

  },
]
const azureSecurity = [
  {
    id: 1,
    group_name: 'Network Sec Groups',
    group_logo: NetworkSecLogo,
    group_number: 2,

  },
  {
    id: 2,
    group_name: 'Application Sec Groups',
    group_logo: ApplicationSecLogo,
    group_number: 2,

  },
]
const azureStorage = [
  {
    id: 1,
    group_name: 'Storage Account',
    group_logo: StorageLogo,
    group_number: 2,

  },
]
const azureIdentity = [
  {
    id: 1,
    group_name: 'Users',
    group_logo: UsersLogo,
    group_number: 2,

  },
  {
    id: 2,
    group_name: 'Groups',
    group_logo: GroupsLogo,
    group_number: 2,

  },
  {
    id: 3,
    group_name: 'Devices',
    group_logo: DevicesLogo,
    group_number: 2,

  },
]
const Azure = () => {
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
                    <Link to='/cloudapp/Azure-Inventory-Details'>
                      <div className="azure-inventory-groups-block">
                        <div className="azure-inventory-sub-groups-block">
                          <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                          <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                        </div>
                        <span className="azure-inventory-sub-groups-number">{val.group_number}</span>
                      </div>
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
                    <Link to='/cloudapp/Azure-Inventory-Details'>
                      <div className="azure-inventory-groups-block">
                        <div className="azure-inventory-sub-groups-block">
                          <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                          <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                        </div>
                        <span className="azure-inventory-sub-groups-number">{val.group_number}</span>
                      </div>
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
                    <Link to='/cloudapp/Azure-Inventory-Details'>
                      <div className="azure-inventory-groups-block">
                        <div className="azure-inventory-sub-groups-block">
                          <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                          <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                        </div>
                        <span className="azure-inventory-sub-groups-number">{val.group_number}</span>
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
                    <Link to='/cloudapp/Azure-Inventory-Details'>
                      <div className="azure-inventory-groups-block">
                        <div className="azure-inventory-sub-groups-block">
                          <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                          <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                        </div>
                        <span className="azure-inventory-sub-groups-number">{val.group_number}</span>
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
                    <Link to='/cloudapp/Azure-Inventory-Details'>
                      <div className="azure-inventory-groups-block">
                        <div className="azure-inventory-sub-groups-block">
                          <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                          <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                        </div>
                        <span className="azure-inventory-sub-groups-number">{val.group_number}</span>
                      </div>
                    </Link><br />
                  </div>

                </React.Fragment>

              )
            })
          }
        </div>

        <div className="row gy-3 mb-3">
          <span className="azure-inventory-block-heading">Identity</span>
          {
            azureIdentity.map((val, index) => {
              return (
                <React.Fragment key={val.id}>
                  <div className="col-lg-4">
                    <Link to='/cloudapp/Azure-Inventory-Details'>
                      <div className="azure-inventory-groups-block">
                        <div className="azure-inventory-sub-groups-block">
                          <span ><img src={val.group_logo} alt="" className="azure-inventory-sub-groups-logo" /> </span>
                          <span className="azure-inventory-sub-groups-name">{val.group_name}</span>
                        </div>
                        <span className="azure-inventory-sub-groups-number">{val.group_number}</span>
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