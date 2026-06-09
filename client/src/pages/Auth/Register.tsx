import { useState } from "react";

import {
  userRegisterApi,
  driverRegisterApi,
} from "../../service/auth.js";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext.tsx";

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;

  dlNumber: string;
  vehicleNumber: string;
  vehicleType: string;
  insuranceNumber: string;
  rcNumber: string;
  aadhaarNumber: string;

  profilePhoto: File | null;
  truckImage: File | null;
  rcImage: File | null;
  dlFrontImage: File | null;
  dlBackImage: File | null;
}

function RegisterPage() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [role, setRole] =
    useState<"user" | "driver">(
      "user"
    );

  const [form, setForm] =
    useState<RegisterForm>({
      name: "",
      email: "",
      phone: "",
      password: "",

      dlNumber: "",
      vehicleNumber: "",
      vehicleType: "",
      insuranceNumber: "",
      rcNumber: "",
      aadhaarNumber: "",

      profilePhoto: null,
      truckImage: null,
      rcImage: null,
      dlFrontImage: null,
      dlBackImage: null,
    });

  // INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // FILE CHANGE
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, files } =
      e.target;

    if (!files) return;

    setForm((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setErrorMessage("");

    try {

      setLoading(true);

      let res;

      // USER REGISTER
      if (role === "user") {

        res =
          await userRegisterApi({

            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
          });

      } else {

        // DRIVER REGISTER
        const formData =
          new FormData();

        formData.append(
          "name",
          form.name
        );

        formData.append(
          "email",
          form.email
        );

        formData.append(
          "phone",
          form.phone
        );

        formData.append(
          "password",
          form.password
        );

        formData.append(
          "dlNumber",
          form.dlNumber
        );

        formData.append(
          "vehicleNumber",
          form.vehicleNumber
        );

        formData.append(
          "vehicleType",
          form.vehicleType
        );

        formData.append(
          "insuranceNumber",
          form.insuranceNumber
        );

        formData.append(
          "rcNumber",
          form.rcNumber
        );

        formData.append(
          "aadhaarNumber",
          form.aadhaarNumber
        );

        // FILES
        if (form.profilePhoto) {

          formData.append(
            "profilePhoto",
            form.profilePhoto
          );
        }

        if (form.truckImage) {

          formData.append(
            "truckImage",
            form.truckImage
          );
        }

        if (form.rcImage) {

          formData.append(
            "rcImage",
            form.rcImage
          );
        }

        if (form.dlFrontImage) {

          formData.append(
            "dlFrontImage",
            form.dlFrontImage
          );
        }

        if (form.dlBackImage) {

          formData.append(
            "dlBackImage",
            form.dlBackImage
          );
        }

        res =
          await driverRegisterApi(
            formData
          );
      }

      // LOGIN
      login(res.data);

      // REDIRECT
      if (role === "driver") {

        navigate(
          "/driver/dashboard"
        );

      } else {

        navigate(
          "/user/dashboard"
        );
      }

    } catch (error: any) {

      console.log(error);

      const message =
        error?.response?.data?.message;

      setErrorMessage(
        message ||
        "Registration failed. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#f6f7fb] flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-[40%] bg-black text-white relative overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">

          <div>

            {/* LOGO */}
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-xl">
                ▲
              </div>

              <h1 className="text-3xl font-bold">
                Platform
              </h1>

            </div>

            {/* TITLE */}
            <div className="mt-28">

              <h2 className="text-7xl font-black leading-[1.05]">
                Create your account
              </h2>

              <p className="mt-7 text-xl text-white/80 leading-relaxed">
                Join the next generation logistics platform built for users and drivers.
              </p>

            </div>

            {/* FEATURES */}
            <div className="mt-20 space-y-10">

              <Feature
                icon="🚚"
                title="Live Tracking"
                text="Track every shipment in real time"
              />

              <Feature
                icon="🛡️"
                title="Secure Platform"
                text="Safe and reliable delivery management"
              />

              <Feature
                icon="📊"
                title="Smart Analytics"
                text="Manage deliveries with advanced insights"
              />

            </div>

          </div>

          <p className="text-white/50 text-sm">
            © 2026 Platform Inc.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 overflow-y-auto">

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <h2 className="text-5xl font-black text-gray-900">
                Register
              </h2>

              <p className="text-gray-500 text-lg mt-3">
                Fill your details to continue
              </p>

            </div>

            {/* LOGIN */}
            <div className="flex items-center gap-4">

              <p className="text-gray-500">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="h-12 px-6 rounded-2xl border border-black flex items-center justify-center font-semibold hover:bg-black hover:text-white transition"
              >
                Sign In
              </Link>

            </div>

          </div>

          {/* ROLE */}
          <div className="grid md:grid-cols-2 gap-7 mt-12">

            {/* USER */}
            <button
              type="button"
              onClick={() =>
                setRole("user")
              }
              className={`relative rounded-[32px] p-8 text-left transition-all border-2 overflow-hidden ${
                role === "user"
                  ? "bg-black text-white border-black shadow-2xl"
                  : "bg-white border-gray-200 hover:border-black"
              }`}
            >

              <div className="flex items-start justify-between">

                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl ${
                  role === "user"
                    ? "bg-white/10"
                    : "bg-[#f4f5f7]"
                }`}>
                  👤
                </div>

                {role === "user" && (

                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                    ✓
                  </div>

                )}

              </div>

              <h3 className="text-3xl font-bold mt-10">
                User Account
              </h3>

              <p className={`mt-4 leading-relaxed text-lg ${
                role === "user"
                  ? "text-white/80"
                  : "text-gray-500"
              }`}>
                Book trucks, manage shipments and track deliveries easily.
              </p>

            </button>

            {/* DRIVER */}
            <button
              type="button"
              onClick={() =>
                setRole("driver")
              }
              className={`relative rounded-[32px] p-8 text-left transition-all border-2 overflow-hidden ${
                role === "driver"
                  ? "bg-black text-white border-black shadow-2xl"
                  : "bg-white border-gray-200 hover:border-black"
              }`}
            >

              <div className="flex items-start justify-between">

                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl ${
                  role === "driver"
                    ? "bg-white/10"
                    : "bg-[#f4f5f7]"
                }`}>
                  🚚
                </div>

                {role === "driver" && (

                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                    ✓
                  </div>

                )}

              </div>

              <h3 className="text-3xl font-bold mt-10">
                Driver Account
              </h3>

              <p className={`mt-4 leading-relaxed text-lg ${
                role === "driver"
                  ? "text-white/80"
                  : "text-gray-500"
              }`}>
                Upload documents, manage trips and earn through deliveries.
              </p>

            </button>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-8"
          >

            {/* ERROR */}
            {
              errorMessage && (

                <div className="relative overflow-hidden rounded-[28px] border border-red-200 bg-gradient-to-r from-red-50 to-red-100 px-6 py-5">

                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center text-xl shrink-0">
                      !
                    </div>

                    <div>

                      <h3 className="font-bold text-red-700 text-lg">
                        Registration Failed
                      </h3>

                      <p className="text-red-600 mt-1 leading-relaxed">
                        {errorMessage}
                      </p>

                    </div>

                  </div>

                </div>
              )
            }

            {/* BASIC */}
            <div className="bg-white rounded-[32px] p-8 border border-gray-200">

              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Basic Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                <InputField
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  type="text"
                  onChange={handleChange}
                />

                <InputField
                  label="Email Address"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  onChange={handleChange}
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  placeholder="Enter your phone number"
                  type="text"
                  onChange={handleChange}
                />

                <InputField
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* DRIVER SECTION */}
            {
              role === "driver" && (

                <>
                  <div className="bg-white rounded-[32px] p-8 border border-gray-200">

                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                      Driver Verification
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">

                      <InputField
                        label="DL Number"
                        name="dlNumber"
                        placeholder="Enter DL number"
                        type="text"
                        onChange={handleChange}
                      />

                      <InputField
                        label="Vehicle Number"
                        name="vehicleNumber"
                        placeholder="Enter vehicle number"
                        type="text"
                        onChange={handleChange}
                      />

                      <InputField
                        label="Vehicle Type"
                        name="vehicleType"
                        placeholder="Enter vehicle type"
                        type="text"
                        onChange={handleChange}
                      />

                      <InputField
                        label="Insurance Number"
                        name="insuranceNumber"
                        placeholder="Enter insurance number"
                        type="text"
                        onChange={handleChange}
                      />

                      <InputField
                        label="RC Number"
                        name="rcNumber"
                        placeholder="Enter RC number"
                        type="text"
                        onChange={handleChange}
                      />

                      <InputField
                        label="Aadhaar Number"
                        name="aadhaarNumber"
                        placeholder="Enter Aadhaar number"
                        type="text"
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                  {/* DOCUMENTS */}
                  <div className="bg-white rounded-[32px] p-8 border border-gray-200">

                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                      Upload Documents
                    </h3>

                    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">

                      <UploadCard
                        label="Profile"
                        name="profilePhoto"
                        handleFileChange={
                          handleFileChange
                        }
                      />

                      <UploadCard
                        label="Truck"
                        name="truckImage"
                        handleFileChange={
                          handleFileChange
                        }
                      />

                      <UploadCard
                        label="RC"
                        name="rcImage"
                        handleFileChange={
                          handleFileChange
                        }
                      />

                      <UploadCard
                        label="DL Front"
                        name="dlFrontImage"
                        handleFileChange={
                          handleFileChange
                        }
                      />

                      <UploadCard
                        label="DL Back"
                        name="dlBackImage"
                        handleFileChange={
                          handleFileChange
                        }
                      />

                    </div>

                  </div>
                </>
              )
            }

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-16 rounded-[24px] text-lg font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-black hover:scale-[1.01] hover:shadow-2xl text-white"
              }`}
            >

              {
                loading
                  ? (
                    <div className="flex items-center justify-center gap-3">

                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>

                      Creating Account...

                    </div>
                  )
                  : (
                    role === "driver"
                      ? "Submit Driver Verification"
                      : "Create Account"
                  )
              }

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

/* FEATURE */
function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {

  return (

    <div className="flex gap-4">

      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
        {icon}
      </div>

      <div>

        <h3 className="font-semibold text-xl">
          {title}
        </h3>

        <p className="text-white/70 mt-1">
          {text}
        </p>

      </div>

    </div>
  );
}

/* INPUT */
interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function InputField({
  label,
  name,
  placeholder,
  type,
  onChange,
}: InputProps) {

  return (

    <div>

      <label className="text-sm font-semibold text-gray-700 mb-2 block">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full h-14 px-5 rounded-2xl bg-[#f7f8fa] border border-gray-200 outline-none focus:border-black transition"
        onChange={onChange}
      />

    </div>
  );
}

/* UPLOAD CARD */
interface UploadCardProps {
  label: string;
  name: string;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function UploadCard({
  label,
  name,
  handleFileChange,
}: UploadCardProps) {

  const [preview, setPreview] =
    useState<string | null>(null);

  const handlePreview = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    handleFileChange(e);

    if (e.target.files?.[0]) {

      const file =
        e.target.files[0];

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  return (

    <label className="group relative rounded-[28px] overflow-hidden border border-gray-200 cursor-pointer hover:border-black transition bg-white">

      {
        preview ? (

          <div className="relative">

            <img
              src={preview}
              className="w-full h-60 object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

            <div className="absolute bottom-4 left-4">

              <p className="text-white font-semibold">
                {label}
              </p>

              <p className="text-white/70 text-sm mt-1">
                Uploaded Successfully
              </p>

            </div>

          </div>

        ) : (

          <div className="h-60 flex flex-col items-center justify-center text-center p-6">

            <div className="w-20 h-20 rounded-3xl bg-[#f5f5f5] flex items-center justify-center text-4xl mb-5">
              📁
            </div>

            <p className="font-semibold text-lg text-gray-900">
              {label}
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Click to upload image
            </p>

          </div>
        )
      }

      <input
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={handlePreview}
      />

    </label>
  );
}

export default RegisterPage;