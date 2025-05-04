import { useState } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css"; 
import "./NewLoan.css";   
import { useForm } from "react-hook-form";
import { supabase } from "../Pages/Authentication";


export default function NewLoan() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({});


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const nextStep = () => step < 4 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);


const {register , reset , handleSubmit, formState : {errors , isSubmitting}} = useForm({mode : "all"})

const formSubmit = async (data) =>{
console.log(data);

try {
  const { error } = await supabase
  .from("NewLoan")
  .insert({
     Request_date : data.Dates ,
    Loan_Package : data.loanPackage,
    Pay_Frequency : data.payFrequently ,
    Reference : data.reference,
    Next_Pay_Date : data.nextPayDate
   })

   if(error) throw error;

} catch (error) {
  console.log("New Loan insert error is " + error.message);
}
}

const saveFormValues = (data) => {
  setFormValues(data);
  nextStep();
};


  return (
    <>
      {/* Mobile Navbar */}
      <div className="d-md-none p-2 bg-light border-bottom d-flex justify-content-between align-items-center">
        <h5 className="mb-0">New Loan</h5>
        <button className="btn btn-outline-primary" onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>

     <form onSubmit={handleSubmit(formSubmit)}>
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
          <h3 className="mb-3">Apply for a New Loan</h3>
          <p>Please complete all required information to submit your loan application.</p>

          {/* Stepper */}
          <div className="stepper mb-4">
            {["Personal Information", "Income Source", "Loan Details", "Review"].map((label, index) => (
              <div key={index} className={`step ${step === index + 1 ? "active" : ""}`}>
                <div className="step-number">{index + 1}</div>
                <div className="step-label">{label}</div>
              </div>
            ))}
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div>
              <h5>Personal Information</h5>
              <div className="row g-3">
                <div className="col-4">
                  <label>Birth date *</label>
                  <input type="date" className="form-control" {...register("Dates")} placeholder="YYYY" />
                </div>
                <div className="col-4">
                  <label>Reference</label>
                  <input type="text" className="form-control" {...register("reference")} placeholder="Enter reference here" />
                </div>
                <div className="col-4">
                  <label>Loan Package</label>
                  <input type="text" className="form-control" {...register("loanPackage")} placeholder=" $" />
                </div>
                <div className="col-12 col-md-6">
                  <label>Gender *</label>
                  <select {...register("gender")} className="form-select">
                    <option>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label>Social Insurance Number *</label>
                  <input type="text" {...register("socailInsuranceNumber")} className="form-control" placeholder="XXX-XXX-XXX" />
                </div>
                <div className="col-12">
                  <label>Address Line</label>
                  <input type="text" {...register("address")} className="form-control" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h5>Income Source</h5>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label>Income source *</label>
                  <select {...register("incomeSource")} className="form-select">
                    <option>Invalidity</option>
                    <option>Employment</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label>Bank institution *</label>
                  <select {...register("bankInstitution")} className="form-select">
                    <option>First National Bank (310)</option>
                    <option>City Bank</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label>Pay frequency *</label>
                  <select {...register("payFrequently")} className="form-select">
                    <option>Every 2 weeks</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label>Next pay date *</label>
                  <input type="date" {...register("nextPayDate")} className="form-control" />
                </div>
                <div className="col-12">
                  <label>In last 6 months, made a consumer proposal? *</label><br />
                  <div>
                    <input type="radio" name="proposal" /> Yes &nbsp;&nbsp;
                    <input type="radio" name="proposal" /> No
                  </div>
                </div>
                <div className="col-12">
                  <label>Ever filed for bankruptcy? *</label><br />
                  <div>
                    <input type="radio" name="bankruptcy" /> Yes &nbsp;&nbsp;
                    <input type="radio" name="bankruptcy" /> No
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for Step 3 & 4 */}
          

          {step === 3 && (
  <div>
    <h5 className="mb-4">Request Details</h5>

    <div className="mb-4">
      <h6><i className="bi bi-person-fill me-2"></i>Personal Information</h6>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-bold">Birth Date</label>
          <div className="form-control bg-light">{formValues.Dates || "Not provided"}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Gender</label>
          <div className="form-control bg-light">{formValues.gender || "Not provided"}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Social Insurance Number</label>
          <div className="form-control bg-light">{formValues.socailInsuranceNumber || "Not provided"}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Address</label>
          <div className="form-control bg-light">{formValues.address || "Not provided"}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Loan Package</label>
          <div className="form-control bg-light">{formValues.loanPackage || "Not provided"}</div>
        </div>
      </div>
    </div>

    <div>
      <h6><i className="bi bi-journal-text me-2"></i>Income & Bank Info</h6>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-bold">Pay Frequency</label>
          <div className="form-control bg-light">{formValues.payFrequently || "Not provided"}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Next Pay Date</label>
          <div className="form-control bg-light">{formValues.nextPayDate || "Not provided"}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Bank Institution</label>
          <div className="form-control bg-light">{formValues.bankInstitution || "Not provided"}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Income Source</label>
          <div className="form-control bg-light">{formValues.incomeSource || "Not provided"}</div>
        </div>
      </div>
    </div>
  </div>
)}




          {step === 4 && <h5>Review & Submit (Coming soon)</h5>}

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-4">
            {step > 1 && <button className="btn btn-outline-secondary" onClick={prevStep}>Previous</button>}
            {/* <button className="btn btn-primary ms-auto" onClick={nextStep} >Next</button> */}
            <button className="btn btn-primary ms-auto" onClick={handleSubmit(saveFormValues)}>Next</button>

           {step === 4 &&  <button className="btn btn-primary" type="submit" style={{marginLeft : "10px"}}>Submit</button>}
          </div>
        </div>
      </div>
     </form>
    </>
  );
}
