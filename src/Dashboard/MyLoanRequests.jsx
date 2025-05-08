import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { supabase } from "../Pages/Authentication";
import { Link } from "react-router-dom";

export default function LoanRequest() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loanDatas, setLoanDatas] = useState([])
  const [loading, setLoading] = useState(true)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);


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
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const updateStatus = async (id, newStatus) => {
    if (newStatus === "Rejected") {
      const { error } = await supabase
        .from("NewLoan")
        .delete()
        .eq('id', id)

      if (error) {
        console.log("Error deleting reject loan is " + error.message);
      } else {
        setLoanDatas((prev) => prev.filter((loan) => loan.id !== id))
      }

    } else {
      const { error } = await supabase
        .from("NewLoan")
        .update({ Status: newStatus })
        .eq('id', id)
      if (error) {
        console.log("Error updating : " + error.message);
      } else {
        setLoanDatas((prev) => prev.map((loan) => loan.id === id ? { ...loan, Status: newStatus } : loan))
      }
    }
  }

  return (
    <>
      {/* Mobile Navbar */}
      <div className="d-md-none p-2 bg-light border-bottom d-flex justify-content-between align-items-center">
        <h5 className="mb-0">My Loan Requests</h5>
        <button className="btn btn-outline-primary" onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>

      <div className="dashboard-container d-flex">
        {/* Sidebar */}
        <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <Sidebar />
        </div>
        {sidebarOpen && (
          <div className="backdrop d-md-none" onClick={closeSidebar}></div>
        )}

        {/* Main Content */}
        <div className="flex-grow-1 p-3">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h3 className="mb-2 text-success">My Loan Requests</h3>

            <Link to="/newloan"><button className="btn btn-success">New Loan Request</button></Link>
          </div>

          {/* <input
            type="text"
            className="form-control mb-3"
            placeholder="Search loan requests..."
          /> */}

          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th className="text-success">Request ID</th>
                  <th className="text-success">Request Date</th>
                  <th className="text-success">Loan Package</th>
                  <th className="text-success">Pay Frequency</th>
                  <th className="text-success">Reference</th>
                  <th className="text-success">Next Pay Date</th>
                  <th className="text-success">Status</th>
                  <th className="text-success">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center">Loading...</td>
                  </tr>
                ) : loanDatas.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">No loan requests found.</td>
                  </tr>
                ) : (
                  loanDatas.map((loan) => (
                    <tr key={loan.id}>
                      <td>{loan.id}</td>
                      <td>{loan.Request_date}</td>
                      <td>{loan.Loan_Package}</td>
                      <td>{loan.Pay_Frequency}</td>
                      <td>{loan.Reference}</td>
                      <td>{loan.Next_Pay_Date}</td>
                  

                      <td>
                        <span className={`badge ${loan.Status === "Pending"
                          ? "bg-warning text-dark"
                          : loan.Status === "Reviewing Documents"
                            ? "bg-primary"
                            : loan.Status === "Accepted"
                              ? "bg-success"
                              : loan.Status === "Rejected"
                                ? "bg-danger"
                                : "bg-secondary"
                          }`}>
                          {loan.Status}
                        </span>
                      </td>

                      <td>
                        {loan.Status === "Pending" && (
                          <>
                            <button
                              className="btn btn-sm btn-outline-primary me-1"
                              onClick={() => updateStatus(loan.id, "Reviewing Documents")}
                            >
                               <i className="fas fa-file-alt"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-success me-1"
                              onClick={() => updateStatus(loan.id, "Accepted")}
                            >
                           <i className="fas fa-check"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => updateStatus(loan.id, "Rejected")}
                            >
                             <i className="fas fa-times"></i>
                            </button>
                          </>
                        )}

                        {loan.Status !== "Pending" && (
                          <span className="text-muted">No actions available</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

          {/* Pagination */}
          {/* <div className="d-flex justify-content-between align-items-center mt-3">
            <small>Showing 1 to 5 of 5 results</small>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item active">
                  <button className="page-link">1</button>
                </li>
                <li className="page-item">
                  <button className="page-link">2</button>
                </li>
              </ul>
            </nav>
          </div> */}

          {/* <small className="text-muted mt-2 d-block">
            Note: You can view the details of each loan request by clicking on the action menu.
          </small> */}
        </div>
      </div>
    </>
  );
}
