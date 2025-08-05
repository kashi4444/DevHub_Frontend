import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm , setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    try{
      const res = await axios.post(BASE_URL + "/login",{
        email, password
      }, {withCredentials: true})
      dispatch(addUser(res.data.data));
      navigate("/");
    }catch(err){
      setError(err?.response?.data || "Something went wrong");
    }
  }
  const handleSignUp = async()=>{
    try{
      const res = await axios.post(BASE_URL + "/signup",
        {firstName, lastName, email, password},
        {withCredentials : true}
      )
      console.log(res.data);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    }catch(err){
      setError(err?.response?.data || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">{isLoginForm? "Login": "SignUp"}</h2>
          <div className="my-2">

          {!isLoginForm && <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">First Name</legend>
              <input
                type="text"
                value={firstName}
                className="input h-12"
                placeholder="Enter Your First Name"
                onChange={(e)=> setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Last Name</legend>
              <input
                type="text"
                value={lastName}
                className="input h-12"
                placeholder="Enter Your Last Name"
                onChange={(e)=> setLastName(e.target.value)}
              />
            </fieldset>
          </>}
            
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Email ID</legend>
              <input
                type="text"
                value={email}
                className="input h-12"
                placeholder="Enter Your Email"
                onChange={(e)=> setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend text-lg">Password</legend>
              <input
                type="password"
                value={password}
                className="input h-12"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          
          <div className="card-actions justify-center">
            <button className="btn btn-primary text-lg" onClick={isLoginForm ? handleLogin: handleSignUp }>{isLoginForm ? "Login" : "SignUp"}</button>
          </div>
          <p className="m-auto cursor-pointer py-2" onClick={()=> setIsLoginForm((value) => !value)}>{isLoginForm ? "New User? SignUp Here" : "Existing User? Login Here"}</p>
        </div>
      </div>
    </div>
  ); 
};

export default Login;
