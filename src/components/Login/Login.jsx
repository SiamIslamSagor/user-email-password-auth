import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../HeroRegister/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef(null);
  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setLoginError("");
    setSuccess("");

    // add validation

    //
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);
        result.user.emailVerified
          ? setSuccess("user logged in successfully")
          : alert("Please verified  your email");
      })
      .catch(error => {
        console.log(error);
        setLoginError(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("please provide an email ", emailRef.current.value);
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("please write a valid email");
      return;
    }
    // send validation email
    sendPasswordResetEmail(auth, email)
      .then(result => {
        //  console.log()
        alert("please check your email");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-3xl">Please Login</h1>
      {loginError && <p className="text-red-600 ">{loginError}</p>}
      {success && <p className="text-green-600 ">{success}</p>}
      <div className="card-body">
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
            />
            <label className="label">
              <a
                onClick={handleForgetPassword}
                href="#"
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <p>
            New to this website? Please
            <Link className="btn btn-success btn-sm" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
