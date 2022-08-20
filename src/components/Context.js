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

import React, { useState, createContext } from "react";

 const AppStateContext = createContext();

const AppStateContextProvider = props => {
  const [virtualNetwork, setVirtualNetwork] = useState({
    cartOpen: false
  });

  return(
    <AppStateContext.Provider value={{ virtualNetwork, setVirtualNetwork }}>
        {props.children}
    </AppStateContext.Provider>
  ); 
};

export { AppStateContextProvider, AppStateContext };