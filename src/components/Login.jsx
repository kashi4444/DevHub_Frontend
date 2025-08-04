import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("vir@gmail.com");
  const [password, setPassword] = useState("#ViratJi666666");
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
      setError(err.response.data);
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <div className="my-2">
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
                type="text"
                value={password}
                className="input h-12"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          
          <div className="card-actions justify-center">
            <button className="btn btn-primary text-lg" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
