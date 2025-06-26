import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { supabase } from "../Pages/Authentication";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loanDatas, setLoanDatas] = useState([])
  const [activeLoans, setActiveLoans] = useState(0)
  const [pendingLoans, setPendingLoans] = useState(0)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(true)

  const [approvedLoansTotal, setApprovedLoansTotal] = useState(0);
  const [referencesCount, setReferencesCount] = useState(0);
  const [referencesStatus, setReferencesStatus] = useState("Not Verified");


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("NewLoan")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching loans:", error.message);
      } else {
        setLoanDatas(data);
        const active = data.filter(loan => loan.Status === "Accepted");
        const pending = data.filter(loan => loan.Status === "Pending" || loan.Status === "Reviewing Documents");

        const totalApproved = active.reduce((acc, loan) => acc + (+loan.Loan_Package || 0), 0)
        // console.log(totalApproved)

        setActiveLoans(active.length);
        setPendingLoans(pending.length);
        setApprovedLoansTotal(totalApproved);
      }
      setLoading(false);
    };


    // Add references data fetching
    const fetchReferences = async () => {
      const { data, error } = await supabase
        .from("NewLoan")
        .select("*");

      if (error) {
        console.error("Error fetching references:", error.message);
      } else {
        setReferencesCount(data.length);
        const verified = data.some(ref => ref.Status === "Accepted");
        setReferencesStatus(verified ? "Verified" : "Not Verified");
      }
    };

    const userName = async () => {

      try {
        const { data, error } = await supabase
          .from("UsersData")
          .select("*")
          .order("id", { ascending: false });

        if (error) throw error;

        if (data) {
          // console.log(data[0].Name);
          setName(data[0])
        }
      } catch (error) {
        console.log("Name fetching error is : " + error.message);
      }

    }

    fetchData();
    fetchReferences();
    userName();
  }, []);


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
          <h1 className="text-success">Customer Dashboard</h1>
          <h4 className="text-success">Welcome , {name.Name}</h4>
          <p className="text-muted mb-5">Thank you for using our Platform . Here's an overview of your account.</p>


    
          <div className="row mb-4">
            {/* Active Loans */}
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Active Loans</h5>
                  <h3>{activeLoans}</h3>
                  <p className="text-success mb-0">
                    {activeLoans > 0 ? "Good Standing" : "No Active Loans"}
                  </p>
                </div>
              </div>
            </div>

            {/* Approved Loans */}
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Approved Loans</h5>
                  <h3>{activeLoans}</h3>
                  <p className="text-muted mb-0">
                    Total: ${approvedLoansTotal}
                  </p>
                </div>
              </div>
            </div>

            {/* Pending Requests */}
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Pending Requests</h5>
                  <h3>{pendingLoans}</h3>
                  <p className="text-warning mb-0">
                    {pendingLoans > 0 ? "Review In Progress" : "None Pending"}
                  </p>
                </div>
              </div>
            </div>

            {/* References */}
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">References</h5>
                  <h3>{referencesCount}</h3>
                  <p className="text-muted mb-0">
                    Status: {referencesStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
}


