import { Link } from 'react-router-dom';
export default function Sidebar() {
  return (
    <div className="bg-success text-white vh-100 p-3" style={{ width: '250px'}}>
      <h3 className="mb-4">Customer Portal</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/Dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/myLoanRequest">My Loan Requests</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/newLoan">New Loan</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}
