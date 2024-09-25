import React from "react";
import { FaGoogle } from "react-icons/fa";

import { NavLink } from "react-router-dom";
const Login = () => {
  const handleformSubmit = (formData) => {
    //react19 version
    const formInputData = Object.fromEntries(formData.entries());
    console.log(formInputData);
  };
  return (
    <div className="container container-form">
      <section className="section-login flex">
        <form action={handleformSubmit}>
          <div className="user-datainput-form flex">
            <label htmlFor="name">Enter Your Name </label>
            <input
              type="text"
              name="name"
              required
              autoComplete="off"
              autoFocus
              placeholder="abc"
            />

            <label htmlFor="email"> Enter Your Email </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="abc@email.com"
            />

            <label htmlFor="password"> Enter Your Password </label>
            <input
              type="password"
              name="password"
              placeholder="should be minimum 8 letters"
            />
          </div>
          <button>Sign Up </button>
          <p className="flex para-login">
            Already have an Account?{" "}
            <span>
              <NavLink to="/">Log In </NavLink>
            </span>
          </p>
          <br />
          <h3>----------Or---------- </h3>
          <span className="button-span-login grid">
            <button className="btn-login flex">
              {" "}
              <span className="google-icon">
                {" "}
                <FaGoogle />{" "}
              </span>{" "}
              Sign up with Google
            </button>
          </span>
        </form>
      </section>
    </div>
  );
};

export default Login;
