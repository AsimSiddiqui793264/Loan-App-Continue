import { useState } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css"; 
import { Link } from "react-router";
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Navbar with Hamburger */}
      <div className="d-md-none p-2 bg-light border-bottom d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Dashboard</h5>
        <button className="btn btn-outline-primary" onClick={toggleSidebar}>
          &#9776; {/* Hamburger icon */}
        </button>
      </div>

      <div className="dashboard-container d-flex">
        {/* Sidebar */}
        <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <Sidebar />
        </div>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div className="backdrop d-md-none" onClick={closeSidebar}></div>
        )}

        {/* Main Content */}
        <div className="flex-grow-1 p-3">
          <h2>Customer Dashboard</h2>
          <p>Welcome, John! Here's an overview of your account.</p>

          <div className="row mt-4">
            {["Active Loans", "Approved Loans", "Pending Requests", "References"].map((title, index) => (
              <div className="col-6 col-md-3 mb-3" key={index}>
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">
                      {title === "Approved Loans" ? "$0.00" : "0"}
                    </p>
                    {title === "Active Loans" && <p className="text-success">Good Standing</p>}
                    {title === "Pending Requests" && <p className="text-muted">N/A</p>}
                    {title === "References" && <p className="text-muted">Not Verified</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <p>No recent activity to display.</p>
            <Link to="/newLoan"><button className="btn btn-primary">Apply for a New Loan</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}


