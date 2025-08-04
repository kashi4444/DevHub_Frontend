import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      //TODO
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1 className="flex justify-center my-10 font-bold text-xl">No Connections Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl my-5">Connections</h1>
      {connections.map((connection) => {
        const {_id, firstName , lastName, photoUrl, about, age, gender} = connection;
        return (
          <div key={_id} className="max-w-1/2 mx-auto">
            <ul className="list bg-base-100 rounded-box shadow-md">
              <li className="list-row bg-base-300 mb-3">
                <div>
                  <img
                    className="rounded-full aspect-square object-cover h-20"
                    src={photoUrl}
                  />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold">{firstName + " " + lastName}</div>
                  {age && gender && (<div>{age + " , " + gender}</div>)}
                  <div className="list-col-wrap text-lg font-light">{about}</div>
                </div>

              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
