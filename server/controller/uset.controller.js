import User from "../model/user.model";


export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(
      req.user.id
    ).select("-password");

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateProfile = async (
  req,
  res
) => {

  try {

    const user = await User.findById(
      req.user.id
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name =
      req.body.name || user.name;

    user.email =
      req.body.email || user.email;

    user.phone =
      req.body.phone || user.phone;

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const deleteProfile = async (
  req,
  res
) => {

  try {

    await User.findByIdAndDelete(
      req.user.id
    );

    res.status(200).json({
      success: true,
      message:
        "Profile deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


//driver
export const getDriverProfile =
async (req, res) => {

  const driver =
    await Driver.findById(
      req.user.id
    ).select("-password");

  res.status(200).json(driver);
};
export const updateDriverProfile =
async (req, res) => {

  const driver =
    await Driver.findById(
      req.user.id
    );

  if (!driver) {
    return res.status(404).json({
      message: "Driver not found",
    });
  }

  Object.assign(
    driver,
    req.body
  );

  await driver.save();

  res.status(200).json({
    success: true,
    driver,
  });
};

export const updateDriverProfile =
async (req, res) => {

  const driver =
    await Driver.findById(
      req.user.id
    );

  if (!driver) {
    return res.status(404).json({
      message: "Driver not found",
    });
  }

  Object.assign(
    driver,
    req.body
  );

  await driver.save();

  res.status(200).json({
    success: true,
    driver,
  });
};