import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import TopBar from '../header/TopBar'
import { FaArrowsAltH } from 'react-icons/fa';



const AzureInventoryDetails = () => {
    const navigate = useNavigate();
    const [cloudAccount, setCloudAccount] = useState({
        cloud_account: 'All Azure Cloud Accounts'

    })

    const InputEvent = (e) => {
        const { name, value } = e.target;
        setCloudAccount(() => {
            return { ...cloudAccount, [name]: value }
        })
    }
    const SubmitEvent = (e) => {
        e.preventDefault()

    }
    return (
        <>
            <TopBar subtitle='Azure / All VNets' />
            <div className="azure-inventory-detail-container">
                <div className="azure-inventory-detail-all-vnets-block">
                    <span className="azure-inventory-detail-all-vnets-block-heading">
                        <span className="azure-inventory-detail-vnets-block">
                            <span className="azure-inventory-detail-vnets-logo-block">
                                <FaArrowsAltH />
                            </span>
                            <span>All VNets (2)</span>
                        </span>
                    </span>
                    <span className="azure-inventory-detail-all-vnets-block-dropdown">
                        <select
                            name="cloud_account"
                            value={cloudAccount.cloud_account}
                            onChange={InputEvent}
                        >
                            <option >All Azure Cloud Accounts</option>
                            <option > Azure Accounts</option>

                        </select>
                    </span>
                </div>
            </div>

        </>
    )
}

export default AzureInventoryDetails