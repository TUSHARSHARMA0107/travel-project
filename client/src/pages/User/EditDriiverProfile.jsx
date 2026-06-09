import { useEffect, useState } from "react";

import {
  getDriverProfileApi,
  updateDriverProfileApi,
} from "../../services/driverApi";

const EditDriverProfilePage = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dlNumber: "",
    vehicleType: "",
    vehicleNumber: "",
    insuranceNumber: "",
    rcNumber: "",
  });

  useEffect(() => {

    const fetchProfile = async () => {

      const res =
        await getDriverProfileApi();

      setForm(res.data);
    };

    fetchProfile();

  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      await updateDriverProfileApi(
        form
      );

      alert(
        "Profile Updated Successfully"
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="p-6">

      <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Edit Driver Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-3 rounded-lg"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded-lg"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-3 rounded-lg"
          />

          <input
            name="dlNumber"
            value={form.dlNumber}
            onChange={handleChange}
            placeholder="DL Number"
            className="border p-3 rounded-lg"
          />

          <input
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
            placeholder="Vehicle Type"
            className="border p-3 rounded-lg"
          />

          <input
            name="vehicleNumber"
            value={form.vehicleNumber}
            onChange={handleChange}
            placeholder="Vehicle Number"
            className="border p-3 rounded-lg"
          />

          <input
            name="insuranceNumber"
            value={form.insuranceNumber}
            onChange={handleChange}
            placeholder="Insurance Number"
            className="border p-3 rounded-lg"
          />

          <input
            name="rcNumber"
            value={form.rcNumber}
            onChange={handleChange}
            placeholder="RC Number"
            className="border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-black text-white p-3 rounded-lg col-span-2"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditDriverProfilePage;