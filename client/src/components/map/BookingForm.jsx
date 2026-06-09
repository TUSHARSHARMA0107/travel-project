import { useForm } from "react-hook-form";

import { createBooking } from "../../service/bookingService";

const BookingForm = ({
  pickup,
  drop,
  routeData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const bookingPayload = {
      pickup,
      drop,

      route: {
        distance:
          routeData?.distance,

        duration:
          routeData?.duration,
      },

      customer: {
        name: data.name,
        phone: data.phone,
      },

      load: {
        type: data.loadType,
        weight: data.weight,
      },

      vehicleType:
        data.vehicleType,

      budget: data.budget,

      notes: data.notes,
    };

    try {
      const response =
        await createBooking(
          bookingPayload
        );

      console.log(response);

      alert(
        "Booking Created Successfully"
      );

      reset();
    } catch (error) {
      console.log(error);

      alert(
        "Failed To Create Booking"
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">
        Booking Information
      </h2>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* CUSTOMER NAME */}
        <div>
          <label className="block mb-2 font-medium">
            Customer Name
          </label>

          <input
            type="text"
            {...register("name")}
            className="w-full border rounded-lg p-3"
            placeholder="Enter name"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block mb-2 font-medium">
            Phone Number
          </label>

          <input
            type="text"
            {...register("phone")}
            className="w-full border rounded-lg p-3"
            placeholder="Enter phone"
          />
        </div>

        {/* LOAD TYPE */}
        <div>
          <label className="block mb-2 font-medium">
            Load Type
          </label>

          <select
            {...register("loadType")}
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Load Type
            </option>

            <option value="Furniture">
              Furniture
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Construction">
              Construction
            </option>

            <option value="Industrial">
              Industrial
            </option>
          </select>
        </div>

        {/* WEIGHT */}
        <div>
          <label className="block mb-2 font-medium">
            Weight (KG)
          </label>

          <input
            type="number"
            {...register("weight")}
            className="w-full border rounded-lg p-3"
            placeholder="Enter weight"
          />
        </div>

        {/* VEHICLE */}
        <div>
          <label className="block mb-2 font-medium">
            Vehicle Type
          </label>

          <select
            {...register(
              "vehicleType"
            )}
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Vehicle
            </option>

            <option value="Mini Truck">
              Mini Truck
            </option>

            <option value="Pickup">
              Pickup
            </option>

            <option value="14 Feet">
              14 Feet
            </option>

            <option value="Container">
              Container
            </option>
          </select>
        </div>

        {/* BUDGET */}
        <div>
          <label className="block mb-2 font-medium">
            Budget
          </label>

          <input
            type="number"
            {...register("budget")}
            className="w-full border rounded-lg p-3"
            placeholder="Enter budget"
          />
        </div>

        {/* NOTES */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Notes
          </label>

          <textarea
            rows={4}
            {...register("notes")}
            className="w-full border rounded-lg p-3"
            placeholder="Additional instructions..."
          />
        </div>

        {/* SUMMARY CARD */}
        <div className="md:col-span-2 bg-slate-100 rounded-xl p-5">
          <h3 className="text-xl font-bold mb-3">
            Booking Summary
          </h3>

          <div className="space-y-2">
            <p>
              <strong>
                Pickup:
              </strong>{" "}
              {pickup?.address}
            </p>

            <p>
              <strong>Drop:</strong>{" "}
              {drop?.address}
            </p>

            <p>
              <strong>
                Distance:
              </strong>{" "}
              {(
                routeData?.distance /
                1000
              ).toFixed(1)}{" "}
              KM
            </p>

            <p>
              <strong>ETA:</strong>{" "}
              {(
                routeData?.duration /
                3600
              ).toFixed(1)}{" "}
              Hours
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg"
          >
            Create Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;