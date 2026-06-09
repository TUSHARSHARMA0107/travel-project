import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDriverDetails,
  blockDriver,
} from "../../service/admin";

function DriverDetailsPage() {
  const { id } = useParams();

  const [driver, setDriver] =
    useState<any>(null);

  const [stats, setStats] =
    useState<any>(null);

  const [recentTrips, setRecentTrips] =
    useState<any[]>([]);

  useEffect(() => {
    fetchDriver();
  }, []);

  const fetchDriver = async () => {
    try {
      const res =
        await getDriverDetails(
          id as string
        );

      setDriver(res.data.driver);
      setStats(res.data.stats);
      setRecentTrips(
        res.data.recentTrips
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock =
    async () => {
      try {
        await blockDriver(
          id as string
        );

        fetchDriver();
      } catch (error) {
        console.log(error);
      }
    };

  if (!driver)
    return (
      <div className="p-6">
        Loading...
      </div>
    );

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex gap-6">

          <img
            src={driver.profilePhoto}
            alt=""
            className="
            w-32
            h-32
            rounded-full
            object-cover
            "
          />

          <div>

            <h1 className="text-3xl font-bold">
              {driver.name}
            </h1>

            <p>
              {driver.email}
            </p>

            <p>
              {driver.phone}
            </p>

            <div className="mt-4">

              {driver.isBlocked ? (
                <span className="text-red-500 font-semibold">
                  Blocked
                </span>
              ) : (
                <span className="text-green-500 font-semibold">
                  Active
                </span>
              )}

            </div>

            <button
              onClick={handleBlock}
              className="
              mt-4
              bg-red-500
              text-white
              px-4
              py-2
              rounded-lg
              "
            >
              Block Driver
            </button>

          </div>

        </div>

      </div>

      {/* PERSONAL INFO */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Personal Information
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <Info
            label="Name"
            value={driver.name}
          />

          <Info
            label="Email"
            value={driver.email}
          />

          <Info
            label="Phone"
            value={driver.phone}
          />

          <Info
            label="DL Number"
            value={driver.dlNumber}
          />

          <Info
            label="Aadhaar"
            value={
              driver.aadhaarNumber
            }
          />

        </div>

      </div>

      {/* VEHICLE INFO */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Vehicle Information
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <Info
            label="Vehicle Type"
            value={
              driver.vehicleType
            }
          />

          <Info
            label="Vehicle Number"
            value={
              driver.vehicleNumber
            }
          />

          <Info
            label="Insurance Number"
            value={
              driver.insuranceNumber
            }
          />

          <Info
            label="RC Number"
            value={driver.rcNumber}
          />

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">

        <StatCard
          title="Total Trips"
          value={
            stats?.totalTrips || 0
          }
        />

        <StatCard
          title="Completed"
          value={
            stats?.completedTrips ||
            0
          }
        />

        <StatCard
          title="Cancelled"
          value={
            stats?.cancelledTrips ||
            0
          }
        />

        <StatCard
          title="Earnings"
          value={`₹${
            stats?.totalEarnings ||
            0
          }`}
        />

      </div>

      {/* DOCUMENTS */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Documents
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

          <DocumentCard
            title="DL Front"
            image={
              driver.dlFrontImage
            }
          />

          <DocumentCard
            title="DL Back"
            image={
              driver.dlBackImage
            }
          />

          <DocumentCard
            title="RC Image"
            image={driver.rcImage}
          />

          <DocumentCard
            title="Truck"
            image={
              driver.truckImage
            }
          />

          <DocumentCard
            title="Profile"
            image={
              driver.profilePhoto
            }
          />

        </div>

      </div>

      {/* BOOKINGS */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Recent Bookings
        </h2>

        <table className="w-full">

          <thead>

            <tr>

              <th>Booking</th>

              <th>Route</th>

              <th>Amount</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {recentTrips.map(
              (trip: any) => (

                <tr key={trip._id}>

                  <td>
                    {trip.bookingId}
                  </td>

                  <td>
                    {trip.pickup}
                    {" → "}
                    {
                      trip.destination
                    }
                  </td>

                  <td>
                    ₹{trip.amount}
                  </td>

                  <td>
                    {trip.status}
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

export default DriverDetailsPage;