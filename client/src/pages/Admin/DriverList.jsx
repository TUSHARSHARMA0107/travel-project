import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDrivers } from "../../service/admin";

function DriverListPage() {

  const [drivers, setDrivers] =
    useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {

    try {

      const res =
        await getAllDrivers();

      setDrivers(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">

        Drivers

      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr>

              <th>Name</th>

              <th>Vehicle</th>

              <th>Phone</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {drivers.map(
              (driver:any) => (

                <tr key={driver._id}>

                  <td>
                    {driver.name}
                  </td>

                  <td>
                    {driver.vehicleType}
                  </td>

                  <td>
                    {driver.phone}
                  </td>

                  <td>

                    {driver.isBlocked ? (

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
                      to={`/admin/drivers/${driver._id}`}
                    >

                      View

                    </Link>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DriverListPage;