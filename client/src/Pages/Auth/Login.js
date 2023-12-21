import { useState, React } from "react";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/authStyles.css";
import { useAuth } from "../../Context/authContext.js"

const Login = () => {
  // hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth()

  //SUBMIT BUTTOM HIT HANDLER
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login/", {
        email,
        password,
      });

      if (res.data.success) {
        // toast.success(res.data.msg);
        alert(`Sucess: ${res.data.msg}`);

        //before navigating add user data to auth
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        //store auth details in local_storage
        localStorage.setItem("auth",JSON.stringify(res.data))

        //navigate to homepage
        navigate("/");
      } else {
        // toast.error(res.data.msg);
        alert(`Error: ${res.data.msg}`);
      }
    } catch (err) {
      console.log(err);
      // toast.error("Something went wrong!");
      alert(`Something went wrong\nError: ${err}`);
    }
  };

  return (
    <Layout title="Login | E-Commerce App">
      <div className="form-container">
        <form onSubmit={onSubmitHandler}>
          <h1 className="mb-5 text-center">Sign in</h1>

          <div className="mb-2">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-dark form-control input-field"
              id="exampleInputEmail"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="exampleInputPassword" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-dark form-control input-field"
              id="exampleInputPassword"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
