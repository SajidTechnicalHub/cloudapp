import React from 'react'
import { BsQuestionCircle } from 'react-icons/bs'

const DeleteCloudAccount = (props) => {
    return (
        <>
            <div className='delete-cloud-account-container'>
                <div className="delete-account-block">
                    <div className="delete-icon">
                        <BsQuestionCircle fontSize='100px' color='orange' />
                    </div>
                    <span className='delete-text'>Delete?</span>
                    <sapn className='delete-ensure'>Please ensure and then confirm!</sapn>
                    <div className="delete-account-btn-block ">
                        <span onClick={props.handleDeleteClose} className='delete-account-cancel-btn'>No, Cancel!</span>
                        <button type='submit' className='delete-account-btn'>Yes, Delete it!</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteCloudAccount