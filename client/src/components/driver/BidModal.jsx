import {
  useState,
} from "react";

import {

  placeBid,

} from "../../service/bookingService";

const BidModal = ({
  booking,
  onClose,
}) => {

  const [amount, setAmount] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [estimatedTime,
    setEstimatedTime] =
      useState("");

  const handleBid =
    async () => {

      try {

        await placeBid(
          booking._id,
          {
            amount,
            message,
            estimatedTime,
          }
        );

        alert(
          "Bid placed successfully"
        );

        onClose();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to place bid due technical error or bid placed already"
        );
      }
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-5">
          Place Bid
        </h2>

        <div className="space-y-4">

          <input
            type="number"
            placeholder="Bid Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Estimated Delivery Time"
            value={estimatedTime}
            onChange={(e) =>
              setEstimatedTime(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
            rows={4}
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={handleBid}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            Submit Bid
          </button>

        </div>

      </div>
    </div>
  );
};

export default BidModal;