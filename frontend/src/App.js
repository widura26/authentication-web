import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { Dashboard } from './components/Dashboard';
// import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register'element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
