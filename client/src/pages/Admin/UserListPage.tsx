import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../service/admin";

function UserListPage() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      try {

        const res =
          await getAllUsers();

        setUsers(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">

        Users

      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user:any) => (

              <tr
                key={user._id}
                className="border-b"
              >

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.phone}</td>

                <td>

                  {user.isBlocked ? (

                    <span className="text-red-500">

                      Blocked

                    </span>

                  ) : (

                    <span className="text-green-500">

                      Active

                    </span>

                  )}

                </td>

                <td>

                  <Link
                    to={`/admin/users/${user._id}`}
                    className="text-blue-600"
                  >

                    View

                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UserListPage;