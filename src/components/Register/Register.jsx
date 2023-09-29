import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../HeroRegister/firebase.config";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  // const [showAndHidePass, setShowAndHidePass] = useState("password");
  const [showAndHidePass, setShowAndHidePass] = useState(false);

  /* const handleShowAndHidePass = () => {
    if (showAndHidePass === "text") {
      setShowAndHidePass("password");
    } else {
      setShowAndHidePass("text");
    }
  }; */

  const handleRegister = e => {
    e.preventDefault();
    // E.TARGET=>FORM. EMAIL=> FIELD NAME. VALUE=> VALUE.
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(email, password, accepted);
    // console.log(e.target.email);

    // reset error
    setRegisterError("");
    setSuccess("");

    // password validation
    if (password.length < 6) {
      setRegisterError("Password is to short, please set 6 char long password");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should have at least one upper case characters."
      );
      return;
    } else if (!accepted) {
      setRegisterError("Please accept our terms and condition");
      return;
    }
    // create a user
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        // const user =
        console.log(result.user);
        setSuccess("user created successfully");

        // update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            console.log("profile updated");
          })
          .catch(error => {
            console.log(error);
          });

        // send verification email
        sendEmailVerification(result.user).then(() => {
          alert("Please check your email and verification your account");
        });
      })
      .catch(error => {
        console.log(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div className="border rounded-lg mx-auto">
      <div className=" mx-auto md:h-1/2 ">
        <div>
          <h2 className="text-3xl mb-4">Please Register</h2>
          {registerError && <p className="text-red-600 ">{registerError}</p>}
          {success && <p className="text-green-600 ">{success}</p>}
        </div>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 md:ml-20  xl:ml-40text-xl p-2 bg-gray-100 rounded-md border w-full md:w-3/4"
            type="text"
            placeholder="Your Name"
            name="name"
            id="x"
            required
          />
          <br />
          <input
            className="mb-4 md:ml-20  xl:ml-40text-xl p-2 bg-gray-100 rounded-md border w-full md:w-3/4"
            type="email"
            placeholder="email address"
            name="email"
            id="x"
            required
          />
          <br />
          <div className="relative">
            <input
              className=" md:ml-20 xl:ml-40text-xl  p-2 bg-gray-100 rounded-md border w-full md:w-3/4"
              // type={showAndHidePass}
              type={showAndHidePass ? "text" : "password"}
              placeholder="password"
              name="password"
              id="y"
              required
            />
            <span
              className="absolute top-3 md:right-[125px] lg:right-80"
              // onClick={handleShowAndHidePass}
              onClick={() => setShowAndHidePass(!showAndHidePass)}
            >
              {showAndHidePass ? (
                <AiFillEye></AiFillEye>
              ) : (
                <AiFillEyeInvisible></AiFillEyeInvisible>
              )}
            </span>
          </div>
          <br />
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="termss">
            Accept our <a href="#">Terms and condition</a>
          </label>
          <div className=" md:ml-20 xl:ml-40text-xl mb-4 md:ml-xl:ml-4020 p-4 text-center  w-3/4">
            <input
              className="btn btn-secondary"
              type="submit"
              value="REGISTER"
              name=""
              id="z"
              required
            />
          </div>
          <p>
            Already have an account? Please
            <Link className="btn btn-success btn-sm" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
