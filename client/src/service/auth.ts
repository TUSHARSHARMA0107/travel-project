import API from "../api/axios";

export const loginApi = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const userRegisterApi = (data: unknown) =>
  API.post("/auth/register-user", data);

export const driverRegisterApi = (data: unknown) =>
  API.post("/auth/register-driver", data);
