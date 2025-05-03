import Form from 'react-bootstrap/Form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';
import { supabase } from './Authentication';
import { Link, useNavigate } from 'react-router';

function SignUp() {

  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({ mode: 'all' })

  const navigate = useNavigate()

  const formSubmit = async (userData) => {

    const { email, password, name } = userData

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) throw error

      if (data) {
        console.log(data);
        navigate("/login")
      }

    } catch (error) {
      console.log("SignUp error is : " + error.message);
    }

    try {
      const { error } = await supabase
        .from('UsersData')
        .insert({
          Name: name,
          email: email,
        })

      if (error) throw error

    } catch (error) {
      console.log("Insert data error is : " + error.message);
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
          <Form className="p-4 border border-black" style={{ width: "400px", marginTop: "70px" }} onSubmit={handleSubmit(formSubmit)}>
            <h2 className="text-center text-primary mb-4">Create your Account</h2>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" {...register("name", {
                required: {
                  value: true,
                  message: "This field is required"
                },

                minLength: {
                  value: 3,
                  message: "Minimum length should be 3"
                },

                maxLength: {
                  value: 20,
                  message: "Maximum length should be 20"
                }
              })} />

              {errors.name && <p className='text-danger'>{errors.name.message}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" {...register("email", {
                required: {
                  value: true,
                  message: "This field is required"
                }
              })} />
              {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" {...register("password", {
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
              {errors.password && <p className='text-danger'>{errors.password.message}</p>}
            </Form.Group>

            <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting} style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }} >
              {isSubmitting ? "Submitting" : "Sign Up"}
            </button><br />
            <Link to="/home" ><button className='btn btn-primary w-100 mt-3'>Back to Home</button></Link>
            <p className='text-center'>if you have already acccount <Link to="/login"> Login</Link></p>
          </Form>
        </div>
      </div>

      <Footer />

    </>

  );
}

export default SignUp;
