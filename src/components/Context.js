// import { useContext, createContext, useState } from "react";
// import React from "react";


// const AppContext = createContext();


// // to create a Provider function

// const AppProvider = (props) =>{

//     const [data, setData] = useState('hi')

//     return(
//     <AppContext.Provider value={{data}}>
//         {props.children}
//     </AppContext.Provider>
//     );

// };


// // custom hook create

// const useGlobalContext = () => {
//     return useContext(AppProvider);
// }

// export { AppContext, AppProvider, useGlobalContext}

import React, { useState, useEffect, createContext } from "react";

const AppStateContext = React.createContext();

const AppStateContextProvider = props => {
  const [network, setNetwork] = useState([] )

  

   const getVirtualNetwork = async () => {
    
    const response = await fetch("http://localhost:3000/api/v1/azure_accounts/virtual_network", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    const res = await response.json()
    console.log(res)
    setNetwork(res.data)
    
  }

   useEffect(() => {
    getVirtualNetwork()
    // updateVirtualNetwork()
    // updateLoadBalancer();
  }, [])
  
  return (
    <AppStateContext.Provider value={{network, setNetwork}}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export { AppStateContextProvider, AppStateContext };