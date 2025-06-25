import Form from 'react-bootstrap/Form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Correct import
import { supabase } from './Authentication';
import Swal from 'sweetalert2';
import { Container, Row, Col } from 'react-bootstrap';

function Login() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ mode: 'all' });
  const navigate = useNavigate();

  const formSubmit = async (loginData) => {
    const { loginEmail, LoginPassword } = loginData;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: LoginPassword,
      });

      if (error) throw error;

      if (data) {
        setTimeout(() => {
          Swal.fire({
            title: "Log In",
            text: "Your account logged in successfully",
            icon: "success",
            confirmButtonText: "OK"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/dashboard");
            }
          });
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Login Error",
        text: error.message,
        icon: "error"
      });
      console.log("Login error is:", error.message);
    }

    reset();
  };

  return (
    <>
      <Navbar />

      <Container fluid className="py-5">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={6} className="text-center mb-4 mb-md-0">
            <img
              src="https://img.freepik.com/free-vector/buffer-concept-illustration_114360-2267.jpg"
              alt="Login Illustration"
              className="img-fluid"
              style={{ maxWidth: '80%' }}
            />
          </Col>

          <Col xs={12} md={6}>
            <Form
              className="p-4 border border-black rounded shadow bg-white"
              onSubmit={handleSubmit(formSubmit)}
              style={{ maxWidth: '400px', margin: '0 auto' }}
            >
              <h1 className="text-center text-success mb-4">Log In</h1>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("loginEmail", {
                    required: "This field is required"
                  })}
                />
                {errors.loginEmail && <p className="text-danger">{errors.loginEmail.message}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("LoginPassword", {
                    required: "This field is required",
                    minLength: { value: 8, message: "Minimum length should be 8" },
                    maxLength: { value: 25, message: "Maximum length should be 25" }
                  })}
                />
                {errors.LoginPassword && <p className="text-danger">{errors.LoginPassword.message}</p>}
              </Form.Group>

              <button
                className="btn btn-success w-100"
                type="submit"
                disabled={isSubmitting}
                style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? "Submitting..." : "Log In"}
              </button>

              <Link to="/home">
                <button className="btn btn-outline-success w-100 mt-3">Back to Home</button>
              </Link>

              <p className="text-center mt-3">
                Don't have an account? <Link to="/signUp" className="text-success fw-bold">Sign Up</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Login;
