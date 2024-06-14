import axios from "./customized-axios";

export const postRegister = (data) => axios.post("/api/users", data);

export const fetchGetMyInfo = () => axios.get("/api/users/my-info");

export const putUpdateMyInfo = (data) => axios.put("/api/users/my-info", data);

export const putChangePassword = (data) =>
  axios.put("/api/users/change-password", data);
