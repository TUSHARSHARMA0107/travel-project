// utils/createMessage.js

import Message from
"../model/message.model.js";

const createMessage =
  async ({
    receiverId,
    receiverRole,
    bookingId,
    title,
    message,
    type,
  }) => {

    return await Message.create({
      receiverId,
      receiverRole,
      bookingId,
      title,
      message,
      type,
    });
  };

export default createMessage;