import React, { useState } from "react";
import ReactDOM from "react-dom";
import { country_codes } from "./CountryCodes";
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

const GeographicMap = () => {
  const [content, setContent] = useState("")
  const [arcs, setArcs] = useState("")
  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
  

  return (
    <div className="dashboard-geographicMap-block">
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
                onMouseEnter={()=>{
                  const {name} = geo.properties;
                  
                  setContent(`${name}`)
                  
                }} 
                onMouseLeave = {()=>{
                  setContent("")
                  
                }}
                style={{
                  hover:{
                    fill:'#f53',
                    outline:'none'
                  }
                }}
                />
              ))
            }
          </Geographies>
          <Marker coordinates={[85.9800, 22.89]}>
            <circle r={8} fill="orange" />
          </Marker>
          <Marker coordinates={[14.006, 45.7128]}>
            <circle r={8} fill="blue" />
            <text
              textAnchor="middle"
              y='-15'
              style={{fontSize:'20px', fill:'grey'}}
            >
              {content}
            </text>
          </Marker>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export default GeographicMap