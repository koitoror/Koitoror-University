import React from 'react';
import { GithubOutlined, LogoutOutlined } from '@ant-design/icons';
import { Helmet } from "react-helmet";
import { Button } from 'antd';
import { actionSignOut } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import './home.css';

export default function Home() {
    const dispatch = useDispatch()

    const handleSignOut = () => {
        dispatch(actionSignOut())
    }
    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="K.U. - Authentication" />
            </Helmet>

            <div className="home-page">
                <div className="home-overlay">
                    <h2>Welcome to React Sliding Sign in & Sign up template written in ReactJs and antdesign CSS</h2>
                    <p>Thank you! - Koitoror</p>
                    <Button shape='round' onClick={handleSignOut} icon={<LogoutOutlined />}>Sign Out</Button>
                </div>
            </div>
        </>
    )
}

