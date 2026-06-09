// pages/EditProfilePage.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  getProfileApi,
  updateProfileApi,
} from "../services/userApi";

function EditProfilePage() {

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
    });

  useEffect(() => {

    const fetchProfile =
      async () => {

        const res =
          await getProfileApi();

        setForm(res.data);
      };

    fetchProfile();

  }, []);

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    await updateProfileApi(form);

    alert(
      "Profile Updated Successfully"
    );
  };

  return (

    <div className="max-w-3xl mx-auto p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-4"
      >

        <h1 className="text-2xl font-bold">

          Edit Profile

        </h1>

        <input
          value={form.name}
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          value={form.email}
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          value={form.phone}
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <button
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}

export default EditProfilePage;