import Form from 'react-bootstrap/Form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';
import { supabase } from './Authentication';
import { Link, useNavigate } from 'react-router-dom'; // <-- useRouter -> useRouterDom
import Swal from 'sweetalert2'; // Don't forget to import Swal
import { Container, Row, Col } from 'react-bootstrap';

function SignUp() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ mode: 'all' });
  const navigate = useNavigate();

  const formSubmit = async (userData) => {
    const { email, password, name } = userData;

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      if (data) {
        setTimeout(() => {
          Swal.fire({
            title: "Sign Up",
            text: "Check your email for confirmation",
            icon: "success",
            confirmButtonText: "OK"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        });
      }

      const { error: insertError } = await supabase
        .from('UsersData')
        .insert({ Name: name, email });

      if (insertError) throw insertError;

    } catch (error) {
      Swal.fire({
        title: "Sign Up Error",
        text: error.message,
        icon: "error"
      });
      console.log("Error:", error.message);
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
              alt="Sign Up Illustration"
              className="img-fluid"
              style={{ maxWidth: '80%' }}
            />
          </Col>

          <Col xs={12} md={6}>
            <Form className="p-4 border border-black rounded shadow" onSubmit={handleSubmit(formSubmit)} style={{ backgroundColor: '#fff' }}>
              <h2 className="text-center text-success mb-4">Create your Account</h2>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" {...register("name", {
                  required: "This field is required",
                  minLength: { value: 3, message: "Minimum length should be 3" },
                  maxLength: { value: 20, message: "Maximum length should be 20" }
                })} />
                {errors.name && <p className='text-danger'>{errors.name.message}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register("email", {
                  required: "This field is required"
                })} />
                {errors.email && <p className='text-danger'>{errors.email.message}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" {...register("password", {
                  required: "This field is required",
                  minLength: { value: 8, message: "Minimum length should be 8" },
                  maxLength: { value: 25, message: "Maximum length should be 25" }
                })} />
                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
              </Form.Group>

              <button className="btn btn-success w-100" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </button>

              <Link to="/home">
                <button className='btn btn-outline-success w-100 mt-3'>Back to Home</button>
              </Link>

              <p className='text-center mt-3'>
                Already have an account? <Link to="/login" className='text-success fw-bold'>Login</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default SignUp;
