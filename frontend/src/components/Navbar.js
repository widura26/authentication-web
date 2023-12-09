import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Navbar = () => {
    const navigate = useNavigate();
    const Butt = () => {
        const [show, setShow] = useState(false);
        const handleClose = () => {
            setShow(false)
        };
        const handleShow = () => setShow(true);
        const handlelogout = async () => {
            await logout();
            handleClose();
        }

        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Logout
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Alert</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Yakin keluar?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handlelogout}>
                            Logout
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>    
        )
    }

    const logout = async () => {
        try {   
            await axios.get('http://localhost:4000/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <h1 className="navbar-brand">Navbar</h1>
                <div className="navbar-menu d-flex gap-2">
                    <div className="navbar-start">
                        <a href="/" className="navbar-item">Home</a>
                    </div>
                    <div className="navbar-end">
                        <Butt/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;