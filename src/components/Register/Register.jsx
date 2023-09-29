import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../HeroRegister/firebase.config";
import { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icon/ai";
// import {AiOutline}

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
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
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
    }
    // create a user
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        // const user =
        console.log(result);
        setSuccess("user created successfully");
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
            type="email"
            placeholder="email address"
            name="email"
            id="x"
            required
          />
          <br />
          <input
            className="mb-4 md:ml-20 xl:ml-40text-xl  p-2 bg-gray-100 rounded-md border w-full md:w-3/4"
            // type={showAndHidePass}
            type={showAndHidePass ? "text" : "password"}
            placeholder="password"
            name="password"
            id="y"
            required
          />
          <span
            className="btn btn-ghost"
            // onClick={handleShowAndHidePass}
            onClick={() => setShowAndHidePass(!showAndHidePass)}
          >
            {/* <AiOutlineEye></AiOutlineEye> */}
            {showAndHidePass ? "Hide" : "Show"}
          </span>
          <br />
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
        </form>
      </div>
    </div>
  );
};

export default Register;
