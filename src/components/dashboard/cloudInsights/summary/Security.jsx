import React, { useState, useEffect } from 'react';

import { FiPlus, FiRefreshCcw, FiSearch, FiEdit2, } from 'react-icons/fi'
import { useContext } from 'react'
import { AppStateContext } from '../../../Context';
import axios from 'axios';
import Loading from '../../cloudVendors/azure/Loading';
import { baseUrl } from '../../cloudVendors/azure/GetAzureServices';

import TopBar from '../../header/TopBar'

const Security = () => {
    const [q, setQ] = useState("")
    return (
        <>
            <TopBar subtitle='Summary/Security' />
            <div className="summary-security-description-block">
                <span className="summary-security-description-text">
                    Detect threats and vulnerabilities that might lead to security breaches and improve your security posture of cloud resources.
                    </span>
                <div className="summary-security-description-dropdown-block">
                    <span className="summary-security-description-dropdown">
                        <select
                            name="cloud_account"
                            value=''
                            // onChange={InputEvent}
                        >
                            <option >Providers (Default All)</option>
                            {/* {accountCredentials.map((val, index) => {
                                return (
                                    <React.Fragment key={val.id}>
                                        <option >{val.account_name}</option>
                                    </React.Fragment>
                                )
                            })} */}


                        </select>
                    </span>
                    <span className="summary-security-description-dropdown">
                        <select
                            name="cloud_account"
                            value=''
                            // onChange={InputEvent}
                        >
                            <option >Accounts (Default All)</option>
                            {/* {accountCredentials.map((val, index) => {
                                return (
                                    <React.Fragment key={val.id}>
                                        <option >{val.account_name}</option>
                                    </React.Fragment>
                                )
                            })} */}


                        </select>
                    </span>
                </div>
            </div>
            <div className="account-management-container">
                <div className="search-container">
                    <div className="search-block">
                        <input type="text"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder='Search' />
                        <span className="search-icon"><FiSearch /></span>
                    </div>

                </div>


            </div>
        </>
    )
}

export default Security