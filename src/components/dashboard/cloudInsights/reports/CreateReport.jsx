import React from 'react'
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
const CreateReport = (props) => {
    const {
        isLoading, setIsLoading,
        accountCredentials, setAzureCredentails,

    } = useContext(AppStateContext)
    const navigate = useNavigate();
    const theme = useTheme();
    const [accountName, setAccountName] = React.useState([]);

    const handleChange = (event) => {
        const { target: { value }, } = event;
        setAccountName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <>
            <div className="create-report-model-title-container">
                <div className="create-report-model-title">Create Report</div>
                <AiOutlineClose onClick={props.handleClose} className='create-report-model-close' />
            </div>
            <div className="create-report-model-container ">
                <div className='create-report-model-input-fiels'>
                    <input type="text"
                        // value=''
                        // onChange={(e) => setQ(e.target.value)}
                        placeholder='Name' />
                    <textarea
                        placeholder='Description (Optional)'
                    />

                </div>
                <hr />
                <div className="create-report-model-insights-scope">
                    <span className="create-report-model-insights-scope-title" >Insights Scope</span>
                    <div className="create-report-model-insights-scope-container" >
                        <FormControl sx={{ width: '100%', background:'white' }}>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={accountName}
                                onChange={handleChange}
                                size='small'
                                // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                            >
                                <MenuItem value='Accounts (Default All)'>Accounts (Default All)</MenuItem>
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
                        
                    </div>

                </div>
            </div>


        </>

    )
}

export default CreateReport