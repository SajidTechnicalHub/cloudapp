import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { makeStyles } from '@mui/styles';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { useContext } from 'react'
import { AppStateContext } from '../../../Context';
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { baseUrl } from '../../cloudVendors/azure/GetAzureServices';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, accountName, theme) {
    return {
        fontWeight:
            accountName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const cloudInsight = [
    {
        id: 1,
        name: 'Security'
    },
    {
        id: 2,
        name: 'Cost Optimization'
    },
    {
        id: 3,
        name: 'Performance & Reliability'
    },
    {
        id: 4,
        name: 'Operational Excellence'
    },

]
const CreateReport = (props) => {
    const {
        isLoading, setIsLoading,
        accountCredentials, setAzureCredentails,
        

    } = useContext(AppStateContext)
    const navigate = useNavigate();
    const theme = useTheme();
    const [report, setReport] = useState({
        report_name: '',
        report_des: ''
    })

    const [accountName, setAccountName] = React.useState(['Accounts (Default All)']);
    const [provider, setProvider] = React.useState(['Provider (Default All)']);
    const [cloudInsights, setCloudInsights] = React.useState(['Insights Categories (Default All)']);
    

    const InputEvent = (e) => {
        const { name, value } = e.target;
        setReport(() => {
            return { ...report, [name]: value }
        })
    }

    const handleProviderChange = (event) => {
        console.log('event', event)
        const { target: { value }, } = event;
        console.log('value', value)
        if (value == '') {
            setProvider(['Provider (Default All)']);
        } else {
            setProvider(value.filter((item) => item !== 'Provider (Default All)'));
        }

    };

    const handleAccountsChange = (event) => {
        console.log('event', event)
        const { target: { value }, } = event;
        console.log('value', value)
        if (value == '') {
            setAccountName(['Accounts (Default All)']);
        } else {
            setAccountName(value.filter((item) => item !== 'Accounts (Default All)'));
        }

    };
    const handleCloudInsightChange = (event) => {
        const { target: { value }, } = event;
        if (value == '') {
            setCloudInsights(['Insights Categories (Default All)']);
        } else {
            setCloudInsights(value.filter((item) => item !== 'Insights Categories (Default All)'));
        }

    };

    const handleSaveReport = async() => {
        props.handleClose()
       
        try{
           const response = await fetch(`${baseUrl}/reports`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    report:{
                        report_name: report.report_name,
                        report_des: report.report_des,
                        account: accountName,
                        provider: provider,
                        cloud_insights: cloudInsights
                    }
                }),
            })
            const data = await response.json()
            console.log(data)
            
        }catch(e){
            return e
        }
           
    }

    return (
        <>
            <div className="create-report-model-title-container">
                <div className="create-report-model-title">Create Report</div>
                <AiOutlineClose onClick={props.handleClose} className='create-report-model-close' />
            </div>
            <div className="create-report-model-container ">
                <div className='create-report-model-input-fiels'>
                    <input type="text"
                        name="report_name"
                        value={report.report_name}
                        onChange={InputEvent}
                        placeholder='Name' />
                    <textarea
                        name="report_des"
                        value={report.report_des}
                        onChange={InputEvent}
                        placeholder='Description (Optional)'
                    />

                </div>
                <hr />
                <div className="create-report-model-insights-scope">
                    <span className="create-report-model-insights-scope-title" >Insights Scope</span>
                    <div className="create-report-model-insights-scope-container" >
                        <FormControl sx={{ width: '100%', background: 'white', mt: '3' }}>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={provider}
                                onChange={handleProviderChange}
                                size='small'
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            value != 'Provider (Default All)' ?
                                                <Chip key={value} label={value} /> :
                                                value
                                        ))}
                                    </Box>
                                )}
                            >
                                {/* <MenuItem value='Provider (Default All)'>Provider (Default All)</MenuItem> */}
                                <MenuItem value='Microsoft Azure'>Microsoft Azure</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: '100%', background: 'white' }}>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={accountName}
                                onChange={handleAccountsChange}
                                size='small'
                                renderValue={(selected) => (

                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            value != 'Accounts (Default All)' ?
                                                <Chip key={value} label={value} /> :
                                                value
                                        ))}
                                    </Box>
                                )}
                            >
                                {/* <MenuItem value='Accounts (Default All)'>Accounts (Default All)</MenuItem> */}
                                {accountCredentials.map((name) => (
                                    <MenuItem
                                        key={name.account_name}
                                        value={name.account_name}
                                        style={getStyles(name.account_name, accountName, theme)}
                                    >
                                        {name.account_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: '100%', background: 'white' }}>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={cloudInsights}
                                onChange={handleCloudInsightChange}
                                size='small'
                                renderValue={(selected) => (

                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            value != 'Insights Categories (Default All)' ?
                                                <Chip key={value} label={value} /> :
                                                value
                                        ))}
                                    </Box>
                                )}
                            >
                                {/* <MenuItem value='Accounts (Default All)'>Accounts (Default All)</MenuItem> */}
                                {cloudInsight.map((val) => (
                                    <MenuItem
                                        key={val.name}
                                        value={val.name}
                                        style={getStyles(val.name, accountName, theme)}
                                    >
                                        {val.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </div>
                    <hr />
                </div>
                <div className="create-report-model-btn-container">
                    <button type='submit' className='report-cancel-btn' onClick={props.handleClose}>CANCEL</button>
                    <button type='submit' className='form-submit-btn' onClick={handleSaveReport}>SAVE</button>
                </div>
            </div>



        </>

    )
}

export default CreateReport