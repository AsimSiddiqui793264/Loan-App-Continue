import Form from 'react-bootstrap/Form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { supabase } from './Authentication';

function Login() {

  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({ mode: 'all' })

  const navigate = useNavigate()

  const formSubmit = async (loginData) => {

    const { loginEmail, LoginPassword } = loginData

    try {

      await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: LoginPassword,
      })

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: LoginPassword,
        })

        if (error) throw error;

        if (data) {
          setTimeout(() => {
            Swal.fire({
              title: "Log In",
              text: "Your account log in Successfully",
              icon: "success",
              confirmButtonText: "OK"
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/dashboard")
              }
            })
          });

        }
      } catch (error) {
        Swal.fire({
          title: "Login Error",
          text: error.message,
          icon: "error"
        });
        console.log("Sub login error is : " + error.message);
      }

    } catch (error) {
      console.log("login error is : " + error.message);
    }
    reset()
  }

  return (

    <>

      <Navbar />

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>

        <div style={{ width: "50%" }}>
          <img src="https://img.freepik.com/free-vector/buffer-concept-illustration_114360-2267.jpg" alt="" />
        </div>

        <div>
          <Form className="p-4 border border-black" style={{ width: "400px" }} onSubmit={handleSubmit(formSubmit)}>
            <h1 className="text-center text-success mb-4">Log In</h1>


            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" {...register("loginEmail", {
                required: {
                  value: true,
                  message: "This field is required"
                }
              })} />
              {errors.loginEmail && <p className='text-danger'>{errors.loginEmail.message}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" {...register("LoginPassword", {
                required: {
                  value: true,
                  message: "This field is required"
                },

                minLength: {
                  value: 8,
                  message: "Minimum length should be 8"
                },

                maxLength: {
                  value: 25,
                  message: "Maximum length should be 25"
                }
              })} />
              {errors.LoginPassword && <p className='text-danger'>{errors.LoginPassword.message}</p>}
            </Form.Group>

            <button className="btn btn-success w-100" type="submit" disabled={isSubmitting} style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }} >
              {isSubmitting ? "Submitting" : "Log In"}
            </button><br />
            <Link to="/home" ><button className='btn btn-success w-100 mt-3'>Back to Home</button></Link>
            <p className='text-center'>if you have not acccount <Link to="/signUp" className='text-success text-bold'>Sign Up</Link></p>
          </Form>
        </div>

      </div>

      <Footer />

    </>

  );
}

export default Login;
