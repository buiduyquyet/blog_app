import { Button, Divider, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useContext, useEffect, useState } from 'react'
import './profile.scss'
import { AuthContext } from '../../context/authContext';


const Profile = () => {
    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        console.log({ currentUser })
    }, [])

    return (
        <div className='profile'>
            <div className='user-infor'>
                <Divider>
                    <img src="https://ghienreview.com/wp-content/uploads/2022/07/Ghien-review-Minions-2022-02.jpg" alt="" />
                    <h3>{currentUser.username}</h3>
                </Divider>
            </div>

        </div>
    )
}

export default Profile
