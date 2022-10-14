import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { country_codes } from "./CountryCodes";
import { useContext } from 'react'
import { AppStateContext } from '../../Context';
import Loading from '../cloudVendors/azure/Loading';
import axios from 'axios';
import { baseUrl } from '../cloudVendors/azure/GetAzureServices';

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup
}
  from "react-simple-maps";
import ReactTooltip from "react-tooltip";

const azureRegionData = [
  {
    id: 1,
    region_name: 'Brazil South',
    region_api_name: 'brazilsouth',
    coordinates: [-124.143593, 40.586121]
  },
  {
    id: 2,
    region_name: 'Canada Central',
    region_api_name: 'canadacentral',
    coordinates: [-76.687042, 44.771839]
  },
  {
    id: 3,
    region_name: 'Central US',
    region_api_name: 'centralus',
    coordinates: [-73.898293, 40.930790]
  },
  {
    id: 4,
    region_name: 'East US',
    region_api_name: 'eastus',
    coordinates: [-84.471611, 34.685741]
  },
  {
    id: 5,
    region_name: 'East US 2',
    region_api_name: 'eastus2',
    coordinates: [-75.926964, 38.595181]
  },
  {
    id: 6,
    region_name: 'South Central US',
    region_api_name: 'southcentralus',
    coordinates: [-67.459702, 44.914059]
  },
  {
    id: 7,
    region_name: 'US Gov Virginia',
    region_api_name: 'usgovvirginia',
    coordinates: [-75.975441, 36.845131]
  },
  {
    id: 8,
    region_name: 'West US 2',
    region_api_name: 'westus2',
    coordinates: [-70.876137, 44.398842]
  },

  {
    id: 9,
    region_name: 'West US 3',
    region_api_name: 'westus3',
    coordinates: [-84.219856, 39.338692]
  },
  {
    id: 9,
    region_name: 'West US 3',
    region_api_name: 'westus3',
    coordinates: [-84.219856, 39.338692]
  },
  {
    id: 10,
    region_name: 'France Central',
    region_api_name: 'francecentral',
    coordinates: [-76.103600, 43.345409]
  },

  {
    id: 11,
    region_name: 'Germany West Central',
    region_api_name: 'germanywestcentral',
    coordinates: [144.261887, -37.486912]
  },

  {
    id: 12,
    region_name: 'North Europe',
    region_api_name: 'northeurope',
    coordinates: [7.271200, 43.700119]
  },

  {
    id: 13,
    region_name: 'Norway East',
    region_api_name: 'norwayeast',
    coordinates: [-83.392952, 44.312119]
  },

  {
    id: 14,
    region_name: 'West Europe',
    region_api_name: 'westeurope',
    coordinates: [106.705467, -6.182260]
  },
  {
    id: 15,
    region_name: 'Sweden Central',
    region_api_name: 'swedencentral',
    coordinates: [-77.952010, 43.203700]
  },
  {
    id: 16,
    region_name: 'Switzerland North',
    region_api_name: 'switzerlandnorth',
    coordinates: [-82.107840, 27.056340]
  },
  {
    id: 17,
    region_name: 'Qatar Central',
    region_api_name: 'qatarcentral',
    coordinates: [51.557190, 25.369200]
  },
  {
    id: 18,
    region_name: 'UAE North',
    region_api_name: 'uaenorth',
    coordinates: [125.752747, 39.021389]
  },
  {
    id: 19,
    region_name: 'South Africa North',
    region_api_name: 'southafricanorth',
    coordinates: [26.710680, -30.689899]
  },

  {
    id: 20,
    region_name: 'Australia East',
    region_api_name: 'australiaeast',
    coordinates: [148.3717, 27.6728]
  },
  {
    id: 21,
    region_name: 'Central India',
    region_api_name: 'centralindia',
    coordinates: [80.0982, 23.0707]
  },
  {
    id: 22,
    region_name: 'Japan East',
    region_api_name: 'japaneast',
    coordinates: [138.2529, 36.2048]
  },
  {
    id: 23,
    region_name: 'Korea Central',
    region_api_name: 'koreacentral',
    coordinates: [127.024612, 37.532600]
  },
  {
    id: 24,
    region_name: 'Southeast Asia',
    region_api_name: 'southeastasia',
    coordinates: [115.6628, 2.2180]
  },
  {
    id: 25,
    region_name: 'East Asia',
    region_api_name: 'eastasia',
    coordinates: [106.5348, 38.7946]
  },
  {
    id: 26,
    region_name: 'China North 3',
    region_api_name: 'chinanorth3',
    coordinates: [104.195397, 35.86166]
  },
  {
    id: 27,
    region_name: 'Canada East',
    region_api_name: 'canadaeast',
    coordinates: [66.0505, 45.2770]
  },


]

const GeographicMap = () => {
  const {
    isoAuth, setoAuth,
    isLoading, setIsLoading,
    azureRegion, setAzureRegion

  } = useContext(AppStateContext)

  const [content, setContent] = useState("")
  const [newRegionData, setNewRegionData] = useState([])
  
  const setRegion = () => {
    console.log('get api region data', azureRegion)

    var newArray = []
    for (var i = 0; i < azureRegionData?.length; i++) {
      var match = false;
      for (var j = 0; j < azureRegion?.length; j++) {

        if (azureRegion[j] == azureRegionData[i].region_api_name) {
          match = true;
          console.log('matched data', azureRegionData[j])
          break;
        }

      }
      if (match) {
        newArray.push(azureRegionData[i])
        // setNewRegionData(azureRegionData[i])

      }

    }
    setNewRegionData(newArray)
    console.log('newArray', newArray)
    console.log('newRegionData', newRegionData)
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



  useEffect(() => {
    // getAzureRegion() 
    setRegion()
    
  }, [])



  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"


  return (
    <div className="dashboard-geographicMap-block">
      {/* {azureRegion.map((val)=>{
            return(console.log(val))
          })} */}
      <ReactTooltip>
        {content}

      </ReactTooltip>
      <ComposableMap data-tip=''>
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { name } = geo.properties;

                    setContent(`${name}`)

                  }}
                  onMouseLeave={() => {
                    setContent("")

                  }}
                  style={{
                    hover: {
                      fill: '#f53',
                      outline: 'none'
                    }
                  }}
                />
              ))
            }
          </Geographies>
          <Marker coordinates={[69.3451, 30.3753,]}>
            <circle r={8} fill="blue" />
          </Marker>
          {newRegionData?.map((region, index) => {
            return (
              <React.Fragment key={index}>
                <Marker coordinates={region.coordinates}>
                  <circle r={8} fill="orange" />
                  <text
                    textAnchor="middle"
                    y='-15'
                    style={{ fontSize: '20px', fill: 'grey' }}
                  >
                    {region.region_name}
                  </text>
                </Marker>
              </React.Fragment>
            )
          })}



        </ZoomableGroup>
      </ComposableMap>
    </div >
  )
}

export default GeographicMap