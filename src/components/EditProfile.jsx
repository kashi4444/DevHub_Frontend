import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, about, age, gender },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 gap-4">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl">
                Edit Profile
              </h2>
              <div className="my-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-lg">
                    First Name
                  </legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input h-12"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-lg">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input h-12"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-lg">Photo URL</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input h-12"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-lg">Age</legend>
                  <input
                    type="text"
                    value={age}
                    className="input h-12"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <div className="dropdown w-full pr-3 ">
                 <legend className="fieldset-legend text-lg">Gender</legend>
                 {gender ? (
                    <div tabIndex={0} role="button" className="btn w-full h-12 border border-gray-600 flex justify-start">
                    {gender}
                  </div>
                 ):(
                    <div tabIndex={0} role="button" className="btn w-full h-12">
                    Select Gender
                  </div>
                 )}
                  
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box min-w-full p-2 shadow-sm"
                  >
                    <li >
                      <button onClick={()=> setGender("Male")}>Male</button>
                    </li>
                    <li>
                      <button onClick={()=> setGender("Female")}>Female</button>
                    </li>
                    <li>
                      <button onClick={()=> setGender("Others")}>Others</button>
                    </li>
                  </ul>
                </div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-lg">About</legend>
                  <input
                    type="text"
                    value={about}
                    className="input h-12"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>
              {error && <p className="text-red-500">{error}</p>}

              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary text-lg"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, about, age, gender }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success text-lg">
            <span>Profile updated successfully!!!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
