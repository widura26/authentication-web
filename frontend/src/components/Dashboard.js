import { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, BrowserRouter as Router, Route  } from "react-router-dom";
import CreatePage from "./Create";
import NavigationButton from "./NavigationButton";
const ForbiddenPage = () => {
    return (
        <div className="center-div">
            <h1 className="is-size-1">403</h1>
        </div>
    )
}
export const Dashboard = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        accessToken();
    });
    const token = Cookies.get('accessToken');
    const accessToken = async () => {
        try {
            if(token){
                const response = await axios.get('http://localhost:4000/hiddencontent', {
                    headers: {
                        Authorization: `JWT ${token}`
                    }
                });
                setMessage(response.data)
            }else {
                navigate("/");
            }       
        } catch (error) {
            if(error.response && error.response.status === 403){
                setError(403);
            }
        }
    }

    if(error === 403){
        return <ForbiddenPage/>
    }

    return (
        <div className="container mt-5">
            <h1>Hi {message.message}</h1>
                <NavigationButton to="/create" text="Create"/>
            <div className="container">
                <h1>Helllo</h1>
            </div>
        </div>
    )
}