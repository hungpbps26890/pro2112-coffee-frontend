import axios from "./customized-axios";

export const postLogin = (data) => axios.post("/api/auth/login", data);

export const postLogout = (data) => axios.post("/api/auth/logout", data);
