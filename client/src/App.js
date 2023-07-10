import './App.css';
import {Header} from './components/Header'
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Cats } from './components/Cats';
import { Account } from './components/Account';
import { Admin } from './components/Admin';
import { Login } from './components/Login';
import { Register } from './components/Register';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cats" element={<Cats />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
