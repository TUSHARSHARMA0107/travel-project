// pages/ProfilePage.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  getProfileApi,
} from "../services/userApi";

function ProfilePage() {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const fetchProfile =
      async () => {

        const res =
          await getProfileApi();

        setUser(res.data);
      };

    fetchProfile();

  }, []);

  if (!user)
    return <h2>Loading...</h2>;

  return (

    <div className="max-w-3xl mx-auto p-6">

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex items-center gap-6">

          <img
            src={
              user.profileImage ||
              "https://placehold.co/120"
            }
            alt=""
            className="w-28 h-28 rounded-full"
          />

          <div>

            <h1 className="text-3xl font-bold">
              {user.name}
            </h1>

            <p>{user.email}</p>

            <p>{user.phone}</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;