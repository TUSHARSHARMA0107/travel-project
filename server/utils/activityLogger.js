export const addActivity =
  async (
    booking,
    message,
    type
  ) => {

    booking.activities.push({

      message,

      type,

      createdAt:
        new Date(),
    });

    await booking.save();
  };