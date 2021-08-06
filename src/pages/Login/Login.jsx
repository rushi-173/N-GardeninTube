import "./Login.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";
import Loader from "react-loader-spinner";
import axios from "axios";
import {   useNavigate } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';

export function Login() {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const params = useLocation();
  useEffect(() => {
    if(auth){
      navigate("/")
    }
  }, [auth])

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://VideoLibBack-1.rushi173.repl.co/auth/login",
        {
          email: email,
          password: password
        }
      );
      //console.log(res);
      setIsLoading(false);
      if (!res.data.token) {
        setError(res.data);
      } else {
        addToast("Login Successful! Let's Explore the App!", {appearance: 'success'});
        setAuth(res.data);
        setAuth((prev) => {
          localStorage.setItem("gtube-auth", JSON.stringify(prev));
          return prev;
        });
        setEmail("");
        setPassword("");
		if (params.state) {
            navigate(params.state.from);
        }else{
			navigate("/")
		}
      }
    } catch (err) {
      setIsLoading(false);
      addToast("err",{appearance: 'error'});
      //console.log(err);
    }
  }

  return (
    <div className="Login container-center">
      <div className="container-center container-column login-form-container">
        <h2>Login</h2>
        <form className="basic-form-container container-column">
          <div className="basic-input-group">
            <label for="email">
              Email: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="email"
              type="text"
              className="input-area"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="basic-input-group">
            <label for="password">
              Password: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="password"
              type="password"
              className="input-area"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small className="err-msg"></small>
          </div>
          <button className="btn btn-primary btn-login" onClick={handleSignIn}>
            {isLoading ? (
              <Loader type="TailSpin" color="#fff" height={20} width={20} />
            ) : (
              "Login"
            )}
          </button>
          <button className="btn btn-secondary btn-login" onClick={(e)=>{
            e.preventDefault()
            setEmail("test@test.com")
            setPassword("test123")
          }} disabled={isLoading}>
            
              Use Test Credentials
          </button>

          <small className="err-msg" style={{color:"red"}}>{error}</small><br/>
          <div className="container-center btn-login">
           
            <Link to="/signup">
              <p>Register Now 🚀</p>
            </Link>
          </div>
          <hr color="white" width="100%" className="btn-login" />
          {/* <br />
          <p>
            <u>Or Login With</u>
          </p>
          <div className="container-space-between social-login btn-login">
            <button class="btn btn-facebook" disabled>
              Facebook
              <i class="fa fa-facebook icon-right" aria-hidden="true"></i>
            </button>
            <button class="btn btn-twitter" disabled>
              Twitter<i class="fa fa-twitter icon-right" aria-hidden="true"></i>
            </button>
            <button class="btn btn-google" disabled>
              Google
              <i class="fa fa-google-plus icon-right" aria-hidden="true"></i>
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}
