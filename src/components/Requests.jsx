import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests ,removeRequest} from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const[currStatus, setCurrStatus] = useState("");

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      setCurrStatus(status);
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
        setCurrStatus("");
      })
    } catch (err) {
      console.error(err);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log("requests-: ", res?.data?.data);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useState(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center my-10 font-bold text-xl">No Requests Found!!!</h1>;

  return (
    <>
      <div className="text-center my-10">
        <h1 className="font-bold text-3xl my-5">Connections Requests</h1>
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, about, age, gender } =
            request.fromUserId;
          return (
            <div key={_id} className="max-w-2/3 mx-auto">
              <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="list-row bg-base-300">
                  <div>
                    <img
                      className="rounded-full aspect-square object-cover h-20"
                      src={photoUrl}
                    />
                  </div>
                  <div className="text-left ml-4">
                    <div className="text-xl font-bold">
                      {firstName + " " + lastName}
                    </div>
                    {age && gender && <div>{age + " , " + gender}</div>}
                    <div className="list-col-wrap text-lg font-light">
                      {about}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="btn btn-primary"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success text-lg">
            <span>Request {currStatus}!!!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Requests;
