import API from "../api/axios"

export const getAllUsers =
  () =>
    API.get("/admin/users");

export const getUserDetails =
  (id:string) =>
    API.get(
      `/admin/users/${id}`
    );

export const blockUser =
  (id:string) =>
    API.put(
      `/admin/users/${id}/block`
    );

    export const getAllDrivers =
  () =>
    API.get(
      "/admin/drivers"
    );

export const getDriverDetails =
  (id:string) =>
    API.get(
      `/admin/drivers/${id}`
    );

export const blockDriver =
  (id:string) =>
    API.put(
      `/admin/drivers/${id}/block`
    );