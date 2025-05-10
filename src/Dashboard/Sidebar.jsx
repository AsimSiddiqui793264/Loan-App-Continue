import { Link } from 'react-router-dom';
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="custom-sidebar bg-success p-3" >
      <h3 className="mb-4 text-light">Customer Portal</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-light" to="/Dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/myLoanRequest">My Loan Requests</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/newLoan">New Loan</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}
