import {
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "../pages/Auth/LoginPage";

import RegisterPage from "../pages/Auth/Register";



import DriverDashboard from "../pages/Dashboard/DriverDashboard";

import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import CreateBooking from "../pages/booking/CreateBooking.jsx";
import MyBookings from "../pages/booking/MyBookings.jsx";
import BookingDetails from "../pages/booking/BookingDetails.jsx";
import OpenBookings from "../pages/driver/OpenBookings";
import MyRides from "../pages/driver/MyRides";
import DriverRideDetails from "../pages/driver/DriverRideDetails";
import Earnings from "../pages/driver/Earning";
import TrackBooking from "../pages/booking/Trackbooking.jsx";
import LiveTrip from "../pages/driver/LiveTrip";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import RideUpdates from "../pages/Message/RideUpdates.jsx";
import Navbar from "../components/Navbar.jsx";


function AppRoutes() {

  return (

    <Routes>

      {/* DEFAULT */}
      <Route
        path="/"
        element={<LoginPage />}
      />

      {/* AUTH */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* DASHBOARDS */}
      <Route
        path="/user/dashboard"
        element={<UserDashboard />}
      />

      <Route
        path="/driver/dashboard"
        element={<DriverDashboard />}
      />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      <Route 
        path="/create-booking"
        element={<CreateBooking/>}
      />
      <Route 
      path="/my-bookings"
      element={<MyBookings/>}
      />
     <Route
     path="/booking/:id"
     element={<BookingDetails/>}
     />
    



<Route
  path="/driver/open-bookings"
  element={<OpenBookings />}
/>

<Route 
path="/driver/my-rides"
element={<MyRides/>}
/>

<Route
path="/driver/rides/:id"
element={<DriverRideDetails/>}
/>
<Route
path="/driver/earning"
element={<Earnings/>}
/>



<Route
  path="/driver/live/:bookingId"
  element={<LiveTrip />}
/>
<Route
path="/track/:bookingId"
element={<TrackBooking/>}/>

<Route
  path="/updates/:bookingId"
  element={<RideUpdates/>}
/>

<Route
path="/navbar"
element={<Navbar/>}
/>

{/* <Route
  path="/admin/users"
  element={<UserListPage />}
/>

<Route
  path="/admin/users/:id"
  element={<UserDetailsPage />}
/> */}
{/* <Route
  path="/admin/drivers"
  element={<DriverListPage />}
/>

<Route
  path="/admin/drivers/:id"
  element={<DriverDetailsPage />}
/> */}
{/* <Route
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
      ]}
    />
  }
>

  <Route
    path="/admin/dashboard"
    element={
      <AdminDashboard />
    }
  />

</Route> */}

    </Routes>
  );
}

export default AppRoutes;