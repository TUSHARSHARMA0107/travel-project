import { useEffect, useState } from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getUserDetails,
  blockUser,
  
} from "../../service/admin";

function UserDetailsPage() {

  const { id } =
    useParams();

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser =
    async () => {

      try {

        const res =
          await getUserDetails(
            id as string
          );

        setUser(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  const handleBlock =
    async () => {

      try {

        await blockUser(
          id as string
        );

        fetchUser();

      } catch (error) {

        console.log(error);
      }
    };

  if (!user)
    return <div>Loading...</div>;

  return (

    <div className="p-6">

      <div className="bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-8">

          User Details

        </h1>

        <div className="space-y-4">

          <div>

            <strong>Name:</strong>

            {" "}
            {user.name}

          </div>

          <div>

            <strong>Email:</strong>

            {" "}
            {user.email}

          </div>

          <div>

            <strong>Phone:</strong>

            {" "}
            {user.phone}

          </div>

          <div>

            <strong>Status:</strong>

            {" "}

            {user.isBlocked ? (

              <span className="text-red-500">

                Blocked

              </span>

            ) : (

              <span className="text-green-500">

                Active

              </span>

            )}

          </div>

        </div>

        <div className="mt-8">

          <button
            onClick={handleBlock}
            className="
            bg-red-500
            text-white
            px-6
            py-3
            rounded-lg
            "
          >

            Block User

          </button>

        </div>

      </div>

    </div>
  );
}

export default UserDetailsPage;