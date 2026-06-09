import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDriverProfileApi } from "../../services/driverApi";

const DriverProfilePage = () => {
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getDriverProfileApi();
        setDriver(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  if (!driver) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex items-center gap-6">

          <img
            src={
              driver.profileImage ||
              "https://placehold.co/120"
            }
            alt=""
            className="w-28 h-28 rounded-full border"
          />

          <div>

            <h1 className="text-3xl font-bold">
              {driver.name}
            </h1>

            <p>{driver.email}</p>

            <p>{driver.phone}</p>

          </div>

        </div>

        <hr className="my-6" />

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <p className="font-semibold">
              DL Number
            </p>

            <p>{driver.dlNumber}</p>
          </div>

          <div>
            <p className="font-semibold">
              Vehicle Type
            </p>

            <p>{driver.vehicleType}</p>
          </div>

          <div>
            <p className="font-semibold">
              Vehicle Number
            </p>

            <p>{driver.vehicleNumber}</p>
          </div>

          <div>
            <p className="font-semibold">
              Insurance Number
            </p>

            <p>{driver.insuranceNumber}</p>
          </div>

          <div>
            <p className="font-semibold">
              RC Number
            </p>

            <p>{driver.rcNumber}</p>
          </div>

        </div>

        <div className="mt-6">

          <span
            className={`px-4 py-2 rounded-full text-sm ${
              driver.isVerified
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {driver.isVerified
              ? "Verified Driver"
              : "Verification Pending"}
          </span>

        </div>

        <Link
          to="/driver/profile/edit"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg"
        >
          Edit Profile
        </Link>

      </div>

    </div>
  );
};

export default DriverProfilePage;