import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/register', {
                name: name,
                email: email,
                role: role,
                password: password
                // created: Date.now
            }, {
                headers: {
                    "Content-Type": "application/json" //at first, i got an error 'Data and salt argument required'. In fact, the problem on this line. there is typo 'applications/json'
                },
                withCredentials: false
            });
            navigate('/');
        } catch (err) {
            if(err.response){
                setMsg(err.response.data.msg);
            }
        }
    }

    return (
        <section>
            <div className="container">
                <div className="columns is-centered">
                    <div className="columns is-4-dekstop">
                        <form onSubmit={Register} className="box">
                            <p className="has-text-centered">{msg}</p>
                            <div className="mb-3">
                                <label className="label">Name</label>
                                <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div className="mb-3">
                                <label className="label">Email</label>
                                <input type="text" className="form-control" placeholder="Name" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className="mb-3">
                                <label className="label">Role</label>
                                <input type="text" className="form-control" placeholder="Name" value={role} onChange={(e) => setRole(e.target.value)}></input>
                            </div>
                            <div className="mb-3">
                                <label className="label">Password</label>
                                <input type="password" className="form-control" placeholder="Name" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                            <div className="mb-3">
                                <button className="button is-success is-fullwidth">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;