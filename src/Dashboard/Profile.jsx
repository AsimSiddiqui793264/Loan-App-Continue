import React, { useEffect, useState } from "react";
import { supabase } from "../Pages/Authentication";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { useNavigate } from "react-router";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const navigate = useNavigate()

  const logOut = async () => {

    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw error
      Swal.fire({
        title: "Log Out",
        text: "Your account log out Successfully",
        icon: "success",
        confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login")
        }
      })


    } catch (error) {
      console.log("Log Out error is : " + error.message);

    }


  }

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      const { data: sessionadata, error: sessionError } = await supabase.auth.getSession()

      if (sessionError || !sessionadata.session) {
        console.log("No active session found");
        Swal.fire({
          title: "Error",
          text: "No active session found",
          icon: "error"
        });
        setLoading(false);
        navigate("/login");
        return;
      }


      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Failed to get user:", userError?.message);
        setLoading(false);
        return;
      }

      const { data, error: profileError } = await supabase
        .from("UsersData")
        .select("*")
        .eq("email", user.email)


      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
      } else if (data.length === 0) {
        console.warn("No matching user profile found.");
      } else {
        setUserData(data[0])
      }
      setLoading(false);
    };
    fetchUserData();
  }, [navigate]);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="d-md-none p-2 bg-light border-bottom d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Profile</h5>
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
        <div className="flex-grow-1 p-4">
          <div className="d-flex justify-content-between">
            <div>
              <h1 className="text-primary text-bold">Customer Profile</h1>
              <small className="text-muted mb-5 d-block">Personal details and infromation</small>
            </div>
            <div> <button className="btn btn-danger" onClick={logOut}>Log Out</button></div>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : userData ? (
            <div className="card p-3 shadow-sm">
              <table className="table table-border">
                <tbody>
                  <tr>
                    <th>Full name</th>
                    <td>{userData.Name}</td>
                  </tr>
                  <tr>
                    <th>Email address</th>
                    <td>{userData.email}</td>
                  </tr>
                  {/* <tr>
                    <th>Phone number</th>
                    <td>{userData.phone}</td>
                  </tr> */}
                  <tr>
                    <th>Account created</th>
                    <td>{new Date(userData.created_at).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>No user profile found.</p>
          )}
        </div>
      </div>
    </>
  );
}
