import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const navigate = useNavigate();

    const Auth = async e => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/login', {
                email: email,
                password: password
            });

            Cookies.set('accessToken', response.data.accessToken, { expires: 1 });
            navigate("/dashboard");
        } catch (error) {
            if(error.response && error.response.status === 404){
                setError('User tidak ditemukan');
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            }
        }
    }

    const Register = () => {
        navigate('/register')
    }

    return (
        <section>
            <div className="container">
                <div className="waduh">
                    <form onSubmit={Auth} className="form">
                        <p>{error}</p>
                        <div className="mb-3">
                            <label className="form-label">Email or username</label>
                            <input type="text" className="form-control" placeholder="Name" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="controls">
                                <input type="password" className="form-control" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="d-flex gap-3">
                            <div className="mb-3">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={Register}>Sign up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login;