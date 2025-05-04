import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import SignUp from './Pages/SignUp.jsx';
import Login from './Pages/Login.jsx';
import Dashboard from './Dashboard/dashboard.jsx';
import LoanRequest from './Dashboard/MyLoanRequests.jsx';
import Profile from './Dashboard/Profile.jsx';
import NewLoan from './Dashboard/NewLoan.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="home" element={<App />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="myLoanRequest" element={<LoanRequest />} />
        <Route path="profile" element={<Profile />} />
        <Route path="newLoan" element={<NewLoan />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)




