import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AddAzureAccount = (props) => {

  const [credential, setCredential] = useState({
    account_name: '',
    client_id: '',
    client_secret: '',
    tenant_id: '',
    subscription_id: '',


  })
  const InputEvent = (e) => {
    const { name, value } = e.target;
    setCredential(() => {
      return { ...credential, [name]: value }
    })

  }
  const SubmitEvent = (e) => {
    e.preventDefault()
    
    fetch("http://localhost:3000/api/v1/azure_credentials", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({azure_credential:credential}),
      })
        .then((res) => {
          if (res.ok) {
            console.log(res.headers.get("Authorization"));
            localStorage.setItem("token", res.headers.get("Authorization"));
            return res.json();
          } else {
            throw new Error(res);
          }
        })
        .then((json) => console.dir(json))

    // navigate('/cloudapp')
  }

  return (
    <>
      <div className="add-cloud-account-container">
        <span className='add-cloud-account-steps'>
          Step 1: Register and Configure an Application with Reader permissions in Azure Active Directory.
        </span>
        <ol type='a' className='list-style'  >
          <li >
            <span className="need-more-help-container">
              <span className='list-style-type '>Create an Application registration in Azure AD</span>
              <span className="need-more-help">Need more help? Watch a video</span>
            </span>
            <ol type='i'>
              <li>Sign in to the <Link to='#'>Azure portal</Link>.</li>
              <li>If you have access to multiple tenants, use the <span className='list-style-type'>Directories + subscriptions</span> filter in the top menu to switch to
                the tenant where you want to register the application.</li>
              <li>Search for and select <span className='list-style-type'>Azure Active Directory</span>.</li>
              <li>Under <span className='list-style-type'>Manage</span>, select <span className='list-style-type'>App registrations {`>`} New registration</span>.</li>
              <li>Under <span className='list-style-type'>Name</span>, enter a unique application name.</li>
              <li>Under <span className='list-style-type'>Supported account types,</span> select <span className='list-style-type'>Accounts in this organizational directory only</span>.</li>
              <li>Click <span className='list-style-type'>Register</span>.</li>
            </ol>
          </li>
          <span className='azure-account-note'>Note: Please copy the Application (client) ID and the Directory (tenant) ID on completion.</span>
          <li>
            <span className='list-style-type'>Create a Client Secret for the Registered App</span>
            <ol type='i'>
              <li>Select the newly created app from the list of <span className='list-style-type'>App Registrations</span>  (if not already visible).</li>
              <li>Select <span className='list-style-type'>Certificates {`&`} secrets</span>  from the left menu.</li>
              <li>Click + <span className='list-style-type'>New Client Secret</span>.</li>
              <li>Provide a <span className='list-style-type'>Description</span>  and appropriate Expiry. If you select 1 or 2 years, the directory credential must be refreshed in software with a new
                client secret on the anniversary of its creation.</li>
              <li>Click <span className='list-style-type'>Add</span>.</li>
              <li>Copy the client’s secret (<span className='list-style-type'>Secret ID</span>) and store it in a safe place. </li>
            </ol>
          </li>
          <li>
            <span className='list-style-type'>Provide Reader permissions to the registered app for all Azure subscriptions.</span>
            <ol type='i'>
              <li>In the Azure portal, search <span className='list-style-type'>subscriptions {`>`} Select Subscription {`>`} Access control (IAM) {`>`} Add Custom Role</span>.</li>
              <li>In the <span className='list-style-type'>Custom role name box</span>, specify a name for the custom role.
                The name must be unique for the <span className='list-style-type'>Azure AD directory</span>.</li>
              <li>The <span className='list-style-type'>Baseline permissions</span> option should already be set as <span className='list-style-type'>"Start from scratch"</span>.
                Don't need to change it.</li>
              <li>Click on the <span className='list-style-type'>JSON</span> tab. Click on <span className='list-style-type'>“Edit”</span>. Please change the "actions" parameter with a
                provided  <span className='list-style-type'>“custom permission template”</span>. Click on <span className='list-style-type'>“Review + Create”</span></li>
              <li>Click <span className='list-style-type'>Add {`>`} Add role assignment</span>.</li>
              <li>On the <span className='list-style-type'>Add {`>`} Roles</span> tab, select the previously created custom role.</li>
              <li>On the <span className='list-style-type'>Members</span> tab, select <span className='list-style-type'>credential, group, or service principal</span>. Click <span className='list-style-type'>Members</span>Select members.
                Find and select the application created previously. Click <span className='list-style-type'>Save</span> and <span className='list-style-type'>Next</span>.</li>
              <li>Click <span className='list-style-type'>Review + Assign</span>.</li>
            </ol>
          </li>
        </ol>

        <span className='add-cloud-account-steps'>
          Step 2: Cloud Account Details.
        </span>

        <form onSubmit={SubmitEvent} className='azure-account-form-block'>
          <div className="row">
            <div className="col-lg-6">
              <div className="azure-account-input-field-block ">
                {/* <label htmlFor="account_name" className="input-field-label">Fist Name<span className='estaric'>*</span></label> */}
                <input type="text"
                  name="account_name"
                  value={credential.account_name}
                  onChange={InputEvent}
                  required="required"
                  placeholder='Enter Account Name'
                />

              </div>
            </div>
            <div className="col-lg-6">
              <div className="azure-account-input-field-block ">
                {/* <label htmlFor="client_id" className="input-field-label">Last Name<span className='estaric'>*</span></label> */}
                <input type="text"
                  name="client_id"
                  value={credential.client_id}
                  onChange={InputEvent}
                  required="required"
                  placeholder='Enter Application ID'
                />

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="azure-account-input-field-block ">
                {/* <label htmlFor="client_secret" className="input-field-label">Fist Name<span className='estaric'>*</span></label> */}
                <input type="text"
                  name="client_secret"
                  value={credential.client_secret}
                  onChange={InputEvent}
                  required="required"
                  placeholder='Enter Secret ID'
                />

              </div>
            </div>
            <div className="col-lg-6">
              <div className="azure-account-input-field-block ">
                {/* <label htmlFor="tenant_id" className="input-field-label">Last Name<span className='estaric'>*</span></label> */}
                <input type="text"
                  name="tenant_id"
                  value={credential.tenant_id}
                  onChange={InputEvent}
                  required="required"
                  placeholder='Enter Tenant ID'
                />

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="azure-account-input-field-block ">
                {/* <label htmlFor="subscription_id" className="input-field-label">Fist Name<span className='estaric'>*</span></label> */}
                <input type="text"
                  name="subscription_id"
                  value={credential.subscription_id}
                  onChange={InputEvent}
                  required="required"
                  placeholder='Enter Subscription ID'
                />

              </div>
            </div>
            <div className="col-lg-6">

            </div>
          </div>
          <div className="azure-form-submit-block">
            <span className='azure-read-permission'>This requires only “Read” permissions and can not make any modifications to your cloud account.</span>
            <div className="azure-form-submit-btn-block ">
              <span onClick={props.handleClose} className='azure-form-cancel-btn'>Cancel</span>
              <button type='submit' className='azure-form-submit-btn'>Connect Cloud Account</button>
            </div>
          </div>

        </form>

      </div>

    </>
  )
}

export default AddAzureAccount


// https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/next-generation-quickstart.md
// https://docs.microsoft.com/en-us/azure/developer/javascript/core/use-azure-sdk