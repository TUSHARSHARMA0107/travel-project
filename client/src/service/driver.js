// services/driverApi.js

import API from "./authApi";

export const getDriverProfileApi =
  () =>
    API.get(
      "/drivers/profile"
    );

export const updateDriverProfileApi =
  (data) =>
    API.put(
      "/drivers/profile",
      data
    );

export const deleteDriverProfileApi =
  () =>
    API.delete(
      "/drivers/profile"
    );